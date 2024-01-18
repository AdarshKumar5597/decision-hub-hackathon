import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import RuleBuilder from "../pages/RuleBuilder"
import { createStrategy } from "../services/operations/createRuleAPI"
import { useSelector } from "react-redux"
const RuleCreate = () => {
  const { isLoggedIn, token } = useSelector((state) => state.authReducer)

  const [strategyName, setStrategyName] = useState("")
  const [idArray, setIdArray] = useState([])
  const [names, setNames] = useState([])
  const [rules, setRules] = useState([])
  const [toggle, setToggle] = useState(false)
  if (isLoggedIn === false) {
    return <Navigate to="/auth/login" />
  }

  const handleButtonClick = async () => {
    // Simulating navigating to a different page and getting data
    const response = {
      name: "Rule1",
      id: 1,
    } // Adjust the URL as needed
    // const data = await response.json()

    // Assuming the response contains a 'name' and 'number' property
    const name = response.name

    // Add the number to the idArray
    setIdArray([...idArray, name])
    setToggle(!toggle)
    // Display the strategy name
  }


  async function submitHandler() {
    let result = await createStrategy(strategyName, rules);
  }


  console.log(names)
  console.log(rules)

  const removeEntry = (index) => {
    return () => {
      setNames(names.filter((_, i) => i !== index))
    }
  }
  return (
    <div className="text-white p-8">
      <h2 className="text-2xl font-semibold mb-4">Strategy Builder</h2>
      <label className="block mb-2">
        Strategy Name:
        <input
          className="border border-gray-300 p-2 w-1/2 mx-8 text-black"
          type="text"
          value={strategyName}
          onChange={(e) => setStrategyName(e.target.value)}
        />
      </label>
      {/* <Link
        to="/rulebuilder"
        className="text-blue-500 hover:underline cursor-pointer"
      > */}
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 hover:bg-blue-700 transition duration-300"
        onClick={handleButtonClick}
      >
        Add Rule
      </button>
      {toggle && (
        <div className="absolute top-0 left-0 w-screen h-screen">
          <RuleBuilder
            setToggle={setToggle}
            setRules={setRules}
            setNames={setNames}
          />
        </div>
      )}
      {/* </Link> */}
      <div className="h-[calc(0.6*100vh)] mt-4 text-white space-y-4 list-none mx-4 mr-8 overflow-y-scroll scrollbar-hide">
        {names.map((i, index) => (
          <div
            key={index}
            className="text-black w-full bg-blue-300/20 p-4 rounded-xl flex flex-row justify-between items-center"
          >
            Name: {i}
            <div
              className="bg-red-500 rounded-xl p-4 text-white"
              onClick={removeEntry(index)}
            >
              Remove
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button className="text-blue-500 p-4 bg-white cursor-pointer mt-8 rounded-xl" onClick={submitHandler}>
          submit
        </button>
      </div>
      {/* <div className="mt-4">
        <Link
          to="/differentPage"
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Go to Different Page
        </Link>
      </div> */}
    </div>
  )
}

export default RuleCreate
