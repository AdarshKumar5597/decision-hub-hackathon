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
