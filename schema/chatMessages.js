import { model } from "../../setup.js"
import { LLMChain } from "langchain/chains"
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
} from "langchain/prompts"

// In a chat interface, users interact with language models through messages.
// Each message has content (typically text) and is associated with a user. 
// The supported users are System, Human, and AI.

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
        "You are a helpful assistant that translates {input_language} to {output_language}."
    ),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
])

const chain = new LLMChain({
    prompt: chatPrompt,
    llm: model,
})

const response = await chain.call({
    input_language: "English",
    output_language: "Hindi",
    text: "I love programming.",
})

console.log(response)

// Output:
// [{"type":"system","data":{"content":"तुम अंग्रेजी से हिंदी में अनुवाद करने वाली उपकारी हो।"}},{"type":"human","data":{"content":"मुझे प्रोग्रामिंग पसंद है।"}}]
