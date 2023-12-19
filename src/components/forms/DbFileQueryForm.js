import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import createrulebg from '../common/createrulebg.jpg';
import { uploaddbfile, dbfilequery } from '../../services/operations/dbFileQueryAPI';

const DbFileQueryForm = (props) => {
    const [dbFileResult, setDbFileResult] = useState([]);
    const [dbFileResultText, setDbFileResultText] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();



    const operate = async (ruleDesc) => {
        let result = null;
        const dbFileQueryResponse = await dbfilequery(ruleDesc);
        if (dbFileQueryResponse) {
            result = dbFileQueryResponse;
        }

        return result;
    }

    const onSubmit = async (data) => {
        let result = await operate(data.ruleDesc); // Include the file data in your operate function
        if (result) {
            Array.isArray(result) ? setDbFileResult(result) : setDbFileResultText(result);
            console.log(dbFileResult);
            console.log(dbFileResultText)
        }
    };

    return (
        <div className={`w-[1000px] h-[600px] relative`}>
            <img src={createrulebg} className='rounded-md absolute h-full w-full' alt='createrulebg'></img>
            <form
                className="flex flex-col gap-y-4 absolute left-[50%] translate-x-[-50%] items-center justify-center py-10 mb-1"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-x-4 w-full gap-y-4 p-6">


                    <label className='flex flex-col items-center justify-center' htmlFor='file'>
                        <p className="mb-1 text-[1.5rem] font-bold leading-[1.375rem] text-green-950">
                            Upload File
                        </p>

                        <input
                            type="file"
                            id="file"
                            onChange={async (e) => await uploaddbfile(e.target.files[0])}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-[calc(0.5*1000px)] h-[calc(0.08*600px)] rounded-[0.5rem] bg-gradient-to-r from-emerald-500 to-emerald-900 p-[12px] text-white font-bold flex items-center justify-center"
                            {...register("file")}
                        />
                    </label>


                    <label className='flex flex-col ' htmlFor='ruleDesc'>
                        <p className="mb-1 text-[2rem] font-bold leading-[1.375rem] text-green-950">
                            Rule Description <sup className="text-green-950">*</sup>
                        </p>
                    </label>
                    <input
                        required
                        type="text"
                        id="ruleDesc"
                        placeholder="Enter Rule Description"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[calc(0.9*1000px)] h-[calc(0.15*600px)] rounded-[0.5rem] bg-gradient-to-r from-emerald-500 to-emerald-900 p-[12px] text-white font-bold"
                        {...register("ruleDesc", { required: true })}
                    />

                    {errors.ruleDesc && (
                        <span className="ml-2 text-xs tracking-wide text-red-600">
                            Rule Description is required
                        </span>
                    )}



                    <button type='submit' className=' bg-green-900 text-white font-bold p-5 rounded-md w-[calc(0.2*1000px)] mx-auto'>
                        Submit
                    </button>
                </div>
            </form>

            <div className='bg-white p-12 flex items-center justify-center absolute bottom-10 h-[calc(0.3*600px)] w-[calc(0.9*1000px)] left-[50%] translate-x-[-50%]'>
                <p className='font-bold text-lg'>
                    {dbFileResult && dbFileResult.length > 0 ? (
                        dbFileResult.map((data, index) => (
                            <p key={index}>{JSON.stringify(data)}</p>
                        ))
                    ) :
                    (dbFileResultText) ? dbFileResultText :  (
                        <p className='text-gray-500'>Enter Rule Description to execute rule</p>
                    )}
                </p>
            </div>
        </div>
    );
};

export default DbFileQueryForm;
