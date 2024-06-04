import { ChatOllama } from "langchain/chat_models/ollama";

export const StreamingModel = new ChatOllama({
  baseUrl: process.env.OLLAMA_BASE_URL,
  model: process.env.OLLAMA_MODEL_NAME,
  temperature: 0.4,
});

export const NonStreamingModel = new ChatOllama({
  baseUrl: process.env.OLLAMA_BASE_URL,
  model: "llama3:latest",
  temperature: 0,
});
