import type { AdviserKnowledgeEntry } from "./LabuanKnowledge";
import { labuanKnowledge } from "./LabuanKnowledge";
import { malaysiaCostKnowledge } from "./MalaysiaCostKnowledge";
import { malaysiaFoodKnowledge } from "./MalaysiaFoodKnowledge";
import { malaysiaGeneralKnowledge } from "./MalaysiaGeneralKnowledge";
import { malaysiaTravelClimateKnowledge } from "./MalaysiaTravelClimateKnowledge";

type AdviserIntent =
  | "labuan"
  | "travel-weather"
  | "property"
  | "food"
  | "healthcare"
  | "transport"
  | "culture"
  | "living-cost"
  | "general";

export const adviserSuggestions = [
  "What is the best time of year to visit Malaysia?",
  "What is the weather like in Kuala Lumpur through the year?",
  "What is the cost of living in Kuala Lumpur?",
  "What is Malaysian food like and what does it cost?",
  "What does a two-bedroom apartment rent for in Kuala Lumpur?",
  "How much does the Labuan package cost?",
];

const stopWords = new Set([
  "a", "an", "and", "are", "can", "do", "does", "for", "how", "i", "in",
  "is", "it", "me", "my", "of", "on", "the", "to", "what", "with", "whats",
  "year", "like",
]);

const genericCommercialWords = new Set([
  "cost", "costs", "price", "prices", "pricing", "fee", "fees", "amount",
  "much", "pay", "paying", "annual", "yearly", "monthly", "expense", "expenses",
]);

const labuanSignals = [
  "labuan", "company formation", "company setup", "company set up", "set up a company",
  "incorporation", "visa", "residency", "residence permit", "employment pass",
  "work permit", "director", "dependant", "dependent", "renewal", "lfsa",
  "substance", "corporate tax", "holding company", "trading company", "bank account",
  "banking for the company",
];

const travelWeatherSignals = [
  "best time", "time of year", "when to visit", "when should i visit", "travel to malaysia",
  "visit malaysia", "holiday in malaysia", "weather", "temperature", "climate", "rain",
  "rainy", "rainfall", "monsoon", "season", "seasons", "spring", "summer", "autumn",
  "fall", "winter", "humid", "humidity", "hot", "dry season", "wet season", "island",
  "beach", "langkawi", "penang", "redang", "perhentian", "tioman", "sabah", "sarawak",
  "borneo", "flight", "airport", "airline", "london to kuala lumpur", "madrid to kuala lumpur",
];

const propertySignals = [
  "apartment", "condo", "condominium", "property price", "property prices", "buy property",
  "buy apartment", "buy condo", "rent", "rental", "two bedroom", "2 bedroom",
  "serviced apartment", "serviced residence", "new development", "new condo", "off plan",
  "klcc property", "mont kiara",
];

const foodSignals = [
  "food", "eat", "eating", "restaurant", "restaurants", "dining", "hawker", "street food",
  "nasi", "laksa", "satay", "meal", "meals", "cuisine", "vegetarian", "halal",
];

const healthcareSignals = [
  "healthcare", "hospital", "hospitals", "doctor", "medical", "medicine", "insurance",
  "health insurance", "clinic", "clinics", "older residents", "retirement health",
];

const transportSignals = [
  "mrt", "lrt", "public transport", "metro", "train", "traffic", "getting around",
  "need a car", "taxi", "grab", "bus", "transport", "airport to city", "klia express",
];

const cultureSignals = [
  "language", "speak english", "english spoken", "religion", "muslim", "islam", "christian",
  "hindu", "buddhist", "culture", "multicultural", "legal system", "british law",
  "common law", "courts", "law in malaysia",
];

const livingCostSignals = [
  "cost of living", "living cost", "living costs", "monthly budget", "monthly expenses",
  "utilities", "utility", "electricity", "electric bill", "water bill", "internet cost",
  "wifi cost", "groceries cost", "grocery prices", "daily expenses", "everyday costs",
  "how expensive is kuala lumpur", "is kuala lumpur expensive", "how much to live",
];

const travelGeneralIds = new Set([
  "kl-air-hub",
  "london-kuala-lumpur",
  "madrid-kuala-lumpur",
  "kl-singapore",
  "malaysia-destinations",
  "langkawi",
  "penang",
  "sabah-borneo",
  "malaysia-climate",
  "kl-airport-city",
]);

const propertyIds = new Set([
  "kl-two-bed-rent",
  "kl-two-bed-buy",
  "kl-new-condos",
  "kl-serviced-apartments",
]);

const healthcareIds = new Set(["malaysia-healthcare"]);
const transportIds = new Set(["kl-public-transport", "kl-singapore", "kl-airport-city", "kl-air-hub"]);
const cultureIds = new Set(["malaysia-legal-system", "malaysia-language", "malaysia-religion-culture"]);
const generalIds = new Set(["malaysia-overview", "kl-shopping", "malaysia-destinations"]);

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9%$,. -]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAny(value: string, signals: string[]) {
  return signals.some((signal) => value.includes(signal));
}

function contentTokens(value: string) {
  return normalise(value)
    .split(" ")
    .filter(
      (token) =>
        token.length > 2 &&
        !stopWords.has(token) &&
        !genericCommercialWords.has(token),
    );
}

function detectIntent(question: string): AdviserIntent {
  const q = normalise(question);

  // Explicit professional / Labuan language wins. This stops a question such as
  // "Do I need to travel to Labuan to open the company bank account?" being treated
  // as a leisure-travel question simply because it contains the word "travel".
  if (containsAny(q, labuanSignals)) return "labuan";

  // The order below deliberately favours the subject over generic words such as cost.
  if (containsAny(q, travelWeatherSignals)) return "travel-weather";
  if (containsAny(q, propertySignals)) return "property";
  if (containsAny(q, foodSignals)) return "food";
  if (containsAny(q, healthcareSignals)) return "healthcare";
  if (containsAny(q, transportSignals)) return "transport";
  if (containsAny(q, cultureSignals)) return "culture";
  if (containsAny(q, livingCostSignals)) return "living-cost";

  return "general";
}

function generalEntries(ids: Set<string>) {
  return malaysiaGeneralKnowledge.filter((entry) => ids.has(entry.id));
}

function entriesForIntent(intent: AdviserIntent): AdviserKnowledgeEntry[] {
  switch (intent) {
    case "labuan":
      return labuanKnowledge;
    case "travel-weather":
      return [...malaysiaTravelClimateKnowledge, ...generalEntries(travelGeneralIds)];
    case "property":
      return generalEntries(propertyIds);
    case "food":
      return malaysiaFoodKnowledge;
    case "healthcare":
      return generalEntries(healthcareIds);
    case "transport":
      return [...generalEntries(transportIds), ...malaysiaCostKnowledge.filter((entry) => entry.id === "kl-everyday-costs")];
    case "culture":
      return generalEntries(cultureIds);
    case "living-cost":
      return malaysiaCostKnowledge;
    case "general":
    default:
      return [
        ...generalEntries(generalIds),
        ...malaysiaTravelClimateKnowledge.filter((entry) => entry.id === "malaysia-best-time-to-visit"),
      ];
  }
}

function scoreEntry(question: string, entry: AdviserKnowledgeEntry) {
  const q = normalise(question);
  const qTokens = new Set(contentTokens(q));
  const matchedContentTokens = new Set<string>();
  let score = 0;

  for (const keyword of entry.keywords) {
    const normalisedKeyword = normalise(keyword);
    if (!normalisedKeyword) continue;

    if (q === normalisedKeyword) {
      score += 24;
    } else if (normalisedKeyword.includes(" ") && q.includes(normalisedKeyword)) {
      score += 12;
    } else if (
      !normalisedKeyword.includes(" ") &&
      !genericCommercialWords.has(normalisedKeyword) &&
      qTokens.has(normalisedKeyword)
    ) {
      score += 4;
    }

    for (const token of contentTokens(normalisedKeyword)) {
      if (qTokens.has(token)) matchedContentTokens.add(token);
    }
  }

  // Each meaningful token contributes only once, regardless of how many synonyms
  // contain it. This prevents accidental score inflation.
  score += matchedContentTokens.size * 2;

  const matchedTitleTokens = new Set<string>();
  for (const token of contentTokens(entry.title)) {
    if (qTokens.has(token)) matchedTitleTokens.add(token);
  }
  score += matchedTitleTokens.size * 4;

  return score;
}

export function findMalaysiaAdviserAnswer(question: string): AdviserKnowledgeEntry | null {
  const intent = detectIntent(question);
  const candidates = entriesForIntent(intent);
  const ranked = candidates
    .map((entry) => ({ entry, score: scoreEntry(question, entry) }))
    .sort((a, b) => b.score - a.score);

  const first = ranked[0];
  const second = ranked[1];
  if (!first || first.score < 5) return null;

  // A weak tie is deliberately treated as unknown rather than allowing the first
  // item in a list to become a confident but unrelated answer.
  if (first.score < 10 && second && second.score === first.score) return null;

  return first.entry;
}
