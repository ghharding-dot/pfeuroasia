import type { Metadata } from "next";
import type { ReactNode } from "react";

export const SITE_URL = "https://www.pfeuroasia.com";
export const SEO_LAST_UPDATED = new Date("2026-08-19T00:00:00.000Z");

type SeoLocale = "en-GB" | "da-DK" | "zh-CN" | "ar-SA";

type SeoEntry = {
  path: string;
  title: string;
  description: string;
  locale: SeoLocale;
  group: string;
  breadcrumbs: Array<[name: string, path: string]>;
  image?: string;
  index?: boolean;
  priority?: number;
};

const groups: Record<string, Partial<Record<SeoLocale, string>>> = {
  home: { "en-GB": "/", "da-DK": "/da", "zh-CN": "/zh", "ar-SA": "/ar" },
  about: { "en-GB": "/about", "da-DK": "/da/about" },
  acquisition: { "en-GB": "/services/acquisition", "da-DK": "/da/services/acquisition" },
  sales: { "en-GB": "/services/international-sales", "da-DK": "/da/services/international-sales" },
  relocation: { "en-GB": "/services/relocation-concierge", "da-DK": "/da/services/relocation-concierge" },
  labuan: { "en-GB": "/services/labuan-company-residency", "da-DK": "/da/services/labuan-company-residency" },
  marbella: { "en-GB": "/markets/marbella", "da-DK": "/da/markets/marbella" },
  internationalBuyers: { "en-GB": "/guides/marbella-property-international-buyers" },
  goldenMile: { "en-GB": "/areas/marbella-golden-mile" },
  benahavis: { "en-GB": "/areas/benahavis" },
  malaysia: { "en-GB": "/markets/malaysia", "da-DK": "/da/markets/malaysia" },
  middleEast: { "en-GB": "/markets/middle-east", "da-DK": "/da/markets/middle-east" },
  zagaleta: { "en-GB": "/areas/la-zagaleta", "da-DK": "/da/areas/la-zagaleta", "zh-CN": "/zh/la-zagaleta" },
  madronal: { "en-GB": "/areas/el-madronal", "da-DK": "/da/areas/el-madronal", "zh-CN": "/zh/el-madronal" },
  rentals: { "en-GB": "/luxury-villa-rentals", "da-DK": "/da/luxury-villa-rentals", "zh-CN": "/zh/luxury-villa-rentals" },
  commercial: { "en-GB": "/commercial", "da-DK": "/da/commercial" },
  owners: { "en-GB": "/property-owners", "da-DK": "/da/property-owners" },
  portfolio: { "en-GB": "/private-portfolio", "da-DK": "/da/private-portfolio" },
  asia: { "en-GB": "/asia-gateway", "da-DK": "/da/asia-gateway" },
  privacy: { "en-GB": "/privacy", "da-DK": "/da/privacy" },
  enquire: { "en-GB": "/enquire", "da-DK": "/da/enquire" },
};

export const seoPages = {
  homeEn: { path: "/", title: "Luxury Property Marbella, Malaysia & Asia", description: "Independent property, relocation, residency and company-formation guidance connecting Marbella and Southern Spain with Malaysia and selected Asian markets.", locale: "en-GB", group: "home", breadcrumbs: [], priority: 1 },
  homeDa: { path: "/da", title: "International ejendomsrådgivning mellem Europa og Asien", description: "Dansk rådgivning om luksusejendomme, relocation, ophold og virksomhed i Spanien, Malaysia og Asien.", locale: "da-DK", group: "home", breadcrumbs: [], priority: 1 },
  homeZh: { path: "/zh", title: "马贝拉豪宅与欧洲亚洲国际置业服务", description: "为中文客户提供马贝拉、La Zagaleta、El Madroñal及南西班牙豪宅的独立置业、销售和私人咨询服务。", locale: "zh-CN", group: "home", breadcrumbs: [], priority: 0.9 },
  homeAr: { path: "/ar", title: "عقارات ماربيا الفاخرة للعملاء السعوديين والخليجيين", description: "استشارات عقارية مستقلة وسرية تربط العملاء السعوديين والخليجيين بعقارات ماربيا ولا زاغاليتا وإل مادرونيال.", locale: "ar-SA", group: "home", breadcrumbs: [], priority: 0.9 },

  aboutEn: { path: "/about", title: "Independent International Property Advisers", description: "Meet Property Facilitators EuroAsia and discover our private, independent approach to property, relocation and cross-border introductions.", locale: "en-GB", group: "about", breadcrumbs: [["Home", "/"], ["Our approach", "/about"]] },
  aboutDa: { path: "/da/about", title: "Uafhængig international ejendomsrådgivning", description: "Læs om Property Facilitators EuroAsias personlige og uafhængige tilgang til ejendom, relocation og internationale introduktioner.", locale: "da-DK", group: "about", breadcrumbs: [["Forside", "/da"], ["Vores tilgang", "/da/about"]] },

  acquisitionEn: { path: "/services/acquisition", title: "Luxury Property Acquisition Advisory", description: "Independent buyer representation, private property search and acquisition advice across Marbella, Benahavís and selected international markets.", locale: "en-GB", group: "acquisition", breadcrumbs: [["Home", "/"], ["Services", "/#services"], ["Acquisition advisory", "/services/acquisition"]] },
  acquisitionDa: { path: "/da/services/acquisition", title: "Købsrådgivning til luksusejendomme i Spanien", description: "Personlig køberrepræsentation, ejendomssøgning og rådgivning i Marbella, Benahavís og udvalgte internationale markeder.", locale: "da-DK", group: "acquisition", breadcrumbs: [["Forside", "/da"], ["Ydelser", "/da#services-da"], ["Købsrådgivning", "/da/services/acquisition"]] },
  salesEn: { path: "/services/international-sales", title: "International Luxury Property Sales", description: "Discreet international positioning and qualified buyer introductions for exceptional Spanish and selected international properties.", locale: "en-GB", group: "sales", breadcrumbs: [["Home", "/"], ["Services", "/#services"], ["International sales", "/services/international-sales"]] },
  salesDa: { path: "/da/services/international-sales", title: "Internationalt salg af luksusejendomme", description: "Diskret international præsentation og kvalificerede køberintroduktioner til særlige ejendomme i Spanien og udvalgte markeder.", locale: "da-DK", group: "sales", breadcrumbs: [["Forside", "/da"], ["Ydelser", "/da#services-da"], ["Internationalt salg", "/da/services/international-sales"]] },
  relocationEn: { path: "/services/relocation-concierge", title: "Relocation & Private Concierge in Spain", description: "Personal relocation, luxury rental and concierge coordination for families and private clients moving to or staying in Southern Spain.", locale: "en-GB", group: "relocation", breadcrumbs: [["Home", "/"], ["Services", "/#services"], ["Relocation and concierge", "/services/relocation-concierge"]] },
  relocationDa: { path: "/da/services/relocation-concierge", title: "Relocation og privat concierge i Spanien", description: "Personlig koordinering af relocation, luksusophold og concierge for familier og private kunder i Sydspanien.", locale: "da-DK", group: "relocation", breadcrumbs: [["Forside", "/da"], ["Ydelser", "/da#services-da"], ["Relocation og concierge", "/da/services/relocation-concierge"]] },
  labuanEn: { path: "/services/labuan-company-residency", title: "Labuan Company Setup & Malaysia Residency", description: "A coordinated pathway to Labuan company formation, Malaysian work permits, family residency and tax-residency guidance through local specialists.", locale: "en-GB", group: "labuan", breadcrumbs: [["Home", "/"], ["Asia Gateway", "/asia-gateway"], ["Labuan company and residency", "/services/labuan-company-residency"]], image: "/images/kl BACK GORUND.avif", priority: 0.9 },
  labuanDa: { path: "/da/services/labuan-company-residency", title: "Labuan-selskab og ophold i Malaysia", description: "En koordineret vej til Labuan-selskabsstiftelse, arbejdstilladelse, familieophold og skatteforhold gennem lokale specialister.", locale: "da-DK", group: "labuan", breadcrumbs: [["Forside", "/da"], ["Asia Gateway", "/da/asia-gateway"], ["Labuan-selskab og ophold", "/da/services/labuan-company-residency"]], image: "/images/kl BACK GORUND.avif", priority: 0.9 },

  marbellaEn: { path: "/markets/marbella", title: "Luxury Property in Marbella & Benahavís", description: "Independent guidance for luxury homes and private estates across Marbella Golden Mile, Benahavís, La Zagaleta and El Madroñal.", locale: "en-GB", group: "marbella", breadcrumbs: [["Home", "/"], ["Markets", "/#markets"], ["Marbella and Benahavís", "/markets/marbella"]], image: "/images/hero-villa.webp", priority: 0.9 },
  marbellaDa: { path: "/da/markets/marbella", title: "Luksusejendomme i Marbella og Benahavís", description: "Dansk rådgivning om luksusboliger på Marbella Golden Mile samt private ejendomme i Benahavís, La Zagaleta og El Madroñal.", locale: "da-DK", group: "marbella", breadcrumbs: [["Forside", "/da"], ["Markeder", "/da#markets-da"], ["Marbella og Benahavís", "/da/markets/marbella"]], image: "/images/hero-villa.webp", priority: 0.9 },
  internationalBuyersEn: { path: "/guides/marbella-property-international-buyers", title: "Marbella Property Advisor for International Buyers", description: "Independent Marbella property advice for international buyers from the UK, Scandinavia, the Middle East, Asia and the United States.", locale: "en-GB", group: "internationalBuyers", breadcrumbs: [["Home", "/"], ["Marbella and Benahavís", "/markets/marbella"], ["International buyer guide", "/guides/marbella-property-international-buyers"]], image: "/images/hero-villa.webp", priority: 0.9 },
  goldenMileEn: { path: "/areas/marbella-golden-mile", title: "Marbella Golden Mile Property & Luxury Villas", description: "Independent guidance to apartments, villas and private communities across Marbella Golden Mile, from beachfront living to elevated residential areas.", locale: "en-GB", group: "goldenMile", breadcrumbs: [["Home", "/"], ["Marbella and Benahavís", "/markets/marbella"], ["Marbella Golden Mile", "/areas/marbella-golden-mile"]], image: "/images/hero-villa.webp", priority: 0.9 },
  benahavisEn: { path: "/areas/benahavis", title: "Benahavís Property, Villas & Private Estates", description: "Explore property in Benahavís, including private hillside estates, golf communities, family villas and discreet luxury opportunities above Marbella.", locale: "en-GB", group: "benahavis", breadcrumbs: [["Home", "/"], ["Marbella and Benahavís", "/markets/marbella"], ["Benahavís", "/areas/benahavis"]], image: "/images/zagaleta-view.webp", priority: 0.9 },
  malaysiaEn: { path: "/markets/malaysia", title: "Malaysia Property, Living & Kuala Lumpur Investment", description: "Explore Kuala Lumpur property, Malaysia relocation, discovery visits and trusted local introductions for international investors and families.", locale: "en-GB", group: "malaysia", breadcrumbs: [["Home", "/"], ["Asia Gateway", "/asia-gateway"], ["Malaysia", "/markets/malaysia"]], image: "/images/asia-network.webp", priority: 0.9 },
  malaysiaDa: { path: "/da/markets/malaysia", title: "Ejendom, relocation og investering i Malaysia", description: "Udforsk ejendomme i Kuala Lumpur, relocation til Malaysia og lokale introduktioner for danske investorer, familier og iværksættere.", locale: "da-DK", group: "malaysia", breadcrumbs: [["Forside", "/da"], ["Asia Gateway", "/da/asia-gateway"], ["Malaysia", "/da/markets/malaysia"]], image: "/images/asia-network.webp", priority: 0.9 },
  middleEastEn: { path: "/markets/middle-east", title: "Middle East Property & International Opportunities", description: "Selected property, investment and private-client opportunities connecting the Gulf region with Spain, Malaysia and Asia.", locale: "en-GB", group: "middleEast", breadcrumbs: [["Home", "/"], ["Markets", "/#markets"], ["Middle East", "/markets/middle-east"]] },
  middleEastDa: { path: "/da/markets/middle-east", title: "Ejendom og internationale muligheder i Mellemøsten", description: "Udvalgte ejendoms-, investerings- og samarbejdsmuligheder mellem Golfregionen, Spanien, Malaysia og Asien.", locale: "da-DK", group: "middleEast", breadcrumbs: [["Forside", "/da"], ["Markeder", "/da#markets-da"], ["Mellemøsten", "/da/markets/middle-east"]] },

  zagaletaEn: { path: "/areas/la-zagaleta", title: "La Zagaleta Luxury Villas & Private Estates", description: "An independent guide to buying and owning luxury property in La Zagaleta, Benahavís—one of Europe's most private residential estates.", locale: "en-GB", group: "zagaleta", breadcrumbs: [["Home", "/"], ["Marbella and Benahavís", "/markets/marbella"], ["La Zagaleta", "/areas/la-zagaleta"]], image: "/images/zagaleta-view.webp", priority: 0.9 },
  zagaletaDa: { path: "/da/areas/la-zagaleta", title: "La Zagaleta villaer og private ejendomme", description: "Dansk guide til køb og ejerskab af luksusejendomme i La Zagaleta, Benahavís—et af Europas mest private boligområder.", locale: "da-DK", group: "zagaleta", breadcrumbs: [["Forside", "/da"], ["Marbella og Benahavís", "/da/markets/marbella"], ["La Zagaleta", "/da/areas/la-zagaleta"]], image: "/images/zagaleta-view.webp", priority: 0.9 },
  zagaletaZh: { path: "/zh/la-zagaleta", title: "La Zagaleta豪华别墅与私人庄园", description: "面向中文客户的La Zagaleta豪宅指南，涵盖位置、生活方式、物业类型及马贝拉私人置业咨询。", locale: "zh-CN", group: "zagaleta", breadcrumbs: [["中文首页", "/zh"], ["La Zagaleta", "/zh/la-zagaleta"]], image: "/images/zagaleta-view.webp", priority: 0.8 },
  madronalEn: { path: "/areas/el-madronal", title: "El Madroñal Villas & Private Estates", description: "Explore luxury villas and private estates in El Madroñal, Benahavís, with independent local guidance on location, views, access and value.", locale: "en-GB", group: "madronal", breadcrumbs: [["Home", "/"], ["Marbella and Benahavís", "/markets/marbella"], ["El Madroñal", "/areas/el-madronal"]], image: "/images/el-madronal-essence.webp", priority: 0.9 },
  madronalDa: { path: "/da/areas/el-madronal", title: "El Madroñal villaer og private ejendomme", description: "Dansk guide til luksusvillaer i El Madroñal, Benahavís, med lokal rådgivning om beliggenhed, udsigt, adgang og værdi.", locale: "da-DK", group: "madronal", breadcrumbs: [["Forside", "/da"], ["Marbella og Benahavís", "/da/markets/marbella"], ["El Madroñal", "/da/areas/el-madronal"]], image: "/images/el-madronal-essence.webp", priority: 0.9 },
  madronalZh: { path: "/zh/el-madronal", title: "El Madroñal豪华别墅与私人庄园", description: "面向中文客户的El Madroñal豪宅指南，介绍位置、自然环境、别墅类型及马贝拉私人置业服务。", locale: "zh-CN", group: "madronal", breadcrumbs: [["中文首页", "/zh"], ["El Madroñal", "/zh/el-madronal"]], image: "/images/el-madronal-essence.webp", priority: 0.8 },

  rentalsEn: { path: "/luxury-villa-rentals", title: "Luxury Villa Rentals in Marbella & Benahavís", description: "Private luxury villa rentals in La Zagaleta, El Madroñal, Marbella Golden Mile, Sierra Blanca and selected Costa del Sol locations.", locale: "en-GB", group: "rentals", breadcrumbs: [["Home", "/"], ["Luxury villa rentals", "/luxury-villa-rentals"]], image: "/images/luxury-villa-rentals/la-zagaleta.jpg", priority: 0.9 },
  rentalsDa: { path: "/da/luxury-villa-rentals", title: "Luksusvillaer til leje i Marbella og Benahavís", description: "Private luksusvillaer i La Zagaleta, El Madroñal, Marbella Golden Mile, Sierra Blanca og udvalgte områder på Costa del Sol.", locale: "da-DK", group: "rentals", breadcrumbs: [["Forside", "/da"], ["Luksusvillaer", "/da/luxury-villa-rentals"]], image: "/images/luxury-villa-rentals/la-zagaleta.jpg", priority: 0.9 },
  rentalsZh: { path: "/zh/luxury-villa-rentals", title: "马贝拉与Benahavís豪华别墅租赁", description: "精选La Zagaleta、El Madroñal、Marbella Golden Mile及Costa del Sol豪华私人别墅。", locale: "zh-CN", group: "rentals", breadcrumbs: [["中文首页", "/zh"], ["豪华别墅租赁", "/zh/luxury-villa-rentals"]], image: "/images/luxury-villa-rentals/la-zagaleta.jpg", priority: 0.8 },

  commercialEn: { path: "/commercial", title: "Private Commercial Property & Investment Opportunities", description: "Qualified access to selected hotels, development opportunities, land and income-producing property across Spain and international markets.", locale: "en-GB", group: "commercial", breadcrumbs: [["Home", "/"], ["Commercial opportunities", "/commercial"]] },
  commercialDa: { path: "/da/commercial", title: "Private erhvervs- og investeringsmuligheder", description: "Kvalificeret adgang til udvalgte hoteller, udviklingsprojekter, jord og indtægtsgivende ejendomme i Spanien og internationale markeder.", locale: "da-DK", group: "commercial", breadcrumbs: [["Forside", "/da"], ["Erhverv og investering", "/da/commercial"]] },
  ownersEn: { path: "/property-owners", title: "Confidential Property Representation in Marbella", description: "Discreet public and off-market representation for distinctive Marbella and Benahavís properties, with qualified international buyer introductions.", locale: "en-GB", group: "owners", breadcrumbs: [["Home", "/"], ["Confidential property representation", "/property-owners"]], image: "/images/hero-villa.webp", priority: 0.9 },
  ownersDa: { path: "/da/property-owners", title: "Sælg din ejendom i Marbella internationalt", description: "Præsentér ejendomme i Marbella og Benahavís for kvalificerede internationale købere gennem diskret positionering og kontrolleret distribution.", locale: "da-DK", group: "owners", breadcrumbs: [["Forside", "/da"], ["Ejendomsejere", "/da/property-owners"]] },
  portfolioEn: { path: "/private-portfolio", title: "Off-Market Marbella Property & Private Villas", description: "Request confidential access to selected off-market villas, private estates and investment property across Marbella and Benahavís.", locale: "en-GB", group: "portfolio", breadcrumbs: [["Home", "/"], ["Private portfolio", "/private-portfolio"]], image: "/images/hero-villa.webp", priority: 0.9 },
  portfolioDa: { path: "/da/private-portfolio", title: "Privat og off-market ejendomsportefølje", description: "Registrér dig for fortrolig adgang til udvalgte private og diskret markedsførte luksusejendomme i Sydspanien.", locale: "da-DK", group: "portfolio", breadcrumbs: [["Forside", "/da"], ["Privat portefølje", "/da/private-portfolio"]] },
  asiaEn: { path: "/asia-gateway", title: "Malaysia & Asia Property, Residency and Company Setup", description: "A practical gateway to Malaysia property, Labuan company formation, residency, relocation and international business introductions.", locale: "en-GB", group: "asia", breadcrumbs: [["Home", "/"], ["Asia Gateway", "/asia-gateway"]], image: "/images/asia-network.webp", priority: 0.9 },
  asiaDa: { path: "/da/asia-gateway", title: "Malaysia og Asien: ejendom, ophold og selskab", description: "En dansk indgang til ejendom i Malaysia, Labuan-selskab, ophold, relocation og internationale virksomhedsintroduktioner.", locale: "da-DK", group: "asia", breadcrumbs: [["Forside", "/da"], ["Asia Gateway", "/da/asia-gateway"]], image: "/images/asia-network.webp", priority: 0.9 },
  privacyEn: { path: "/privacy", title: "Privacy Notice", description: "How Property Facilitators EuroAsia handles website enquiries, personal information and verified document access.", locale: "en-GB", group: "privacy", breadcrumbs: [["Home", "/"], ["Privacy notice", "/privacy"]], priority: 0.4 },
  privacyDa: { path: "/da/privacy", title: "Privatlivspolitik", description: "Sådan behandler Property Facilitators EuroAsia forespørgsler, personoplysninger og verificeret dokumentadgang.", locale: "da-DK", group: "privacy", breadcrumbs: [["Forside", "/da"], ["Privatliv", "/da/privacy"]], priority: 0.4 },
  enquireEn: { path: "/enquire", title: "Confidential Property & Relocation Enquiry", description: "Contact Property Facilitators EuroAsia privately about property, relocation, residency, company setup or international collaboration.", locale: "en-GB", group: "enquire", breadcrumbs: [["Home", "/"], ["Enquire", "/enquire"]], priority: 0.6 },
  enquireDa: { path: "/da/enquire", title: "Fortrolig forespørgsel om ejendom og relocation", description: "Kontakt Property Facilitators EuroAsia fortroligt om ejendom, relocation, ophold, selskabsstiftelse eller internationalt samarbejde.", locale: "da-DK", group: "enquire", breadcrumbs: [["Forside", "/da"], ["Kontakt", "/da/enquire"]], priority: 0.6 },

  countryEstatesEn: { path: "/opportunities/country-estates", title: "Country Estates & Fincas in Andalusia", description: "Register requirements for substantial country estates, fincas, cortijos, equestrian and lifestyle properties in Andalusia.", locale: "en-GB", group: "countryEstates", breadcrumbs: [["Home", "/"], ["Opportunities", "/#opportunities"], ["Country estates", "/opportunities/country-estates"]] },
  investmentEn: { path: "/opportunities/investment-opportunities", title: "Private Property Investment Opportunities", description: "Register interest in selected hotels, commercial property, development sites, land, refurbishment projects and income-producing assets.", locale: "en-GB", group: "investment", breadcrumbs: [["Home", "/"], ["Opportunities", "/#opportunities"], ["Investment opportunities", "/opportunities/investment-opportunities"]] },
  labuanAdviserEn: { path: "/services/labuan-company-residency/adviser", title: "Ask EuroAsia: Malaysia Living & Labuan Adviser", description: "Ask practical questions about living in Malaysia, Kuala Lumpur property, travel and the PF EuroAsia Labuan company and residency pathway.", locale: "en-GB", group: "labuanAdviser", breadcrumbs: [["Home", "/"], ["Labuan company and residency", "/services/labuan-company-residency"], ["Ask EuroAsia", "/services/labuan-company-residency/adviser"]], priority: 0.7 },
  asiaEnquireEn: { path: "/asia-gateway/enquire", title: "Private Malaysia & Asia Enquiry", description: "Discuss Malaysia property, residency, Labuan company setup, relocation or a professional partnership with PF EuroAsia.", locale: "en-GB", group: "asiaEnquire", breadcrumbs: [["Home", "/"], ["Asia Gateway", "/asia-gateway"], ["Enquire", "/asia-gateway/enquire"]], index: false },
  rentalEnquireEn: { path: "/luxury-villa-rentals/enquire", title: "Request Luxury Villa Availability", description: "Send your dates and requirements for a private selection of luxury villas in Marbella and Benahavís.", locale: "en-GB", group: "rentalEnquire", breadcrumbs: [["Home", "/"], ["Luxury villa rentals", "/luxury-villa-rentals"], ["Request availability", "/luxury-villa-rentals/enquire"]], index: false },
} satisfies Record<string, SeoEntry>;

export type SeoPageKey = keyof typeof seoPages;

const ogLocale: Record<SeoLocale, string> = {
  "en-GB": "en_GB",
  "da-DK": "da_DK",
  "zh-CN": "zh_CN",
  "ar-SA": "ar_SA",
};

export function languageAlternates(key: SeoPageKey): Record<string, string> {
  const page: SeoEntry = seoPages[key];
  const cluster = groups[page.group] ?? { [page.locale]: page.path };
  const alternates: Record<string, string> = {};
  for (const [locale, path] of Object.entries(cluster)) {
    if (path) alternates[locale] = path;
  }
  alternates["x-default"] = cluster["en-GB"] ?? page.path;
  return alternates;
}

export function createMetadata(key: SeoPageKey): Metadata {
  const page: SeoEntry = seoPages[key];
  const image = page.image ?? "/images/hero-villa.webp";
  const shouldIndex = page.index !== false;
  const alternateLocales = Object.keys(languageAlternates(key))
    .filter((locale): locale is SeoLocale => locale !== "x-default" && locale !== page.locale)
    .map((locale) => ogLocale[locale]);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
      languages: languageAlternates(key),
    },
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[page.locale],
      alternateLocale: alternateLocales,
      url: page.path,
      siteName: "Property Facilitators EuroAsia",
      title: page.title,
      description: page.description,
      images: [{ url: image, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}

export function RouteSeo({ pageKey, children }: { pageKey: SeoPageKey; children: ReactNode }) {
  const page: SeoEntry = seoPages[pageKey];
  const pageUrl = `${SITE_URL}${page.path === "/" ? "" : page.path}`;
  const image = page.image ?? "/images/hero-villa.webp";
  const serviceGroups = new Set([
    "acquisition",
    "sales",
    "relocation",
    "labuan",
    "rentals",
    "commercial",
    "owners",
    "portfolio",
    "asia",
  ]);
  const serviceSchema = serviceGroups.has(page.group) ? {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: page.title,
    description: page.description,
    url: pageUrl,
    provider: { "@id": `${SITE_URL}/#organization` },
  } : null;
  const pageSchema = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.title,
    description: page.description,
    inLanguage: page.locale,
    dateModified: SEO_LAST_UPDATED.toISOString(),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}${image}`,
    },
    ...(serviceSchema ? { mainEntity: { "@id": serviceSchema["@id"] } } : {}),
  };
  const breadcrumbSchema = page.breadcrumbs.length > 1 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: page.breadcrumbs.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  } : null;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [pageSchema, breadcrumbSchema, serviceSchema].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
