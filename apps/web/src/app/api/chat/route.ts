import {
  StreamingTextResponse,
  Message,
  experimental_StreamData,
  LangChainStream,
} from "ai";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { getQdrantClient } from "@/lib/qdrant-client";
import { QdrantVectorStore } from "@langchain/qdrant";
import { ConversationalRetrievalQAChain } from "langchain/chains";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: Message[] };

  const contextSearchModel = new ChatOllama({
    baseUrl: process.env.OLLAMA_BASE_URL,
    model: "llama3:latest",
    temperature: 0,
  });

  const chatModel = new ChatOllama({
    baseUrl: process.env.OLLAMA_BASE_URL,
    model: process.env.OLLAMA_MODEL_NAME,
    temperature: 0.4,
  });

  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: process.env.OLLAMA_BASE_URL!,
  });

  const formattedPreviousMessages = messages.slice(0, -1).map(parseMessages);

  const question = messages[messages.length - 1].content;

  try {
    // Open AI recommendation
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");

    const qdrantClient = await getQdrantClient();

    const vectorStore = await QdrantVectorStore.fromDocuments([], embeddings, {
      url: process.env.QDRANT_URL!,
      collectionName: process.env.QDRANT_COLLECTION_NAME!,
      client: qdrantClient,
    });

    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });
    const data = new experimental_StreamData();

    // Creates a standalone question from the chat-history and the current question
    const STANDALONE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

    // Actual question you ask the chat and send the response to client
    const QA_TEMPLATE = `You are a medical assistant expert specifically trained on medical books.
If the user asks something that does not exist within the provided context, Answer the question and add, at the end: 'This is not a 100% reliable. So make your research before using the information you received just now'.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
{context}

Question: {question}
Helpful answer in markdown:`;

    const chain = ConversationalRetrievalQAChain.fromLLM(
      chatModel,
      vectorStore.asRetriever(),
      {
        qaTemplate: QA_TEMPLATE,
        returnSourceDocuments: true, //default 4
        returnGeneratedQuestion: false, //default false
        questionGeneratorChainOptions: {
          llm: contextSearchModel,
          template: STANDALONE_QUESTION_TEMPLATE,
        },
      },
    );

    // Question using chat-history
    // Reference https://js.langchain.com/docs/modules/chains/popular/chat_vector_db#externally-managed-memory
    chain
      .call(
        {
          question: sanitizedQuestion,
          chat_history: formattedPreviousMessages.join("\n"),
        },
        [handlers],
      )
      .then(async (res) => {
        const sourceDocuments = res?.sourceDocuments;
        const firstTwoDocuments = sourceDocuments.slice(0, 2);
        const pageContents = firstTwoDocuments.map(
          ({ pageContent }: { pageContent: string }) => pageContent,
        );
        console.log("already appended ", data);
        data.append({
          sources: pageContents,
        });
        data.close();
      });

    // Return the readable stream
    return new StreamingTextResponse(stream, {}, data);
  } catch (e) {
    console.error(e);
    throw new Error("Call chain method failed to execute successfully!!");
  }
}

function parseMessages(m: Message) {
  return m.role == "user"
    ? new HumanMessage(m.content)
    : m.role == "system"
      ? new SystemMessage(m.content)
      : new AIMessage(m.content);
}
