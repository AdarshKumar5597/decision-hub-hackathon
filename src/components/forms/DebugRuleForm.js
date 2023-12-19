import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import createrulebg from '../common/createrulebg.jpg'

const DebugRuleForm = (props) => {

    const operate = props.operate;
    const setLoading = props.setLoading;
    let oldRule = props.oldRule;

    const [debugResult, setDebugResult] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        setLoading(true);
        let result = await operate(data.oldruleDesc, null);
        if (result) {
            setDebugResult(result);
        }
        setLoading(false);
    };
    return (
        <div className={`w-[1000px] h-[600px] relative`}>
            <img src={createrulebg} className='rounded-md absolute h-full w-full' alt='createrulebg'></img>
            <form
                className="flex flex-col gap-y-4 absolute left-[50%] translate-x-[-50%] items-center justify-center py-10"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-x-4 w-full gap-y-4 p-6">
                    <label className='flex flex-col ' htmlFor='oldruleDesc'>
                        <p className="mb-1 text-[2rem] font-bold leading-[1.375rem] text-green-950">
                            Rule Description <sup className="text-green-950">*</sup>
                        </p>
                    </label>
                    <input
                        required
                        type="text"
                        id="oldruleDesc"
                        value={oldRule.name}
                        placeholder="Enter Old Rule Description"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[calc(0.9*1000px)] h-[calc(0.15*600px)] rounded-[0.5rem] bg-gradient-to-r from-emerald-500 to-emerald-900 p-[12px] text-white font-bold"
                        {...register("oldruleDesc", { required: true })}
                    />

                    {errors.oldruleDesc && (
                        <span className="ml-2 text-xs tracking-wide text-red-600">
                            Rule Description is required
                        </span>
                    )}

                    <button type='submit' className=' bg-green-900 text-white font-bold p-5 rounded-md w-[calc(0.2*1000px)] mx-auto'>
                        submit
                    </button>
                </div>
            </form>

            <div className='bg-white p-12 flex items-center justify-center absolute bottom-10 h-[calc(0.3*600px)] w-[calc(0.9*1000px)] left-[50%] translate-x-[-50%]'>
                <p className='font-bold text-lg'>
                    {debugResult ? debugResult : <p className=' text-gray-500'>Enter Rule Description to debug rule</p>}
                </p>
            </div>

        </div>
    )
}

export default DebugRuleForm