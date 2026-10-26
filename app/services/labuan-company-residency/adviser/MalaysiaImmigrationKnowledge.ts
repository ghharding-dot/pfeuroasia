import type { AdviserKnowledgeEntry } from "./LabuanKnowledge";

// Conservative controlled guidance. Verify current conditions with the responsible authority.
// Do not present illustrative figures or an applicant's eligibility as approved.
export const malaysiaImmigrationKnowledge: AdviserKnowledgeEntry[] = [
  {
    id: "mm2h-over60",
    title: "Malaysia MM2H for applicants over 60 and over 50",
    keywords: ["over 60", "over 60s", "over sixty", "over 50", "over 50s", "retire in malaysia", "retirement visa malaysia", "mm2h for retirees", "mm2h over 60", "age 60", "age 65"],
    answer: "For an applicant aged 60 or over, compare the current federal Malaysia My Second Home (MM2H) categories and the separate state-administered Sarawak and Sabah programmes. Some federal MM2H rules distinguish applicants aged 50 and above for minimum-stay purposes, but this is not a blanket exemption from deposits, property purchases, insurance, renewal or other conditions. A qualifying spouse or parent cannot be assumed to receive a dependant pass. Work rights and Malaysian tax residence are separate questions. PF EuroAsia can arrange a tailored comparison with a qualified local adviser; check current terms with the relevant programme authority before applying.",
    source: "PF EuroAsia Malaysia residency for over-60s guide — October 2026; programme terms require official confirmation",
    followUps: ["How does federal MM2H compare with Sarawak MM2H?", "Can my elderly parent come with me?", "What are the Johor MM2H property requirements?"],
  },
  {
    id: "mm2h-federal",
    title: "Federal MM2H Silver Gold Platinum categories",
    keywords: ["federal mm2h", "mm2h silver", "mm2h gold", "mm2h platinum", "mm2h categories", "mm2h fixed deposit", "mm2h property", "mm2h minimum stay"],
    answer: "Federal MM2H has different categories, including Silver, Gold and Platinum, with different pass lengths, financial deposits and compulsory qualifying property-purchase thresholds. Applicants must check current rules on minimum stay, withdrawal of deposits, dependants, medical cover and any restrictions on work or business activity. Do not assume that buying property alone grants residency or that a federal MM2H pass automatically makes you tax resident. Official terms and eligibility must be confirmed before committing funds.",
    source: "PF EuroAsia Malaysia residency guide — October 2026; federal MM2H programme terms subject to change",
    followUps: ["What changes if I am over 60?", "Is property purchase compulsory?", "Can I work while on MM2H?"],
  },
  {
    id: "mm2h-johor",
    title: "Johor Forest City Special Economic Zone MM2H",
    keywords: ["johor mm2h", "forest city mm2h", "special economic zone mm2h", "sez mm2h", "johor residency", "johor over 50"],
    answer: "The Johor / Forest City Special Economic Zone MM2H pathway is distinct from the standard federal categories. It may offer a lower fixed-deposit threshold for qualifying older applicants, but is tied to qualifying property in the designated area and may carry ownership and resale restrictions. Check the exact deposit, minimum property price, holding period, residence obligations and family eligibility with the current official programme before committing to a purchase. A lower deposit does not necessarily mean a lower total cost.",
    source: "PF EuroAsia Malaysia residency for over-60s guide — October 2026; Johor SEZ conditions require official confirmation",
    followUps: ["What is the total cost of the Johor route?", "Can I live in Kuala Lumpur instead?", "How does it compare with Sarawak?"],
  },
  {
    id: "mm2h-sarawak-sabah",
    title: "Sarawak and Sabah state MM2H alternatives",
    keywords: ["sarawak mm2h", "s-mm2h", "sabah mm2h", "state mm2h", "sarawak retirement", "sabah retirement"],
    answer: "Sarawak and Sabah operate their own long-stay MM2H-style pathways, separate from federal MM2H. They have their own eligibility, deposit, income, property, minimum-stay, renewal and family rules. Do not apply federal MM2H conditions to either state. Confirm current published conditions directly with the relevant state authority and a properly authorised adviser, especially when relocating with an older parent or planning to live outside the issuing state.",
    source: "PF EuroAsia Malaysia residency for over-60s guide — October 2026; Sarawak and Sabah state programme rules",
    followUps: ["What if I am over 60?", "Does Sarawak require a minimum annual stay?", "Can my spouse and parent apply?"],
  },
  {
    id: "de-rantau-nomad",
    title: "DE Rantau Malaysia digital nomad pass",
    keywords: ["de rantau", "digital nomad", "nomad visa", "remote worker malaysia", "remote work malaysia", "freelancer visa", "digital marketing malaysia", "work remotely from malaysia"],
    answer: "Malaysia's DE Rantau Nomad Pass, administered through MDEC, is a temporary pathway for qualifying remote employees, freelancers and certain digital or other eligible professionals. It is not permanent residence, a federal MM2H pass or permission to operate a local Malaysian company without the appropriate work authorisation. Applicants must verify current occupation and income thresholds, evidence of overseas employment or clients, pass duration, renewal conditions and dependant eligibility directly with MDEC. Tax residence and potential business or employer tax obligations require separate advice.",
    source: "PF EuroAsia DE Rantau digital nomad guide — October 2026; MDEC DE Rantau programme",
    followUps: ["Can a digital marketer apply?", "How long can I stay on DE Rantau?", "Can my spouse accompany me?"],
  },
  {
    id: "immigration-dependants",
    title: "Family dependants elderly parents and healthcare for Malaysia relocation",
    keywords: ["elderly parent", "my mother", "my father", "parents as dependants", "parents as dependents", "spouse mm2h", "family visa malaysia", "health insurance over 60", "over 80 malaysia"],
    answer: "Family eligibility depends on the precise Malaysian pass and current rules. Do not assume that a spouse, adult child or elderly parent qualifies as a dependant under MM2H, DE Rantau or an Employment Pass. Confirm the permitted relationships, age limits, separate applications, medical and insurance requirements, healthcare access and financial support evidence before planning the move. For an elderly parent, request written confirmation of eligibility from the programme operator or immigration adviser.",
    source: "PF EuroAsia Malaysia residency for over-60s guide — October 2026; family eligibility must be confirmed per programme",
    followUps: ["Which residency route suits an over-60 couple?", "Can I bring an elderly parent?", "What healthcare cover is needed?"],
  },
  {
    id: "immigration-business-vs-retirement",
    title: "Labuan Employment Pass versus MM2H and DE Rantau",
    keywords: ["labuan versus mm2h", "labuan vs mm2h", "employment pass vs mm2h", "business owner residency malaysia", "run a business malaysia visa", "labuan employment pass", "work rights mm2h"],
    answer: "For a person actively operating a Malaysian or Labuan company, investigate the appropriate Employment Pass and genuine business, salary and substance requirements. MM2H is a long-stay residence route with category-specific work restrictions; DE Rantau is for qualifying remote professionals, not a substitute for Malaysian company work permission. Incorporating a Labuan company does not by itself grant an Employment Pass or Malaysian personal tax residence. Professional immigration and cross-border tax advice is essential.",
    source: "PF EuroAsia Malaysia residency and Labuan guides — October 2026; official immigration and Labuan requirements must be checked",
    followUps: ["What are the Labuan Employment Pass conditions?", "What is MM2H for over 60s?", "Can I use DE Rantau for my business?"],
  },
];
