const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_ATLAS_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let isConnected = false;

exports.connect = async () => {
    try {
        if (!isConnected) {
            await client.connect();
            isConnected = true;
            console.log('Connected to MongoDB Atlas');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1);
    }
};

exports.close = async () => {
    if (isConnected) {
        await client.close();
        isConnected = false;
        console.log('MongoDB Atlas connection closed.');
    }
};

exports.getClient = () => client;
