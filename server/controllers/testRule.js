const { ObjectId } = require('mongodb');
const { getClient } = require('../config/database'); // Importing connect and close functions from database.js
const { OpenAI } = require('openai');
const RulesCollection = 'rules'; // Adjust this based on your MongoDB collection name
const RuleParametersCollection = 'ruleParameters'; // Adjust this based on your MongoDB collection name

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API
});

exports.ruleHasParameters = async (req, res) => {
    let client;

    try {
        const { id } = req.params;
        console.log(id);

        client = getClient(); // Use the global connection

        const ruleParametersCollection = client.db().collection(RuleParametersCollection);

        const ruleParameters = await ruleParametersCollection.findOne({ rule: new ObjectId(id) });

        if (ruleParameters && ruleParameters.parameters && ruleParameters.parameters.length) {
            return res.status(200).json({
                success: true,
                parameters: ruleParameters.parameters
            });
        }

        return res.status(200).json({
            success: false,
            parameters: null
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong while fetching rule conditions - ${error}`
        });
    }
};

exports.testRule = async (req, res) => {
    let client;

    try {
        const { id } = req.params;

        client = getClient(); // Use the global connection

        const rulesCollection = client.db().collection(RulesCollection);
        const ruleParametersCollection = client.db().collection(RuleParametersCollection);

        const rule = await rulesCollection.findOne({ _id: new ObjectId(id) });

        console.log('rule:', rule);

        const ruleParameters = await ruleParametersCollection.findOne({ rule: rule._id });

        console.log('ruleParameters:', ruleParameters);

        // Extract parameter names from ruleParameters
        const parameterNames = ruleParameters.parameters || [];
        console.log('parameternames:', parameterNames);

        // Fetch parameter values from request.body based on parameter names
        const parameterValues = {};

        for (const paramName of parameterNames) {
            if (req.body.hasOwnProperty(paramName)) {
                parameterValues[paramName] = req.body[paramName];
            } else {
                // Handle the case where a parameter is missing in req.body
                return res.status(400).json({ error: `${paramName} is missing in the request body` });
            }
        }

        const parameters = JSON.stringify(parameterValues);
        console.log('parameters:', parameters);

        const prompt = `description: ${rule.description}, parameters: ${parameters}
        generate just response of the above description in given json format without any explanation
        {
        'status':'OK',
        'message':'message',
        'sqlQuery':'Generate the SQL query of the description based on parameters if it is mentioned otherwise just mention sql query here',
        }`;

        console.log('prompt:', prompt);
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'user',
                    content: `${prompt}`,
                },
            ],
            max_tokens: 100,
        });

        console.log('\nresponse:', response.choices[0].message.content);

        const jsonResponse = JSON.parse(response.choices[0].message.content);

        const sqlQuery = jsonResponse.sqlQuery;

        res.status(200).json({
            success: true,
            message: sqlQuery,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while testing rule - ${error}`,
        });
    }
};

exports.sampleRoute = (req, res) => {
    try {
        console.log(req.body);
        const parameterNames = ['starting_letter', 'min_salary', 'max_salary'];
        const extractedValues = {};

        for (const paramName of parameterNames) {
            if (req.body.hasOwnProperty(paramName)) {
                extractedValues[paramName] = req.body[paramName];
            } else {
                // Handle the case where a parameter is missing in req.body
                return res.status(400).json({ error: `${paramName} is missing in the request body` });
            }
        }

        // Now `extractedValues` contains the values from req.body for the specified parameters
        console.log(extractedValues);

        // Your logic using extractedValues goes here...

        res.json({ success: true });

    } catch (error) {
        console.log('Error in sample route', error);
        res.status(500).json({
            success: false,
            message: `Something went wrong in sample route - ${error}`,
        });
    }
};

exports.test = async (req, res) => {
    try {
        const { formdata, rules } = req.body;

        if (!formdata) {
            return res.status(400).json({
                success: false,
                message: "Formdata cannot be empty",
            });
        }

        console.log("Formdata: ",formdata)
        console.log("Rules: ", rules)

        const prompt = `formdata: ${formdata}, rules: ${rules}
        In Rules There exists a parent rule object whose id is 0, And several conditions as objects whose parentId = id of rule to which it belongs.
        Parent rule object can also have nested rule whose array length is 0 and parentId = id of rule to which it belongs, which can further have conditions in the similar manner.
        Evaluate the Rules and formdata and tell which rules are wrong and correct and where it went wrong. Return only the output in the format shown below
        {Rule1: true,
        Rule2: false}
        and also show the reason behind false and true and also debug the rule`;

        console.log('prompt:', prompt);
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'user',
                    content: `${prompt}`,
                },
            ],
            max_tokens: 1000,
        });

        console.log('\nresponse:', response.choices[0].message.content);


        res.status(200).json({
            success: true,
            message: response.choices[0].message.content,
        });

    } catch (error) {
        
    }
}
