import React, { useState } from 'react'
import createrulebg from './createrulebg.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { setCreateRuleData } from '../../slices/createRuleSlice'
import { createRule } from '../../services/operations/createRuleAPI'

const CommonRuleForm = () => {

  const { token } = useSelector((state) => state.authReducer);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()


  const dispatch = useDispatch();

  const [result, setResult] = useState("")

  const onSubmit = async (data) => {

    let result = await createRule(data.ruleName, data.ruleDesc, token);
    if (result) {
      dispatch(setCreateRuleData(result));
      setValue("ruleDesc", "");
      setValue("ruleName", "");
    }
    setResult(result);
  }

  return (
    <div className={`w-[1000px] h-[600px] relative`}>
      <img src={createrulebg} className='rounded-md absolute h-full w-full' alt='createrulebg'></img>

      <form className="flex flex-col gap-y-4 absolute left-[50%]
       translate-x-[-50%] items-center justify-center py-10"
        onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col gap-x-4 w-full gap-y-4">



          <label className='flex flex-col items-start' htmlFor='ruleName'>
            <p className="mb-1 text-[1rem] font-bold leading-[1.375rem] text-green-950">
              Rule Name <sup className="text-green-950">*</sup>
            </p>
          </label>
          <input
            required
            type="text"
            id="ruleName"
            placeholder="Enter Rule Name"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-[calc(0.5*1000px)] h-[calc(0.10*600px)] rounded-[0.5rem] bg-white p-[12px] text-green-950 font-bold"
            {...register("ruleName", { required: true })}
          />

          {errors.ruleName && (
            <span className="ml-2 text-xs tracking-wide text-red-600">
              Rule Name is required
            </span>
          )}


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
            className="w-[calc(0.9*1000px)] h-[calc(0.15*600px)] rounded-[0.5rem] bg-white p-[12px] text-green-950 font-bold"
            {...register("ruleDesc", { required: true })}
          />

          {errors.ruleDesc && (
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
          {result ? result : <p className=' text-gray-500'>Enter Rule Description to create a new rule</p>}
        </p>
      </div>

    </div>
  )
}

export default CommonRuleForm