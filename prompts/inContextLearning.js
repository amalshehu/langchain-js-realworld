import { SemanticSimilarityExampleSelector } from 'langchain/prompts'
import { FaissStore } from "langchain/vectorstores/faiss"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { FewShotPromptTemplate, PromptTemplate } from 'langchain/prompts'
import { OpenAI } from "langchain/llms/openai"
import "dotenv/config"

const llm = new OpenAI()

const examplePrompt = new PromptTemplate({
    inputVariables: ["input", "output"],
    template: "Example Input: {input}\nExample Output: {output}"
})

// Examples of locations that nouns are found
const examples = [
    { "input": "scientist", "output": "laboratory" },
    { "input": "chef", "output": "kitchen" },
    { "input": "teacher", "output": "classroom" },
    { "input": "doctor", "output": "hospital" },
    { "input": "farmer", "output": "farm" },
    { "input": "pilot", "output": "cockpit" },
]

// SemanticSimilarityExampleSelector will select examples that are similar to your input by semantic meaning
const exampleSelector = SemanticSimilarityExampleSelector.fromExamples(
    examples,
    new OpenAIEmbeddings(),
    FaissStore,
    2
)

const similarPrompt = new FewShotPromptTemplate({
    exampleSelector: await exampleSelector,
    examplePrompt: examplePrompt,
    prefix: "Give the location an item is usually found in",
    suffix: "Input: {noun}\nOutput:",
    inputVariables: ["noun"]
})

const myNoun = "engineer"

console.log(await similarPrompt.format({ noun: myNoun }))

try {
    console.log(await llm.predict(await similarPrompt.format({ noun: myNoun })))
} catch (error) {
    console.log(error.message)
}
// Expected output for noun engineer: 'workshop'

//Other use cases

// Use case 1:
// let examples = [
//     { "input": "Interstellar", "output": "sci-fi, space exploration" },
//     { "input": "The Office", "output": "comedy, mockumentary" },
//     // More movie/show examples...
// ];

// let userQuery = "Friends"; // The user wants recommendations similar to 'Friends'

// Use case 2:
// let examples = [
//     { "input": "How do I reset my password?", "output": "Go to settings > security > reset password." },
//     { "input": "How do I change my email?", "output": "Go to settings > personal information > change email." },
//     // More support questions and their responses...
// ];

// let userQuery = "How do I change my phone number?"; // The user needs support with changing their phone number
