const { getClient } = require('../config/database'); // Importing connect and close functions from database.js
const { ObjectId } = require('mongodb');
const RulesCollection = 'rules'; // Adjust this based on your MongoDB collection name

exports.getAllRules = async (req, res) => {
    let client;

    try {
        client = getClient(); // Use the global connection

        const rulesCollection = client.db().collection(RulesCollection);

        const allRules = await rulesCollection.find({ userId: req.userId }).toArray();

        res.status(200).json({
            success: true,
            message: allRules
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while fetching all rules - ${error}`
        });
    }
};

exports.getAllparameter = async (req, res) => {
    try {
        let client = getClient()

        const paramsCollection = client.db().collection('Params');

        const result = await paramsCollection.find({}).toArray()

        let newResult = []


        result.forEach((element) => {
            newResult.push(element.name)
        })


        return res.status(200).json({
            success: true,
            parameterList: newResult,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong While Fetching Parameters"
        })
    }
}


exports.getAllStrategyRules = async (req, res) => {
    let client;

    try {
        client = getClient(); // Use the global connection

        const strategyCollection = client.db().collection('StrategyCollection');

        const allRules = await strategyCollection.find({ _id: req.strategyId }).toArray();

        res.status(200).json({
            success: true,
            rulesList: allRules
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while fetching all rules - ${error}`
        });
    }
};

exports.getAllStrategy = async (req, res) => {
    let client;

    try {
        client = getClient(); // Use the global connection

        let strategyCollection = client.db().collection('StrategyCollection');

        let allStrategies = await strategyCollection.find({}).toArray();;

        res.status(200).json({
            success: true,
            strategies: allStrategies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while fetching all rules - ${error}`
        });
    }
};