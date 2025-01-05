import {GoogleGenerativeAI,HarmCategory,HarmBlockThreshold,} from "@google/generative-ai";
import { api } from '@/config.js'

const apiKey = api.key;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 0.5,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
};
async function run(userMessage, previousHistory = []) {
    const chatSession = model.startChat({
        generationConfig,
        history: previousHistory, // Use the provided history
    });

    const result = await chatSession.sendMessage(userMessage);

    const updatedHistory = [
        ...previousHistory,
        { role: "user", parts: [{ text: userMessage }] },
        { role: "model", parts: [{ text: result.response.text() }] },
    ];
    console.log(result.response.text());
    return { response: result.response.text(), history: updatedHistory }; // Return both response and updated history
}

export default run;