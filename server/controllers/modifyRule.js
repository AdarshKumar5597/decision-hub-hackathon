const { getClient } = require('../config/database'); // Importing connect and close functions from database.js
const { OpenAI } = require('openai');
const RulesCollection = 'rules'; // Adjust this based on your MongoDB collection name
const RuleParametersCollection = 'ruleParameters'; // Adjust this based on your MongoDB collection name

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API
});

exports.modifyRule = async (req, res) => {
    let client;

    try {
        const oldRuleDescription = req.body.oldRuleDescription;
        const newRuleDescription = req.body.newRuleDescription;
        console.log(oldRuleDescription);
        console.log(newRuleDescription);

        if (oldRuleDescription === undefined) {
            return res.status(500).json({
                success: false,
                message: "Old Rule description cannot be empty."
            });
        }

        if (newRuleDescription === undefined) {
            return res.status(500).json({
                success: false,
                message: "New Rule description cannot be empty."
            });
        }

        const prompt = `description - ${newRuleDescription}
        give the response in following json format without any explanation
        if a parameter is required then return the response as 
        {
        'status':'REQUIRED',
        'message':'message',
        'sqlQuery':'your query',
        'params':'[name of parameters]'
        }
        else return 
        {
        'status':'OK',
        'message':'message',
        'sqlQuery':'your query',
        'params':'[]'
        }
        generate any one kind of response`;

        console.log('prompt:', prompt);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'user',
                    content: `${prompt}`
                }
            ],
            max_tokens: 100
        });

        console.log('\nresponse:', response.choices[0].message.content);

        const jsonResponse = JSON.parse(response.choices[0].message.content);

        const newSqlQuery = jsonResponse.sqlQuery;

        client = getClient(); // Use the global connection

        const rulesCollection = client.db().collection(RulesCollection);
        const ruleParametersCollection = client.db().collection(RuleParametersCollection);

        const getRule = await rulesCollection.findOneAndUpdate(
            {
                description: oldRuleDescription
            },
            {
                $set: {
                    description: newRuleDescription,
                    correspondingRule: newSqlQuery
                }
            },
            {
                returnDocument: 'after'
            }
        );

        const getRuleParameters = await ruleParametersCollection.findOneAndUpdate(
            {
                rule: getRule._id
            },
            {
                $set: {
                    rule: getRule._id,
                    parameters: jsonResponse.params || []
                }
            },
            {
                returnDocument: 'after'
            }
        );

        res.status(200).json({
            success: true,
            message: getRule
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while modifying rule - ${error}`
        });
    }
};


exports.modifyStrategyRule = async (req, res) => {
    let client;

    try {
        client = getClient();

        const strategyCollection = client.db().collection('StrategyCollection');

        const strategy = strategyCollection.find({_id: req.body.id});

        const rules = strategy.rules;

        rules.forEach(element => {
            if (element[0].uniqueRuleId === req.body.rule.uniqueRuleId) {
                element = [...req.body.rule]
            }
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while modifying rule - ${error}`
        });
    }
};