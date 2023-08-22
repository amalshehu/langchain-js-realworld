import { OpenAI } from "langchain/llms/openai"
import { RetrievalQAChain } from "langchain/chains"
import { HNSWLib } from "langchain/vectorstores/hnswlib"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import dotenv from "dotenv"

dotenv.config()

yargs(hideBin(process.argv))
    .command({
        command: 'load',
        describe: 'Load a PDF and store its data in a directory',
        builder: {
            path: {
                describe: 'Path to the PDF',
                demandOption: true,
                type: 'string'
            },
            saveDir: {
                describe: 'Directory to save the processed data',
                demandOption: true,
                type: 'string'
            }
        },
        handler: async (argv) => {
            const loader = new UnstructuredLoader(argv.path, {
                apiKey: process.env.UNSTRUCTURED_API_KEY,
                // strategy: 'hi-res' //experimental
            })
            const docs = await loader.load()
            const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings())

            await vectorStore.save(argv.saveDir)
            console.log("PDF loaded and data stored.")
        }
    })
    .command({
        command: 'ask',
        describe: 'Ask a question',
        builder: {
            question: {
                describe: 'Your question',
                demandOption: true,
                type: 'string'
            },
            saveDir: {
                describe: 'Directory where the processed data is saved',
                demandOption: true,
                type: 'string'
            }
        },
        handler: async (argv) => {
            const startTime = Date.now()

            const loadedVectorStore = await HNSWLib.load(argv.saveDir, new OpenAIEmbeddings())
            const vectorStoreRetriever = loadedVectorStore.asRetriever()

            const model = new OpenAI({})
            const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever)
            const res = await chain.call({
                query: argv.question,
            })
            console.log(res)

            const endTime = Date.now()
            const timeTaken = ((endTime - startTime) / 1000).toFixed(2)

            console.log(`Time taken for querying: ${timeTaken} seconds.`)
        }
    })
    .parse()

// node unstructured.io/start.js load --path="./data/survival.pdf" --saveDir="./cache/survival.json"
// node unstructured.io/start.js ask --question="how do I survive in an accident?" --saveDir="./cache/survival.json"

// Output:
// {
//     text: `Follow the steps outlined in the context,
//     such as approach all accidents in an orderly,
//     stepwise fashion and do not move the injured person 
//     if there is risk of head or spine injury. 
//     Take a course in first aid and make a plan for continuing the trip, 
//     self-evacuation, or getting help. Have a vehicle survival kit in case
//     the vehicle breaks down or gets stuck.`
// }