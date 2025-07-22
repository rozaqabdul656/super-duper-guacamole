import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
export const runtime = "edge";
export const maxDuration = 30;

const fireworks = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
  baseURL: 'https://openrouter.ai/api/v1',
});
const isIntentPrompt = (msg: string) =>
  /(please\s)?(swap|send|transfer|stake|unstake|bridge|buy|sell|mint)\b/i.test(msg);

export async function POST(req: Request) {
  const { messages: userMessages, tools } = await req.json();
  const latestMsg = userMessages.at(-1)?.content ?? "";

  const system = isIntentPrompt(latestMsg[0].text)
    ? `
      You are a DeFi transaction assistant.
      Your job is to extract transaction intent and return it as raw JSON only.

      JSON structure must look like this:
      {
        "action": "transfer",
        "token": "USDC",
        "amount": 50,
        "recipient": "0xabc...",
        "chain": "ethereum"
      }

      Do NOT include any explanations or markdown. Only return valid JSON.
    `
    : `
      You are a helpful DeFi assistant.
      Answer questions normally and conversationally.
    `;
  const result = streamText({
     system,
    // model: openai("gpt-4o"),
    model: fireworks("qwen/qwen3-235b-a22b-07-25:free"),
    messages: userMessages,
    // forward system prompt and tools from the frontend
    toolCallStreaming: true,
    // system,
    tools: {
      ...frontendTools(tools),
    },
    onError: console.log
  });

  return result.toDataStreamResponse();
}
