const mongoose = require("mongoose");


const ruleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A Rule Name is required"],
    },
    ruleDescription: {
        type: String,
        required: [true, "A Rule Description is required"],
    },
    ruleQuery: {
        type: String,
    }
});

module.exports = mongoose.model('Rules', ruleSchema)