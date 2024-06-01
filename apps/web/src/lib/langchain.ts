import { ConversationalRetrievalQAChain } from "langchain/chains";
import { getVectorStore } from "./vectorstore";
import { getQdrantClient } from "./qdrant-client";
import {
  StreamingTextResponse,
  experimental_StreamData,
  LangChainStream,
} from "ai";
import { StreamingModel, NonStreamingModel } from "./llm";
import { STANDALONE_QUESTION_TEMPLATE, QA_TEMPLATE } from "./templates";

type callChainArgs = {
  question: string;
  chatHistory: string;
};

export async function callChain({ question, chatHistory }: callChainArgs) {
  try {
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    const qdrantClient = await getQdrantClient();
    const vectorStore = await getVectorStore(qdrantClient);
    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });
    const data = new experimental_StreamData();

    const chain = ConversationalRetrievalQAChain.fromLLM(
      StreamingModel,
      vectorStore?.asRetriever({
        searchKwargs: {
          lambda: 0.6,
        },
      })!,
      {
        qaTemplate: QA_TEMPLATE,
        questionGeneratorTemplate: STANDALONE_QUESTION_TEMPLATE,
        returnSourceDocuments: true,
        returnGeneratedQuestion: false,
        questionGeneratorChainOptions: {
          llm: NonStreamingModel,
        },
      },
    );

    // Question using chat-history
    // Reference https://js.langchain.com/docs/modules/chains/popular/chat_vector_db#externally-managed-memory
    chain
      .call(
        {
          question: sanitizedQuestion,
          chat_history: chatHistory,
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
