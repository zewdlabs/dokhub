import { QdrantVectorStore } from "@langchain/qdrant";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import path from "path";

(async (): Promise<QdrantVectorStore> => {
  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: process.env.OLLAMA_BASE_URL!,
  });

  const directoryLoader = new DirectoryLoader(
    path.join(process.cwd(), "docs"),
    {
      ".pdf": (path: string) => new PDFLoader(path),
    },
  );

  const docs = await directoryLoader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });

  const chunkedDocs = await textSplitter.splitDocuments(docs);

  console.log("Loaded", chunkedDocs.length, "documents");
  console.info("Collection exists");
  console.log("Uploading documents to Qdrant");

  const vectorStore = await QdrantVectorStore.fromDocuments(
    chunkedDocs,
    embeddings,
    {
      collectionConfig: {
        vectors: {
          size: 768,
          distance: "Cosine",
        },
      },
      url: process.env.QDRANT_URL!,
      collectionName: process.env.QDRANT_COLLECTION_NAME!,
    },
  );

  return vectorStore;
})();
