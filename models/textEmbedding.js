import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import "dotenv/config"

// Text can be transformed into a vector, a series of numbers representing its semantic meaning.
// This vectorization is commonly used for comparing two pieces of text. 
// Semantic refers to the meaning in language or logic.

// Meaning of the text is represented by a vector of n numbers.
const model = new OpenAIEmbeddings()
const res = await model.embedQuery(
    "What would be a good company name a company creates beautiful websites?",
)
console.log({ res })

// Output:
// {
//     res: [
//        -0.0034935607, -0.0022598556,     0.01882272,    -0.00952427,
//          0.015249459,   0.016484825,   -0.036981266,  -0.0005109997,
//          ...
//     ]
// }  
