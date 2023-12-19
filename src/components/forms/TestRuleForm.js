import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import createrulebg from '../common/createrulebg.jpg';

const TestRuleForm = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    
    const operate = props.operate;
    const setLoading = props.setLoading;
    let parametersList = props.parametersList;

    const onSubmit = async (data) => {
        setLoading(true);
        console.log(data);
        let result = await operate(null, data);
        if (result) {
            setTestResult(result);
        }
        setLoading(false);
    };

    const [testResult, setTestResult] = useState("");


    return (
        <div className={`w-[1000px] h-[600px] relative`}>
            <img src={createrulebg} className='rounded-md absolute h-full w-full' alt='createrulebg'></img>
            <form
                className="flex flex-col gap-y-4 absolute left-[50%] translate-x-[-50%] items-center justify-center py-10"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-x-4 w-full gap-y-2 p-6 max-h-[18.75rem] overflow-y-scroll">
                    {
                        parametersList.map((parameter, index) => (
                            <div key={index}>
                                <label className='flex flex-col ' htmlFor={parameter}>
                                    <p className="mb-1 text-[1rem] font-bold leading-[1.375rem] text-green-950">
                                        {parameter} <sup className="text-green-950">*</sup>
                                    </p>
                                </label>
                                <input
                                    required
                                    type="text"
                                    id={parameter}
                                    placeholder={`Enter ${parameter}`}
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[calc(0.25*1000px)] h-[calc(0.05*600px)] rounded-[0.5rem] bg-gradient-to-r from-emerald-500 to-emerald-900 p-[12px] text-white font-bold"
                                    {...register(`${parameter}`, { required: true })}
                                />

                                {errors.parameter && (
                                    <span className="ml-2 text-xs tracking-wide text-red-600">
                                        {parameter} is required
                                    </span>
                                )}
                            </div>
                        ))
                    }


                    <button type='submit' className=' bg-green-900 text-white font-bold p-5 rounded-md w-[calc(0.2*1000px)] mx-auto mt-5'>
                        submit
                    </button>
                </div>
            </form>

            <div className='bg-white p-12 flex items-center justify-center absolute bottom-10 h-[calc(0.3*600px)] w-[calc(0.9*1000px)] left-[50%] translate-x-[-50%]'>
                <p className='font-bold text-lg'>
                    {testResult ? testResult : <p className=' text-gray-500'>Enter Rule parameter values to test rule</p>}
                </p>
            </div>

        </div>
    )
}

export default TestRuleForm