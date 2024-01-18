import { combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import createRuleReducer from "../slices/createRuleSlice"
import authReducer from "../slices/auth"

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-persist",
  // whitelist: [],
  // blacklist: [],
}

const rootReducer = combineReducers({
  createRule: createRuleReducer,
  authReducer: authReducer,
})

export { rootPersistConfig, rootReducer }
