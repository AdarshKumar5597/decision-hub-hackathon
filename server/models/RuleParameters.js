const { ObjectId } = require('mongodb');
const { connect, close } = require('../config/database'); // Importing connect and close functions from database.js

const ruleParametersCollectionName = 'ruleParameters';

exports.createRuleParameters = async (ruleId, parameters) => {
    let client;

    try {
        client = await connect(); // Connect to the MongoDB database

        const database = client.db();
        const ruleParametersCollection = database.collection(ruleParametersCollectionName);

        const result = await ruleParametersCollection.insertOne({
            rule: new ObjectId(ruleId),
            parameters: parameters.map(param => String(param))
        });

        console.log(`Rule Parameters created successfully: ${result.insertedId}`);
        return result.insertedId;
    } catch (error) {
        console.error(`Error creating Rule Parameters: ${error}`);
        throw error;
    } finally {
        if (client) {
            await close(); // Close the MongoDB connection
        }
    }
};
