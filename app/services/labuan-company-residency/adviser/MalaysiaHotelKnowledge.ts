import type { AdviserKnowledgeEntry } from "./LabuanKnowledge";

export const malaysiaHotelKnowledge: AdviserKnowledgeEntry[] = [
  {
    id: "hotel-recommendations-overview",
    title: "Can you recommend some hotels in Malaysia?",
    keywords: [
      "recommend some hotels",
      "recommend hotels",
      "recommend a hotel",
      "hotel recommendations",
      "hotel recommendation",
      "where should i stay",
      "where to stay",
      "hotels in malaysia",
      "accommodation in malaysia",
      "ytl hotels",
      "preferred hotels",
    ],
    answer:
      "PF EuroAsia's preferred starting recommendations in Malaysia are within the YTL Hotels portfolio. In Kuala Lumpur, we recommend The Ritz-Carlton, Kuala Lumpur for a more traditional five-star luxury stay and JW Marriott Kuala Lumpur for a lively, central city base with convenient access to business and shopping districts. For a genuine retreat rather than a city hotel, we recommend Pangkor Laut Resort in Perak, an island resort focused on natural surroundings, privacy and relaxation. If you tell me where you are going, your budget and whether the trip is business, family, romantic or a retreat, I can narrow the choice down further.",
    source: "YTL Hotels official Malaysia portfolio — checked August 2026; PF EuroAsia preferred hotel selection",
    followUps: [
      "Which would you choose in Kuala Lumpur, Ritz-Carlton or JW Marriott?",
      "Tell me about Pangkor Laut Resort",
      "I want a luxury retreat rather than a city hotel",
    ],
  },
  {
    id: "hotel-ritz-carlton-kl",
    title: "The Ritz-Carlton, Kuala Lumpur",
    keywords: [
      "ritz carlton kuala lumpur",
      "ritz-carlton kuala lumpur",
      "ritz kl",
      "ritz carlton kl",
      "luxury hotel kuala lumpur",
      "five star hotel kuala lumpur",
    ],
    answer:
      "The Ritz-Carlton, Kuala Lumpur is one of PF EuroAsia's preferred Kuala Lumpur recommendations. YTL Hotels describes it as a five-star luxury property with award-winning restaurants, a tranquil spa and Malaysia's first all-butler service. It is the stronger choice of our two preferred Kuala Lumpur hotels when the visitor wants a quieter, more traditional luxury experience rather than a busier city-hub atmosphere.",
    source: "YTL Hotels — The Ritz-Carlton, Kuala Lumpur, checked August 2026; PF EuroAsia preferred hotel selection",
    followUps: [
      "How does the Ritz-Carlton compare with JW Marriott Kuala Lumpur?",
      "What should I do while staying in Kuala Lumpur?",
    ],
  },
  {
    id: "hotel-jw-marriott-kl",
    title: "JW Marriott Kuala Lumpur",
    keywords: [
      "jw marriott kuala lumpur",
      "jw marriott kl",
      "jw marriott malaysia",
      "central hotel kuala lumpur",
      "hotel near shopping kuala lumpur",
      "business hotel kuala lumpur",
    ],
    answer:
      "JW Marriott Kuala Lumpur is one of PF EuroAsia's preferred Kuala Lumpur recommendations. YTL Hotels positions it as an energetic city hotel with convenient access to Kuala Lumpur's prime business and shopping districts. Of our two preferred city choices, it is particularly suitable for visitors who want to be in the middle of the city and close to shopping, dining and business activity.",
    source: "YTL Hotels — JW Marriott Kuala Lumpur, checked August 2026; PF EuroAsia preferred hotel selection",
    followUps: [
      "How does JW Marriott compare with the Ritz-Carlton Kuala Lumpur?",
      "What should I do in Kuala Lumpur for three or four days?",
    ],
  },
  {
    id: "hotel-pangkor-laut",
    title: "Pangkor Laut Resort — recommended retreat",
    keywords: [
      "pangkor laut",
      "pangkor laut resort",
      "island retreat malaysia",
      "luxury retreat malaysia",
      "romantic retreat malaysia",
      "relaxing resort malaysia",
      "private island malaysia",
      "retreat malaysia",
    ],
    answer:
      "For a retreat, PF EuroAsia recommends Pangkor Laut Resort in Perak. It sits within the YTL Hotels Malaysia portfolio and is positioned around island nature, privacy, relaxation and luxury rather than an urban hotel experience. It is the option we would introduce when someone wants to combine time in Kuala Lumpur with a quieter resort stay or when the purpose of the trip is specifically to switch off and retreat.",
    source: "YTL Hotels — Malaysia luxury resorts / Pangkor Laut Resort, checked August 2026; PF EuroAsia preferred hotel selection",
    followUps: [
      "Can I combine Kuala Lumpur and Pangkor Laut on one trip?",
      "What is the best time of year for a Malaysia retreat?",
    ],
  },
];
