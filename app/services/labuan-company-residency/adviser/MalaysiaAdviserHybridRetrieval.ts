import type { AdviserKnowledgeEntry } from "./LabuanKnowledge";
import { labuanKnowledge } from "./LabuanKnowledge";
import { malaysiaCostKnowledge } from "./MalaysiaCostKnowledge";
import { malaysiaFoodKnowledge } from "./MalaysiaFoodKnowledge";
import { malaysiaGeneralKnowledge } from "./MalaysiaGeneralKnowledge";
import { malaysiaHotelKnowledge } from "./MalaysiaHotelKnowledge";
import { malaysiaTaxResidencyKnowledge } from "./MalaysiaTaxResidencyKnowledge";
import { malaysiaTourismKnowledge } from "./MalaysiaTourismKnowledge";
import { malaysiaTravelClimateKnowledge } from "./MalaysiaTravelClimateKnowledge";
import { detectMalaysiaAdviserIntent, scoreMalaysiaAdviserEntry } from "./MalaysiaAdviserMatcher";

export type HybridKnowledgeMatch = {
  entry: AdviserKnowledgeEntry;
  score: number;
};

const broadMalaysiaKnowledge: AdviserKnowledgeEntry[] = [
  ...malaysiaHotelKnowledge,
  ...malaysiaTourismKnowledge,
  ...malaysiaTravelClimateKnowledge,
  ...malaysiaCostKnowledge,
  ...malaysiaFoodKnowledge,
  ...malaysiaGeneralKnowledge,
];

const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "can", "could", "do", "does", "for",
  "from", "have", "how", "i", "in", "is", "it", "me", "my", "of", "on", "or", "our",
  "the", "to", "us", "we", "what", "when", "where", "which", "with", "would", "you",
  "your", "like", "about",
]);

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9%$,. -]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value: string) {
  return normalise(value)
    .split(" ")
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

function supportingScore(question: string, entry: AdviserKnowledgeEntry) {
  const questionTokens = new Set(tokens(question));
  if (!questionTokens.size) return 0;

  const bodyTokens = new Set(tokens(`${entry.title} ${entry.answer}`));
  let overlap = 0;
  for (const token of questionTokens) {
    if (bodyTokens.has(token)) overlap += 1;
  }

  // Supporting body overlap is intentionally weaker than title/keyword matching.
  // It allows compound questions (for example KL + beaches + food) to retrieve
  // several useful passages without letting generic prose dominate the ranking.
  return Math.min(overlap, 6);
}

function uniqueMatches(matches: HybridKnowledgeMatch[]) {
  const seen = new Set<string>();
  return matches.filter(({ entry }) => {
    if (seen.has(entry.id)) return false;
    seen.add(entry.id);
    return true;
  });
}

export function retrieveMalaysiaAdviserKnowledge(question: string, limit = 6) {
  const intent = detectMalaysiaAdviserIntent(question);
  const sensitive = intent === "labuan" || intent === "tax-residency";
  const pool = intent === "tax-residency"
    ? [...malaysiaTaxResidencyKnowledge, ...labuanKnowledge]
    : sensitive
      ? labuanKnowledge
      : broadMalaysiaKnowledge;

  const ranked = pool
    .map((entry) => ({
      entry,
      score: scoreMalaysiaAdviserEntry(question, entry) + supportingScore(question, entry),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  let matches = uniqueMatches(ranked).slice(0, limit);

  // Hotel questions should always have the PF EuroAsia preferred YTL selection as
  // orientation, even when the visitor's wording is very short or conversational.
  if (intent === "hotels" && !matches.some(({ entry }) => entry.id === "hotel-recommendations-overview")) {
    const overview = malaysiaHotelKnowledge.find((entry) => entry.id === "hotel-recommendations-overview");
    if (overview) matches = uniqueMatches([{ entry: overview, score: 2 }, ...matches]).slice(0, limit);
  }

  // For broad lifestyle questions, give the AI a small amount of orientation
  // even where the wording is conversational and lexical matching is light.
  if (!sensitive && matches.length < 2) {
    const fallbackIds = new Set(["malaysia-overview", "tourism-overview", "malaysia-best-time-to-visit"]);
    const fallbacks = broadMalaysiaKnowledge
      .filter((entry) => fallbackIds.has(entry.id))
      .map((entry) => ({ entry, score: 1 }));
    matches = uniqueMatches([...matches, ...fallbacks]).slice(0, limit);
  }

  return { intent, sensitive, matches };
}

export function formatHybridKnowledgeContext(matches: HybridKnowledgeMatch[]) {
  return matches
    .map(
      ({ entry }, index) =>
        `[${index + 1}] ${entry.title}\nFACTS: ${entry.answer}\nSOURCE: ${entry.source}`,
    )
    .join("\n\n");
}
