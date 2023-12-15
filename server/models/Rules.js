const mongoose = require("mongoose");

const rulesSchema = new mongoose.Schema({
    name: {
        type:String
    },
    correspondingRule: {
        type:String
    }
})

module.exports = mongoose.model('Rules', rulesSchema)