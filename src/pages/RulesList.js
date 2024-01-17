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
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { SetFormToggle } from "../slices/createRuleSlice"
import plus from "./Assets/plus-solid.svg"
import debug from "./Assets/debugging.png"
import modify from "./Assets/tool.png"
import test from "./Assets/approval.png"

// import { Rule } from "postcss"
// import { plus, debug, test, modify } from "./Assets"

const RulesList = () => {
  const { token, isLoggedIn } = useSelector((state) => state.authReducer)
  //   const { formToggle } = useSelector((state) => state.createRule)
  const dispatch = useDispatch()

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
  const [modifyToggle, setModifyToggle] = useState(false)
  const [debugToggle, setDebugToggle] = useState(false)
  const [testToggle, setTestToggle] = useState(false)

  useEffect(() => {
    token ? getAllRulesFunc() : console.log("use effect triggered")
  }, [])

  if (isLoggedIn === false) {
    return <Navigate to="/auth/login" />
  }

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const operate = async (oldRuleDesc, newRuleDesc) => {
    console.log(onClicked)
    if (onClicked && modifyToggle) {
      let oldRuleDescription = oldRuleDesc
      let newRuleDescription = newRuleDesc
      let result = await modifyRule(
        oldRuleDescription,
        newRuleDescription,
        token
      )
      return result
    }
    if (onClicked && debugToggle) {
      let oldRuleDescription = oldRuleDesc
      let result = await debugRule(oldRuleDescription, token)
      return result
    }
    if (onClicked && testToggle) {
      console.log(token)
      let result = await testRule(oldRule._id, newRuleDesc, token)
      return result
    }
  }

  const changeOldRuleOnClick = async (rule) => {
    setOnClicked(!onClicked)
    setOldRule(rule)
    console.log(oldRule)
    if (testToggle) {
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
  //   const handleModify = (rule) => {
  //     setOldRule(rule)
  //     console.log(rule)
  //     console.log(oldRule)
  //     changeOldRuleOnClick(rule)
  //     setModifyToggle(!modifyToggle)
  //   }
  return (
    <div className="mx-auto w-full my-5 flex h-[calc(0.95 * 100vh)] items-center justify-center">
      <div className={`flex flex-col gap-y-5 py-3 w-full px-6`}>
        <div className="flex flex-row justify-between items-center gap-x-8">
          <Link to={"/create"}>
            {/* formToggle ? "/create" : "/" */}
            <button
              className="rounded-xl p-2 px-3 bg-gradient-to-tl from-rose-500 to-indigo-700 flex flex-row items-center space-x-3"
              onClick={() => {
                dispatch(SetFormToggle())
              }}
            >
              <img src={plus} alt="plus" className="h-5 w-5" />
              <h1 className="hidden md:block text-white font-semibold text-[1.1rem]">
                Create Rule
              </h1>
            </button>
          </Link>
          <div className="relative flex flex-row items-center justify-end">
            <input
              className={`h-[3rem] absolute ${
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
        <div
          className="space-y-5 overflow-y-scroll scrollbar-hide"
          // ${!formToggle && "h-[25vh]"}
        >
          {rules.length > 0 ? (
            search.length > 0 ? (
              search.map((rule, key) => (
                <div
                  key={key}
                  className="z-0 relative flex flex-col items-start px-3 gap-y-3 py-3 justify-center rounded-md bg-gradient-to-r from-[#4e54c8] to-[#8f94fb] w-full hover:cursor-pointer"
                  onClick={() => changeOldRuleOnClick(rule)}
                >
                  <p className="flex md:flex-row flex-col gap-x-2 items-center font-semibold flex-wrap w-full text-center">
                    <span className="flex items-center justify-center rounded-md bg-[#222] p-1 px-3 md:w-40 w-full text-white">
                      Rule
                    </span>{" "}
                    <p>{rule.name}</p>
                  </p>
                  <p className="flex md:flex-row flex-col gap-x-2 items-center font-semibold wrap-text w-full text-center">
                    <span className="flex items-center justify-center rounded-md bg-[#222] p-1 px-3 md:w-40 w-full text-white">
                      Description{" "}
                    </span>{" "}
                    <p>{rule.description}</p>
                  </p>
                  <div class="w-full h-full absolute inset-0 flex flex-row items-center justify-start gap-x-2 opacity-0 hover:opacity-100 hover:profile md:backdrop-blur-none backdrop-blur-xl rounded-md transition-all duration-700">
                    <div className="w-full h-full flex flex-row items-center md:justify-end justify-center gap-2 md:mr-5">
                      <a href="/test">
                        <div className="rounded-full bg-white w-[34.62px] h-[34.62px] flex justify-center items-center">
                          <img
                            src={test}
                            alt="test"
                            className="w-[17.31px] h-[17.31px]"
                          />
                        </div>
                      </a>
                      <div
                        className="rounded-full bg-white w-[34.62px] h-[34.62px] flex justify-center items-center"
                        onClick={() => setModifyToggle(!modifyToggle)}
                      >
                        <img
                          src={modify}
                          alt="modify"
                          className=" w-[17.31px] h-[17.31px]"
                        />
                      </div>

                      <a href="/debug">
                        <div className="rounded-full bg-white w-[34.62px] h-[34.62px] flex justify-center items-center">
                          <img
                            src={debug}
                            alt="debug"
                            className="w-[17.31px] h-[17.31px]"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              rules.map((rule, key) => (
                <div
                  key={key}
                  className="z-0 relative flex flex-col items-start px-3 gap-y-3 py-3 justify-center rounded-md bg-gradient-to-r from-[#4e54c8] to-[#8f94fb] w-full hover:cursor-pointer"
                  onClick={() => changeOldRuleOnClick(rule)}
                >
                  <p className="flex md:flex-row flex-col gap-x-2 items-center font-semibold flex-wrap w-full text-center">
                    <span className="flex items-center justify-center rounded-md bg-[#222] p-1 px-3 md:w-40 w-full text-white">
                      Rule
                    </span>{" "}
                    <p>{rule.name}</p>
                  </p>
                  <p className="flex md:flex-row flex-col gap-x-2 items-center font-semibold wrap-text w-full text-center">
                    <span className="flex items-center justify-center rounded-md bg-[#222] p-1 px-3 md:w-40 w-full text-white">
                      Description{" "}
                    </span>{" "}
                    <p>{rule.description}</p>
                  </p>
                  <div class="w-full h-full absolute inset-0 flex flex-row items-center justify-start gap-x-2 opacity-0 hover:opacity-100 hover:profile md:backdrop-blur-none backdrop-blur-xl rounded-md transition-all duration-700">
                    <div className="w-full h-full flex flex-row items-center md:justify-end justify-center gap-2 md:mr-5">
                      <div
                        className="rounded-full bg-white w-[34.62px] h-[34.62px] flex justify-center items-center"
                        onClick={() => setTestToggle(!testToggle)}
                      >
                        <img
                          src={test}
                          alt="test"
                          className="w-[17.31px] h-[17.31px]"
                        />
                      </div>
                      <div
                        className="rounded-full bg-white w-[34.62px] h-[34.62px] flex justify-center items-center"
                        onClick={() => setModifyToggle(!modifyToggle)}
                      >
                        <img
                          src={modify}
                          alt="modify"
                          className=" w-[17.31px] h-[17.31px]"
                        />
                      </div>

                      <div
                        className="rounded-full bg-white w-[34.62px] h-[34.62px] flex justify-center items-center"
                        onClick={() => setDebugToggle(!debugToggle)}
                      >
                        <img
                          src={debug}
                          alt="debug"
                          className="w-[17.31px] h-[17.31px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="flex flex-col items-center justify-center rounded-md bg-gradient-to-r from-[#4e54c8] to-[#8f94fb] p-12">
              <p className="font-bold text-white text-center">
                So empty! Add some rules by creating them above
              </p>
            </div>
          )}
        </div>
        {modifyToggle && (
          <div
            className="absolute profile top-0 left-0 h-full w-full backdrop-blur-xl flex flex-col items-center justify-center"
            onClick={() => setModifyToggle(!modifyToggle)}
          >
            <div>
              <form
                className="md:h-[30rem] md:w-[40rem] md:mx-0 mx-8 flex flex-col gap-y-4 items-center justify-center py-10 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl outline outline-4 outline-offset-8 outline-white"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col w-full gap-y-10 p-6">
                  <div className="space-y-4">
                    <p className="w-full text-center mb-1 text-[2rem] font-bold leading-[1.375rem] text-white">
                      Old Rule{" "}
                    </p>
                    <input
                      required
                      type="text"
                      id="oldruleDesc"
                      value={oldRule.description}
                      placeholder="Enter Old Rule Description"
                      style={{
                        boxShadow:
                          "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-slate-50 p-[12px] text-black font-bold"
                      {...register("oldruleDesc", { required: true })}
                    />
                  </div>

                  {errors.oldruleDesc && (
                    <span className="ml-2 text-xs tracking-wide text-red-600">
                      Old Rule Description is required
                    </span>
                  )}
                  <div className="space-y-4">
                    <p className="w-full text-center mb-1 text-[2rem] font-bold leading-[1.375rem] text-white">
                      New Rule
                    </p>
                    <input
                      required
                      type="text"
                      id="newruleDesc"
                      placeholder="Enter New Rule Description"
                      style={{
                        boxShadow:
                          "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-slate-50 p-[12px] text-white font-bold"
                      {...register("newruleDesc", { required: true })}
                    />
                  </div>
                  <button
                    type="submit"
                    className=" bg-gradient-to-r from-violet-200 to-pink-200 text-black font-bold p-5 rounded-md w-[calc(0.2*1000px)] mx-auto uppercase hover:scale-105 transition-all duration-200 ease-in-out"
                  >
                    submit
                  </button>
                  {errors.newruleDesc && (
                    <span className="ml-2 text-xs tracking-wide text-red-600">
                      New Rule Description is required
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
        {testToggle && (
          <div
            className="absolute profile top-0 left-0 h-full w-full backdrop-blur-xl flex flex-col items-center justify-center"
            onClick={() => setTestToggle(!testToggle)}
          >
            {parametersList.length > 0 ? (
              <TestRuleForm
                operate={operate}
                oldRule={oldRule}
                parametersList={parametersList}
              />
            ) : (
              <DebugRuleForm operate={operate} oldRule={oldRule} />
            )}
          </div>
        )}
        {debugToggle && (
          <div
            className="absolute profile top-0 left-0 h-full w-full backdrop-blur-xl flex flex-col items-center justify-center"
            onClick={() => setDebugToggle(!debugToggle)}
          >
            <DebugRuleForm operate={operate} oldRule={oldRule} />
          </div>
        )}
      </div>
    </div>
  )
}

export default RulesList
