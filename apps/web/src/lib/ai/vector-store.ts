import { QdrantClient } from "@qdrant/js-client-rest";

let QdrantClientInstance: QdrantClient | null = null;

export async function getQdrantClient() {
  if (QdrantClientInstance) {
    return QdrantClientInstance;
  }

  QdrantClientInstance = new QdrantClient({
    url: process.env.QDRANT_URL!,
  });

  return QdrantClientInstance;
}
