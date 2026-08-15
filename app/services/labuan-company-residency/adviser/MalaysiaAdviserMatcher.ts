import type { AdviserKnowledgeEntry } from "./LabuanKnowledge";
import { labuanKnowledge } from "./LabuanKnowledge";
import { malaysiaCostKnowledge } from "./MalaysiaCostKnowledge";
import { malaysiaFoodKnowledge } from "./MalaysiaFoodKnowledge";
import { malaysiaGeneralKnowledge } from "./MalaysiaGeneralKnowledge";
import { malaysiaHotelKnowledge } from "./MalaysiaHotelKnowledge";
import { malaysiaTourismKnowledge } from "./MalaysiaTourismKnowledge";
import { malaysiaTravelClimateKnowledge } from "./MalaysiaTravelClimateKnowledge";

export type AdviserIntent =
  | "labuan"
  | "hotels"
  | "tourism"
  | "travel-weather"
  | "property"
  | "food"
  | "healthcare"
  | "transport"
  | "culture"
  | "living-cost"
  | "general";

export const adviserSuggestions = [
  "What should I do in Kuala Lumpur?",
  "Can you recommend some hotels?",
  "Where should I go in Malaysia for beaches?",
  "What are the ten best things to see in Malaysia?",
  "What is the best time of year to visit Malaysia?",
  "What is the cost of living in Kuala Lumpur?",
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

const labuanProfessionalSignals = [
  "company formation", "company setup", "company set up", "set up a company",
  "incorporation", "visa", "residency", "residence permit", "employment pass",
  "work permit", "director", "dependant", "dependent", "renewal", "lfsa",
  "substance", "corporate tax", "holding company", "trading company", "bank account",
  "banking for the company",
];

const hotelSignals = [
  "hotel", "hotels", "accommodation", "where to stay", "where should i stay",
  "recommend a hotel", "recommend hotels", "hotel recommendation", "hotel recommendations",
  "resort", "resorts", "ritz carlton", "ritz-carlton", "jw marriott", "pangkor laut",
  "ytl hotels", "luxury stay", "city hotel", "island retreat", "luxury retreat",
];

const tourismSignals = [
  "what to do", "things to do", "where to go", "where should i go", "what should i see",
  "best things to see", "best things to do", "best places to see", "best places to visit",
  "best items to see", "top 10", "top ten", "must see", "must-see", "what not to miss",
  "places to visit", "tourist", "tourism", "attractions", "sightseeing", "itinerary",
  "trip ideas", "holiday ideas", "romantic weekend", "family holiday", "wildlife",
  "diving", "snorkelling", "snorkeling", "heritage", "george town", "petronas",
  "mount kinabalu", "sipadan", "mangrove", "national park", "visit labuan",
  "labuan holiday", "labuan attractions", "labuan beaches", "labuan tourism",
  "what is labuan like",
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

export function detectMalaysiaAdviserIntent(question: string): AdviserIntent {
  const q = normalise(question);
  const mentionsLabuan = q.includes("labuan");
  const hasProfessionalLabuanContext = containsAny(q, labuanProfessionalSignals);

  // "Labuan" can mean either the business/residency pathway or the island itself.
  // Leisure intent wins only when there is no company/tax/immigration signal.
  if (mentionsLabuan && !hasProfessionalLabuanContext) {
    if (containsAny(q, hotelSignals)) return "hotels";
    if (containsAny(q, tourismSignals)) return "tourism";
    if (containsAny(q, travelWeatherSignals)) return "travel-weather";
  }

  // Explicit professional / Labuan language wins. This keeps a question such as
  // "Do I need to travel to Labuan to open the company bank account?" controlled.
  if (mentionsLabuan || hasProfessionalLabuanContext) return "labuan";

  // Hotel intent is deliberately separate so real accommodation demand is visible
  // in the adviser analytics and curated PF EuroAsia recommendations are preferred.
  if (containsAny(q, hotelSignals)) return "hotels";

  // Tourism intent is checked before general travel/weather so questions such as
  // "What should I do in Langkawi?" do not become a climate answer just because
  // the destination name is also present in the weather knowledge section.
  if (containsAny(q, tourismSignals)) return "tourism";
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

export function entriesForMalaysiaAdviserIntent(intent: AdviserIntent): AdviserKnowledgeEntry[] {
  switch (intent) {
    case "labuan":
      return labuanKnowledge;
    case "hotels":
      return [
        ...malaysiaHotelKnowledge,
        ...malaysiaTourismKnowledge,
        ...malaysiaTravelClimateKnowledge.filter((entry) => entry.id === "malaysia-best-time-to-visit"),
      ];
    case "tourism":
      return [
        ...malaysiaTourismKnowledge,
        ...malaysiaHotelKnowledge,
        ...malaysiaTravelClimateKnowledge,
        ...generalEntries(new Set(["malaysia-destinations", "kl-shopping", "kl-public-transport", "kl-airport-city"])),
      ];
    case "travel-weather":
      return [...malaysiaTravelClimateKnowledge, ...malaysiaTourismKnowledge, ...malaysiaHotelKnowledge, ...generalEntries(travelGeneralIds)];
    case "property":
      return generalEntries(propertyIds);
    case "food":
      return [...malaysiaFoodKnowledge, ...malaysiaTourismKnowledge.filter((entry) => entry.id === "tourism-penang" || entry.id === "tourism-kuala-lumpur")];
    case "healthcare":
      return generalEntries(healthcareIds);
    case "transport":
      return [...generalEntries(transportIds), ...malaysiaCostKnowledge.filter((entry) => entry.id === "kl-everyday-costs")];
    case "culture":
      return [...generalEntries(cultureIds), ...malaysiaTourismKnowledge.filter((entry) => entry.id === "tourism-penang" || entry.id === "tourism-sarawak")];
    case "living-cost":
      return malaysiaCostKnowledge;
    case "general":
    default:
      return [
        ...generalEntries(generalIds),
        ...malaysiaHotelKnowledge,
        ...malaysiaTourismKnowledge,
        ...malaysiaTravelClimateKnowledge.filter((entry) => entry.id === "malaysia-best-time-to-visit"),
      ];
  }
}

export function scoreMalaysiaAdviserEntry(question: string, entry: AdviserKnowledgeEntry) {
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
  const intent = detectMalaysiaAdviserIntent(question);
  const candidates = entriesForMalaysiaAdviserIntent(intent);
  const ranked = candidates
    .map((entry) => ({ entry, score: scoreMalaysiaAdviserEntry(question, entry) }))
    .sort((a, b) => b.score - a.score);

  const first = ranked[0];
  const second = ranked[1];
  if (!first || first.score < 5) return null;

  // A weak tie is deliberately treated as unknown rather than allowing the first
  // item in a list to become a confident but unrelated answer.
  if (first.score < 10 && second && second.score === first.score) return null;

  return first.entry;
}
