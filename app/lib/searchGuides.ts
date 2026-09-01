import type { SeoPageKey } from "./seo";

type GuideLink = { label: string; href: string };
type GuideCard = { title: string; text: string; points?: string[] };
type GuideStep = { title: string; text: string };

export type SearchGuideData = {
  slug: string;
  seoKey: SeoPageKey;
  focus: "malaysia" | "spain";
  eyebrow: string;
  title: string;
  accent: string;
  summary: string;
  image: string;
  imageAlt: string;
  introEyebrow: string;
  introTitle: string;
  intro: string[];
  cardsTitle: string;
  cardsIntro: string;
  cards: GuideCard[];
  comparison?: {
    title: string;
    intro: string;
    headers: [string, string, string];
    rows: Array<[string, string, string]>;
  };
  stepsTitle: string;
  stepsIntro: string;
  steps: GuideStep[];
  sources: GuideLink[];
  related: GuideLink[];
  faqs: Array<{ question: string; answer: string }>;
  ctaTitle: string;
  ctaText: string;
  ctaHref: string;
  ctaLabel: string;
  disclaimer: string;
};

export const searchGuides: Record<string, SearchGuideData> = {
  "moving-from-spain-to-malaysia": {
    slug: "moving-from-spain-to-malaysia",
    seoKey: "movingSpainMalaysiaEn",
    focus: "malaysia",
    eyebrow: "Spain → Malaysia · Relocation guide",
    title: "Moving from Spain to Malaysia",
    accent: "a practical cross-border plan.",
    summary: "Coordinate immigration, Spanish departure, Malaysian tax residence, housing and family arrangements as one move—not five disconnected decisions.",
    image: "/images/from-europe-to-asia-exact.webp",
    imageAlt: "Europe to Asia route representing a move from Spain to Malaysia",
    introEyebrow: "Plan both sides",
    introTitle: "Leaving Spain correctly matters as much as entering Malaysia.",
    intro: [
      "A Malaysian visa determines whether you may live in Malaysia under a particular route. It does not automatically settle where you are tax resident, whether Spain still treats you as resident, or how companies and income should be reported.",
      "Spain considers more than a flight date. Time spent in Spain, the main base of economic interests and family circumstances can all matter. Malaysia applies its own statutory residence tests and supporting-evidence requirements. The move should therefore be planned across a complete calendar year.",
      "PF EuroAsia helps organise the sequence and introduces appropriately qualified Spanish and Malaysian advisers for the formal conclusions.",
    ],
    cardsTitle: "Five workstreams, one move.",
    cardsIntro: "The strongest relocation plan connects legal permission, tax residence and real day-to-day life before commitments are made.",
    cards: [
      { title: "Immigration route", text: "Choose a route that matches the genuine purpose of the stay—lifestyle, remote work, employment or business activity.", points: ["MM2H and long-stay options", "DE Rantau where eligible", "Employment or business-led routes"] },
      { title: "Spanish departure", text: "Review the Spanish residence tests, departure timing, continuing income, property, companies and filing obligations before assuming residence has ended." },
      { title: "Malaysian tax position", text: "Track physical presence and connected periods, then assess income sources, treaty questions and any company separately from immigration status." },
      { title: "Family and practical life", text: "Housing, schooling, healthcare, banking, insurance and dependant applications should support—not contradict—the intended relocation." },
    ],
    comparison: {
      title: "Questions on each side of the move.",
      intro: "This is a planning map, not a conclusion about any individual’s residence.",
      headers: ["Issue", "Spain", "Malaysia"],
      rows: [
        ["Personal residence", "More than 183 days is one test; economic interests and a rebuttable family presumption can also matter.", "Section 7 includes the 182-day route plus linked-period and multi-year tests."],
        ["Evidence", "Travel, homes, family, economic activity, filings and a foreign tax-residence certificate may be relevant.", "Passport pages, movement records and complete tax filings may support a Certificate of Residence application."],
        ["Company activity", "Spanish management, ownership and income connections require separate review.", "A Malaysian or Labuan company has its own management, substance, tax and reporting position."],
        ["Administration", "A change of fiscal address may be notified using Modelo 030 with the required evidence.", "Immigration endorsements, local registrations, banking and tax records should be coordinated after arrival."],
      ],
    },
    stepsTitle: "Build the move around the calendar.",
    stepsIntro: "A realistic sequence reduces contradictory filings, rushed applications and expensive reversals.",
    steps: [
      { title: "Map the current position", text: "Record nationality, Spanish residence history, family, assets, companies, income, travel and intended move date." },
      { title: "Select a viable Malaysian route", text: "Confirm eligibility and what the route permits before signing leases, moving family or restructuring work." },
      { title: "Obtain coordinated tax advice", text: "Ask advisers to review Spain, Malaysia and any third country together, including the applicable treaty and departure year." },
      { title: "Create real-world evidence", text: "Align days, home, work, family, banking, insurance and records with the position that will actually be reported." },
      { title: "Review after arrival", text: "Check the first filings, renewal calendar and evidence before the next tax year begins." },
    ],
    sources: [
      { label: "Spanish Tax Agency — residence in Spain", href: "https://sede.agenciatributaria.gob.es/Sede/eu_es/ayuda/manuales-videos-folletos/manuales-practicos/irpf-2019/capitulo-2-impuesto-renta-personas-generales/sujecion-irpf-aspectos-personales/residencia-habitual-territorio-espanol.html" },
      { label: "Spanish Tax Agency — Modelo 030 evidence", href: "https://sede.agenciatributaria.gob.es/Sede/todas-gestiones/censos-nif-domicilio-fiscal/censos/modelo-030-censo_____de-domicilio-variacion-personales_/documentacion-modelo-030.html" },
      { label: "HASiL — Malaysia Certificate of Residence", href: "https://www.hasil.gov.my/en/antarabangsa/sijil-taraf-mastautin-e-residence/" },
      { label: "Malaysia Immigration — MM2H", href: "https://www.imi.gov.my/index.php/perkhidmatan-utama/malaysia-rumah-kedua-ku-mm2h/" },
    ],
    related: [
      { label: "Malaysia residency options", href: "/guides/malaysia-residency-options" },
      { label: "Malaysia tax residency", href: "/guides/malaysia-tax-residency-for-foreigners" },
      { label: "Malaysia vs Spain living costs", href: "/guides/cost-of-living-malaysia-vs-spain" },
    ],
    faqs: [
      { question: "Does leaving Spain automatically end Spanish tax residence?", answer: "No. The Spanish tests consider more than physical departure. Days, economic interests, family circumstances, evidence and treaty rules may all need review." },
      { question: "Does a Malaysian visa make me tax resident in Malaysia?", answer: "No. Immigration permission and tax residence are separate. Malaysia applies statutory residence tests, including day-count and connected-period rules." },
      { question: "Should the move happen before or after the end of the year?", answer: "There is no universal answer. Timing can materially affect residence, filings and evidence in both countries, so the intended calendar should be reviewed before commitments are made." },
      { question: "Can PF EuroAsia manage the whole relocation?", answer: "PF EuroAsia can coordinate the planning, property and professional introductions. Formal immigration, tax and legal conclusions are provided by the appointed qualified professionals." },
    ],
    ctaTitle: "Planning a Spain-to-Malaysia move?",
    ctaText: "Tell us who is moving, the intended timing, work or business activity, present Spanish connections and preferred Malaysian base. We will organise the appropriate first conversations.",
    ctaHref: "/asia-gateway/enquire",
    ctaLabel: "Discuss the relocation",
    disclaimer: "Updated 1 September 2026. General information only; not legal, tax, immigration, financial or investment advice. Residence and reporting outcomes depend on individual facts, current law and applicable treaties. Obtain written advice from qualified professionals in every relevant jurisdiction before acting.",
  },

  "labuan-company-setup-costs": {
    slug: "labuan-company-setup-costs",
    seoKey: "labuanCostsEn",
    focus: "malaysia",
    eyebrow: "Labuan · Company costs",
    title: "Labuan company setup costs",
    accent: "what the headline fee excludes.",
    summary: "Separate statutory LFSA charges from trust-company, compliance, substance, audit, banking and immigration costs before assessing a Labuan structure.",
    image: "/images/asia-network.webp",
    imageAlt: "Kuala Lumpur business skyline representing Labuan company setup costs",
    introEyebrow: "Read beyond incorporation",
    introTitle: "The filing fee is only one part of the annual cost.",
    intro: [
      "Labuan IBFC’s published company guide lists regulatory name-reservation, incorporation and annual fees. Those amounts do not include the cost of engaging a licensed Labuan trust company, which provides the registered office and company-secretarial function.",
      "A realistic budget can also include KYC, corporate documents, accounting, audit, tax filing, beneficial-ownership work, economic substance, banking support and—where relevant—employment-pass and dependant applications.",
      "The figures below reproduce the regulatory schedule published in Labuan IBFC’s March 2023 guide. They should be verified against the current LFSA schedule before any instruction or payment.",
    ],
    cardsTitle: "Budget in four layers.",
    cardsIntro: "A useful proposal should distinguish public regulatory charges from professional work and continuing operating obligations.",
    cards: [
      { title: "Regulatory fees", text: "Name reservation, incorporation and annual company charges payable under the applicable Labuan schedule." },
      { title: "Trust-company services", text: "Licensed trust-company appointment, registered office, resident secretary, statutory records and annual corporate maintenance." },
      { title: "Accounting and substance", text: "Bookkeeping, audit, tax filing, local expenditure, employees and premises depend on the company’s actual activity and tax position." },
      { title: "Optional workstreams", text: "Banking, licences, work permits, dependants, translations, notarisation and enhanced due diligence should be priced separately." },
    ],
    comparison: {
      title: "Published regulatory fee snapshot.",
      intro: "USD amounts below are from the official March 2023 Labuan IBFC company guide and exclude trust-company and other professional charges.",
      headers: ["Regulatory item", "Published amount", "Important boundary"],
      rows: [
        ["Company-name reservation", "USD 15", "Availability and reservation only; not incorporation or professional work."],
        ["Incorporation below RM50,000 paid-up capital", "USD 300", "Registration fee for a Labuan company in the stated capital band."],
        ["Incorporation RM50,000–below RM1m", "USD 600", "Higher registration band; verify the paid-up capital used."],
        ["Incorporation above RM1m", "USD 1,500", "Highest band shown in the published guide."],
        ["Annual Labuan company fee", "USD 800", "Regulatory annual fee; excludes ongoing administration, audit and tax work."],
        ["Foreign Labuan company", "USD 2,000 registration / USD 1,500 annual", "Applies to registration of a foreign Labuan company, not an ordinary new Labuan company."],
      ],
    },
    stepsTitle: "Ask for a complete written scope.",
    stepsIntro: "The right comparison is first-year and recurring cost under the intended activity—not a single incorporation number.",
    steps: [
      { title: "Describe the business", text: "Set out activity, customers, countries, owners, directors, expected turnover, staffing and residence objectives." },
      { title: "Confirm regulatory classification", text: "Ask the licensed adviser to identify the company type, activity, substance and tax filing framework." },
      { title: "Separate one-off and annual costs", text: "Require regulatory fees, professional setup, recurring company work and optional immigration or banking work to be shown separately." },
      { title: "Test the substance budget", text: "Do not assume that incorporation alone secures a tax outcome. Employees, expenditure, office, management and audit may be central." },
      { title: "Confirm renewal assumptions", text: "Check what is included, what can vary, payment currency, taxes, disbursements and the next annual due date." },
    ],
    sources: [
      { label: "Labuan IBFC — Guide to Labuan companies and fees", href: "https://www.labuanibfc.com/clients/asset_52E835CC-1342-4701-B6FA-E2CD03AD74B4/contentms/img/publications/brochures/NEW-2023_Labuan-Co.pdf" },
      { label: "Labuan FSA — official portal", href: "https://www.labuanfsa.gov.my/" },
      { label: "HASiL — Labuan entity filing programme", href: "https://www.hasil.gov.my/en/forms/filing-programme-for-documents-specified-under-section-22eb-lbata-1990-through-mitrs/" },
      { label: "PF EuroAsia — coordinated Labuan pathway", href: "https://www.pfeuroasia.com/services/labuan-company-residency" },
    ],
    related: [
      { label: "Malaysia company vs Labuan", href: "/guides/malaysia-company-vs-labuan-company" },
      { label: "Labuan company and residency", href: "/services/labuan-company-residency" },
      { label: "Malaysia company formation", href: "/services/malaysia-company-formation" },
    ],
    faqs: [
      { question: "How much does it cost to incorporate a Labuan company?", answer: "The official guide publishes regulatory incorporation fees by paid-up-capital band, but those figures exclude the licensed trust company and other professional, compliance, substance, audit, tax, banking and immigration costs." },
      { question: "Is the USD 800 annual fee the complete yearly cost?", answer: "No. It is the annual regulatory fee shown in the published guide. Corporate maintenance, registered office, secretary, accounting, audit, tax and substance costs may also apply." },
      { question: "Can a cheap Labuan company still qualify for the 3% regime?", answer: "A headline incorporation price does not determine tax treatment. The real activity, classification, substance, audit and compliance conditions must be assessed and maintained." },
      { question: "Does the company cost include a Malaysian work permit?", answer: "Not automatically. Company formation and immigration are separate workstreams. A work-permit assessment, application and dependant work should be scoped and priced independently." },
    ],
    ctaTitle: "Need a complete Labuan cost outline?",
    ctaText: "Describe the business, owners, expected activity and whether residency is required. PF EuroAsia can coordinate a current written scope from an established Labuan specialist.",
    ctaHref: "/asia-gateway/enquire",
    ctaLabel: "Request a cost assessment",
    disclaimer: "Updated 1 September 2026. Published regulatory figures are drawn from Labuan IBFC’s March 2023 guide and must be reconfirmed before acting. General information only; not legal, tax, accounting, immigration or financial advice. Professional fees and operating costs depend on scope and individual facts.",
  },

  "malaysia-company-vs-labuan-company": {
    slug: "malaysia-company-vs-labuan-company",
    seoKey: "malaysiaVsLabuanEn",
    focus: "malaysia",
    eyebrow: "Malaysia · Company structures",
    title: "Malaysia company vs Labuan company",
    accent: "choose by real activity.",
    summary: "Compare a mainland Malaysian company with a Labuan company across customers, operations, regulation, tax, substance and immigration—not headline tax alone.",
    image: "/images/asia-network.webp",
    imageAlt: "Malaysia business network representing mainland and Labuan company structures",
    introEyebrow: "Structure follows substance",
    introTitle: "Where the business operates should drive the answer.",
    intro: [
      "A mainland Malaysian company is generally the natural starting point for business carried on in Malaysia with local operations, customers, staff, licences or premises. Companies doing business in Malaysia register through the Companies Commission of Malaysia and may need sector-specific approvals.",
      "A Labuan company is incorporated within Malaysia’s international business and financial centre through a licensed Labuan trust company. It has a distinct legal, regulatory and tax framework, with activity-specific substance and compliance requirements.",
      "Neither structure should be selected solely because of an advertised tax rate or a hoped-for visa. Management, banking, contracts, customers, people and the owner’s personal residence all need to align.",
    ],
    cardsTitle: "Start with commercial reality.",
    cardsIntro: "The best structure is the one that can conduct the intended business and maintain its obligations credibly.",
    cards: [
      { title: "Mainland operating business", text: "Often the clearer fit where customers, sales, employees, premises and regulated activity are principally in Malaysia." },
      { title: "International Labuan activity", text: "Potentially relevant for suitable cross-border trading, services, investment or holding activity under Labuan’s separate framework." },
      { title: "Licensing and banking", text: "Banks, customers and regulators will examine the actual business. Incorporation does not guarantee an account, licence or transaction acceptance." },
      { title: "Owner and immigration", text: "Company ownership, management, employment permission and personal tax residence are connected planning questions but legally distinct." },
    ],
    comparison: {
      title: "Mainland Malaysia and Labuan compared.",
      intro: "This high-level table is an orientation. The appointed adviser must confirm the current position for the proposed activity.",
      headers: ["Topic", "Mainland Malaysian company", "Labuan company"],
      rows: [
        ["Principal framework", "Companies Act 2016 and registration through SSM, plus relevant tax and licensing rules.", "Labuan Companies Act and Labuan FSA framework through a licensed trust company."],
        ["Typical commercial fit", "Domestic or regional operations with a substantive Malaysian market presence.", "Suitable international business, investment or holding activities meeting Labuan conditions."],
        ["Registered support", "Malaysia-based company-secretarial and registered-office requirements.", "Licensed Labuan trust company acts as secretary and provides the registered office."],
        ["Tax", "Mainstream Malaysian income-tax rules and incentives where applicable.", "Labuan tax framework may apply to qualifying activity; substance, audit and classification are critical."],
        ["Substance", "Operations, staffing, licences and management should match the business conducted.", "Prescribed Labuan employees and operating expenditure can apply by activity, alongside management evidence."],
        ["Immigration", "Employment passes depend on the company, role, approvals and sector requirements.", "A suitable company may support a work-permit pathway, but approval is separate and never automatic."],
      ],
    },
    stepsTitle: "Choose in the right order.",
    stepsIntro: "Starting with a company name or tax rate reverses the decision process.",
    steps: [
      { title: "Define customers and contracts", text: "Identify who pays the company, where services are delivered, and which jurisdiction customers expect to contract with." },
      { title: "Map people and premises", text: "Decide where directors manage, where staff work, whether premises are needed and what activity occurs in Malaysia or Labuan." },
      { title: "Check licences and tax", text: "Obtain written advice on corporate registration, regulated activities, indirect taxes, income tax and treaty position." },
      { title: "Assess immigration separately", text: "Confirm whether any role and company can support the required pass without treating incorporation as approval." },
      { title: "Compare full annual cost", text: "Include secretary, office, accounting, audit, tax, substance, payroll, licences and banking—not only formation." },
    ],
    sources: [
      { label: "MIDA — setting up business in Malaysia", href: "https://www.mida.gov.my/invest-in-malaysia/setting-up-business/" },
      { label: "SSM — foreign company registration guidance", href: "https://www.ssm.com.my/Pages/Legal_Framework/GUIDELINES/gl6_bi_guidelines_for_registration_of_foreign_company_201117_0.pdf" },
      { label: "Labuan IBFC — guide to Labuan companies", href: "https://www.labuanibfc.com/clients/asset_52E835CC-1342-4701-B6FA-E2CD03AD74B4/contentms/img/publications/brochures/NEW-2023_Labuan-Co.pdf" },
      { label: "HASiL — Malaysia tax authority", href: "https://www.hasil.gov.my/en/" },
    ],
    related: [
      { label: "Malaysia company formation", href: "/services/malaysia-company-formation" },
      { label: "Labuan setup costs", href: "/guides/labuan-company-setup-costs" },
      { label: "Labuan company and residency", href: "/services/labuan-company-residency" },
    ],
    faqs: [
      { question: "Is a Labuan company a Malaysian company?", answer: "It is incorporated within Malaysia’s Labuan international business and financial centre under a distinct Labuan legal and regulatory framework." },
      { question: "Is a Labuan company always more tax efficient?", answer: "No. Tax treatment depends on actual activity, classification, substance, compliance, management and other jurisdictions. A headline rate is not a suitability test." },
      { question: "Can a Labuan company trade in mainland Malaysia?", answer: "The permitted and tax-efficient scope depends on the activity and current rules. The proposed customers, contracts and Malaysian operations should be reviewed before choosing the structure." },
      { question: "Which structure is better for Malaysian residency?", answer: "Neither gives automatic residency. Employment or work-permit eligibility depends on the company, genuine role, activity, approvals and the applicant." },
    ],
    ctaTitle: "Comparing Malaysian company structures?",
    ctaText: "Tell us what the business will do, where customers and staff are located, who will manage it and whether a work permit is required. We will coordinate the appropriate specialist review.",
    ctaHref: "/asia-gateway/enquire",
    ctaLabel: "Compare the structures",
    disclaimer: "Updated 1 September 2026. General information only; not legal, tax, accounting, immigration, banking or investment advice. Rules and suitability depend on current law, the proposed activity and individual circumstances. Obtain written advice before incorporating.",
  },

  "cost-of-living-malaysia-vs-spain": {
    slug: "cost-of-living-malaysia-vs-spain",
    seoKey: "costMalaysiaSpainEn",
    focus: "malaysia",
    eyebrow: "Malaysia vs Spain · Living costs",
    title: "Cost of living in Malaysia vs Spain",
    accent: "compare the life you would actually lead.",
    summary: "Build a personal annual budget for Kuala Lumpur and Spain across housing, utilities, food, transport, healthcare, schools and long-haul travel.",
    image: "/images/kl%20BACK%20GORUND.avif",
    imageAlt: "Kuala Lumpur skyline for a cost-of-living comparison with Spain",
    introEyebrow: "Compare like with like",
    introTitle: "Country averages do not describe an international household.",
    intro: [
      "Malaysia can offer materially lower day-to-day costs than Spain in several categories, particularly local dining, services and some forms of central-city housing. But an international family buying imported goods, using private schools, travelling frequently to Europe and maintaining two homes can produce a very different result.",
      "Spain also contains several distinct cost markets. Marbella, Madrid and Barcelona should not be compared with a Malaysian national average, just as central Kuala Lumpur should not be treated as representative of every Malaysian city or island.",
      "The useful exercise is a twelve-month household budget in one currency, using the exact neighbourhood, property standard and lifestyle being considered.",
    ],
    cardsTitle: "The costs that change the answer.",
    cardsIntro: "Housing is important, but international schooling, healthcare, flights and tax can outweigh everyday savings.",
    cards: [
      { title: "Housing and deposits", text: "Compare equivalent bedrooms, furnishing, building services, commute and security. Include deposits, agency terms, maintenance and insurance." },
      { title: "Cooling, transport and travel", text: "Air-conditioning and car use can be significant in Malaysia. In Spain, heating, seasonal energy and coastal transport patterns may dominate." },
      { title: "Family services", text: "Private schooling, medical insurance, household support and childcare vary widely by provider and can transform the family budget." },
      { title: "International lifestyle", text: "Imported food, wine, European travel, foreign-currency commitments and maintaining a second home can narrow the apparent saving." },
    ],
    comparison: {
      title: "A realistic household comparison.",
      intro: "The direction shown is typical, not guaranteed. Price the exact home, school, healthcare and travel pattern before deciding.",
      headers: ["Budget category", "Spain", "Malaysia"],
      rows: [
        ["Housing", "Prime coastal and major-city rents can be high; local property condition and season matter.", "Central Kuala Lumpur can offer more space and amenities for the budget, but premium developments vary considerably."],
        ["Utilities", "Climate zone, heating, cooling and energy contract determine the bill.", "Year-round air-conditioning use and the current tariff structure are central to the estimate."],
        ["Food and dining", "Local groceries can be competitive; prime tourist areas and restaurants increase spend.", "Local food and dining are often lower-cost; imported European products can carry a premium."],
        ["Transport", "A car may be essential outside urban centres; fuel, insurance and parking should be included.", "Rail and ride-hailing can work centrally, but family life or suburban locations may still require a car."],
        ["Healthcare and schools", "Public eligibility and private cover depend on status; private schools vary widely.", "International families commonly budget for private healthcare and international schooling."],
        ["Travel to family", "European journeys may be short and inexpensive from Spain.", "Long-haul European travel, stopovers and school-holiday pricing can be a major annual cost."],
      ],
    },
    stepsTitle: "Create your own twelve-month budget.",
    stepsIntro: "A personal model is more useful than a viral cost-of-living index.",
    steps: [
      { title: "Fix the two locations", text: "Choose the actual Spanish and Malaysian neighbourhoods, property types and commute patterns." },
      { title: "Use one household standard", text: "Compare the same number of bedrooms, service level, schooling choice, insurance cover and travel expectations." },
      { title: "Separate recurring and setup costs", text: "Include deposits, relocation, furnishing, visas and professional fees outside the normal monthly budget." },
      { title: "Convert at a sensible range", text: "Model more than one EUR/MYR exchange rate rather than assuming today’s rate remains constant." },
      { title: "Add tax and contingency separately", text: "Lifestyle costs do not determine tax residence or tax liability. Obtain advice and keep a contingency for price changes." },
    ],
    sources: [
      { label: "Department of Statistics Malaysia — consumer prices", href: "https://www.dosm.gov.my/portal-main/release-content/consumer-price-index-apr2026" },
      { label: "Spain INE — consumer price index", href: "https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736176802&idp=1254735976607&menu=ultiDatos" },
      { label: "TNB Malaysia — current electricity tariff structure", href: "https://www.mytnb.com.my/tariff/index.html?lang=en" },
      { label: "Bank Negara Malaysia — current exchange rates", href: "https://www.bnm.gov.my/latest-rates" },
    ],
    related: [
      { label: "Moving from Spain to Malaysia", href: "/guides/moving-from-spain-to-malaysia" },
      { label: "Explore Malaysia", href: "/markets/malaysia" },
      { label: "Malaysia residency options", href: "/guides/malaysia-residency-options" },
    ],
    faqs: [
      { question: "Is Malaysia cheaper to live in than Spain?", answer: "Often in several day-to-day categories, but not for every household. Housing standard, schools, healthcare, imported goods, air travel, car use and tax can materially change the result." },
      { question: "Is Kuala Lumpur cheaper than Marbella?", answer: "Equivalent central housing and local services may cost less in Kuala Lumpur, but the result depends on the exact property, building amenities, family services and frequency of travel back to Europe." },
      { question: "How much should a family budget in Malaysia?", answer: "There is no defensible single figure without the neighbourhood, property, school, healthcare, transport and travel choices. Build a household-specific annual model rather than relying on a country average." },
      { question: "Does a lower cost of living mean lower tax?", answer: "No. Living costs and tax are separate. Personal residence, income sources, companies and departure from Spain require their own professional analysis." },
    ],
    ctaTitle: "Would Malaysia improve your real annual budget?",
    ctaText: "Share the household size, present Spanish base, preferred Malaysian location, housing standard, schools and travel pattern. We can help shape a focused discovery visit and adviser conversation.",
    ctaHref: "/asia-gateway/enquire",
    ctaLabel: "Plan a Malaysia comparison",
    disclaimer: "Updated 1 September 2026. This guide is a budgeting framework, not a price quotation, financial plan or tax analysis. Prices, exchange rates and household choices change. Verify current costs directly with providers and obtain professional advice for tax, immigration and investment decisions.",
  },

  "buying-property-in-malaysia-as-a-foreigner": {
    slug: "buying-property-in-malaysia-as-a-foreigner",
    seoKey: "malaysiaPropertyForeignersEn",
    focus: "malaysia",
    eyebrow: "Malaysia · Foreign property buyers",
    title: "Buying property in Malaysia as a foreigner",
    accent: "check the state, title and purpose.",
    summary: "Understand state approval, foreign-buyer thresholds, title restrictions, legal due diligence, finance and the separation between property ownership and residency.",
    image: "/images/kl-armani-skyline.webp",
    imageAlt: "Kuala Lumpur residential skyline for foreign property buyers in Malaysia",
    introEyebrow: "Ownership is possible—but conditional",
    introTitle: "Malaysia does not have one national foreign-buyer rule.",
    intro: [
      "Non-Malaysian citizens and foreign companies can acquire Malaysian property in appropriate cases, but State Authority approval is central. Minimum values, restricted categories and procedures can differ by state and can change.",
      "The property itself must also be checked: title, tenure, restrictions in interest, developer approvals, encumbrances, strata position, permitted use and any special allocation or reservation rules. Marketing material is not a substitute for a lawyer’s title review.",
      "Buying a property does not by itself grant Malaysian residence. Some immigration programmes may include property conditions, but ownership and immigration remain separate legal questions.",
    ],
    cardsTitle: "Four checks before reservation.",
    cardsIntro: "A foreign buyer should confirm eligibility before paying a non-refundable booking amount or relying on an advertised threshold.",
    cards: [
      { title: "State eligibility", text: "Confirm the current minimum price, consent route and restricted property categories with a Malaysian lawyer for the specific state." },
      { title: "Title and tenure", text: "Check registered ownership, freehold or leasehold term, restrictions, caveats, charges, strata title and permitted use." },
      { title: "Developer and completion", text: "For new developments, verify approvals, sale documentation, delivery assumptions, defect process and what is included in the price." },
      { title: "Purpose and exit", text: "Consider personal use, rental rules, management, tax, financing, currency exposure and resale to the likely future buyer pool." },
    ],
    comparison: {
      title: "Property, residency and tax are separate.",
      intro: "A coordinated purchase addresses all three without treating one approval as proof of another.",
      headers: ["Question", "What property ownership answers", "What it does not answer"],
      rows: [
        ["Can I acquire this home?", "State rules, property category, minimum value, title and consent determine acquisition eligibility.", "It does not determine how long the buyer may live in Malaysia."],
        ["Can I live there?", "The property can provide a home after completion and legal possession.", "Immigration permission must come from an appropriate visa or pass."],
        ["Am I tax resident?", "Ownership may be one factual connection to Malaysia.", "Personal tax residence follows statutory tests and facts, not ownership alone."],
        ["Can I rent it?", "Title, development rules and local regulation help determine permitted use.", "Projected yield is not guaranteed; management, vacancy, tax and platform rules must be checked."],
      ],
    },
    stepsTitle: "A disciplined foreign-buyer sequence.",
    stepsIntro: "Local legal review should begin before the commercial deadline becomes the legal strategy.",
    steps: [
      { title: "Define purpose and state", text: "Choose whether the property is a home, occasional base or investment, then focus on a specific Malaysian state and location." },
      { title: "Confirm foreign eligibility", text: "Have a Malaysian lawyer verify the current threshold, property category and State Authority consent requirements." },
      { title: "Review title and contract", text: "Complete legal due diligence on ownership, restrictions, tenure, charges, approvals and the sale documentation." },
      { title: "Model full ownership cost", text: "Include duties, legal fees, finance, management, service charges, insurance, tax and furnishing—not only the purchase price." },
      { title: "Coordinate residency separately", text: "If the property forms part of a relocation plan, confirm the immigration route and timing with the appropriate licensed adviser." },
    ],
    sources: [
      { label: "Malaysia Ministry of Economy — foreign property acquisition guideline", href: "https://ekonomi.gov.my/sites/default/files/2025-01/GPPH%2013%20Julai%202022.pdf" },
      { label: "Federal Lands and Mines Department — land-owner guidance", href: "https://www.jkptg.gov.my/index.php/en/pemilik-tanah" },
      { label: "MOTAC — MM2H terms and property conditions", href: "https://motac.gov.my/wp-content/uploads/2026/01/Terms-And-Regulations-For-New-Participants-Under-The-Malaysia-My-Second-Home-MM2H-.pdf" },
      { label: "Malaysia government — property and investment entry point", href: "https://rai.malaysia.gov.my/invest" },
    ],
    related: [
      { label: "Current Malaysia properties", href: "/markets/malaysia#malaysia-property-carousel-heading" },
      { label: "Malaysia residency options", href: "/guides/malaysia-residency-options" },
      { label: "Moving from Spain to Malaysia", href: "/guides/moving-from-spain-to-malaysia" },
    ],
    faqs: [
      { question: "Can foreigners buy property in Malaysia?", answer: "Yes, in appropriate cases, subject to State Authority approval, current minimum-value rules, permitted property categories and legal due diligence." },
      { question: "What is the minimum property price for a foreign buyer?", answer: "There is no single permanent national figure suitable for every purchase. Thresholds and exemptions vary by state and property category and must be verified immediately before commitment." },
      { question: "Does buying property give residency in Malaysia?", answer: "No. Property ownership and immigration status are separate. Some programmes include property conditions, but a purchase alone does not grant residence." },
      { question: "Can a foreign owner rent out a Malaysian property?", answer: "Potentially, but title conditions, development rules, local regulations, tax, licensing and short-term rental restrictions should be checked for the specific property." },
    ],
    ctaTitle: "Considering a Malaysian property?",
    ctaText: "Tell us the preferred location, budget, intended use, timing and whether residency is also being explored. We can coordinate property access and the appropriate local legal and professional introductions.",
    ctaHref: "/asia-gateway/enquire",
    ctaLabel: "Discuss a Malaysia purchase",
    disclaimer: "Updated 1 September 2026. General information only; not legal, conveyancing, tax, immigration, financial or investment advice. State rules, thresholds, consent requirements and programme conditions can change. Appoint an independent Malaysian lawyer before paying or signing.",
  },

  "spain-golden-visa-alternatives": {
    slug: "spain-golden-visa-alternatives",
    seoKey: "spainVisaAlternativesEn",
    focus: "spain",
    eyebrow: "Spain · Residency after the Golden Visa",
    title: "Spain Golden Visa alternatives",
    accent: "residency now follows purpose.",
    summary: "Spain’s property-investor route ended for new applicants in 2025. Compare non-lucrative, international remote-work, entrepreneur, employment and family pathways separately from buying property.",
    image: "/images/hero-villa.webp",
    imageAlt: "Marbella villa for international buyers considering Spanish residency options",
    introEyebrow: "Property and residence have separated",
    introTitle: "Buying a Spanish home no longer creates a new investor-residence route.",
    intro: [
      "Spain’s former investor provisions in articles 63 to 67 of Law 14/2013 were left without content by Organic Law 1/2025. The change entered into force on 3 April 2025. Transitional rules protect qualifying applications submitted earlier and the validity and renewal framework of existing investor permissions.",
      "New buyers therefore need to select residence by what they will actually do in Spain: live without working, work remotely for an overseas organisation, build an entrepreneurial project, accept qualifying employment, join family or use rights available to EU/EEA/Swiss citizens.",
      "Property can still be part of the lifestyle and financial plan, but the purchase and the immigration application should be assessed as separate workstreams.",
    ],
    cardsTitle: "Match the route to the person.",
    cardsIntro: "Nationality, work, income, family and time in Spain determine the realistic starting options.",
    cards: [
      { title: "Non-lucrative residence", text: "A potential route for qualifying non-EU applicants with sufficient means who will reside in Spain without carrying out work under that permission." },
      { title: "International remote work", text: "For qualifying third-country nationals working remotely for organisations outside Spain under the international teleworker framework." },
      { title: "Entrepreneur or strategic work", text: "Law 14/2013 continues to cover categories including entrepreneurs, highly qualified professionals, researchers and intra-company transfers." },
      { title: "EU free movement and family", text: "EU/EEA/Swiss citizens and eligible family members use a different residence framework, with registration and supporting requirements." },
    ],
    comparison: {
      title: "Common routes after the investor visa.",
      intro: "Eligibility and application procedure depend on nationality, location at application and the facts of the case.",
      headers: ["Route", "Potential fit", "Key distinction"],
      rows: [
        ["Non-lucrative visa", "Non-EU applicants with sufficient means planning to reside without working.", "Financial means and health cover are central; it is not a remote-work shortcut."],
        ["International teleworker", "Qualifying remote employees or professionals working principally for organisations outside Spain.", "Work history, company relationship, qualifications, social security and income evidence matter."],
        ["Entrepreneur", "An innovative business project of particular economic interest to Spain.", "A normal company incorporation or property investment is not automatically an entrepreneurial project."],
        ["Highly qualified / intra-company", "Qualifying role with an employer or corporate group.", "The Spanish or group entity and the role form part of the application."],
        ["EU registration", "EU/EEA/Swiss citizens staying in Spain beyond the relevant period.", "Free-movement rules apply; workers, self-employed people and non-workers provide different evidence."],
        ["Family route", "Eligible family members of Spanish, EU or resident third-country nationals.", "The relationship and sponsor’s status determine the correct procedure."],
      ],
    },
    stepsTitle: "Separate the home search from the visa decision.",
    stepsIntro: "The two processes can be coordinated without making the property responsible for immigration eligibility.",
    steps: [
      { title: "Confirm nationality and present status", text: "Identify citizenships, current country, family relationships and any existing Spanish or EU rights." },
      { title: "Define work and income", text: "Record employment, remote work, business ownership, pensions, investment income and the intended activity in Spain." },
      { title: "Select and verify the route", text: "Obtain current advice on eligibility, application location, evidence, health cover, financial means and family applications." },
      { title: "Plan tax before residence", text: "Immigration residence and tax residence are separate. Review days, worldwide income, assets and company connections before moving." },
      { title: "Buy or rent on its own merits", text: "Choose the Spanish property for lifestyle, value and ownership reasons with independent legal due diligence." },
    ],
    sources: [
      { label: "BOE — Organic Law 1/2025 and investor-route repeal", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2025-76" },
      { label: "Spanish Ministry of Inclusion — international teleworkers", href: "https://www.inclusion.gob.es/web/unidadgrandesempresas/teletrabajadores" },
      { label: "Spanish e-government — Law 14/2013 mobility applications", href: "https://sede.inclusion.gob.es/w/presentacion-solicitudes-autorizacion-residencia" },
      { label: "Spanish Foreign Ministry — non-lucrative residence visa", href: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Servicios-consulares.aspx?scca=Visados&scco=Estados+Unidos&scd=215&scs=Visados+Nacionales+-+Visado+de+residencia+no+lucrativa" },
    ],
    related: [
      { label: "Marbella guide for international buyers", href: "/guides/marbella-property-international-buyers" },
      { label: "Marbella and Benahavís", href: "/markets/marbella" },
      { label: "Property acquisition advisory", href: "/services/acquisition" },
    ],
    faqs: [
      { question: "Can I still obtain a Spanish Golden Visa by buying property?", answer: "New property-investor applications under the former articles 63 to 67 ended when the repeal took effect on 3 April 2025. Transitional rules apply to certain earlier applications and existing permissions." },
      { question: "What is the best alternative to Spain’s Golden Visa?", answer: "There is no direct replacement for everyone. The relevant route depends on nationality, work, income, business plans and family circumstances." },
      { question: "Can I buy property while using a non-lucrative or digital-nomad route?", answer: "Property ownership can be separate from the residence application, but buying does not prove immigration eligibility. The visa and purchase should each be assessed on their own requirements." },
      { question: "Do existing Golden Visas remain valid?", answer: "The law includes transitional protection for qualifying earlier applications and states that valid investor permissions retain validity, with renewals handled under the rules applicable when the initial authorisation was granted. Individual advice remains important." },
    ],
    ctaTitle: "Buying in Spain without the Golden Visa?",
    ctaText: "Tell us your nationality, intended time in Spain, work or income position, family needs and property brief. We can coordinate the property search with independent Spanish immigration and tax advisers.",
    ctaHref: "/enquire",
    ctaLabel: "Discuss Spain and residency",
    disclaimer: "Updated 1 September 2026. General information only; not Spanish legal, immigration, tax or financial advice. Eligibility, evidence and procedure depend on nationality and individual facts. Obtain advice from an appropriately qualified Spanish professional before applying or purchasing.",
  },
};

export const searchGuideSlugs = Object.keys(searchGuides);
