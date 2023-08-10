import { OpenAI } from "langchain/llms/openai"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { PromptTemplate } from "langchain/prompts"
import { StructuredOutputParser, OutputFixingParser } from "langchain/output_parsers"
import { z } from "zod"
import "dotenv/config"
import fs from "fs"
import winston from "winston"

// Set up winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'processing.log' })
    ]
})

const statementParser = StructuredOutputParser.fromZodSchema(z.object({
    date: z.string().optional(),
    mode: z.string().optional(),
    particulars: z.string().optional(),
    deposits: z.string().optional(),
    withdrawals: z.string().optional(),
    balance: z.string().optional(),
}))

const formatInstructions = statementParser.getFormatInstructions()

const loader = new PDFLoader("data/MAR2023.pdf")
const docs = await loader.load()

const prompt = new PromptTemplate({
    template: `
      Extract information from the bank statement.\n{format_instructions}
      \nThe response should be presented in a markdown JSON codeblock.\nBank statement: {inputText}
      `,
    inputVariables: ["inputText"],
    partialVariables: { format_instructions: formatInstructions },
})

const model = new OpenAI({ temperature: 0.5, model: "gpt-3.5-turbo", maxTokens: 200 })

let results = []
for (let i = 0; i < docs.length; i++) {
    let doc = docs[i]
    console.log(`Processing document ${i + 1}...`)
    let content = doc.pageContent
    let chunkSize = 200 // The number of tokens in each chunk, reduced from 1000 to 500
    let chunks = []

    for (let i = 0; i < content.length; i += chunkSize) {
        chunks.push(content.slice(i, i + chunkSize))
    }

    for (let chunk of chunks) {
        const input = await prompt.format({
            inputText: chunk,
        })

        let response
        try {
            response = await model.call(input)
        } catch (e) {
            logger.error(`Document ${i + 1}: Failed to parse chunk. Skipping...`)
            console.error(e.message)
            continue
        }
        let parsedResponse
        try {
            parsedResponse = await statementParser.parse(response)
            results.push(parsedResponse)
            logger.info(`Document ${i + 1}: Successfully parsed chunk.`)
        } catch (e) {
            logger.warn(`Document ${i + 1}: Failed to parse chunk. Trying to fix...`)
            const fixParser = OutputFixingParser.fromLLM(
                new OpenAI({ temperature: 0, model: "gpt-3.5-turbo" }),
                statementParser
            )
            const output = await fixParser.parse(response)
            results.push(output)
            logger.warn(`Document ${i + 1}: Chunk fixed and parsed successfully.`)
            logger.info(`Document ${i + 1}: Chunk fixed and parsed successfully.`)
        }
    }
}

fs.writeFileSync("results.json", JSON.stringify(results, null, 2))
logger.info("Results saved in results.json.")
