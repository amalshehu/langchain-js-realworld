# Langchain in Realworld

Langchain is a robust framework designed for incorporating Large Language Models (LLMs) into real-world applications. Here's how its key features can be utilized in practical scenarios:

| Langchain | Modules                                                     | Details                                          | Integration                                                           |
| --------- | ----------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------- |
| Models    | LLMS                                                        | 20+ integrations                                 | OpenAI, Google                                                        |
|           | Chat Models                                                 | Conversational interface for language models     | Anthropic, Azure, VertexAI, PromptLayer                               |
|           | Text Embedding Models                                       | 10+ integrations                                 |                                                                       |
| Prompts   | Prompt Templates                                            |                                                  |                                                                       |
|           | Output Parsers                                              | 5+ implementations                               | List, Datetime, Enum, Auto-fixing, Pydantic, Retry, Structured output |
|           | Retry/fixing logic                                          |                                                  |                                                                       |
|           | Example Selectors                                           | 5+ implementations                               |                                                                       |
| Indexes   | Document Loaders                                            | 50+ implementations                              |                                                                       |
|           | Text Splitters                                              | 10+ implementations                              |                                                                       |
|           | Vector stores                                               | 10+ integrations                                 |                                                                       |
|           | Retrievers                                                  | 5+ integrations/implementations                  |                                                                       |
| Chains    | Prompt + LLM + Output parsing                               | Can be used as building blocks for longer chains |                                                                       |
|           | More application specific chains                            | 20+ types                                        |                                                                       |
| Agents    | Agent Types                                                 | 5+ types                                         |                                                                       |
|           | Algorithms for getting LLMs to use tools                    |                                                  |                                                                       |
|           | Agent Toolkits                                              | 10+ implementations                              |                                                                       |
|           | Agents armed with specific tools for a specific application |                                                  |                                                                       |

## Models

![Langchain Models](https://python.langchain.com/assets/images/model_io-1f23a36233d7731e93576d6885da2750.jpg)
Models in LangChain.js form the backbone of any NLP task. They perform a variety of functions from generating text, answering questions, to turning text into numeric representations. Let's explore a few real-world applications:

### Text Generation

Suppose we're building a chatbot to assist entrepreneurs in brainstorming company names. In this case, the user asks the bot, "What would be a fitting name for a UI/UX company that creates stunning designs?"

```javascript
import { OpenAI } from "langchain/llms/openai"
import "dotenv/config"

export const generateCompanyName = async () => {
  const aiModel = new OpenAI()
  const prompt =
    "What would be a fitting name for a UI/UX company that creates stunning designs?"
  const suggestedName = await aiModel.call(prompt)
  console.log({ suggestedName }) // Output: { suggestedName: 'Visionary Creations' }
}

generateCompanyName()
```

**Key Insights:**

1. **Simplified Text Generation:** LangChain.js models, like `OpenAI`, abstract the complexities of language generation, enabling developers to generate text in just a few lines of code.

2. **Customizable Prompts:** Developers can craft custom prompts to guide the model's generation, giving them control over the content the model produces.

### Text Embedding

In many NLP applications, it's useful to represent text as a vector of numbers that capture its semantic meaning. This is known as text embedding, and it enables comparison and clustering of text based on semantic similarity.

```javascript
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import "dotenv/config"

// Initialize the model
const model = new OpenAIEmbeddings()

// Embed a piece of text
const res = await model.embedQuery(
  "What would be a good company name for a company that creates beautiful websites?"
)

console.log({ res })
```

**Key Insights:**

1. **Text Embedding:** LangChain.js includes models like `OpenAIEmbeddings` that can convert text into its vector representation, encapsulating its semantic meaning in a numeric form.

2. **Semantic Analysis:** By transforming text into semantic vectors, LangChain.js provides the foundational toolset for semantic search, document clustering, and other advanced NLP tasks.

These examples just scratch the surface of what you can do with LangChain.js models. The library supports a wide variety of models and use cases, giving you the flexibility to create diverse NLP applications.

## Prompts

Prompts are the text fed into the language model. With the PromptTemplate class, we can dynamically generate prompts using defined templates and input variables.

### PromptTemplate

PromptTemplate allows us to create prompts where placeholders can be replaced by specific input values. It's instantiated with a template string and an array of input variables.

```javascript
const promptTemplate1 = new PromptTemplate({
  template: "What is a creative name for a company that produces {product}?",
  inputVariables: ["product"],
})

const promptValue1 = await promptTemplate1.format({
  product: "innovative gadgets",
})
console.log(promptValue1)
// Output: "What is a creative name for a company that produces innovative gadgets?"
```

We can also create a PromptTemplate using the static method `fromTemplate`, which simplifies its creation:

```javascript
const promptTemplate2 = PromptTemplate.fromTemplate(
  "How would you describe the taste of {food}?"
)
const promptValue2 = await promptTemplate2.format({
  food: "delicious chocolate",
})
console.log(promptValue2)
// Output: "How would you describe the taste of delicious chocolate?"
```

### ChatPromptTemplate

ChatPromptTemplate caters to chat-based models, facilitating the creation of conversational prompts. We can generate a multi-turn conversation using `SystemMessagePromptTemplate` and `HumanMessagePromptTemplate`, then combine them into a `ChatPromptTemplate`.

```javascript
const systemMessage = SystemMessagePromptTemplate.fromTemplate(
  "You are an AI assistant that helps with {task}."
)
const userMessage = HumanMessagePromptTemplate.fromTemplate(
  "Please translate the following sentence: {sentence}"
)
const chatPromptTemplate = ChatPromptTemplate.fromPromptMessages([
  systemMessage,
  userMessage,
])

const chatPromptValue = await chatPromptTemplate.format({
  task: "language translation",
  sentence: "Hello, how are you?",
})

console.log(chatPromptValue)
```

In this case, we use chat-based models to simulate system and user interactions, useful for conversational AI tasks.

### StructuredOutputParser

With the help of LangChain, we can also define schemas for our output. StructuredOutputParser uses defined names and descriptions to parse and structure the output of our model's predictions.

```javascript
const movieRecommendationParser =
  StructuredOutputParser.fromNamesAndDescriptions({
    title: "title of the recommended movie",
    genre: "genre of the recommended movie",
    summary: "short summary of the recommended movie",
  })
```

In case our model's output is not in the correct format, we can use the OutputFixingParser. It is a very useful tool to fix such outputs, ensuring our extracted data is in the expected structure.

```javascript
console.log("Using output fixing parser to fix output...")
const fixParser = OutputFixingParser.fromLLM(
  new OpenAI({ temperature: 0, model: "gpt-3.5-turbo" }),
  movieRecommendationParser
)
const output = await fixParser.parse(modelResponse)
console.log("Fixed output: ", output)
```

Sure, let's look at a few more examples in depth, using different aspects of the LangChain library.

### Real-world Example 1: Movie Recommendation System

Consider a situation where we're developing an AI-powered movie recommendation system. We'll be asking our AI model to generate a movie recommendation, including the title, genre, and a short summary of the movie.

```javascript
const movieRecommendationParser =
  StructuredOutputParser.fromNamesAndDescriptions({
    title: "title of the recommended movie",
    genre: "genre of the recommended movie",
    summary: "short summary of the recommended movie",
  })

const formatInstructions = movieRecommendationParser.getFormatInstructions()

const movieRecommendationPrompt = new PromptTemplate({
  inputVariables: [],
  template: "Provide a movie recommendation.\n{formatInstructions}\n",
  partialVariables: { formatInstructions },
})

const openAIModel = new OpenAI({ temperature: 0 })
const inputPrompt = await movieRecommendationPrompt.format({})
const modelResponse = await openAIModel.call(inputPrompt)

try {
  console.log(
    "Recommended movie:",
    await movieRecommendationParser.parse(modelResponse)
  )
} catch (e) {
  console.log("Failed to parse bad output: ", e)
  console.log("Using output fixing parser to fix output...")
  const fixParser = OutputFixingParser.fromLLM(
    new OpenAI({ temperature: 0, model: "gpt-3.5-turbo" }),
    movieRecommendationParser
  )
  const output = await fixParser.parse(modelResponse)
  console.log("Fixed output: ", output)
}
```

This script creates a movie recommendation engine. The output is parsed using a structured output parser that checks if the result fits the desired schema (title, genre, summary). If not, an OutputFixingParser is used to fix it.

### Real-world Example 2: Product Review Analysis

In another situation, imagine we have an AI system that analyzes customer reviews. This system will parse reviews and extract specific information, such as whether the product was a gift, how many days it took for delivery, and any comments about the price or value of the product.

```javascript
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

const outputParser = StructuredOutputParser.fromZodSchema({
  gift: zod.boolean(),
  delivery_days: zod.number(),
  price_value: zod.string(),
})

const chat = new OpenAI({ temperature: 0.0 })
const promptTemplate = PromptTemplate.fromTemplate(reviewTemplate)
const reviewMessages = await promptTemplate.format({
  text: customerReview,
})

const reviewResponse = await chat.predict(reviewMessages)
const structuredOutput = await outputParser.parse(reviewResponse)
```

This script uses a specific prompt template to instruct the AI on how to parse the review. A StructuredOutputParser is used to validate and parse the output into a structured format.

### Real-world Example 3: Chat-based AI Assistant

In a third example, we might be creating an AI assistant capable of understanding and responding to various user commands. This AI would need to handle multi-turn conversations.

```javascript
const systemMessage = SystemMessagePromptTemplate.fromTemplate("You are an AI assistant that helps with {task}.")
const user

Message = HumanMessagePromptTemplate.fromTemplate("Please translate the following sentence: {sentence}")
const chatPromptTemplate = ChatPromptTemplate.fromPromptMessages([systemMessage, userMessage])

const chatPromptValue = await chatPromptTemplate.format({
    task: "language translation",
    sentence: "Hello, how are you?"
})
```

This script creates a chat-based AI assistant. System and user message templates are used to create a multi-turn conversation, simulating interaction between the system and a user.

Each of these examples uses a different aspect of the LangChain library, demonstrating the versatility and power of these tools in different real-world applications.

## Memory

Consider an AI personal assistant application that sets reminders based on user requests. LangChain's memory feature helps to maintain the context of ongoing conversations, ensuring the assistant remembers past instructions, like "Remind me to call John in 30 minutes."

Here are some real-world examples for different types of memory using simple code.

**1. Buffer Memory**

BufferMemory is useful in chatbot applications where we need to keep track of the conversation history. Here's a simple use case of a chatbot in customer support:

```typescript
import { OpenAI } from "langchain/llms/openai"
import { BufferMemory } from "langchain/memory"
import { ConversationChain } from "langchain/chains"

const model = new OpenAI({})
const memory = new BufferMemory()
const chain = new ConversationChain({ llm: model, memory: memory })

// A customer starts a chat with the support bot
const res1 = await chain.call({ input: "Hi! I have an issue with my order." })
console.log({ res1 })

// The bot would respond by asking for more information about the issue.
// Later, the bot can recall this information as needed throughout the conversation.
```

**2. BufferWindowMemory**

BufferWindowMemory is useful when you want to limit the number of previous exchanges that the model can see. This is useful in environments with tight memory constraints, or when you want the bot to only respond to recent inputs. Here's a simple use case:

```typescript
import { OpenAI } from "langchain/llms/openai"
import { BufferWindowMemory } from "langchain/memory"
import { ConversationChain } from "langchain/chains"

const model = new OpenAI({})
const memory = new BufferWindowMemory(3) // only remember the last 3 exchanges
const chain = new ConversationChain({ llm: model, memory: memory })

// User starts a conversation
const res1 = await chain.call({
  input: "Hi! I have some questions about your product.",
})
console.log({ res1 })

// The bot will only keep track of the last 3 exchanges and respond based on that context.
```

**3. Entity Memory**

EntityMemory can be used when you need to remember specific facts about entities mentioned during a conversation. This can be useful in a range of applications, from personal assistants to game bots:
Here's an example of how you might use Entity Memory in a simple question-answering chatbot:

```typescript
import { OpenAI } from "langchain/llms/openai"
import { EntityMemory } from "langchain/memory"
import { ConversationChain } from "langchain/chains"

const model = new OpenAI({})
const memory = new EntityMemory()
const chain = new ConversationChain({ llm: model, memory: memory })

// User starts a conversation
const res1 = await chain.call({ input: "John Doe was born in 1980." })
console.log({ res1 }) // The bot might respond with a simple acknowledgment

// User continues the conversation
const res2 = await chain.call({ input: "When was John Doe born?" })
console.log({ res2 }) // The bot would respond with "John Doe was born in 1980."

// The EntityMemory has stored information about the entity "John Doe" from the first input,
// and can recall this information when asked in the second input.
```

In this case, EntityMemory is used to store and retrieve information about the entity "John Doe". The conversation chain uses an OpenAI model to generate responses, and the memory is used to store information about entities.

**3. Conversation Summary Memory**

Conversation Summary Memory summarizes the conversation as it happens and stores the current summary in memory. This memory can then be used to inject the summary of the conversation so far into a prompt/chain. This memory is most useful for longer conversations, where keeping the past message history in the prompt verbatim would take up too many tokens.

Below is a simple example of how to create and use Conversation Summary Memory in Langchain.

```typescript
import { ChatOpenAI } from "langchain/chat_models/openai"
import { ConversationSummaryMemory } from "langchain/memory"
import { LLMChain } from "langchain/chains"
import { PromptTemplate } from "langchain/prompts"

// Define the memory, model, and chain
const memory = new ConversationSummaryMemory({
  memoryKey: "chat_history",
  llm: new ChatOpenAI({ modelName: "gpt-3.5-turbo" }),
})

const model = new ChatOpenAI()
const prompt = PromptTemplate.fromTemplate(`Human: {input}\nAI:`)
const chain = new LLMChain({ llm: model, prompt, memory })

// Call the chain and log the response and memory content
const response = await chain.call({
  input: "Tell me about the history of the Roman Empire.",
})
console.log({ response, memoryContent: await memory.loadMemoryVariables({}) })
```

In this example, we're creating an instance of ConversationSummaryMemory and integrating it with an LLMChain. After calling the chain with a given input ("Tell me about the history of the Roman Empire."), we're logging both the response from the AI model and the content of our ConversationSummaryMemory.

## Data Connections

![Data Connections](https://python.langchain.com/assets/images/data_connection-c42d68c3d092b85f50d08d4cc171fc25.jpg)

In an AI-powered legal tech application, users might need to search through extensive databases of legal documents. LangChain's indexing capabilities can be used to efficiently index and retrieve data from these documents, thus providing swift, accurate search results.

Indexing in LangChain allows for efficient retrieval of information from processed data. This is especially useful in large-scale projects where you are dealing with substantial amounts of data, like processing and analyzing documents.

The following example demonstrates how to implement indexing with LangChain using bank statements. This script extracts information from a bank statement and saves the results for efficient retrieval.

```typescript
import { OpenAI } from "langchain/llms/openai"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { PromptTemplate } from "langchain/prompts"
import { StructuredOutputParser } from "langchain/output_parsers"
import { z } from "zod"
import fs from "fs"

// Define schema and initialize parser
const statementParser = StructuredOutputParser.fromZodSchema(
  z.object({
    date: z.string().optional(),
    mode: z.string().optional(),
    particulars: z.string().optional(),
    deposits: z.string().optional(),
    withdrawals: z.string().optional(),
    balance: z.string().optional(),
  })
)

// Load documents
const loader = new PDFLoader("data/MAR2023.pdf")
const docs = await loader.load()

// Initialize AI model
const model = new OpenAI({
  temperature: 0.5,
  model: "gpt-3.5-turbo",
  maxTokens: 200,
})

// Iterate through documents, process them, and save results
let results = []
for (let doc of docs) {
  const chunks = doc.pageContent.match(/(.|[\r\n]){1,200}/g) // Chunk the content
  for (let chunk of chunks) {
    const input = await prompt.format({ inputText: chunk })
    const response = await model.call(input)
    results.push(await statementParser.parse(response))
  }
}
fs.writeFileSync("results.json", JSON.stringify(results, null, 2))
```

In this example:

1. **Setting up the Parser**: We first set up the `StructuredOutputParser` to parse the responses from the model based on a defined schema.

2. **Loading the Documents**: We load the documents from the specified path using `PDFLoader`.

3. **Chunking the Content**: We split the content into smaller chunks that are easier for the model to process. In this case, each chunk is 200 tokens long.

4. **Processing the Chunks**: For each chunk, we format the input, call the model with the input, parse the response using the `statementParser`, and add the parsed response to our results.

5. **Saving the Results**: Finally, we save our results to a JSON file. This creates an index of the extracted data, which can be easily accessed and queried later.

### Advantages of Indexing

1. **Efficient Data Retrieval**: Indexing allows for quick and efficient retrieval of data, which is particularly beneficial when dealing with large datasets.

2. **Structured Data Access**: It provides a structured way to access your data, which can be particularly useful when dealing with complex or nested data formats.

3. **Scalability**: As your project scales and the amount of data increases, indexing becomes even more important to ensure that your applications continue to perform well.

Please note that this is just a basic example of indexing. LangChain provides various other methods and tools for indexing, including but not limited to VectorDB and Elasticsearch. These tools offer more advanced

indexing capabilities, including the ability to create indexes for vectorized data, and to run complex queries against your indexed data.

## Chains

For any modern AI system, the ability to combine multiple steps in a complex process can be a game-changer. LangChain.js offers this capability with its `Chains` feature, and it is particularly valuable in a content recommendation system.

Imagine this: Your user enjoys reading about space exploration and prefers articles that are concise. They also mention that they read every day. How do we use this information to curate the perfect reading list for them? Here's where the power of LangChain's chains feature comes in.

To understand the concept better, let's break down the recommendation process into three key steps:

1. Understand the user's reading preferences.
2. Extract similar content from a database.
3. Summarize the extracted content to provide brief overviews.

The chains feature in LangChain.js allows us to execute these tasks in a sequence, hence, ensuring a fluid process.

Let's dive deeper into an example where we use a chain to understand a user's preferences from a text input.

```typescript
import { z } from "zod"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { createExtractionChainFromZod } from "langchain/chains"

// Define the schema for the user's preferences
const preferenceSchema = z.object({
  "favorite-genre": z.string().optional(),
  "reading-frequency": z.string().optional(),
  "preferred-length": z.string().optional(),
})

// Create a chain to extract preferences
const preferenceChain = createExtractionChainFromZod(
  preferenceSchema,
  new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 })
)

// Run the chain with a user's preference statement
const preferences = await preferenceChain.run(
  `I enjoy reading science fiction and fantasy. I usually read a couple of times a week, and I prefer short stories.`
)

// Log the extracted preferences
console.log(preferences)

// Output:
// {
//   'favorite-genre': 'science fiction and fantasy',
//   'reading-frequency': 'a couple of times a week',
//   'preferred-length': 'short stories'
// }
```

## Agents

There are two types of agents in LangChain.js: Action Agents and Plan-and-Execute Agents.

### Action Agents

Consider a customer service chatbot for an e-commerce platform. When a customer inquires, "What's the status of my order?", the chatbot, acting as an **Action Agent**, determines the right course based on this input. It may call upon an order management system using the customer's unique identifier, retrieve the order status, and relay this information back to the customer. This single-step action response makes it an effective Action Agent.

### Plan-and-Execute Agents

Now, think of a travel assistant chatbot. A user might request, "I'd like to book a vacation to Hawaii. I need flights, a hotel, and some popular tourist attractions." The chatbot, as a **Plan-and-Execute Agent**, creates a plan:

1. Search for flights to Hawaii during the desired period.
2. Find available hotels in the user's preferred area.
3. Gather information about top tourist spots in Hawaii.

The agent then executes these steps sequentially, presenting the user with a comprehensive travel plan.
