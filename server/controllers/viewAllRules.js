const { getClient } = require('../config/database'); // Importing connect and close functions from database.js
const { ObjectId } = require('mongodb');
const RulesCollection = 'rules'; // Adjust this based on your MongoDB collection name

exports.getAllRules = async (req, res) => {
    let client;

    try {
        client = getClient(); // Use the global connection

        const rulesCollection = client.db().collection(RulesCollection);

        const allRules = await rulesCollection.find({}).toArray();

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
