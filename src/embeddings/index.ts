import { config } from "../config";
import { createOpenAIEmbeddings } from "./openai";

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


