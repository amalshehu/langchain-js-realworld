import { OpenAI } from "langchain/llms/openai"
import { PromptTemplate } from "langchain/prompts"
import { StructuredOutputParser, OutputFixingParser } from "langchain/output_parsers"
import "dotenv/config"

// Define the schema for the output.
const movieRecommendationParser = StructuredOutputParser.fromNamesAndDescriptions({
    title: "title of the recommended movie",
    genre: "genre of the recommended movie",
    summary: "short summary of the recommended movie",
})

// Get format instructions for the schema.
const formatInstructions = movieRecommendationParser.getFormatInstructions()

// Define the prompt template.
const movieRecommendationPrompt = new PromptTemplate({
    inputVariables: [],
    template: "Provide a movie recommendation.\n{formatInstructions}\n",
    partialVariables: { formatInstructions },
})

const openAIModel = new OpenAI({ temperature: 0 })

// Generate the prompt.
const inputPrompt = await movieRecommendationPrompt.format({})
const modelResponse = await openAIModel.call(inputPrompt)

try {
    console.log('Recommended movie:', await movieRecommendationParser.parse(modelResponse))
} catch (e) {
    // OutputFixingParser is used to fix the output if it is not in the correct format.
    // Extremely useful tool.
    console.log("Failed to parse bad output: ", e)
    console.log("Using output fixing parser to fix output...")
    const fixParser = OutputFixingParser.fromLLM(
        new OpenAI({ temperature: 0, model: "gpt-3.5-turbo" }),
        movieRecommendationParser
    )
    const output = await fixParser.parse(modelResponse)
    console.log("Fixed output: ", output)

}