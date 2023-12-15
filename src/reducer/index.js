import { combineReducers } from "@reduxjs/toolkit";

import createRuleReducer from '../slices/createRuleSlice'

const rootReducer = combineReducers({
    createRule: createRuleReducer,
})

export default rootReducer