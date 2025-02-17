import OpenAI from "openai";
import { BaseLLMProvider } from "./base";
import { ChatMessage, CompletionResponse, LLMConfig } from "../types";

export class OpenAIProvider extends BaseLLMProvider {
  private client: OpenAI;

  constructor(config: LLMConfig) {
    super(config);
    this.client = new OpenAI({ apiKey: config.apiKey });
  }

  async chat(messages: ChatMessage[]): Promise<CompletionResponse> {
    const response = await this.client.chat.completions.create({
      model: this.config.model || "gpt-3.5-turbo",
      messages,
      temperature: this.config.temperature || 0.7,
      max_tokens: this.config.maxTokens,
    });

    return {
      content: response.choices[0].message.content || "",
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      },
      model: response.model,
    };
  }

  async complete(prompt: string): Promise<CompletionResponse> {
    return this.chat([{ role: "user", content: prompt }]);
  }
}
