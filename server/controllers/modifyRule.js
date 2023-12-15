const { default: mongoose } = require('mongoose');
const Rules = require('../models/Rules')
const { OpenAI } = require('openai');
const RuleParameters = require('../models/RuleParameters');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API
});


exports.modifyRule = async (req, res) => {
    try {
        const oldRuleDescription = req.body.oldRuleDescription
        const newRuleDescription = req.body.newRuleDescription
        console.log(oldRuleDescription)
        console.log(newRuleDescription)

        if (oldRuleDescription === undefined) {
            return res.status(500).json({
                success: false,
                message: "Old Rule description cannot be empty."
            })
        }

        if (newRuleDescription === undefined) {
            return res.status(500).json({
                success: false,
                message: "New Rule description cannot be empty."
            })
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
        generate any one kind of response`

        console.log('prompt:', prompt)
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'user',
                    content: `${prompt}`
                }
            ],
            max_tokens: 100
        })
        console.log('\nresponse:', response.choices[0].message.content)

        const jsonResponse = JSON.parse(response.choices[0].message.content)

        const newSqlQuery = jsonResponse.sqlQuery

        const getRule = await Rules.findOneAndUpdate({
            name: oldRuleDescription,
        },
            {
                $set: {
                    name:newRuleDescription,
                    correspondingRule:newSqlQuery
                }
            },
            {
                new: true
            }

        )

        const getRuleParameters = await RuleParameters.findOneAndUpdate(
            {
                rule:getRule._id
            },
            {
                $set:
                {
                    rule:getRule._id,
                    parameters:jsonResponse.params
                }
            },
            {
                new:true
            }
        )

        res.status(200).json({
            success: true,
            message: getRule
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while modifying rule - ${error}`
        })
    }
}
