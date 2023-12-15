const { default: mongoose } = require('mongoose');
const Rules = require('../models/Rules')
const {OpenAI} = require('openai');
const RuleParameters = require('../models/RuleParameters');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API
});


exports.createRule = async (req, res) => {
    try {
        const ruleDescription = req.body.ruleDescription
        console.log(ruleDescription)

        if (!ruleDescription) {
            return res.status(400).json({
                success:false,
                message:"Rule description cannot be empty."
            })
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
        generate any one kind of response`

        console.log('prompt:', prompt)
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role:'user',
                    content:`${prompt}`
                }
            ],
            max_tokens: 100
        })
        console.log('\nresponse:', response.choices[0].message.content)

        const jsonResponse = JSON.parse(response.choices[0].message.content)

        console.log(jsonResponse)

        const sqlQuery = jsonResponse.sqlQuery

        console.log(sqlQuery)

        const newRule = await Rules.create({
            name:ruleDescription,
            correspondingRule:sqlQuery
        })

        const newRuleParameters = await RuleParameters.create({
            rule:newRule._id,
            parameters:jsonResponse.params
        })

        res.status(200).json({
            success: true,
            message: response.choices[0].message.content
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while creating rule - ${error}`
        })
    }
}
