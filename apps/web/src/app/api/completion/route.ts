import { StreamingTextResponse, streamText } from "ai";
import { ollama } from "ollama-ai-provider";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const result = await streamText({
      maxTokens: 1024,
      model: ollama("llama3"),
      prompt: `You are a helpful AI embedded assistant in a text editor app that is used to autocomplete sentences The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness. 
    AI is a well-behaved and well-mannered individual. AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. Just respond with the completed text. 
    the start of the text you'll continue will be provided as user: followed by the chunk of text you will continue to follow. 
    Remember, you are helping in writing of a post similar to a blog. Also Do not repreat the prompt.
    
    user: ${prompt}
`,
      temperature: 0.2,
    });

    return new StreamingTextResponse(result.toAIStream());
  } catch (e) {
    console.error(e);
  }
}
