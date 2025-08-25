import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
  EMBEDDINGS_PROVIDER: z.literal("openai").default("openai"),

  OPENAI_API_KEY: z.string().optional(),
  OPENAI_EMBEDDING_MODEL: z
    .string()
    .default("text-embedding-3-small"),

  CHROMA_URL: z.string().default("http://localhost:8000"),
  CHROMA_COLLECTION: z.string().default("sample_docs"),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten());
  process.exit(1);
}

export type AppConfig = z.infer<typeof EnvSchema>;

export const config: AppConfig = parsed.data;

export function assertProviderConfig(cfg: AppConfig): void {
  if (cfg.EMBEDDINGS_PROVIDER === "openai") {
    if (!cfg.OPENAI_API_KEY) {
      throw new Error(
        "OPENAI_API_KEY is required when EMBEDDINGS_PROVIDER=openai"
      );
    }
  }
}


