const express = require("express")
const router = express.Router()

const {createRule} = require('../controllers/createRule')
const {debugRule} = require('../controllers/debugRule')
const {modifyRule} = require('../controllers/modifyRule')
const {getAllRules} = require('../controllers/viewAllRules')
const {ruleHasParameters, testRule, sampleRoute} = require('../controllers/testRule')

router.post('/createRule', createRule)
router.post('/debugRule', debugRule)
router.post('/modifyRule', modifyRule)
router.get('/ruleHasParameters/:id', ruleHasParameters)
router.get('/getAllRules', getAllRules)
router.post('/testRule/:id', testRule)
router.post('/sampleRoute', sampleRoute)

module.exports = router