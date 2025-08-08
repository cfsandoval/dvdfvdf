import { openai } from "@/app/openai";
import { documentStore, cosineSimilarity } from "../store";

export async function POST(request: Request) {
  const { question } = await request.json();
  if (!question) {
    return new Response("Missing question", { status: 400 });
  }

  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
  });
  const queryVector = embedding.data[0].embedding;

  const ranked = documentStore
    .map((doc) => ({
      ...doc,
      score: cosineSimilarity(queryVector, doc.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const context = ranked.map((r) => `${r.source}: ${r.content}`).join("\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Responde a la pregunta usando el contexto proporcionado. Cita la fuente cuando sea posible.",
      },
      {
        role: "user",
        content: `Contexto:\n${context}\n\nPregunta: ${question}`,
      },
    ],
  });

  return Response.json({
    answer: completion.choices[0].message?.content,
    sources: ranked.map((r) => ({ source: r.source, snippet: r.content })),
  });
}
