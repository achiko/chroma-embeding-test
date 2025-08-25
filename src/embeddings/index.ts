import { config } from "../config.js";
import { createOpenAIEmbeddings } from "./openai.js";

export interface EmbeddingsService {
  embedOne(text: string): Promise<number[]>;
  embedMany(texts: string[]): Promise<number[][]>;
}

export function createEmbeddingsService(): EmbeddingsService {
  return createOpenAIEmbeddings({
    apiKey: config.OPENAI_API_KEY!,
    model: config.OPENAI_EMBEDDING_MODEL,
  });
}


