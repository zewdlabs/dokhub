import { StreamingTextResponse, Message } from "ai";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { BytesOutputParser } from "@langchain/core/output_parsers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = new ChatOllama({
    baseUrl: process.env.OLLAMA_BASE_URL,
    model: "dokbot-llama:8b",
  });

  const parser = new BytesOutputParser();

  const stream = await model
    .pipe(parser)
    .stream(
      (messages as Message[]).map((m) =>
        m.role == "user"
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      ),
    );

  return new StreamingTextResponse(stream);
}
