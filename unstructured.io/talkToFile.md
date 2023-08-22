# talkToFile

**talkToFile** is a command-line interface (CLI) tool designed to enable users to load and intelligently query content from various files. Leveraging the power of `langchain`, the tool provides a simple yet powerful way to extract relevant information from your documents.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
  - [Load](#load)
  - [Ask](#ask)
- [Examples](#examples)
- [Real-World Applications](#real-world-applications)
- [Contributing](#contributing)

Of course, let's keep it succinct and professional:

---

## Utilizing the Unstructured Library

In developing **talkToFile**, the `unstructured` library has been instrumental. This open-source suite simplifies ingestion and pre-processing for various formats, from PDFs to images.

**Highlights**:

- **Modularity**: The library's architecture ensures seamless integration across platforms.
- **Data Transformation**: Efficient conversion from unstructured data to structured outputs is a standout feature.

### Unstructured API:

I'm pleased to note the recent launch of the **Unstructured API**, which offers the library's capabilities via API calls. While the API remains free to access, an [API Key](#) is required.

### Exploring Chipper Model:

I've also been evaluating the beta release of the **Chipper model**, optimized for high-resolution documents. To incorporate Chipper in API requests, use the `hi_res_model_name=chipper` parameter.

## Environment Variables

1. Configure your environment variables. Create a `.env` file in the root directory and set your `UNSTRUCTURED_API_KEY`:

```
UNSTRUCTURED_API_KEY=your_api_key_here
```

## Usage

To use **talkToFile**, run the following commands:

```bash
node unstructured.io/talkToFile.js [command] [options]
```

## Commands

### Load

The `load` command enables users to load a file and store its processed data in a specified directory.

```bash
node unstructured.io/talkToFile.js load --path="./path/to/your/file.pdf" --saveDir="./path/to/saveDir"
```

### Ask

The `ask` command allows users to query the loaded content and retrieve relevant information.

```bash
node unstructured.io/talkToFile.js ask --question="Your query here" --saveDir="./path/to/previouslySavedDir"
```

## Examples

1. Loading a file:

```bash
node unstructured.io/talkToFile.js load --path="./data/survival.pdf" --saveDir="./cache/survival.json"
```

2. Querying the loaded content:

```bash
node unstructured.io/talkToFile.js ask --question="how do I survive in an accident?" --saveDir="./cache/survival.json"
```

Output:

```
{
    text: `Follow the steps outlined in the context,
    such as approach all accidents in an orderly,
    stepwise fashion and do not move the injured person
    if there is risk of head or spine injury.
    Take a course in first aid and make a plan for continuing the trip,
    self-evacuation, or getting help. Have a vehicle survival kit in case
    the vehicle breaks down or gets stuck.`
}
```

## Real-World Applications

- **Research**: Quickly retrieve specific information from large research papers or datasets.
- **Legal**: Search through lengthy legal documents to find clauses or specific references.
- **Education**: Teachers can use it to extract specific topics or answers from textbooks or reference materials.
- **Journalism**: Find relevant information from large articles or sources.
- **Data Analysis**: Efficiently extract and analyze specific data points from larger datasets.
- **Medical**: Search through medical documents to find specific information or references.
- **Business**: Quickly retrieve specific information from large business documents or datasets.
- **Finance**: Search through lengthy financial documents to find specific information or references.
- **Marketing**: Quickly retrieve specific information from large marketing documents or datasets.
- **Sales**: Search through lengthy sales documents to find specific information or references.
- **Customer Service**: Quickly retrieve specific information from large customer service documents or datasets.
