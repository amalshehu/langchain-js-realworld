import { getCompletion } from '../setup.js'
import { OpenAI } from "langchain/llms/openai"
import { PromptTemplate } from "langchain/prompts"
import { StructuredOutputParser } from "langchain/output_parsers"
import { logger } from '../utils/logger.js'
import zod from 'zod'

// Define the customer's review content
const customerReview = `
This leaf blower is pretty amazing.  It has four settings:
candle blower, gentle breeze, windy city, and tornado. 
It arrived in two days, just in time for my wife's 
anniversary present. 
I think my wife liked it so much she was speechless. 
So far I've been the only one using it, and I've been 
using it every other morning to clear the leaves on our lawn. 
It's slightly more expensive than the other leaf blowers 
out there, but I think it's worth it for the extra features.
`

// Define the prompt template
const reviewTemplate = `
For the following text, extract the following information:
gift: Was the item purchased as a gift for someone else? 
Answer True if yes, False if not or unknown.
delivery_days: How many days did it take for the product 
to arrive? If this information is not found, output -1.
price_value: Extract any sentences about the value or price,
and output them as a comma separated list.
Format the output as JSON with the following keys:
gift
delivery_days
price_value
text: {text}
`

// Create a StructuredOutputParser with the schema of our expected output
const outputParser = StructuredOutputParser.fromZodSchema({
    gift: zod.boolean(),
    delivery_days: zod.number(),
    price_value: zod.string(),
})

// Create an OpenAI chat instance
const chat = new OpenAI({ temperature: 0.0 })

// Create a LangChain prompt template
const promptTemplate = PromptTemplate.fromTemplate(reviewTemplate)

// Format the review with the prompt template
const reviewMessages = await promptTemplate.format({
    text: customerReview
})

logger.info("LangChain Review Messages: " + reviewMessages)

// Get prediction from LangChain
const reviewResponse = await chat.predict(reviewMessages)

// Parse the output into a structured format
const structuredOutput = await outputParser.parse(reviewResponse)

logger.info(typeof structuredOutput)
logger.success("Structured Review Output: " + JSON.stringify(structuredOutput, null, 2))

// Output:
// Structured Review Output: 
// {
//   "gift": true,
//   "delivery_days": 2,
//   "price_value": "slightly more expensive than the other leaf blowers out there, but I think it's worth it for the extra features"
// }
