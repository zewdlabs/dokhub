import { getQdrantClient } from "@/lib/ai/vector-store";
import { QdrantVectorStore } from "@langchain/qdrant";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";
import {
  Runnable,
  RunnableSequence,
  RunnableMap,
  RunnableBranch,
  RunnableLambda,
} from "@langchain/core/runnables";
import { REPHRASE_TEMPLATE, RESPONSE_TEMPLATE } from "@/lib/ai/template";
import {
  PromptTemplate,
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import type { Document } from "@langchain/core/documents";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { NextRequest, NextResponse } from "next/server";
import { LangChainAdapter, Message, StreamingTextResponse } from "ai";

export const dynamic = "force-dynamic";

type RetrievalChainInput = {
  chat_history: string;
  question: string;
};

const getRetriever = async () => {
  const client = await getQdrantClient();

  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: process.env.OLLAMA_BASE_URL!,
  });

  const retriever = (
    await QdrantVectorStore.fromExistingCollection(embeddings, {
      url: process.env.QDRANT_URL!,
      collectionName: process.env.QDRANT_COLLECTION_NAME!,
      client: client,
    })
  ).asRetriever({
    k: 6,
  });

  return retriever;
};

const createRetrieverChain = (llm: BaseChatModel, retriever: Runnable) => {
  // Small speed/accuracy optimization: no need to rephrase the first question
  // since there shouldn't be any meta-references to prior chat history
  const CONDENSE_QUESTION_PROMPT =
    PromptTemplate.fromTemplate(REPHRASE_TEMPLATE);
  const condenseQuestionChain = RunnableSequence.from([
    CONDENSE_QUESTION_PROMPT,
    llm,
    new StringOutputParser(),
  ]).withConfig({
    runName: "CondenseQuestion",
  });
  const hasHistoryCheckFn = RunnableLambda.from(
    (input: RetrievalChainInput) => input.chat_history.length > 0,
  ).withConfig({ runName: "HasChatHistoryCheck" });
  const conversationChain = condenseQuestionChain.pipe(retriever).withConfig({
    runName: "RetrievalChainWithHistory",
  });
  const basicRetrievalChain = RunnableLambda.from(
    (input: RetrievalChainInput) => input.question,
  )
    .withConfig({
      runName: "Itemgetter:question",
    })
    .pipe(retriever)
    .withConfig({ runName: "RetrievalChainWithNoHistory" });

  return RunnableBranch.from([
    [hasHistoryCheckFn, conversationChain],
    basicRetrievalChain,
  ]).withConfig({
    runName: "FindDocs",
  });
};

const formatDocs = (docs: Document[]) => {
  return docs
    .map((doc, i) => `<doc id='${i}'>${doc.pageContent}</doc>`)
    .join("\n");
};

const formatChatHistoryAsString = (history: BaseMessage[]) => {
  return history
    .map((message) => `${message._getType()}: ${message.content}`)
    .join("\n");
};

const serializeHistory = (input: any) => {
  const chatHistory = input.chat_history || [];
  const convertedChatHistory = [];
  for (const message of chatHistory) {
    if (message.human !== undefined) {
      convertedChatHistory.push(new HumanMessage({ content: message.human }));
    }
    if (message["ai"] !== undefined) {
      convertedChatHistory.push(new AIMessage({ content: message.ai }));
    }
  }
  return convertedChatHistory;
};

const createChain = (llm: BaseChatModel, retriever: Runnable) => {
  const retrieverChain = createRetrieverChain(llm, retriever);
  const context = RunnableMap.from({
    context: RunnableSequence.from([
      ({ question, chat_history }) => ({
        question,
        chat_history: formatChatHistoryAsString(chat_history),
      }),
      retrieverChain,
      RunnableLambda.from(formatDocs).withConfig({
        runName: "FormatDocumentChunks",
      }),
    ]),
    question: RunnableLambda.from(
      (input: RetrievalChainInput) => input.question,
    ).withConfig({
      runName: "Itemgetter:question",
    }),
    chat_history: RunnableLambda.from(
      (input: RetrievalChainInput) => input.chat_history,
    ).withConfig({
      runName: "Itemgetter:chat_history",
    }),
  }).withConfig({ tags: ["RetrieveDocs"] });

  // return 2 of the sources
  console.log("context", context);

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", RESPONSE_TEMPLATE],
    new MessagesPlaceholder("chat_history"),
    ["user", "{question}"],
  ]);

  const responseSynthesizerChain = RunnableSequence.from([
    prompt,
    llm,
    new StringOutputParser(),
  ]).withConfig({
    tags: ["GenerateResponse"],
  });

  return RunnableSequence.from([
    {
      question: RunnableLambda.from(
        (input: RetrievalChainInput) => input.question,
      ).withConfig({
        runName: "Itemgetter:question",
      }),
      chat_history: RunnableLambda.from(serializeHistory).withConfig({
        runName: "SerializeHistory",
      }),
    },
    context,
    responseSynthesizerChain,
  ]);
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: Message[] };

    const input = {
      chat_history: messages,
      question: messages[messages.length - 1].content,
    };

    console.log();

    const llm = new ChatOllama({
      baseUrl: process.env.OLLAMA_BASE_URL,
      model: "llama3:latest",
      temperature: 0.4,
    });

    const retriever = await getRetriever();
    const answerChain = createChain(llm, retriever);

    const chainStream = await answerChain.stream(input);

    const stream = LangChainAdapter.toAIStream(chainStream);

    return new StreamingTextResponse(stream);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: (e as unknown as Error).message },
      { status: 500 },
    );
  }
}
