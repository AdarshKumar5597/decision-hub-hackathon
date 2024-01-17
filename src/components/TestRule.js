import React from "react"
import RulesList from "../pages/RulesList"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
const TestRule = () => {
  const { isLoggedIn } = useSelector((state) => state.authReducer)
  if (isLoggedIn === false) {
    return <Navigate to="/auth/login" />
  }
  return (
    <div>
      <RulesList />
    </div>
  )
}

export default TestRule
