import Anthropic from "@anthropic-ai/sdk";
import { BaseLLMProvider } from "./base";
import {
  ChatMessage,
  CompletionResponse,
  LLMConfig,
  StreamingResponse,
} from "../types";

export class AnthropicProvider extends BaseLLMProvider {
  private client: Anthropic;

  constructor(config: LLMConfig) {
    super(config);
    this.client = new Anthropic({ apiKey: config.apiKey });
  }

  async chat(messages: ChatMessage[]): Promise<CompletionResponse> {
    // Handle system messages by prepending them to the first user message
    let systemMessage = "";
    const formattedMessages = messages.reduce(
      (acc: { role: "user" | "assistant"; content: string }[], msg) => {
        if (msg.role === "system") {
          systemMessage += msg.content + "\n";
          return acc;
        }

        if (msg.role === "user" && systemMessage && acc.length === 0) {
          // Prepend system message to first user message
          acc.push({
            role: "user",
            content: `${systemMessage}${msg.content}`,
          });
        } else {
          acc.push({
            role: msg.role === "assistant" ? "assistant" : "user",
            content: msg.content,
          });
        }
        return acc;
      },
      []
    );

    const response = await this.client.messages.create({
      model: this.config.model || "claude-3-opus-20240229",
      messages: formattedMessages,
      max_tokens: this.config.maxTokens,
      temperature: this.config.temperature,
    });

    // Get the content from the response, handling both text and tool use blocks
    const content =
      response.content[0].type === "text"
        ? response.content[0].text
        : "Tool use response";

    return {
      content,
      model: response.model,
      usage: {
        promptTokens: response.usage?.input_tokens || 0,
        completionTokens: response.usage?.output_tokens || 0,
        totalTokens:
          (response.usage?.input_tokens || 0) +
          (response.usage?.output_tokens || 0),
      },
    };
  }

  async complete(prompt: string): Promise<CompletionResponse> {
    return this.chat([{ role: "user", content: prompt }]);
  }

  async stream(
    messages: ChatMessage[],
    onToken: (response: StreamingResponse) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      // Handle system messages
      let systemMessage = "";
      const formattedMessages = messages.reduce(
        (acc: { role: "user" | "assistant"; content: string }[], msg) => {
          if (msg.role === "system") {
            systemMessage += msg.content + "\n";
            return acc;
          }

          if (msg.role === "user" && systemMessage && acc.length === 0) {
            acc.push({
              role: "user",
              content: `${systemMessage}${msg.content}`,
            });
          } else {
            acc.push({
              role: msg.role === "assistant" ? "assistant" : "user",
              content: msg.content,
            });
          }
          return acc;
        },
        []
      );

      const stream = await this.client.messages.create({
        model: this.config.model || "claude-3-opus-20240229",
        messages: formattedMessages,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        stream: true,
      });

      const modelName = this.config.model || "claude-3-opus-20240229";
      let accumulatedContent = "";

      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          accumulatedContent += chunk.delta.text;

          onToken({
            content: accumulatedContent,
            isComplete: false,
            model: modelName,
          });
        }
      }

      onToken({
        content: accumulatedContent,
        isComplete: true,
        model: modelName,
      });
    } catch (error) {
      if (onError) {
        onError(error as Error);
      } else {
        throw error;
      }
    }
  }
}
