const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API
});

exports.debugRule = async (req, res) => {

    try {
        const ruleDescription = req.body.ruleDescription;
        console.log(ruleDescription);

        if (!ruleDescription) {
            return res.status(400).json({
                success: false,
                message: "Rule description cannot be empty."
            });
        }

        const prompt = `description: ${ruleDescription}
        give the response in following json format without any explanation
        {
        'status':'OK',
        'message':'message',
        'sqlQuery':'your query',
        'conditions':'[list of conditions to meet the following task]'
        }`;

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

        res.status(200).json({
            success: true,
            message: response.choices[0].message.content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while debugging rule - ${error}`
        });
    }
};
