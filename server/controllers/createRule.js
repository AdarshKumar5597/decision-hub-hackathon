const { ObjectId } = require('mongodb');
const { getClient } = require('../config/database');
const { OpenAI } = require('openai');
const RulesCollection = 'rules';
const RuleParametersCollection = 'ruleParameters';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API
});

exports.createRule = async (req, res) => {
    let client;

    try {
        const ruleName = req.body.ruleName;
        const ruleDescription = req.body.ruleDescription;

        if (!ruleDescription || !ruleName) {
            return res.status(400).json({
                success: false,
                message: 'Rule Name and Rule description cannot be empty.',
            });
        }

        const prompt = `${ruleDescription}
        give the response in json format without any explanation
        if a parameter is required then return the response as 
        {
        status:'REQUIRED',
        message:'message',
        sqlQuery:'your query',
        params:[name of parameters]
        }
        else return 
        {
        status:'OK',
        message:'message',
        sqlQuery:'your query',
        params:[]
        }
        generate any one kind of response`;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `${prompt}`,
                },
            ],
            max_tokens: 100,
        });

        const jsonResponse = JSON.parse(response.choices[0].message.content);

        const sqlQuery = jsonResponse.sqlQuery;

        client = getClient(); // Use the global connection

        const rulesCollection = client.db().collection(RulesCollection);
        const ruleParametersCollection = client.db().collection(RuleParametersCollection);

        const result = await rulesCollection.insertOne({
            name: ruleName,
            description: ruleDescription,
            correspondingRule: sqlQuery,
            userId: req.userId
        });

        console.log(result)

        const newRuleId = result.insertedId;

        await ruleParametersCollection.insertOne({
            rule: new ObjectId(newRuleId),
            parameters: jsonResponse.params || [],
        });

        res.status(200).json({
            success: true,
            message: response.choices[0].message.content,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while creating rule - ${error}`,
        });
    } finally {
        // Do not close the connection here; it will be managed globally
    }
};

exports.createSqlQuery = async (req, res) => {
    let client;

    try {
        const { rule, tableName } = req.body

        if (!rule) {
            return res.status(400).json({
                success: false,
                message: 'Rule Cannot Be Empty.',
            });
        }

        const prompt = `Given Rule Format = ${rule} and table name: ${tableName}
        Where each condition has a parentId specifying which rule it belongs and an operator which specifies relation between field and value.
        Rules Can also have nested rule whose rules array length is 0.
        Generate a sql query based on above rule.
        Generate only SQL query.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `${prompt}`,
                },
            ],
            max_tokens: 1000,
        });


        client = getClient(); // Use the global connection


        res.status(200).json({
            success: true,
            message: response.choices[0].message.content,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while creating rule - ${error}`,
        });
    } finally {
        // Do not close the connection here; it will be managed globally
    }
};

exports.addToParameterList = async (req, res) => {
    try {
        let client;

        const { paramsArray } = req.body;

        client = getClient();
        const paramsCollection = client.db().collection('Params');
        console.log(paramsCollection)
        if (paramsArray.length < 1) {
            return res.status(400).json({
                success: false,
                message: "Parameters cannot be empty",
            })
        }

        console.log("Parameters Array: ", paramsArray.parameters)

        await paramsArray.parameters.forEach(element => {

            let duplicate = paramsCollection.findOne({ name: element.name })
            if (duplicate) {
                return res.status(400).json({
                    success: false,
                    message: `${element.name} already present.`
                })
            }

            paramsCollection.insertOne({
                name: element.name
            })
        });

        return res.status(200).json({
            success: true,
            message: "Parameter added successfully."
        })


    } catch (error) {
        console.log("Error: ", error);
    }
}