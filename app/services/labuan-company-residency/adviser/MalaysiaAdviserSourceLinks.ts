export type AdviserSourceLink = {
  label: string;
  url?: string;
};

const sourceLinksByKnowledgeId: Record<string, AdviserSourceLink> = {
  "tax-residency-overview": {
    label: "PF EuroAsia — Malaysia tax residency guide",
    url: "/guides/malaysia-tax-residency-for-foreigners",
  },
  "tax-residency-182-days": {
    label: "HASiL — Residence Status under Section 7",
    url: "https://www.hasil.gov.my/individu/taraf-mastautin/",
  },
  "visa-vs-tax-residence": {
    label: "PF EuroAsia — Malaysia tax residency guide",
    url: "/guides/malaysia-tax-residency-for-foreigners",
  },
  "labuan-company-personal-tax-residence": {
    label: "PF EuroAsia — Malaysia tax residency guide",
    url: "/guides/malaysia-tax-residency-for-foreigners",
  },
  "malaysia-not-generally-tax-free": {
    label: "PF EuroAsia — Malaysia tax residency guide",
    url: "/guides/malaysia-tax-residency-for-foreigners",
  },
  "leaving-current-tax-residence": {
    label: "PF EuroAsia — Malaysia tax residency guide",
    url: "/guides/malaysia-tax-residency-for-foreigners",
  },
  "malaysia-residency-pathways-overview": {
    label: "PF EuroAsia — Malaysia tax residency guide",
    url: "/guides/malaysia-tax-residency-for-foreigners",
  },
  "hotel-recommendations-overview": {
    label: "YTL Hotels — Malaysia",
    url: "https://www.ytlhotels.com/hotels-and-resorts/malaysia/",
  },
  "hotel-ritz-carlton-kl": {
    label: "YTL Hotels — The Ritz-Carlton, Kuala Lumpur",
    url: "https://www.ytlhotels.com/hotels-and-resorts/malaysia/the-ritz-carlton/",
  },
  "hotel-jw-marriott-kl": {
    label: "YTL Hotels — JW Marriott Kuala Lumpur",
    url: "https://www.ytlhotels.com/hotels-and-resorts/malaysia/jw-marriott/",
  },
  "hotel-pangkor-laut": {
    label: "YTL Hotels — Pangkor Laut Resort",
    url: "https://www.ytlhotels.com/hotels-and-resorts/malaysia/",
  },
  "tourism-overview": {
    label: "Tourism Malaysia — Explore Malaysia",
    url: "https://www.malaysia.travel/explore",
  },
  "tourism-malaysia-first-visit-top-ten": {
    label: "Tourism Malaysia — Explore Malaysia",
    url: "https://www.malaysia.travel/explore",
  },
  "tourism-kuala-lumpur": {
    label: "Tourism Malaysia — Kuala Lumpur",
    url: "https://www.malaysia.travel/explore?state=14",
  },
  "tourism-langkawi": {
    label: "Tourism Malaysia — Langkawi",
    url: "https://www.malaysia.travel/explore/langkawi",
  },
  "tourism-penang": {
    label: "Tourism Malaysia — Penang",
    url: "https://www.malaysia.travel/explore?state=7",
  },
  "tourism-sabah": {
    label: "Tourism Malaysia — Sabah",
    url: "https://www.malaysia.travel/explore?state=10",
  },
  "tourism-sarawak": {
    label: "Tourism Malaysia — Sarawak",
    url: "https://www.malaysia.travel/explore?state=11",
  },
  "tourism-labuan": {
    label: "Tourism Malaysia — Labuan",
    url: "https://www.malaysia.travel/explore?state=15",
  },
  "tourism-beaches-islands": {
    label: "Tourism Malaysia — Islands & Beaches",
    url: "https://www.malaysia.travel/explore?category%5B%5D=1",
  },
};

export function adviserSourceLink(knowledgeId: string, fallbackLabel: string): AdviserSourceLink {
  return sourceLinksByKnowledgeId[knowledgeId] || { label: fallbackLabel };
}
