export type MalaysiaGeneralKnowledgeEntry = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  source: string;
  followUps?: string[];
  needsConfirmation?: boolean;
};

export const malaysiaGeneralKnowledge: MalaysiaGeneralKnowledgeEntry[] = [
  {
    id: "malaysia-overview",
    title: "Malaysia in general",
    keywords: ["malaysia in general", "what is malaysia like", "living in malaysia", "tell me about malaysia", "malaysia lifestyle", "move to malaysia"],
    answer:
      "Malaysia combines a major modern capital, established regional cities, tropical islands, highlands and Borneo. The country has two main regions: Peninsular Malaysia, with Thailand to the north and Singapore to the south, and East Malaysia on Borneo, comprising Sabah and Sarawak. For internationally mobile residents the practical attraction is the combination of English-speaking business life, comparatively accessible private healthcare, extensive air links, modern urban infrastructure and very different weekend or holiday destinations within the same country.",
    source: "Government of Malaysia and Tourism Malaysia — checked August 2026",
    followUps: ["What parts of Malaysia should I visit?", "Is English widely spoken?", "How good is healthcare in Malaysia?"],
  },
  {
    id: "kl-air-hub",
    title: "Kuala Lumpur as an international air hub",
    keywords: ["air hub", "international hub", "klia connections", "flight connections", "connectivity", "where can i fly", "airlines from kuala lumpur", "destinations from kl"],
    answer:
      "Kuala Lumpur is a substantial Asia-Pacific aviation hub. Malaysia Airports reported in March 2026 that KL International Airport was serving 71 airlines and 143 destinations worldwide, with continuing network expansion during Visit Malaysia 2026. That gives residents strong direct access across Southeast Asia, China, India, Australia, parts of Europe and the Middle East, plus very broad onward connectivity through Singapore and other nearby hubs.",
    source: "Malaysia Airports — March 2026 connectivity update",
    followUps: ["How long is London to Kuala Lumpur?", "How do I fly from Madrid to Kuala Lumpur?", "How close is Singapore?"],
  },
  {
    id: "london-kuala-lumpur",
    title: "London to Kuala Lumpur flights",
    keywords: ["london to kuala lumpur", "london kl", "heathrow kuala lumpur", "lhr kul", "flight from london", "uk to malaysia", "how long from london"],
    answer:
      "London Heathrow has nonstop service to Kuala Lumpur. Current airline guidance puts the direct flying time at just over 13 hours. Malaysia Airlines and British Airways both market the London–Kuala Lumpur route, although schedules and frequencies should always be checked for the actual travel date.",
    source: "British Airways and Malaysia Airlines route information — checked August 2026",
    followUps: ["How do I fly from Madrid to Kuala Lumpur?", "Is Kuala Lumpur a good international hub?", "How close is Singapore?"],
  },
  {
    id: "madrid-kuala-lumpur",
    title: "Madrid to Kuala Lumpur flights",
    keywords: ["madrid to kuala lumpur", "madrid kl", "mad kul", "flight from madrid", "spain to malaysia", "how long from madrid"],
    answer:
      "As of late July 2026 there is no nonstop Madrid–Kuala Lumpur service. There are numerous one-stop options through hubs including Istanbul, Dubai, Abu Dhabi, Doha, Paris, Amsterdam and London. The fastest routings can have roughly 14 to 15 hours of flying and connection time, while individual schedules can be longer; for example Emirates currently publishes a Madrid–Kuala Lumpur itinerary of about 17 hours via Dubai. Always check the live schedule for the intended dates.",
    source: "FlightConnections, Emirates and Turkish Airlines schedules — checked August 2026",
    followUps: ["How long is London to Kuala Lumpur?", "Is Kuala Lumpur a good international hub?", "How close is Singapore?"],
  },
  {
    id: "kl-singapore",
    title: "Kuala Lumpur to Singapore",
    keywords: ["singapore", "kl to singapore", "kuala lumpur singapore", "drive to singapore", "flight to singapore", "how close is singapore", "singapore connection"],
    answer:
      "Singapore is very accessible from Kuala Lumpur. Direct KUL–SIN flights are frequent and typically around 1 hour 10 minutes to 1 hour 25 minutes gate-to-gate. By road the distance is roughly 357 km; pure driving time can be around four hours in light conditions, but traffic and border formalities can make the real journey longer. So a practical road estimate is closer to four to five hours or more rather than two and a half hours.",
    source: "Singapore Airlines schedules and current KL–Singapore route data — checked August 2026",
    followUps: ["Is Kuala Lumpur a good international hub?", "What is public transport like in Kuala Lumpur?"],
  },
  {
    id: "kl-public-transport",
    title: "Public transport in Kuala Lumpur",
    keywords: ["mrt", "public transport", "transport in kl", "get around kl", "train in kuala lumpur", "metro", "subway", "need a car"],
    answer:
      "Kuala Lumpur has a substantial urban rail system. The MRT Kajang Line runs about 46 km with 29 stations through the city, while the newer Putrajaya Line is 57.7 km with 36 operational stations and multiple interchanges. Key central stations include KL Sentral/Muzium Negara, Bukit Bintang, TRX, Ampang Park, Persiaran KLCC and Conlay. Rail is supplemented by LRT, monorail, commuter rail, buses and ride-hailing, so many central-city residents can manage routine journeys without relying on a car for everything.",
    source: "MRT Corp Malaysia — network information checked August 2026",
    followUps: ["Where are good areas to live in Kuala Lumpur?", "What does a two-bedroom apartment rent for?", "What are the shopping malls like?"],
  },
  {
    id: "kl-shopping",
    title: "Shopping and malls in Kuala Lumpur",
    keywords: ["shopping", "shopping malls", "malls", "pavilion", "suria klcc", "trx mall", "exchange trx", "mid valley", "gardens mall"],
    answer:
      "Kuala Lumpur is one of the region's major shopping cities. Tourism Malaysia highlights KLCC and Bukit Bintang as leading retail districts, with large lifestyle malls combining international brands, restaurants, cinemas, fitness and entertainment. Major names include Pavilion Kuala Lumpur, Suria KLCC, The Exchange TRX, Mid Valley Megamall, The Gardens Mall and NU Sentral, alongside many neighbourhood centres.",
    source: "Tourism Malaysia Kuala Lumpur shopping guidance — checked August 2026",
    followUps: ["What is Kuala Lumpur like to live in?", "What is public transport like in Kuala Lumpur?", "What does a two-bedroom apartment rent for?"],
  },
  {
    id: "kl-two-bed-rent",
    title: "Typical two-bedroom rents in Kuala Lumpur",
    keywords: ["two bedroom rent", "2 bedroom rent", "apartment rent", "condo rent", "serviced apartment rent", "rental cost", "rent in kl", "rent in kuala lumpur"],
    answer:
      "Current 2026 asking rents show a very broad market. As a practical guide, a modern two-bedroom apartment outside the most expensive prime addresses can often be found around RM2,000–RM3,000 per month; a good central or established expatriate-area apartment is commonly around RM3,000–RM5,000; and newer prime KLCC, TRX or branded residences can run roughly RM6,000–RM10,000+ per month. Exceptional luxury units can be materially higher. These are asking-rent bands, not formal valuations, and furnishing, building quality and exact location make a large difference.",
    source: "PropertyGuru Malaysia current two-bedroom Kuala Lumpur listings — July/August 2026",
    followUps: ["What does a two-bedroom condo cost to buy?", "What are serviced apartments like?", "Where are good areas to live in Kuala Lumpur?"],
  },
  {
    id: "kl-two-bed-buy",
    title: "Typical two-bedroom purchase prices in Kuala Lumpur",
    keywords: ["two bedroom buy", "2 bedroom buy", "apartment price", "condo price", "buy condo", "buy apartment", "property prices kl", "cost to buy in kuala lumpur"],
    answer:
      "Kuala Lumpur has a wide price spread. Current 2026 listings show older or non-prime two-bedroom condominiums in some districts from roughly RM400,000–RM700,000, established areas such as Mont Kiara commonly around RM600,000–RM1.3 million depending on age and size, and prime KLCC two-bedroom residences frequently around RM900,000–RM2 million or more. Branded and ultra-prime central residences can reach RM2–RM4 million+. Foreign-buyer eligibility and minimum purchase thresholds are separate legal questions and must be checked for the property and state before relying on an asking price.",
    source: "PropertyGuru and iProperty Kuala Lumpur listings — July/August 2026",
    followUps: ["What do new condominiums cost?", "What does a two-bedroom apartment rent for?", "Can foreigners buy Malaysian property?"],
  },
  {
    id: "kl-new-condos",
    title: "New condominium pricing in Kuala Lumpur",
    keywords: ["new condo", "new condominium", "new development", "off plan", "new build", "serviced residence price", "new apartment price"],
    answer:
      "New-build pricing depends heavily on district and branding. Current examples illustrate the spread: new or recent two-bedroom stock in areas such as Bukit Jalil can sit around the RM500,000–RM800,000 range, a current Mont Kiara launch starts around RM1.1 million for two-bedroom layouts, while new branded or prime KLCC two-bedroom residences can be around RM1.6–RM2 million and above. PF EuroAsia should quote a current development rather than present one city-wide average because unit size, tenure, completion date and location vary significantly.",
    source: "Current Kuala Lumpur developer and resale listings — July/August 2026",
    followUps: ["What does a two-bedroom condo cost to buy?", "What properties does PF EuroAsia have access to?", "What are serviced apartments like?"],
  },
  {
    id: "malaysia-healthcare",
    title: "Healthcare in Malaysia",
    keywords: ["healthcare", "hospital", "hospitals", "doctor", "medical care", "health insurance", "older", "retirement health", "private healthcare", "medical treatment"],
    answer:
      "Malaysia has a large public and private healthcare sector and is an established medical-tourism destination. The Malaysia Healthcare Travel Council says its network includes internationally and nationally accredited hospitals, multilingual teams and modern medical technology, and markets many treatments at roughly 30–60% below Western-country costs. For perspective, published Ministry of Health charges for foreign patients at government facilities include RM40 for a general outpatient visit, RM120 for a specialist outpatient visit and RM100 for an emergency-department visit, with hospital and treatment charges additional. Private-hospital pricing varies by hospital, specialist and procedure, so insurance and exact costs should be checked individually.",
    source: "Malaysia Healthcare Travel Council and Ministry of Health Malaysia — 2025/2026 published information",
    followUps: ["Is English widely spoken?", "What is Malaysia like for older residents?", "What is Kuala Lumpur like to live in?"],
  },
  {
    id: "malaysia-legal-system",
    title: "Malaysian legal system",
    keywords: ["law", "legal system", "british law", "english law", "common law", "courts", "rule of law", "legal system malaysia"],
    answer:
      "Malaysia has a British-derived common-law tradition, but it should not simply be described as being 'under British law'. Malaysia has its own Federal Constitution, Parliament, legislation and courts. Section 3 of the Civil Law Act 1956 governs the reception of English common-law and equity principles in defined circumstances, while Malaysian statutes and case law are controlling. Malaysia also has a parallel Syariah jurisdiction for specified Islamic and personal-law matters involving Muslims, mainly within state competence. Anyone making a legal or property decision should obtain Malaysian legal advice on the particular issue.",
    source: "Malaysian Judiciary, Civil Law Act framework and Government of Malaysia — checked August 2026",
    followUps: ["What religion is Malaysia?", "Is English widely spoken?", "Can foreigners buy Malaysian property?"],
  },
  {
    id: "malaysia-language",
    title: "Languages in Malaysia",
    keywords: ["language", "english", "speak english", "malay language", "mandarin", "tamil", "multilingual"],
    answer:
      "Bahasa Melayu is Malaysia's national and official language. English is very widely used in business and professional life; the Malaysian government's own guidance says English continues to dominate the language of trade and industry. Mandarin, Cantonese, Tamil and many other languages and dialects are also widely encountered, reflecting the country's multicultural population. For an English-speaking expatriate, day-to-day communication in Kuala Lumpur and other major urban centres is generally straightforward.",
    source: "Government of Malaysia official language guidance — updated October 2025",
    followUps: ["What religion is Malaysia?", "What is Malaysia like culturally?", "What is Kuala Lumpur like to live in?"],
  },
  {
    id: "malaysia-religion-culture",
    title: "Religion and cultural diversity in Malaysia",
    keywords: ["religion", "muslim country", "islam", "christian", "christianity", "hindu", "buddhist", "religious tolerance", "multicultural", "culture"],
    answer:
      "Islam is the religion of the Federation, but Malaysia is also a visibly multireligious and multicultural country. Article 3 of the Federal Constitution states that other religions may be practised in peace and harmony, while Article 11 protects the right to profess and practise religion subject to constitutional qualifications. Buddhism, Christianity, Hinduism and other faiths have established communities, places of worship and festivals. For relocation purposes it is fair to describe Malaysia as culturally diverse and accustomed to different faiths, while recognising that legal rules concerning religion are not identical for Muslims and non-Muslims.",
    source: "Government of Malaysia official religion guidance and Federal Constitution summary — updated October 2025",
    followUps: ["Is English widely spoken?", "What is Malaysia like culturally?", "What is the Malaysian legal system based on?"],
  },
  {
    id: "malaysia-destinations",
    title: "Places to visit and live beyond Kuala Lumpur",
    keywords: ["places to visit", "where to go", "regions", "different regions", "islands", "beaches", "penang", "langkawi", "sabah", "sarawak", "redang", "perhentian", "tioman"],
    answer:
      "Malaysia is much more than Kuala Lumpur. Penang combines George Town heritage, food and island living; Langkawi is a 99-island Andaman Sea archipelago and UNESCO Global Geopark; the east coast has Redang, Perhentian and Tioman for beaches and diving; Sabah offers Kota Kinabalu, Mount Kinabalu and internationally known island and diving areas including Sipadan and Mabul; Sarawak brings Kuching, rainforest and Borneo culture. Domestic flights make many of these destinations practical short breaks from Kuala Lumpur.",
    source: "Tourism Malaysia destination guides — checked August 2026",
    followUps: ["Tell me about Langkawi", "Tell me about Penang", "What is Sabah like?"],
  },
  {
    id: "langkawi",
    title: "Langkawi",
    keywords: ["langkawi", "langkawi island", "geopark", "pantai cenang", "andaman sea"],
    answer:
      "Langkawi is an archipelago of 99 islands in the Andaman Sea and has UNESCO Global Geopark status. It is known for beaches such as Pantai Cenang and Tanjung Rhu, mangroves, geoforest parks, marinas and duty-free shopping. It is one of the easiest Malaysian island destinations to combine with Kuala Lumpur because it has its own international airport and a developed range of hotels, restaurants and leisure facilities.",
    source: "Tourism Malaysia Langkawi destination guide — checked August 2026",
    followUps: ["What other islands are there in Malaysia?", "Tell me about Penang", "How well connected is Kuala Lumpur?"],
  },
  {
    id: "penang",
    title: "Penang",
    keywords: ["penang", "george town", "georgetown", "food in penang", "penang island", "heritage"],
    answer:
      "Penang is one of Malaysia's best-known lifestyle and cultural destinations. George Town is known for heritage architecture and street life, while the island is particularly famous for its Malay, Chinese, Indian and Peranakan food culture. Penang also has beaches, established residential areas, international services and a major airport, making it relevant both as a leisure destination and as an alternative urban base to Kuala Lumpur for some residents.",
    source: "Tourism Malaysia Penang destination material — checked August 2026",
    followUps: ["Tell me about Langkawi", "What is Sabah like?", "What parts of Malaysia should I visit?"],
  },
  {
    id: "sabah-borneo",
    title: "Sabah and Malaysian Borneo",
    keywords: ["sabah", "borneo", "kota kinabalu", "sipadan", "mabul", "mount kinabalu", "diving malaysia"],
    answer:
      "Sabah in Malaysian Borneo offers a very different side of the country: Kota Kinabalu as the main urban gateway, Mount Kinabalu and rainforest landscapes, and tropical islands with major diving areas. Tourism Malaysia highlights islands and marine areas around Kota Kinabalu as well as Mabul, Kapalai, Layang-Layang and Sipadan. Kuala Lumpur has direct domestic air links to the principal Sabah airports, so Borneo is highly accessible without leaving Malaysia.",
    source: "Tourism Malaysia Sabah and islands guides — checked August 2026",
    followUps: ["What parts of Malaysia should I visit?", "Tell me about Langkawi", "Is Kuala Lumpur a good international hub?"],
  },
  {
    id: "malaysia-climate",
    title: "Climate and weather",
    keywords: ["weather", "climate", "hot", "humid", "rain", "monsoon", "temperature"],
    answer:
      "Malaysia has a tropical climate: warm and humid throughout the year, with rainfall patterns that vary by coast and season. Kuala Lumpur is a year-round city destination, while island conditions are more seasonal — for example Langkawi's drier period is generally around November to March, and parts of the east coast have stronger monsoon seasonality. For relocation the main adjustment is usually heat, humidity and regular tropical rain rather than cold winters.",
    source: "Tourism Malaysia travel guidance — checked August 2026",
    followUps: ["What is Kuala Lumpur like to live in?", "Tell me about Langkawi", "What parts of Malaysia should I visit?"],
  },
  {
    id: "kl-airport-city",
    title: "KLIA to Kuala Lumpur city centre",
    keywords: ["airport to city", "klia to kl", "klia to kuala lumpur", "airport distance", "how far is airport", "klia express"],
    answer:
      "KL International Airport is in Sepang, roughly 55 km from central Kuala Lumpur. Tourism Malaysia describes the road journey as about 45 minutes to one hour under normal conditions. Rail connections also link the airport with the city, so arriving passengers do not need to rely solely on road transport.",
    source: "Tourism Malaysia Kuala Lumpur practical information — checked August 2026",
    followUps: ["Is Kuala Lumpur a good international hub?", "What is public transport like in Kuala Lumpur?"],
  },
];
