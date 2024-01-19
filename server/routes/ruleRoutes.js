const express = require("express")
const router = express.Router()

const {createRule, createRuleCondition, addToParameterList, createStrategy} = require('../controllers/createRule')
const {debugRule} = require('../controllers/debugRule')
const {modifyRule} = require('../controllers/modifyRule')
const {getAllRules, getAllparameter, getAllStrategyRules, getAllStrategy} = require('../controllers/viewAllRules')
const {ruleHasParameters, testRule, sampleRoute, test} = require('../controllers/testRule')
const {dbFileQuery} = require('../controllers/DbFileQuery')
const {databaseFileUpload} = require('../controllers/FileUpload')
const {chatbotCreateRule, fetchAllRulesForChatbot, chatbotCompletions} = require('../controllers/chatbotController')
const {protect} = require("../controllers/auth")

router.post('/createRule', protect, createRule)
router.post('/createChatbotRule', protect, chatbotCreateRule)
router.get('/chatbotRules', protect, fetchAllRulesForChatbot)
router.post('/debugRule', protect, debugRule)
router.post('/modifyRule', protect, modifyRule)
router.get('/ruleHasParameters/:id', protect, ruleHasParameters)
router.get('/getAllRules', protect, getAllRules)
router.post('/testRule', test)
router.post('/sampleRoute', sampleRoute)
router.post('/dbfilequery', dbFileQuery)
router.post('/uploaddbfile', databaseFileUpload)
router.post("/completions", chatbotCompletions)
router.post("/addparameters", addToParameterList)
router.get("/getallparams", getAllparameter)
router.post("/generate-condition", createRuleCondition)
router.post("/add-strategy", createStrategy)
router.get("/fetch-rules", getAllStrategyRules)
router.get("/fetch-strategies", getAllStrategy)

module.exports = router