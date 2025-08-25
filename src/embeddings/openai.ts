import OpenAI from "openai";
import type { EmbeddingsService } from "./index.js";

export function createOpenAIEmbeddings(params: {
  apiKey: string;
  model: string;
}): EmbeddingsService {
  const client = new OpenAI({ apiKey: params.apiKey });

  async function embedOne(text: string): Promise<number[]> {
    const res = await client.embeddings.create({
      model: params.model,
      input: text,
    });
    return res.data[0].embedding as unknown as number[];
  }

  async function embedMany(texts: string[]): Promise<number[][]> {
    const res = await client.embeddings.create({
      model: params.model,
      input: texts,
    });
    return res.data.map((d) => d.embedding as unknown as number[]);
  }

  return { embedOne, embedMany };
}


