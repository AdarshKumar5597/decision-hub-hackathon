const BASE_URL = "https://express-backend-cdlo.onrender.com/api/v1/rules"
const AUTH_URL = "https://express-backend-cdlo.onrender.com/api/v1/auth"

//ENDPOINTS
export const endpoints = {
    CREATE_RULE_API : BASE_URL + "/createRule",
    MODIFY_RULE_API : BASE_URL + "/modifyRule",
    DEBUG_RULE_API : BASE_URL + "/debugRule",
    RULE_HAS_PARAMETERS_API : BASE_URL + `/ruleHasParameters/`,
    GET_ALL_RULES_API : BASE_URL + "/getAllRules",
    TEST_RULE_API : BASE_URL + "/testRule/",
    UPLOAD_DBFILE_API : BASE_URL + "/uploaddbfile",
    DBFILE_QUERY_API : BASE_URL + "/dbfilequery",
}

export const authEndpoints = {
    LOGIN_API : AUTH_URL + "/login",
    REGISTER_API : AUTH_URL + "/register",
}