import { openai } from "@/app/openai";
import pdf from "pdf-parse";
import { documentStore, DocumentChunk } from "../store";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return new Response("Missing file", { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const data = await pdf(buffer);
  const chunks = data.text
    .split(/\n+/)
    .map((t) => t.trim())
    .filter(Boolean);

  for (const content of chunks) {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: content,
    });
    const chunk: DocumentChunk = {
      id: `${Date.now()}-${Math.random()}`,
      content,
      embedding: embedding.data[0].embedding,
      source: file.name,
    };
    documentStore.push(chunk);
  }

  return Response.json({ added: chunks.length });
}
