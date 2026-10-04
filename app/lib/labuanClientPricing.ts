import { labuanKnowledge } from "../services/labuan-company-residency/adviser/LabuanKnowledge";

// Reuse the approved client-facing price schedule, never supplier invoices or margins.
const priceIds = new Set(["full-package", "formation-cost", "residency-cost", "annual-cost", "renewal-cost"]);
export const labuanClientPricing = labuanKnowledge.filter(entry => priceIds.has(entry.id));
export const labuanClientPricingText = labuanClientPricing.map(entry => `${entry.title}: ${entry.answer}`).join("\n\n");

export function labuanPriceAnswer(question: string, previousQuestions: string[] = []) {
  const pricing = /cost|price|fee|charge|how much|cu[aá]nto|precio|coste|tarifa|renew|renovaci[oó]n|profit|margin|markup|mark.up/i.test(question);
  if (!pricing) return null;
  const labuan = /labuan/i.test(question) ||
    (!/spain|marbella|villa|rental|dubai|mm2h|de rantau|singapore|espana|españa|alquil/i.test(question) &&
      /labuan/i.test(previousQuestions.slice(-2).join(" ")));
  if (!labuan) return null;
  const annual = /annual|yearly|running|ongoing|anual/i.test(question);
  const renewal = /renew|renovaci[oó]n/i.test(question);
  const entry = labuanClientPricing.find(item => item.id === (renewal ? "renewal-cost" : annual ? "annual-cost" : "full-package"));
  if (!entry) return null;
  const spanish = /cu[aá]nto|precio|coste|tarifa|empresa|sociedad|renovaci[oó]n/i.test(question);
  const answer = spanish
    ? renewal
      ? "PF EuroAsia confirmará por escrito el precio de renovación correspondiente a su caso. Todavía no hay una tarifa de renovación de dos años confirmada para clientes."
      : annual
        ? "El presupuesto orientativo de PF EuroAsia para administración continua es desde aproximadamente US$4,050 al año. El importe depende de la actividad y los requisitos de cumplimiento, contabilidad, auditoría, licencia y sustancia. No es una tarifa anual fija que incluya todos los conceptos."
        : "El paquete orientativo de PF EuroAsia para Labuan es US$13,500: US$6,075 para la constitución de la sociedad y US$7,425 para el trabajo de visado y residencia. El alcance publicado contempla un solicitante principal y un dependiente/asociado. Los solicitantes adicionales, requisitos bancarios, asesoramiento fiscal y conceptos fuera del alcance se presupuestan por separado. El alcance y el precio final se confirman por escrito tras la evaluación."
    : `${entry.answer}\n\nThese are PF EuroAsia's indicative client prices. Final scope and fees are confirmed in writing after assessment. You can view the package or submit an enquiry using the options below.`;
  return {answer, sources:[{label:"PF EuroAsia — Labuan company and residency package",url:"/services/labuan-company-residency"}],mode:"client-pricing"};
}
