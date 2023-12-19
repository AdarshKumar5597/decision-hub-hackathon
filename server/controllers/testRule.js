const { default: mongoose } = require('mongoose');
const Rules = require('../models/Rules')
const RuleParameters = require('../models/RuleParameters')
const { OpenAI } = require('openai')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API
});

exports.ruleHasParameters = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const ruleParameters = await RuleParameters.find({ rule: id })
        if (ruleParameters[0].parameters.length) {
            return res.status(200).json({
                success: true,
                parameters: ruleParameters[0].parameters
            })
        }
        return res.status(200).json({
            success: false,
            parameters: null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong while fetching rule conditions - ${error}`
        })
    }
}

exports.testRule = async (req, res) => {
    try {
        const { id } = req.params;
        const rule = await Rules.findById({ _id: id });
        console.log('rule:', rule)
        const ruleParameters = await RuleParameters.findOne({ rule: rule._id });
        console.log('ruleParameters:', ruleParameters)

        // Extract parameter names from ruleParameters
        const parameterNames = (ruleParameters.parameters);
        console.log('parameternames:', parameterNames)

        // Fetch parameter values from request.body based on parameter names
        const parameterValues = {}

        for (const paramName of parameterNames) {
            if (req.body.hasOwnProperty(paramName)) {
                parameterValues[paramName] = req.body[paramName];
            } else {
                // Handle the case where a parameter is missing in req.body
                return res.status(400).json({ error: `${paramName} is missing in the request body` });
            }
        }

        const parameters = JSON.stringify(parameterValues)
        console.log('parameters:', parameters)

        const prompt = `description: ${rule.name}, parameters: ${parameters}
        generate just response of the above description in json format without any explanation
        {
        'status':'OK',
        'message':'message',
        'sqlQuery':'your query',
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
        console.log(req.body)
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
        console.log('Error in sample route', error)
    }
}
