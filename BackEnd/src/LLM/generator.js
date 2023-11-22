/*
Useful Resources:

Assistant API: https://www.youtube.com/watch?v=Kn6k6ocEaK4&ab_channel=LiamOttley
Cover Letter Generation Idea: https://towardsdatascience.com/10-exciting-project-ideas-using-large-language-models-llms-for-your-portfolio-970b7ab4cf9e#a4d6

Langchain: https://www.youtube.com/watch?v=2xxziIWmaSA&ab_channel=GregKamradt%28DataIndy%29

CODE:
simple (js, API): https://github.com/orlando70/cover-letter-generator/tree/master
complicated (python, langchain): https://github.com/vinura/cover_generator_app?source=post_page-----be0813ba77e2--------------------------------
complicated article: https://vinuraperera.medium.com/i-decided-to-automate-writing-cover-letters-using-ai-and-you-can-use-what-i-built-be0813ba77e2

*/

import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatGPTPluginRetriever } from "langchain/retrievers/remote";
import { OpenAIModerationChain } from "langchain/chains";
import { PromptTemplate } from "langchain/dist/prompts/prompt";

// Get rid of this line later
// import "dotenv/config";

// console.log(process.env.SESSION_NAME)

const llm = new OpenAI({
  modelName: "gpt-3.5-turbo-1106",
  temperature: 1.4,
  openAIApiKey: "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",
  // temperature controls how random the output -> higher the less deterministic
});

const chatModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-1106",
  temperature: 1.4,
  openAIApiKey: "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",
});

const text =
  "Hello, can you please generate a cover letter for me? I am applying for a software engineer job at Google. I am a graduate of UCLA pursuing a BS in Computer Science and am very passioante in both algorithms and AI. Please keep the cover letter engaging, persuasive, and also professional. Also keep it short and not too long. Thank you so much!";

const llmResult = await llm.predict(text);
const chatResult = await chatModel.predict(text);

console.log(llmResult);
console.log(chatResult);


// later we will use information about the entire job listing
const simplePrompt = PromptTemplate.fromTemplate(`
Hope you are doing well! I am a cover letter writer and I need your help crafting a perfect letter for a job seeker named {name} at email {email} and phone number {phoneNumber}. They are applying to work at {company} as a {position}, and they have the following experiences: {experiences}. Can you please use information about what recruiters like to write a perfect cover letter? Make sure to highlight their relevant experience and skills which are relevant to the job, and explain why they are a great fit for the position. Please keep it engaging, persuasive, and also professional. Also keep it short and not too long. Thank you so much!
`);

const formattedPrompt = await prompt.format({
  name: "Jerry",
  email: "Jerry@gmail.com",
  phoneNumber: "123123123",
  company: "Apple",
  position: "Software Engineer",
  experiences: []
})



// async function generateAndStoreEmbeddings() {
//   // STEP 1: Load the data
//   const trainingText = fs.readFileSync("training-data.txt", "utf8");

//   // STEP 2: Split the data into chunks
//   const textSplitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 1000,
//   });

//   // STEP 3: Create documents
//   const docs = await textSplitter.createDocuments([trainingText]);

//   // STEP 4: Generate embeddings from documents
//   const vectorStore = await HNSWLib.fromDocuments(
//     docs,
//     new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
//   );

//   // STEP 5: Save the vector store
//   vectorStore.save("hnswlib");
// }

// async function getAnswer(question) {
//   // STEP 1: Load the vector store
//   const vectorStore = await HNSWLib.load(
//     "hnswlib",
//     new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
//   );

//   // STEP 2: Create the chain
//   const chain = new RetrievalQAChain({
//     combineDocumentsChain: loadQARefineChain(model),
//     retriever: vectorStore.asRetriever(),
//   });

//   // STEP 3: Get the answer
//   const result = await chain.call({
//     query: question,
//   });

//   return result.output_text;
// }
