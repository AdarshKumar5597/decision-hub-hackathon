// const BASE_URL = "https://express-backend-cdlo.onrender.com/api/v1/rules"
// const AUTH_URL = "https://express-backend-cdlo.onrender.com/api/v1/auth"

const BASE_URL = "http://localhost:5000/api/v1/rules"
const AUTH_URL = "http://localhost:5000/api/v1/auth"

//ENDPOINTS
export const endpoints = {
  CREATE_RULE_API: BASE_URL + "/createRule",
  MODIFY_RULE_API: BASE_URL + "/modifyRule",
  DEBUG_RULE_API: BASE_URL + "/debugRule",
  RULE_HAS_PARAMETERS_API: BASE_URL + /ruleHasParameters/,
  GET_ALL_RULES_API: BASE_URL + "/getAllRules",
  TEST_RULE_API: BASE_URL + "/testRule/",
  UPLOAD_DBFILE_API: BASE_URL + "/uploaddbfile",
  DBFILE_QUERY_API: BASE_URL + "/dbfilequery",
  CHATBOT_RULES_API: BASE_URL + "/chatbotRules",
  ADD_PARAMETERS_API: BASE_URL + "/addparameters",
  GET_ALL_PARAMETERS: BASE_URL + "/getallparams",
  ADD_STRATEGY_API: BASE_URL + "/add-strategy",
  GET_ALL_RULES: BASE_URL + "/fetch-rules",
  GET_ALL_STRATEGIES: BASE_URL + "/fetch-strategies",
}

export const authEndpoints = {
  LOGIN_API: AUTH_URL + "/login",
  REGISTER_API: AUTH_URL + "/register",
}
