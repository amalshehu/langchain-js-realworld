
import { Configuration, OpenAIApi } from 'openai'
import { OpenAI } from "langchain/llms/openai"

import "dotenv/config"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
export const openai = new OpenAIApi(configuration)

export const getCompletion = async (prompt, temperature = 0) => {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content: prompt },
        ],
        temperature // Degree of randomness of the model's output
    })

    return response.data.choices[0].message.content
}

export const getCompletionFromMessages = async (messages, temperature = 0) => {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        temperature
    })

    return response.data.choices[0].message.content
}

export const model = new OpenAI(
    {
        temperature: 0,
    }
)
