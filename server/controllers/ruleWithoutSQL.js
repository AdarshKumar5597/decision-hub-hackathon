const { ObjectId } = require('mongodb');
const { getClient } = require('../config/database');
const RulesCollection = 'Rules';
const RuleParametersCollection = 'RuleParameters';

exports.createRuleWithoutSQL = async (req, res) => {
    let client;

    try {
        const ruleName = req.body.ruleName;
        const ruleDescription = req.body.ruleDescription;
        console.log(ruleDescription);

        if (!ruleDescription || !ruleName) {
            return res.status(400).json({
                success: false,
                message: 'Rule Name and Rule description cannot be empty.',
            });
        }

        const sqlQuery = "No SQL Query";

        client = getClient(); // Use the global connection

        const rulesCollection = client.db().collection(RulesCollection);
        const ruleParametersCollection = client.db().collection(RuleParametersCollection);

        const result = await rulesCollection.insertOne({
            name: ruleName,
            ruleDescription: ruleDescription,
            ruleQuery: sqlQuery,
        });

        const newRuleId = result.insertedId;

        await ruleParametersCollection.insertOne({
            rule: new ObjectId(newRuleId),
            parameters: [],
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
