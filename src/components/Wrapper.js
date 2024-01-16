import React from "react"
import DbFileRule from "./DbFileRule"
import DebugRule from "./DebugRule"
import ModifyRule from "./ModifyRule"
import RuleCreate from "./RuleCreate"
import TestRule from "./TestRule"
import RulesList from "../pages/RulesList"
import { Navigate, useLocation } from "react-router-dom"
import Chatbot from "../pages/Chatbot"
import { useSelector } from "react-redux"

function Wrapper({ children }) {

  const { isLoggedIn } = useSelector((state) => state.authReducer)
  const location = useLocation()

  if (isLoggedIn === false) {
    return <Navigate to="/auth/login" />
  }

  return (
    <div className="bg-[#111526] w-[90vw] md:h-[95vh] h-[76vh] my-5 rounded-xl mx-5">
      {location.pathname === "/" && <RulesList />}
      {location.pathname === "/create" && <RuleCreate />}
      {location.pathname === "/debug" && <DebugRule />}
      {location.pathname === "/modify" && <ModifyRule />}
      {location.pathname === "/test" && <TestRule />}
      {location.pathname === "/dbfilerule" && <DbFileRule />}
      {location.pathname === "/chatbot" && <Chatbot />}
    </div>
  )
}

export default Wrapper
