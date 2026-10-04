import { seoPages } from "./seo";
import { knowledgeArticles } from "./knowledgeArticles";
import { searchGuides } from "./searchGuides";
import { readProperties, normalizePropertyAccessLevel } from "./propertyStore";
import { readRentalVillas } from "./rentalVillaStore";
import { retrieveMalaysiaAdviserKnowledge, formatHybridKnowledgeContext } from "../services/labuan-company-residency/adviser/MalaysiaAdviserHybridRetrieval";
import snapshot from "./conciergeSnapshot.json";

export type ConciergePage = { title: string; href: string; text: string; capturedAt?: string };
const bundledPages = snapshot.pages as Record<string, { text: string; capturedAt: string }>;
const extras: ConciergePage[] = [
  { title: "Spain Gateway — luxury properties, developments and 100+ rental villas", href: "/spain-gateway", text: "Marbella Costa del Sol Spain buy sale rent luxury villa" },
  { title: "Current property collection", href: "/properties", text: "Spain villas apartments plots developments budget bedrooms price" },
  { title: "Malaysia property — Armani Hallson KLCC", href: "/malaysia-property-developments/armani-hallson-klcc", text: "Kuala Lumpur Malaysia development residences apartments" },
  { title: "International payments — Estuary FX", href: "/international-payments", text: "Currency exchange money transfers foreign exchange property payments" },
  { title: "Malaysia travel", href: "/travel/malaysia", text: "Hotels flights tourism holidays Asia" },
  { title: "Spain travel", href: "/travel/spain", text: "Málaga flights tourism holidays" },
  { title: "PF Iberia", href: "https://www.pfiberia.com/", text: "Property Facilitators Iberia Spain associate office Marbella" },
  ...["antonio-flores", "bremberg", "ivan-munoz-garcia", "jorge-gonzalez", "juan-antonio-alvarez", "luis-recio", "robert-bazo"].map(slug => ({title: `Partner: ${slug.replaceAll("-", " ")}`, href: `/partners/${slug}`, text: "Collaborator professional partner legal concierge property"})),
];
export function publicPageRegistry(): ConciergePage[] {
  const pages: ConciergePage[] = Object.values(seoPages)
    .filter(p => p.locale === "en-GB" && (!("index" in p) || p.index !== false))
    // Access-controlled pages can be linked, but their contents must never enter the assistant.
    .filter(p => !/fairmont|private-portfolio|\/adviser/.test(p.path))
    .map(p => ({title: p.title, href: p.path, text: p.description}));
  pages.push(...knowledgeArticles.filter(p => !/fairmont/.test(p.href)).map(p => ({title:p.title,href:p.href,text:p.summary})), ...extras);
  return Array.from(new Map(pages.map(p => [p.href, p])).values());
}
const ignored = new Set("the and for from with what where which would could can you your have please show send take page want looking like about this that are how me to of in a i is do on it we us en el la los las una un de que para por con quiero puedes pagina please".split(" "));
export function words(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(/[\p{L}\p{N}]+/gu)?.filter(w => w.length > 1 && !ignored.has(w)) || [];
}
export function expandQuestion(value: string) {
  return value + " " + [
    [/alquil|rent|holiday|vacation/i, "rent rental villas"], [/compr|buy|sale|venta/i, "buy property acquisition"],
    [/residen|visado|visa|mm2h/i, "residency Malaysia"], [/empresa|company|labuan/i, "company formation Labuan"],
    [/transfer|dinero|currency|divisa/i, "currency money transfers international payments"],
    [/espana|spain/i, "Spain Marbella"], [/malasia|malaysia/i, "Malaysia"],
  ].filter(([pattern]) => (pattern as RegExp).test(value)).map(([, text]) => text).join(" ");
}
export function rankPages(question: string, pages: ConciergePage[], limit = 6) {
  const original = words(question);
  const expanded = words(expandQuestion(question));
  return pages.map(page => {
    const title = words(page.title + " " + page.href).join(" ");
    const body = words(page.text).join(" ");
    const score = original.reduce((s,w) => s + (title.includes(w) ? 8 : body.includes(w) ? 2 : 0), 0)
      + expanded.reduce((s,w) => s + (title.includes(w) ? 1 : 0), 0);
    return { page, score };
  }).filter(p => p.score > 0).sort((a,b) => b.score-a.score).slice(0,limit).map(p => p.page);
}
export function visiblePropertyPages(properties: Awaited<ReturnType<typeof readProperties>>): ConciergePage[] {
  return properties.filter(p => p.status === "published" && p.visibility === "public" &&
    normalizePropertyAccessLevel(p.accessLevel,p.visibility) === "registered" &&
    p.publicImageApproved === true && p.approvalStatus !== "pending-review" && p.approvalStatus !== "changes-requested")
    .map(p => ({title:p.publicTitle || p.title,href:`/properties/${encodeURIComponent(p.id)}`,text:
      `${p.publicLocation || p.location}. ${p.market || "spain"}. ${p.bedrooms} bedrooms, ${p.bathrooms} bathrooms. Plot ${p.plotSize}; built ${p.builtSize}. Asking price ${p.price || "on request"}. ${p.description.slice(0,4000)}. Last updated ${p.updatedAt}. Listed for enquiry; current availability requires confirmation.`}));
}
export function htmlText(html: string) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
  return main.replace(/<(script|style|nav|header|footer)\b[^>]*>[\s\S]*?<\/\1>/gi," ")
    .replace(/<[^>]+>/g," ").replace(/&#(\d+);/g, (_,n) => String.fromCodePoint(Math.min(Number(n),0x10ffff)))
    .replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#x27;|&apos;/g,"'")
    .replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").trim().slice(0,16000);
}
export async function readPublicPage(page: ConciergePage) {
  const url = new URL(page.href, "https://www.pfeuroasia.com");
  if (!["www.pfeuroasia.com","www.pfiberia.com"].includes(url.hostname) || url.protocol !== "https:") return page;
  if (/fairmont|vault|collaborators|private-portfolio|\/access|\/adviser/.test(url.pathname)) return page;
  const guide = Object.values(searchGuides).find(g => page.href === `/guides/${g.slug}`);
  if (guide) return {...page,text:JSON.stringify(guide)};
  const reference = bundledPages[page.href];
  return reference ? {...page, ...reference} : page;
}
let publicCatalogue: { pages: ConciergePage[]; expires: number } | undefined;
let catalogueLoading: Promise<ConciergePage[]> | undefined;
async function readPublicCatalogue() {
  if (publicCatalogue && publicCatalogue.expires > Date.now()) return publicCatalogue.pages;
  if (catalogueLoading) return catalogueLoading;
  catalogueLoading = (async () => {
    const catalogue = await Promise.allSettled([readProperties(),readRentalVillas()]);
    const pages: ConciergePage[] = [];
    if (catalogue[0].status === "fulfilled") pages.push(...visiblePropertyPages(catalogue[0].value));
    if (catalogue[1].status === "fulfilled") pages.push(...catalogue[1].value
      .filter(p => p.status === "published" && p.approvalStatus === "approved")
      .map(p => ({title:p.title,href:`/luxury-villa-rentals?villa=${encodeURIComponent(p.reference)}#villa-enquiry`,text:
        `${p.location}; ${p.bedrooms} bedrooms; ${p.guests} guests. ${p.description}. ${p.amenities || ""}. Dates, rates and availability must be confirmed by the rental partner.`})));
    if (catalogue.every(result => result.status === "fulfilled")) publicCatalogue = { pages, expires: Date.now() + 60000 };
    return pages;
  })();
  try { return await catalogueLoading; } finally { catalogueLoading = undefined; }
}
export async function retrieveConciergeKnowledge(question: string) {
  const pages = await Promise.all(publicPageRegistry().map(readPublicPage));
  if (/propert|villa|apartment|bedroom|rental|\brent\b|alquil|inmueble|vivienda|zagaleta|madro[nñ]al|\b[defh]\s?\d{1,2}\b/i.test(question)) pages.push(...await readPublicCatalogue());
  const selected = rankPages(question,pages,4);
  const contents = await Promise.all(selected.map(page => {
    const guide = Object.values(searchGuides).find(g => page.href === `/guides/${g.slug}`);
    if (guide) return {...page,text:JSON.stringify(guide)};
    if (page.href.startsWith("/properties/") || page.href.includes("?villa=")) return page;
    return readPublicPage(page);
  }));
  const malaysia = retrieveMalaysiaAdviserKnowledge(question,3);
  return {pages:contents,malaysiaContext:formatHybridKnowledgeContext(malaysia.matches),registry:pages};
}
