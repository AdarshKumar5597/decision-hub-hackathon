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

exports.createRuleCondition = async (req, res) => {
    let client;

    try {
        const { rule } = req.body

        if (!rule) {
            return res.status(400).json({
                success: false,
                message: 'Rule Cannot Be Empty.',
            });
        }

        const prompt = `Given Rule Format = ${rule}
        There exists a parent rule object whose id is 0, And several conditions as objects whose parentId = id of rule to which it belongs.
        Parent rule object can also have nested rule whose array length is 0 and parentId = id of rule to which it belongs, which can further have conditions in the similar manner.
        Generate only JS conditional statement based on given rule format.`;

        console.log("Rule Prompt: ", prompt);

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

            // let duplicate = paramsCollection.findOne({ name: element.name })
            // if (duplicate) {
            //     return res.status(400).json({
            //         success: false,
            //         message: `${element.name} already present.`
            //     })
            // }

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


exports.createStrategy = async (req, res) => {
    let client;

    try {
        const strategyName = req.body.strategyName;
        const strategyRules = req.body.strategyRules;

        if (!strategyName || strategyRules.length < 1) {
            return res.status(400).json({
                success: false,
                message: 'Strategy Name and Strategy Rules cannot be empty.',
            });
        }

        client = getClient();

        const strategyCollection = client.db().collection('StrategyCollection');

        const result = await strategyCollection.insertOne({
            name: strategyName,
            rules: strategyRules
        });

        res.status(200).json({
            success: true,
            message: 'Strategy Created Successfully',
            strategy: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while creating Strategy - ${error}`,
        });
    } finally {
        // Do not close the connection here; it will be managed globally
    }
};