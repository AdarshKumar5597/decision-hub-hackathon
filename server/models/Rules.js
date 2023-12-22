const { ObjectId } = require('mongodb');
const { connect, close } = require('../config/database'); // Importing connect and close functions from database.js

const rulesCollectionName = 'rules';

exports.createRule = async (name, correspondingRule) => {
    let client;

    try {
        client = await connect(); // Connect to the MongoDB database

        const database = client.db();
        const rulesCollection = database.collection(rulesCollectionName);

        const result = await rulesCollection.insertOne({
            name,
            correspondingRule
        });

        console.log(`Rule created successfully: ${result.insertedId}`);
        return result.insertedId;
    } catch (error) {
        console.error(`Error creating Rule: ${error}`);
        throw error;
    } finally {
        if (client) {
            await close(); // Close the MongoDB connection
        }
    }
};
