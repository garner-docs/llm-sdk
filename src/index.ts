import { OpenAIProvider } from "./providers/openai";
import { AnthropicProvider } from "./providers/anthropic";
import { BaseLLMProvider } from "./providers/base";
import { LLMConfig, ChatMessage, CompletionResponse } from "./types";

export class UniversalLLM {
  private provider: BaseLLMProvider;

  constructor(config: LLMConfig) {
    switch (config.provider) {
      case "openai":
        this.provider = new OpenAIProvider(config);
        break;
      case "anthropic":
        this.provider = new AnthropicProvider(config);
        break;
      default:
        throw new Error(`Unsupported provider: ${config.provider}`);
    }
  }

  async chat(messages: ChatMessage[]): Promise<CompletionResponse> {
    return this.provider.chat(messages);
  }

  async complete(prompt: string): Promise<CompletionResponse> {
    return this.provider.complete(prompt);
  }
}

export { LLMConfig, ChatMessage, CompletionResponse };
