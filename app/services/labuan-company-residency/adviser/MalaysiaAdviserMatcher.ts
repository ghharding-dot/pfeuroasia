import type { AdviserKnowledgeEntry } from "./LabuanKnowledge";
import { labuanKnowledge } from "./LabuanKnowledge";
import { malaysiaCostKnowledge } from "./MalaysiaCostKnowledge";
import { malaysiaFoodKnowledge } from "./MalaysiaFoodKnowledge";
import { malaysiaGeneralKnowledge } from "./MalaysiaGeneralKnowledge";
import { malaysiaHotelKnowledge } from "./MalaysiaHotelKnowledge";
import { malaysiaTaxResidencyKnowledge } from "./MalaysiaTaxResidencyKnowledge";
import { malaysiaTourismKnowledge } from "./MalaysiaTourismKnowledge";
import { malaysiaTravelClimateKnowledge } from "./MalaysiaTravelClimateKnowledge";

export type AdviserIntent =
  | "labuan"
  | "tax-residency"
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
  "How does Malaysia tax residency work?",
  "Does a Malaysian visa make me tax resident?",
  "How does Malaysia compare with Dubai?",
  "What should I do in Kuala Lumpur?",
  "Can you recommend some hotels?",
  "Where should I go in Malaysia for beaches?",
  "What are the ten best things to see in Malaysia?",
  "What is the best time of year to visit Malaysia?",
  "What is the cost of living in Kuala Lumpur?",
  "How much does the Labuan package cost?",
];

export const adviserSuggestionsEs = [
  "¿Cómo funciona la residencia fiscal en Malasia?",
  "¿Un visado de Malasia me convierte en residente fiscal?",
  "¿Cómo se compara Malasia con Dubái?",
  "¿Qué debería hacer en Kuala Lumpur?",
  "¿Puede recomendarme algunos hoteles?",
  "¿Dónde debería ir en Malasia para disfrutar de playas?",
  "¿Cuáles son los diez mejores lugares para visitar en Malasia?",
  "¿Cuál es la mejor época para visitar Malasia?",
  "¿Cuál es el coste de vida en Kuala Lumpur?",
  "¿Cuánto cuesta el paquete de Labuan?",
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

const taxResidencySignals = [
  "tax residency", "tax residence", "tax resident", "182 day", "182 days",
  "personal tax", "tax for foreigners", "visa make me tax", "tax-free malaysia",
  "tax free malaysia", "leaving spain", "leaving uk", "leaving denmark",
  "leaving sweden", "exit tax", "double tax", "tax treaty", "mm2h tax",
  "de rantau tax", "alternative to dubai", "dubai alternative",
  "malaysia vs dubai", "malaysia or dubai", "dubai or malaysia",
];

const countryComparisonSignals = [
  "compare", "comparison", "compared", "versus", "vs", "better",
  "difference", "differences", "alternative", "choose", "move",
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
  "klcc property", "mont kiara", "areas to live", "area to live", "where to live",
  "best area", "good area", "neighbourhood", "neighborhood", "bangsar",
  "desa parkcity", "ttdi", "damansara heights",
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
  "kl-neighbourhoods",
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
  const normalized = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(?:lebuan|lebaun|labourn)\b/g, "labuan")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9%$,. -]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const spanishAliases: Array<[RegExp, string]> = [
    [/residencia fiscal|residente fiscal|domicilio fiscal/g, " tax residency tax resident "],
    [/impuesto personal|impuestos personales|fiscalidad personal/g, " personal tax "],
    [/doble imposicion|convenio fiscal/g, " double tax tax treaty "],
    [/salir de espana|dejar espana/g, " leaving spain "],
    [/sociedad|empresa|constituir una empresa|constitucion de sociedades/g, " company formation company setup "],
    [/permiso de trabajo|permiso laboral/g, " work permit employment pass "],
    [/visado|visa/g, " visa residency "],
    [/dependiente|dependientes|familiares/g, " dependent family residency "],
    [/renovacion|renovar/g, " renewal "],
    [/cuenta bancaria|banca/g, " bank account banking "],
    [/comparar|comparacion|frente a|alternativa/g, " compare comparison alternative "],
    [/hotel|hoteles|alojamiento|donde alojarse/g, " hotel hotels accommodation where to stay "],
    [/que hacer|que ver|lugares para visitar|turismo|itinerario/g, " what to do what to see places to visit tourism itinerary "],
    [/mejor epoca|cuando visitar|clima|tiempo|monzon|lluvia/g, " best time when to visit climate weather monsoon rain "],
    [/playa|playas|isla|islas/g, " beach beaches island islands "],
    [/propiedad|propiedades|apartamento|comprar|alquilar|alquiler/g, " property apartment buy rent rental "],
    [/comida|comer|restaurante|restaurantes|gastronomia/g, " food eat restaurant restaurants cuisine "],
    [/sanidad|salud|hospital|medico|seguro medico/g, " healthcare hospital doctor health insurance "],
    [/transporte|metro|tren|trafico|moverse/g, " transport metro train traffic getting around "],
    [/idioma|hablan ingles|religion|cultura/g, " language speak english religion culture "],
    [/coste de vida|costo de vida|gastos mensuales|presupuesto mensual/g, " cost of living monthly expenses monthly budget "],
    [/cuanto cuesta|precio|precios|coste|costo/g, " how much cost price prices "],
  ];

  return spanishAliases.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), normalized)
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
  const hasMalaysiaDubaiComparison =
    q.includes("malaysia") &&
    q.includes("dubai") &&
    containsAny(q, countryComparisonSignals);
  const hasTaxResidencyContext =
    containsAny(q, taxResidencySignals) || hasMalaysiaDubaiComparison;

  // Personal tax-residence questions are controlled separately from corporate
  // Labuan taxation so a visa or company is never presented as automatic proof.
  if (hasTaxResidencyContext) return "tax-residency";

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
    case "tax-residency":
      return malaysiaTaxResidencyKnowledge;
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
