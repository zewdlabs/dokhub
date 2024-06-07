import { StreamingTextResponse, streamText } from "ai";
import { ollama } from "ollama-ai-provider";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const result = await streamText({
      maxTokens: 64,
      model: ollama("llama3"),
      prompt: `You are a helpful AI model that is used to generate a title based on the chat history. 
When given the chat history, you should generate a title that is relevant to the conversation.
Make it at max 50 characters long. The text should summarize the conversation in a way that makes it easy to understand the context of the conversation.
Just respond with the title and only the title. 

Here is an example

chat history: "Hey, how are you doing?"
title: "A friendly greeting"

chat history: "hey, there"
title: "A short greeting"

chat history: "I need help with my homework"
title: "Homework help needed"

chat history: ${prompt}

REMEMBER: just respond with the title and only the title. it should be at max 50 characters long. preferrably shorter with only two to three words max just like the examples above.
`,
      temperature: 0.7,
    });

    return new StreamingTextResponse(result.toAIStream());
  } catch (e) {
    console.error(e);
  }
}
