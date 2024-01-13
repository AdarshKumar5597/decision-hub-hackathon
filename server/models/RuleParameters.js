const mongoose = require("mongoose");

const ruleParametersSchema = new mongoose.Schema({
    rule: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Rules"
    },
    parameters: [{
        type:String
    }]
})

module.exports = mongoose.model('RuleParameters', ruleParametersSchema)