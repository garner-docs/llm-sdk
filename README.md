# Universal LLM SDK

A powerful TypeScript SDK that provides a unified interface for interacting with multiple Language Model providers. Write once, run with any LLM.

[![npm version](https://badge.fury.io/js/universal-llm-sdk.svg)](https://www.npmjs.com/package/universal-llm-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📚 Documentation

For detailed documentation, visit our [official docs](https://garner-b2a9ac12.mintlify.app/introduction).

## ✨ Features

- 🤝 Unified interface for multiple LLM providers
- 📝 Type-safe API with full TypeScript support
- 🔌 Easy to extend for new providers
- 🎯 Consistent response format across providers
- 🛡️ Built-in error handling
- 📊 Token usage tracking

## 🚀 Quickstart

### Installation

```bash
npm install universal-llm-sdk
```

### Basic Usage

```typescript
import { UniversalLLM } from "universal-llm-sdk";

// Initialize with OpenAI
const llm = new UniversalLLM({
  provider: "openai",
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4",
  maxTokens: 1000,
});

// Simple completion
const response = await llm.complete("What is the capital of France?");
console.log(response.content);

// Chat conversation
const chatResponse = await llm.chat([
  {
    role: "system",
    content: "You are a helpful assistant.",
  },
  {
    role: "user",
    content: "Explain quantum computing simply.",
  },
]);
console.log(chatResponse.content);
```

### Using Different Providers

```typescript
// OpenAI
const openai = new UniversalLLM({
  provider: "openai",
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4",
  maxTokens: 1000,
});

// Anthropic
const anthropic = new UniversalLLM({
  provider: "anthropic",
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: "claude-3-opus-20240229",
  maxTokens: 1000,
});
```

## 🔧 Configuration

Create a `.env` file in your project root:

```env
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
```

## 🤝 Supported Providers

- OpenAI (GPT-3.5, GPT-4)
- Anthropic (Claude)
- More coming soon!

## 📖 Examples

Check out `src/example.ts` for more detailed examples including:

- Multi-turn conversations
- System prompts
- Error handling
- Response metadata

## 🤔 Need Help?

- 📚 [Official Documentation](https://garner-b2a9ac12.mintlify.app/introduction)
- 🐛 [Report Issues](https://github.com/yourusername/universal-llm-sdk/issues)
- 💡 [Feature Requests](https://github.com/yourusername/universal-llm-sdk/issues)

## 📄 License

MIT © Garner
