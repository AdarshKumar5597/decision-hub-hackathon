import React from "react"
import DbFileRule from "./DbFileRule"
import DebugRule from "./DebugRule"
import ModifyRule from "./ModifyRule"
import RuleCreate from "./RuleCreate"
import TestRule from "./TestRule"
import RulesList from "../pages/RulesList"
import { useLocation } from "react-router-dom"

function Wrapper({ children }) {
  const location = useLocation()
  return (
    <div className="bg-[#111526] w-[90vw] md:h-[95vh] h-[76vh] my-5 rounded-xl mx-5">
      {location.pathname === "/" && <RulesList />}
      {location.pathname === "/create" && <RuleCreate />}
      {location.pathname === "/debug" && <DebugRule />}
      {location.pathname === "/modify" && <ModifyRule />}
      {location.pathname === "/test" && <TestRule />}
      {location.pathname === "/dbfilerule" && <DbFileRule />}
    </div>
  )
}

export default Wrapper
