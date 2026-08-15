import type { AdviserKnowledgeEntry } from "./LabuanKnowledge";

export const malaysiaTourismKnowledge: AdviserKnowledgeEntry[] = [
  {
    id: "tourism-overview",
    title: "Where should I go and what should I do in Malaysia?",
    keywords: [
      "what to do in malaysia", "things to do in malaysia", "where to go in malaysia",
      "where should i go", "what should i see", "tourism", "tourist attractions",
      "holiday ideas", "itinerary", "trip ideas", "places to visit", "sightseeing",
    ],
    answer: "Malaysia works well as a multi-stop trip because the experiences are very different. Kuala Lumpur is the main city base for food, shopping and urban sights; Penang combines UNESCO-listed George Town, food and beaches; Langkawi is a relaxed island and resort destination; Sabah is strongest for Borneo wildlife, islands, diving and Mount Kinabalu; Sarawak combines rainforest, caves, indigenous culture and Kuching. The best combination depends on your dates, pace, interests and whether you want city, beach, nature or culture.",
    source: "Tourism Malaysia — official Explore and Destination Guide material, checked August 2026",
    followUps: ["What should I do in Kuala Lumpur?", "Which is better for me, Penang or Langkawi?", "What can I do in Sabah?"],
  },
  {
    id: "tourism-kuala-lumpur",
    title: "What should I do in Kuala Lumpur?",
    keywords: [
      "what to do in kuala lumpur", "things to do in kuala lumpur", "things to do in kl",
      "kuala lumpur sightseeing", "kl sightseeing", "kuala lumpur attractions", "kl attractions",
      "petronas twin towers", "bukit bintang", "petaling street", "kl bird park", "kl forest eco park",
    ],
    answer: "For a first Kuala Lumpur visit, a useful mix is the Petronas Twin Towers and KLCC, Bukit Bintang for shopping and dining, Petaling Street and the older city centre for heritage and street life, plus a green or family stop such as KL Forest Eco Park or KL Bird Park. KL is also particularly strong for food, from hawker-style local meals to international dining. Two to four days is a practical first visit before combining the city with an island, Penang or Borneo.",
    source: "Tourism Malaysia — Kuala Lumpur Destination Guide and official Kuala Lumpur Explore listings, checked August 2026",
    followUps: ["Can you suggest a four-day Kuala Lumpur itinerary?", "What is the best area to stay in Kuala Lumpur?", "What is Malaysian food like?"],
  },
  {
    id: "tourism-langkawi",
    title: "What is there to do in Langkawi?",
    keywords: [
      "what to do in langkawi", "things to do in langkawi", "langkawi attractions",
      "langkawi holiday", "langkawi beaches", "pantai cenang", "langkawi cable car",
      "sky bridge", "mangrove", "geopark", "island hopping langkawi",
    ],
    answer: "Langkawi is a good choice for a relaxed beach and resort stay with enough activities to fill several days. Tourism Malaysia highlights Pantai Cenang, the UNESCO Global Geopark landscapes, mangroves, island excursions, waterfalls, the SkyCab cable car and Sky Bridge. It suits couples and families who want a comfortable island base rather than an intensive city itinerary, and it combines easily with Kuala Lumpur or Penang.",
    source: "Tourism Malaysia — official Langkawi guide and Malaysia.Travel Langkawi page, checked August 2026",
    followUps: ["When is the best time to visit Langkawi?", "Which is better, Langkawi or Penang?", "How many days should I spend in Langkawi?"],
  },
  {
    id: "tourism-penang",
    title: "What is there to do in Penang?",
    keywords: [
      "what to do in penang", "things to do in penang", "penang attractions", "penang holiday",
      "george town", "georgetown", "penang food", "penang heritage", "batu ferringhi",
      "batu feringghi", "penang national park",
    ],
    answer: "Penang is one of Malaysia's strongest all-round destinations for visitors who value food and culture. George Town is a UNESCO World Heritage city with historic architecture and a distinctive mix of Malay, Chinese, Indian and Peranakan influences. The island also offers beaches around Batu Ferringhi and access to nature including Penang National Park. It is a particularly good choice for travellers who want more street life, heritage and food exploration than a pure resort holiday.",
    source: "Tourism Malaysia — Malaysia Travel Guide Penang and official Islands & Beaches Penang guide, checked August 2026",
    followUps: ["Which is better, Penang or Langkawi?", "What food should I try in Penang?", "How many days should I spend in Penang?"],
  },
  {
    id: "tourism-sabah",
    title: "What can I do in Sabah and Malaysian Borneo?",
    keywords: [
      "what to do in sabah", "things to do in sabah", "sabah attractions", "borneo holiday",
      "kota kinabalu", "mount kinabalu", "sipadan", "diving sabah", "wildlife sabah",
      "tunku abdul rahman park", "bohey dulang", "mari mari cultural village",
    ],
    answer: "Sabah is the strongest fit when the trip is about nature and adventure. Kota Kinabalu is the main gateway; nearby Tunku Abdul Rahman Park provides accessible islands and snorkelling, Mount Kinabalu is the state's best-known mountain landmark, and the east coast is internationally known for marine life and diving around the Semporna and Sipadan area. Sabah also offers rainforest, wildlife and cultural experiences. It generally deserves more time than a short city break because the attractions are spread across the state.",
    source: "Tourism Malaysia — official Sabah Explore listings and Malaysia Travel Guide Sabah, checked August 2026",
    followUps: ["How many days do I need in Sabah?", "Where are the best islands in Sabah?", "Can I combine Sabah with Kuala Lumpur?"],
  },
  {
    id: "tourism-sarawak",
    title: "What can I do in Sarawak?",
    keywords: [
      "what to do in sarawak", "things to do in sarawak", "sarawak attractions", "kuching",
      "bako national park", "gunung mulu", "mulu national park", "niah national park",
      "sarawak cultural village", "sarawak rainforest", "sarawak food",
    ],
    answer: "Sarawak is well suited to travellers who want rainforest, caves, culture and a slower Borneo experience. Kuching is the usual starting point. Tourism Malaysia highlights Bako National Park, Gunung Mulu National Park, Niah National Park and Sarawak Cultural Village, alongside Kuching's food and heritage. It works particularly well for visitors who want nature and culture rather than a conventional beach-resort itinerary.",
    source: "Tourism Malaysia — official Sarawak Explore listings, checked August 2026",
    followUps: ["How many days should I spend in Sarawak?", "Should I choose Sabah or Sarawak?", "What should I do in Kuching?"],
  },
  {
    id: "tourism-labuan",
    title: "What is there to do in Labuan as a visitor?",
    keywords: [
      "what to do in labuan", "things to do in labuan", "visit labuan", "labuan tourism",
      "labuan attractions", "labuan holiday", "labuan beaches", "labuan marine park",
      "labuan war cemetery", "layang layangan", "pantai layang layangan", "labuan island hopping",
    ],
    answer: "Labuan is not only a business and financial centre; it also has visitor attractions of its own. Tourism Malaysia highlights the Labuan War Cemetery, coastal and beach areas including Pantai Layang-Layangan, and marine/island experiences around Labuan Marine Park. It can be useful for someone considering the Labuan business pathway to understand the island as a real place to visit as well as a corporate jurisdiction. For current activity availability, operators and schedules should be checked close to the travel date.",
    source: "Tourism Malaysia — official Labuan Explore listings, checked August 2026",
    followUps: ["What is Labuan like to live in?", "How do I get to Labuan?", "How does the Labuan company and residency pathway work?"],
  },
  {
    id: "tourism-beaches-islands",
    title: "Where should I go for beaches and islands in Malaysia?",
    keywords: [
      "best beaches malaysia", "best islands malaysia", "where to go for beaches", "beach holiday malaysia",
      "island holiday malaysia", "snorkelling malaysia", "snorkeling malaysia", "diving malaysia",
      "redang", "perhentian", "tioman", "langkawi beach", "sabah islands",
    ],
    answer: "Malaysia has several distinct beach regions rather than one single island circuit. Langkawi is the most straightforward west-coast resort choice and works well with Kuala Lumpur or Penang. Redang, the Perhentians and Tioman offer a more seasonal east-coast island experience. Sabah adds Borneo islands, marine parks and internationally known diving. Because monsoon patterns differ by coast, the right island depends heavily on the month you plan to travel.",
    source: "Tourism Malaysia — official Islands & Beaches guides plus PF EuroAsia climate knowledge, checked August 2026",
    followUps: ["Which Malaysian island is best in February?", "Which is better, Langkawi or the Perhentians?", "What is the best time for the east coast islands?"],
  },
];
