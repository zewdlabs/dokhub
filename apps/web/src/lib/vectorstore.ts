import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";

export async function getVectorStore(QdrantClient: QdrantClient) {
  try {
    const embeddings = new OllamaEmbeddings({
      model: "nomic-embed-text",
      baseUrl: process.env.OLLAMA_BASE_URL!,
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        client: QdrantClient,
        url: process.env.QDRANT_URL!,
        collectionName: process.env.QDRANT_COLLECTION_NAME!,
      },
    );

    return vectorStore;
  } catch (error) {
    console.error(error);
  }
}
