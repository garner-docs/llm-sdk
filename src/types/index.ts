export interface LLMConfig {
  provider: "openai" | "anthropic" | "other";
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens: number;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface CompletionResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
}
