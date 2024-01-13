import { combineReducers } from "@reduxjs/toolkit";

import createRuleReducer from '../slices/createRuleSlice'
import authReducer from '../slices/auth'

const rootReducer = combineReducers({
    createRule: createRuleReducer,
    authReducer: authReducer,
})

export default rootReducer