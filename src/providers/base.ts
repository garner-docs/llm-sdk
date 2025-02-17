import {
  LLMConfig,
  ChatMessage,
  CompletionResponse,
  StreamingResponse,
} from "../types";

export abstract class BaseLLMProvider {
  protected config: LLMConfig;

  constructor(config: LLMConfig) {
    this.config = config;
  }

  abstract chat(messages: ChatMessage[]): Promise<CompletionResponse>;
  abstract complete(prompt: string): Promise<CompletionResponse>;
  abstract stream(
    messages: ChatMessage[],
    onToken: (response: StreamingResponse) => void,
    onError?: (error: Error) => void
  ): Promise<void>;
}
