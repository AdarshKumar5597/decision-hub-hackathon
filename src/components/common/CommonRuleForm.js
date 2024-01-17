import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
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

  const [result, setResult] = useState("")

  const onSubmit = async (data) => {
    let result = await createRule(data.ruleName, data.ruleDesc, token)
    if (result) {
      setValue("ruleDesc", "")
      setValue("ruleName", "")
    }
    setResult(result)
  }

  return (
    <div className="w-full flex flex-col items-center justify-start px-8 my-8 space-y-4">
      <div className="flex md:flex-row flex-col w-full items-center justify-center md:gap-x-4 gap-y-4 md:h-[calc(0.50*100vh)] h-full">
        <form
          className="bg-gradient-to-tl from-purple-900 to-indigo-500 md:w-1/2 w-full flex flex-col gap-y-4 items-center justify-center p-4 rounded-xl min-h-full"
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
              className="my-2 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-12 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
            >
              submit
            </button>
          </div>
        </form>
        <div className="md:w-1/2 w-full flex flex-col gap-y-4 h-full">
          <h1 className="text-[2.6rem] flex items-center justify-center text-white font-bold py-3 rounded-xl w-full bg-gradient-to-r from-pink-500 to-violet-600 font-oswald tracking-wide">
            Response
          </h1>
          <div className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-yellow-500 flex items-center justify-center h-full py-10">
            <p className="font-bold text-lg p-4">
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
      {/* <div className="w-full max-h-[18rem]">
        <RulesList />
      </div> */}
      <div className="w-full md:h-[calc(0.36*100vh)] h-full bg-gradient-to-r from-[#051937] via-[#008793] to-[#A8EB12] rounded-xl p-8 py-10">
        <h1 className="text-white text-[2rem] mb-4">How to create the rule?</h1>
        <ul className="ml-8 list-disc text-white space-y-4 text-[1.3rem]">
          <li>
            Go the form and give a rule name and description. Then press the
            submit button.
          </li>
          <li>
            Our backend logic will produce an efficient with the help of the LLM
            model and provide you a sql query.
          </li>
          <li>The sql query will appear in the box below "Response".</li>
        </ul>
      </div>
    </div>
  )
}

export default CommonRuleForm
