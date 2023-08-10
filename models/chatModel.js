import { ChatOpenAI } from "langchain/chat_models/openai"
import { HumanChatMessage } from "langchain/schema"
import "dotenv/config"

const chat = new ChatOpenAI()
// Pass in a list of messages to `call` to start a conversation. In this simple example, we only pass in one message.
const response = await chat.call([
    new HumanChatMessage(
        "What is a good name for a company that makes bricks?"
    ),
])
console.log(response)

// Output:
// AIChatMessage { text: 'SolidWorks Bricks Inc.', name: undefined }