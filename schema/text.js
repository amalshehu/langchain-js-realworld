import { model } from '../../setup.js'

// LangChain interfaces primarily revolve around text, 
// allowing users to interact with language models through a
// "text in, text out" approach.

const question = 'What is the capital of India?'
const response = await model.call(question)
console.log(response)

// Output: The capital of India is New Delhi.
