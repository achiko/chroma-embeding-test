import { ChromaClient } from "chromadb";
import { assertProviderConfig, config } from "./config";
import { createEmbeddingsService } from "./embeddings";

async function main() {
  assertProviderConfig(config);

  const client = new ChromaClient({ path: config.CHROMA_URL });
  const collection = await client.getOrCreateCollection({
    name: config.CHROMA_COLLECTION,
    metadata: { provider: config.EMBEDDINGS_PROVIDER },
  });

  const docs = [
    "ChromaDB is a vector database for building AI applications.",
    "OpenAI provides high-quality embedding models.",
  ];
  const ids = docs.map((_, i) => `doc-${i + 1}`);
  const metadatas = docs.map((_, i) => ({ index: i }));

  const embeddings = createEmbeddingsService();
  const vectors = await embeddings.embedMany(docs);

  await collection.upsert({ ids, documents: docs, metadatas, embeddings: vectors });
  console.log(`Upserted ${docs.length} documents into collection '${config.CHROMA_COLLECTION}'.`);

  const query = "What is ChromaDB?";
  const queryEmbedding = await embeddings.embedOne(query);
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 3,
  });

  console.log("Query:", query);
  console.log("Results:", JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


