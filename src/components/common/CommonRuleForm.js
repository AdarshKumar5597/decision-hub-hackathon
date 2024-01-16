import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { setCreateRuleData } from "../../slices/createRuleSlice"
import { createRule } from "../../services/operations/createRuleAPI"
import RulesList from "../../pages/RulesList"
const CommonRuleForm = () => {
  const { token } = useSelector((state) => state.authReducer)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const [result, setResult] = useState("")

  const onSubmit = async (data) => {
    let result = await createRule(data.ruleName, data.ruleDesc, token)
    if (result) {
      dispatch(setCreateRuleData(result))
      setValue("ruleDesc", "")
      setValue("ruleName", "")
    }
    setResult(result)
  }

  return (
    <div className="w-full flex flex-col items-center justify-center px-8 my-10 h-full">
      <div className="flex flex-row w-full items-start gap-x-4 h-1/2">
        <form
          className="bg-gradient-to-tl from-purple-900 to-indigo-500 w-1/2 flex flex-col gap-y-4 items-center justify-center p-4 rounded-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-x-4 w-full gap-y-4">
            <label className="flex flex-col items-start" htmlFor="ruleName">
              <p className="mb-1 text-[1.5rem] font-bold leading-[1.375rem] text-white">
                Rule Name
              </p>
            </label>
            <input
              required
              type="text"
              id="ruleName"
              placeholder="Enter Rule Name"
              className="create-input-form w-full h-16 rounded-[0.5rem] bg-white/10 p-[12px] text-green-950 font-bold"
              {...register("ruleName", { required: true })}
            />

            {errors.ruleName && (
              <span className="ml-2 text-xs tracking-wide text-red-600">
                Rule Name is required
              </span>
            )}

            <label className="flex flex-col " htmlFor="ruleDesc">
              <p className="mb-1 text-[1.5rem] font-bold leading-[1.375rem] text-white">
                Rule Description
              </p>
            </label>
            <input
              required
              type="text"
              id="ruleDesc"
              placeholder="Enter Rule Description"
              className="create-input-form w-full h-20 rounded-[0.5rem] bg-white/10 p-[12px] text-green-950 font-bold"
              {...register("ruleDesc", { required: true })}
            />

            {errors.ruleDesc && (
              <span className="ml-2 text-xs tracking-wide text-red-600">
                Rule Description is required
              </span>
            )}

            <button
              type="submit"
              className="my-2 ml-72 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-12 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
            >
              submit
            </button>
          </div>
        </form>
        <div className="w-1/2 h-full flex flex-col gap-y-4">
          <h1 className="text-[2.6rem] flex items-center justify-center text-white font-bold py-3 rounded-xl w-full bg-gradient-to-r from-pink-500 to-violet-600 font-oswald tracking-wide">
            Response
          </h1>
          <div className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-yellow-500 flex items-center justify-center max-h-[16rem] py-28">
            <p className="font-bold text-lg p-4 scrollbar-hide">
              {result ? (
                result
              ) : (
                <p className=" text-gray-500">
                  Enter Rule Description to create a new rule
                </p>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full max-h-[18rem] scrollbar-hide overflow-y-scroll">
        <RulesList />
      </div>
    </div>
  )
}

export default CommonRuleForm
