const { default: mongoose } = require('mongoose');
const Rules = require('../models/Rules')


exports.getAllRules = async (req, res) => {
    try {
        const allRules = await Rules.find({})
        res.status(200).json({
            success: true,
            message: allRules
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while modifying rule - ${error}`
        })
    }
}
