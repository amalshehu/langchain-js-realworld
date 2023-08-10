import { OpenAI } from "langchain/llms/openai"
import "dotenv/config"

export const generateCompanyName = async () => {
    const aiModel = new OpenAI()
    const prompt = "What would be a fitting name for a UI/UX company creates stunning designs?"
    const suggestedName = await aiModel.call(prompt)
    console.log({ suggestedName })
}

generateCompanyName()

// Output: { suggestedName: 'Visionary Creations' }