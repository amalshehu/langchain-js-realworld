import { getCompletion } from '../setup.js'
import { OpenAI } from "langchain/llms/openai"
import { PromptTemplate } from "langchain/prompts"
import { logger } from '../utils/logger.js'

// Define the customer's email content
const customerEmail = `
Arrr, I be fuming that me blender lid 
flew off and splattered me kitchen walls 
with smoothie! And to make matters worse,
the warranty doesn't cover the cost of 
cleaning up me kitchen. I need yer help 
right now, matey!
`

// Define the translation style
const style = `American English in a calm and respectful tone`

// Construct the prompt for translation
const prompt = `Translate the text that is delimited by triple backticks into a style that is ${style}.
text: \`${customerEmail}\``

logger.info("Prompt for OpenAI: " + prompt)

// Get completion from OpenAI
const response = await getCompletion(prompt)
logger.info("OpenAI Response: " + JSON.stringify(response))

// Create an OpenAI chat instance
const chat = new OpenAI({ temperature: 0.0 })

// Define a template string for the LangChain prompt
const templateString = `Translate the text \
that is delimited by triple backticks \
into a style that is {style}. \
text: {text}`

// Create a LangChain prompt template
const promptTemplate = PromptTemplate.fromTemplate(templateString)

const customerStyle = `American English in a calm and respectful tone`

// Format the customer's messages with the prompt template
const customerMessages = await promptTemplate.format({
    style: customerStyle,
    text: customerEmail
})

logger.info("LangChain Customer Messages: " + JSON.stringify(customerMessages))

// Get prediction from LangChain
const customerResponse = await chat.predict(customerMessages)
logger.success("LangChain Customer Response: " + JSON.stringify(customerResponse))

// Define the service's reply and its translation style
const serviceReply = `Hey there customer, the warranty does not cover cleaning expenses for your kitchen because it's your fault that you misused your blender by forgetting to put the lid on before starting the blender. Tough luck! See ya!`
const serviceStylePirate = `a polite tone that speaks in English Pirate`

// Format the service's messages with the prompt template
const serviceMessages = await promptTemplate.format({
    style: serviceStylePirate,
    text: serviceReply
})

logger.warning("LangChain Service Messages: " + JSON.stringify(serviceMessages))

// Get prediction from LangChain
const serviceResponse = await chat.predict(serviceMessages)
logger.error("LangChain Service Response: " + JSON.stringify(serviceResponse))
