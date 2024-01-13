import React from 'react'
import CommonRuleForm from './common/CommonRuleForm'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RuleCreate = () => {
  const { isLoggedIn } = useSelector((state) => state.authReducer)

  if (isLoggedIn === false) {
    return <Navigate to="/auth/login" />
  }
  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
        <CommonRuleForm />
    </div>
  )
}

export default RuleCreate