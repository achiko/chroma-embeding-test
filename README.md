# ChromaDB TypeScript Sample

Minimal TypeScript sample using ChromaDB with OpenAI embeddings via environment variables.

## Prerequisites
- Node.js 18.17+
- Docker (to run a local Chroma server)
- API key for your chosen embeddings provider

## Quick start
1) Install dependencies
```bash
npm install
```

2) Create your env file
```bash
# create .env in the project root and paste the example below
```

Example `.env` content (OpenAI provider):
```bash
EMBEDDINGS_PROVIDER=openai
OPENAI_API_KEY=sk-your-key
# Optional: change model
OPENAI_EMBEDDING_MODEL=text-embedding-3-small

# Chroma
CHROMA_URL=http://localhost:8000
CHROMA_COLLECTION=sample_docs
```

3) Start a Chroma server (Docker)
```bash
docker run -d -p 8000:8000 --name chroma ghcr.io/chroma-core/chroma:latest
```

4) Run the sample
```bash
npm run dev
```
This will embed a few example docs, upsert them to Chroma, and perform a similarity query.

 

## Scripts
- dev: run TypeScript directly with tsx
```bash
npm run dev
```
- build: compile to `dist/`
```bash
npm run build
```
- start: run compiled output
```bash
npm start
```

## Troubleshooting
- 401/403 errors: verify your API key and provider selection in `.env`.
- Connection errors to Chroma: ensure the Docker container is running and `CHROMA_URL` matches.
- Mixed embedding dimensions: avoid mixing providers/models in the same collection; create a new collection after switching models/providers.

## Project structure
```
src/
  config.ts                 # .env loader and validation
  embeddings/
    index.ts                # provider factory
    openai.ts               # OpenAI embeddings implementation
  index.ts                  # sample: upsert + query
```
