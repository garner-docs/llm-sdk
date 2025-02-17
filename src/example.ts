import { UniversalLLM } from "./index";

async function main() {
  // Initialize OpenAI client
  const openai = new UniversalLLM({
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY || "",
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 1000,
  });

  try {
    // Example 1: Simple completion with OpenAI
    console.log("\nExample 1: Simple completion with OpenAI");
    const completion = await openai.complete(
      "What are the three fundamental laws of robotics?"
    );
    console.log("Response:", completion.content);
    console.log("Token Usage:", completion.usage);
  } catch (err) {
    console.error(err);
  }
}

// Run the examples
main().catch(console.error);
