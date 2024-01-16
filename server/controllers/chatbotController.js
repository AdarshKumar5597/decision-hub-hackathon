const { getClient } = require('../config/database');
const ChatbotRulesCollection = 'chatbotRules';
const fs = require("fs");
require("dotenv").config();

exports.chatbotCreateRule = async (req, res) => {
    let client;

    try {
        const { ruleName, ruleDescription } = req.body;

        if (!ruleName || !ruleDescription) {
            return res.status(400).json({
                success: false,
                message: 'Rule description OR Rule Name cannot be empty.',
            });
        }

        client = getClient(); // Use the global connection

        const chatbotRulesCollection = client.db().collection(ChatbotRulesCollection);

        const result = await chatbotRulesCollection.insertOne({
            name: ruleName,
            description: ruleDescription,
            userId: req.userId,
        });

        // await result.save();

        res.status(200).json({
            success: true,
            message: "Rule Created Successfully."
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

exports.fetchAllRulesForChatbot = async (req, res) => {
    let client;

    try {

        client = getClient(); // Use the global connection

        const chatbotRulesCollection = client.db().collection(ChatbotRulesCollection);

        const allRules = await chatbotRulesCollection.find({ userId: req.userId }).toArray();

        if (allRules) {


            const headers = Object.keys(allRules[0]);
            const csvContent = [
                headers.join(','),
                ...allRules.map(item => headers.map(key => item[key]).join(','))
            ].join('\n');
            const filePath = __dirname + "\\csv\\" + "rules.csv";
            fs.writeFileSync(filePath, csvContent, 'utf-8')

            return res.status(200).json({
                success: true,
                message: "All Rules Fetched Successfully.",
                rules: allRules,
                filePath: filePath
            })
        }

        return res.status(400).json({
            success: true,
            message: "Error while fetching Rules for chatbot.",
        })

    } catch (error) {
        console.log("Error while fetching Rules for chatbot", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching Rules for chatbot",
        })
    }
}

exports.chatbotCompletions = async (req, res) => {
    const options = {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${process.env.OPENAI_API}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: "Answer the current question. Refer to previous chats if needed.\n" + req.body.message}],
            max_tokens: 100,
        })
    }
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", 
        options)

        const data = await response.json()
        res.send(data)

    } catch (error) {
        console.log(error);
    }
}