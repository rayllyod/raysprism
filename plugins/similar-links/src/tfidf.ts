// Minimal, dependency-free TF-IDF + cosine similarity. No embeddings
// service, no network calls — everything here runs at build time only.

const STOPWORDS = new Set([
  "the", "and", "for", "are", "but", "not", "you", "all", "any", "can",
  "had", "her", "was", "one", "our", "out", "day", "get", "has", "him",
  "his", "how", "man", "new", "now", "old", "see", "two", "way", "who",
  "did", "its", "let", "put", "say", "she", "too", "use", "with", "this",
  "that", "from", "have", "will", "your", "they", "been", "were", "than",
  "then", "when", "what", "which", "their", "there", "about", "into",
  "over", "such", "some", "more", "most", "also", "just", "like", "only",
  "even", "here", "them", "each", "other", "because", "while", "still",
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export type TfIdfVector = Map<string, number>;

/** One TF-IDF vector per input token list, over the shared corpus vocabulary. */
export function computeTfIdf(docs: string[][]): TfIdfVector[] {
  const documentFrequency = new Map<string, number>();
  for (const tokens of docs) {
    for (const term of new Set(tokens)) {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
    }
  }

  const totalDocs = docs.length;
  return docs.map((tokens) => {
    const termFrequency = new Map<string, number>();
    for (const term of tokens) {
      termFrequency.set(term, (termFrequency.get(term) ?? 0) + 1);
    }

    const vector: TfIdfVector = new Map();
    for (const [term, count] of termFrequency) {
      const df = documentFrequency.get(term) ?? 0;
      const idf = Math.log(totalDocs / (1 + df));
      vector.set(term, (count / tokens.length) * idf);
    }
    return vector;
  });
}

export function cosineSimilarity(a: TfIdfVector, b: TfIdfVector): number {
  let normA = 0;
  for (const v of a.values()) normA += v * v;
  let normB = 0;
  for (const v of b.values()) normB += v * v;
  if (normA === 0 || normB === 0) return 0;

  const [smaller, larger] = a.size <= b.size ? [a, b] : [b, a];
  let dot = 0;
  for (const [term, v] of smaller) {
    const other = larger.get(term);
    if (other) dot += v * other;
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
