import { Document } from "langchain/document"

// A document is a piece of text with optional metadata.
// The text is what we work with when interacting with a language model,
// while the metadata helps keep track of additional information about the document, such as its source.

const doc = new Document({ pageContent: "foo", metadata: { source: "1" } })
console.log(doc)