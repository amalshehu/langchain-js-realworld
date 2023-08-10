import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    PromptTemplate,
    SystemMessagePromptTemplate,
} from "langchain/prompts"

// Prompts are the text that is fed into the model.
// We can dynamically generate prompts using PromptTemplate.

// Example 1: Basic Prompt Template
// We instantiate a PromptTemplate object with a fixed template string and an array of input variable names.
const promptTemplate1 = new PromptTemplate({ template: "What is a creative name for a company that produces {product}?", inputVariables: ["product"] })
// We create a PromptValue using the template and the dynamic input.
const promptValue1 = await promptTemplate1.format({ product: "innovative gadgets" })
console.log(promptValue1)
// Output: "What is a creative name for a company that produces innovative gadgets?"

// Example 2: Alternate creation of a PromptTemplate
// 'fromTemplate' static method simplifies PromptTemplate creation. Here, we also generate a PromptValue.
const promptTemplate2 = PromptTemplate.fromTemplate("How would you describe the taste of {food}?")
const promptValue2 = await promptTemplate2.format({ food: "delicious chocolate" })
console.log(promptValue2)
// Output: "How would you describe the taste of delicious chocolate?"

// Example 3: Creating a multi-turn ChatPromptTemplate
// We first create system and user MessagePromptTemplates, and then combine them into a ChatPromptTemplate.
// This is useful for generating conversation-like PromptValues.
const systemMessage = SystemMessagePromptTemplate.fromTemplate("You are an AI assistant that helps with {task}.")
const userMessage = HumanMessagePromptTemplate.fromTemplate("Please translate the following sentence: {sentence}")
const chatPromptTemplate = ChatPromptTemplate.fromPromptMessages([systemMessage, userMessage])
// Create a chat PromptValue
const chatPromptValue = await chatPromptTemplate.format({ task: "language translation", sentence: "Hello, how are you?" })
console.log(chatPromptValue)

/*
Output:
[
    {"role": "system", "content": "You are an AI assistant that helps with language translation."},
    {"role": "user", "content": "Please translate the following sentence: Hello, how are you?"}
]
*/


// Key Insights:
// - PromptTemplate is used for creating prompts where placeholders are replaced by specific input values. 
// - ChatPromptTemplate caters to chat-based models, facilitating creation of conversational prompts with user and system messages.
// - The 'format' method substitutes placeholders in the template with provided input values.
// - The 'fromTemplate' method is an alternative way to create PromptTemplate instances.
