/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { getAllRules } from "../services/operations/getAllRulesAPI"
import { matchPath, useLocation } from "react-router-dom"
import { modifyRule } from "../services/operations/modifyRuleAPI"
import { useForm } from "react-hook-form"
import { debugRule } from "../services/operations/debugRuleAPI"
import DebugRuleForm from "../components/forms/DebugRuleForm"
import TestRuleForm from "../components/forms/TestRuleForm"
import { ruleHasParameters, testRule } from "../services/operations/testRuleAPI"
import { useSelector } from "react-redux"
import plus from "./Assets/plus-solid.svg"
import { toast } from "react-hot-toast"
import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"
const RulesList = () => {
  const { token } = useSelector((state) => state.authReducer)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const location = useLocation()
  const [search, setSearch] = useState([])
  const [input, setInput] = useState("")
  const [active, setActive] = useState(false)
  const [rules, setAllRules] = useState([])
  const [onClicked, setOnClicked] = useState(false)
  const [oldRule, setOldRule] = useState(null)
  const [parametersList, setParametersList] = useState([])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const operate = async (oldRuleDesc, newRuleDesc) => {
    if (onClicked && matchRoute("/modify")) {
      let oldRuleDescription = oldRuleDesc
      let newRuleDescription = newRuleDesc
      let result = await modifyRule(
        oldRuleDescription,
        newRuleDescription,
        token
      )
      return result
    }
    if (onClicked && matchRoute("/debug")) {
      let oldRuleDescription = oldRuleDesc
      let result = await debugRule(oldRuleDescription, token)
      return result
    }
    if (onClicked && matchRoute("/test")) {
      console.log(token)
      let result = await testRule(oldRule._id, newRuleDesc, token)
      return result
    }
  }

  async function changeOldRuleOnClick(rule) {
    setOnClicked(!onClicked)
    setOldRule(rule)
    if (matchRoute("/test")) {
      let result = await ruleHasParameters(rule._id, token)
      if (result) {
        setParametersList(result)
      }
    }
  }

  const onSubmit = async (data) => {
    let result = await operate(data.oldruleDesc, data.newruleDesc)
    if (result) {
      changeOldRuleOnClick(result)
      getAllRulesFunc()
    }
  }

  const getAllRulesFunc = async () => {
    console.log(token)
    let rulesData = await getAllRules(token)
    if (rulesData) {
      setAllRules(rulesData)
    }
  }

  useEffect(() => {
    console.log("use effect triggered")
    getAllRulesFunc()
  }, [])

  const onClickSearch = () => {
    if (active) {
      let ok = rules.filter((rule) => rule.name === input)
      if (ok) setSearch(ok)
      else toast.error("No entries found.")
      //   console.log(search)
      //   if (search.length === 0) toast.error("No entries found.")
    }
    if (input === "") {
      setActive((prev) => !prev)
    }
  }

  return (
    <div className="mx-auto w-full py-5 flex items-center justify-center">
      {onClicked && matchRoute("/modify") ? (
        <div>
          <form
            className="flex flex-col gap-y-4 absolute left-[50%] translate-x-[-50%] items-center justify-center py-10 bg-white rounded-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-x-4 w-full gap-y-4 p-6">
              <label className="flex flex-col " htmlFor="oldruleDesc">
                <p className="mb-1 text-[2rem] font-bold leading-[1.375rem] text-green-950">
                  Old Rule Description <sup className="text-green-950">*</sup>
                </p>
              </label>
              <input
                required
                type="text"
                id="oldruleDesc"
                value={oldRule.description}
                placeholder="Enter Old Rule Description"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[calc(0.9*1000px)] h-[calc(0.15*600px)] rounded-[0.5rem] bg-gradient-to-r from-emerald-500 to-emerald-900 p-[12px] text-white font-bold"
                {...register("oldruleDesc", { required: true })}
              />

              {errors.oldruleDesc && (
                <span className="ml-2 text-xs tracking-wide text-red-600">
                  Old Rule Description is required
                </span>
              )}

              <label className="flex flex-col " htmlFor="newruleDesc">
                <p className="mb-1 text-[2rem] font-bold leading-[1.375rem] text-green-950">
                  New Rule Description <sup className="text-white">*</sup>
                </p>
              </label>
              <input
                required
                type="text"
                id="newruleDesc"
                placeholder="Enter New Rule Description"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[calc(0.9*1000px)] h-[calc(0.15*600px)] rounded-[0.5rem] bg-gradient-to-r from-emerald-500 to-emerald-900 p-[12px] text-white font-bold"
                {...register("newruleDesc", { required: true })}
              />

              {errors.newruleDesc && (
                <span className="ml-2 text-xs tracking-wide text-red-600">
                  New Rule Description is required
                </span>
              )}

              <button
                type="submit"
                className=" bg-green-900 text-white font-bold p-5 rounded-md w-[calc(0.2*1000px)] mx-auto"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      ) : onClicked && matchRoute("/debug") ? (
        <DebugRuleForm operate={operate} oldRule={oldRule} />
      ) : onClicked && matchRoute("/test") ? (
        parametersList.length > 0 ? (
          <TestRuleForm
            operate={operate}
            oldRule={oldRule}
            parametersList={parametersList}
          />
        ) : (
          <DebugRuleForm operate={operate} oldRule={oldRule} />
        )
      ) : (
        <div className="flex flex-col gap-y-5 py-3 w-full mx-6">
          <div className="flex flex-row justify-between items-center gap-x-8">
            <Link to="/create">
              <button className="rounded-xl p-2 px-3 bg-gradient-to-tl from-rose-500 to-indigo-700 flex flex-row items-center space-x-3">
                <img src={plus} alt="plus" className="h-5 w-5" />
                <h1 className="hidden md:block text-white font-semibold text-[1.1rem]">
                  Create Rule
                </h1>
              </button>
            </Link>
            <div className="flex flex-row items-center justify-end">
              <input
                className={`h-[3rem] ${
                  active ? "md:w-[20rem] w-[15rem]" : "w-[1rem] mr-4"
                } outline outline-none bg-white border border-none rounded-[3rem] px-4 text-[1rem] transition-all duration-700 ease-in-out`}
                placeholder="Search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                onClick={onClickSearch}
                className="h-[3rem] absolute px-4 rounded-full bg-white"
              >
                🔍
              </button>
            </div>
          </div>
          <div className=" space-y-5">
            {rules.length > 0 ? (
              search.length > 0 ? (
                search.map((rule, key) => (
                  <div
                    key={key}
                    className="flex flex-col items-start px-5 gap-y-3 py-3 justify-center rounded-md bg-gradient-to-r from-teal-400 to-yellow-200 w-full shadow-md shadow-green-900 hover:cursor-pointer pr-4"
                    onClick={() => changeOldRuleOnClick(rule)}
                  >
                    <p className="flex gap-x-2 items-center font-semibold text-green-950">
                      <span className="flex items-center justify-start rounded-md bg-green-500 text-white p-1 pl-3 w-40">
                        Rule :
                      </span>{" "}
                      {rule.name}
                    </p>
                    <p className="flex gap-x-2 items-center font-semibold text-green-950">
                      <span className="flex items-center justify-start rounded-md bg-green-500 text-white p-1 pl-3 w-40">
                        Description :{" "}
                      </span>{" "}
                      {rule.description}
                    </p>
                  </div>
                ))
              ) : (
                rules.map((rule, key) => (
                  <div
                    key={key}
                    className="flex flex-col items-start px-5 gap-y-3 py-3 justify-center rounded-md bg-gradient-to-r from-teal-400 to-yellow-200 w-full shadow-md shadow-green-900 hover:cursor-pointer pr-4"
                    onClick={() => changeOldRuleOnClick(rule)}
                  >
                    <p className="flex gap-x-2 items-center font-semibold text-green-950">
                      <span className="flex items-center justify-start rounded-md bg-green-500 text-white p-1 pl-3 w-40">
                        Rule :
                      </span>{" "}
                      {rule.name}
                    </p>
                    <p className="flex gap-x-2 items-center font-semibold text-green-950">
                      <span className="flex items-center justify-start rounded-md bg-green-500 text-white p-1 pl-3 w-40">
                        Description :{" "}
                      </span>{" "}
                      {rule.description}
                    </p>
                  </div>
                ))
              )
            ) : (
              <div className="flex flex-col items-center justify-center rounded-md bg-gradient-to-r from-teal-400 to-yellow-200 p-12">
                <p className="font-bold text-green-950">
                  No Rules, Create Some Rules
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RulesList
