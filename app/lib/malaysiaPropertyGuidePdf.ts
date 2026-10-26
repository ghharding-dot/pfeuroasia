import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const malaysiaPropertyGuideFilename = "PF-EuroAsia-Buying-Property-in-Malaysia.pdf";

export async function createMalaysiaPropertyGuidePdf() {
  const pdf = await PDFDocument.create();
  pdf.setTitle("How to buy property in Malaysia | PF EuroAsia");
  pdf.setAuthor("Property Facilitators EuroAsia");
  pdf.setSubject("A practical foreign-buyer checklist with a Kuala Lumpur focus. Reviewed 26 October 2026.");
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.1, 0.19, 0.21), gold = rgb(0.66, 0.48, 0.22), grey = rgb(0.35, 0.4, 0.41);
  const pages = [pdf.addPage([595, 842]), pdf.addPage([595, 842]), pdf.addPage([595, 842])];
  let index = 0, y = 772;
  const x = 48, width = 499;
  function text(value: string, size = 10.5, strong = false, color = ink, gap = 9) {
    const font = strong ? bold : regular;
    const lines: string[] = [];
    for (const paragraph of value.split("\n")) {
      let current = "";
      for (const word of paragraph.split(/\s+/)) {
        const candidate = current ? `${current} ${word}` : word;
        if (font.widthOfTextAtSize(candidate, size) > width && current) { lines.push(current); current = word; }
        else current = candidate;
      }
      if (current) lines.push(current);
    }
    if (y - lines.length * (size + 4) - gap < 64) throw new Error(`Property guide page ${index + 1} overflow`);
    for (const line of lines) { pages[index].drawText(line, {x, y, size, font, color}); y -= size + 4; }
    y -= gap;
  }
  function heading(value: string) { y -= 5; text(value, 13, true, gold, 7); }
  function next() { index += 1; y = 772; }
  pages.forEach((p, i) => {
    p.drawRectangle({x: 0, y: 801, width: 595, height: 41, color: ink});
    p.drawText("PF EUROASIA  /  INTERNATIONAL PROPERTY GUIDES", {x, y: 817, size: 9, font: bold, color: rgb(1,1,1)});
    p.drawLine({start: {x, y: 49}, end: {x: 547, y: 49}, thickness: 0.7, color: gold});
    p.drawText("pfeuroasia.com  |  enquiry@pfeuroasia.com", {x, y: 32, size: 9, font: regular, color: grey});
    p.drawText(`${i + 1} / 3`, {x: 518, y: 32, size: 9, font: regular, color: grey});
  });
  text("HOW TO BUY PROPERTY", 23, true, ink, 1);
  text("IN MALAYSIA", 23, true, ink, 11);
  text("A foreign-buyer guide with a Kuala Lumpur focus", 12, true, gold, 7);
  text("Reviewed 26 October 2026 | Complimentary three-page guide", 9, false, grey, 12);
  text("Start with the home you need, the location you prefer and the total cash you can commit. Then establish whether you can legally acquire that particular property before paying a reservation amount.");
  heading("01  Can a foreign buyer purchase?");
  text("Yes, in eligible cases. State Authority approval is a central part of foreign acquisition. The relevant minimum value and permitted property categories must be checked for the actual title and jurisdiction. A visa or an agent's assurance does not replace this review. [1, 2]");
  text("Ask your independent Malaysian solicitor to confirm the current threshold, any restricted allocation or reservation, title conditions, consent fees and whether approval is required before the contract becomes unconditional.");
  heading("02  Kuala Lumpur or the wider Klang Valley?");
  text("An address marketed as greater Kuala Lumpur may be in Selangor. Have the lawyer identify the land-office jurisdiction first; do not apply a Kuala Lumpur assumption to a Selangor property.");
  text("For viewings, compare KLCC, Bukit Bintang, Mont Kiara and Bangsar against your own priorities: commuting, schools, healthcare, walking access, noise, building upkeep and the likely resale audience. Visit at different times of day.");
  heading("03  Understand what you are buying");
  text("Request the title search, freehold or remaining leasehold term, strata-title position, registered owner, charges and caveats. For an apartment, ask for service charges, sinking-fund contributions, arrears, house rules and major planned works.");
  text("For a new development, ask the solicitor to check the developer's approvals, applicable sale protections, payment schedule, delivery terms and defect process. Obtain a written inventory of parking, furnishings and specifications.");
  next();
  text("THE PURCHASE SEQUENCE", 21, true, ink, 11);
  text("Keep legal review ahead of payment deadlines", 12, true, gold, 12);
  heading("1  Set the brief and check finance");
  text("Decide on home use or investment, location, budget, timing and financing. Ask the lender about eligibility, valuation, required cash contribution, currency of income and supporting documents before making a finance-dependent offer.");
  heading("2  Verify the people and the property");
  text("Appoint your own solicitor. Verify the estate agency and negotiator through the Malaysian regulator's public search. Ask who holds any deposit, in which account and under what written release and refund conditions. [3]");
  heading("3  Review the offer before reserving");
  text("Have your lawyer review the offer or reservation terms, including consent and finance conditions, refund rights, deadlines and the stakeholder arrangement. Do not assume a booking payment is refundable. Payment structures differ between developer sales and resales.");
  heading("4  Sign the sale and purchase agreement");
  text("The solicitor reviews the seller's title, contractual obligations, inclusions and completion mechanism. Agree the deposit and payment stages in writing, together with what happens if approval or financing is refused or delayed.");
  heading("5  Obtain approvals and complete");
  text("Your solicitor coordinates the required consent process, financing documents, duty assessment and transfer or assignment. Completion timing depends on the contract, approvals, existing charges and title status; do not rely on a universal completion deadline. [1, 2, 4]");
  heading("6  Inspect, hand over and manage");
  text("Check condition, keys, meters, access cards, inventory, parking rights and outstanding charges before accepting handover. For a new home, record defects and the contractual reporting deadline. Arrange insurance, utilities and management for time spent overseas.");
  heading("Planning to live in the property?");
  text("Buying a home alone does not grant a residence pass. If pursuing MM2H or another route, check that the property satisfies both acquisition rules and the applicable programme conditions. Keep immigration and personal tax residence as separate workstreams. [5]");
  next();
  text("COSTS & FINAL CHECKLIST", 21, true, ink, 11);
  heading("Budget beyond the purchase price");
  text("Residential transfer duty: HASiL's June 2026 guidance states RM8 per RM100 (8%) for residential property sold from 1 January 2026 to foreign companies or individuals who are neither Malaysian citizens nor permanent residents. Assessment uses the higher of consideration and market value. Ask your solicitor to confirm classification, timing and any applicable relief. [4]");
  text("Illustration only: if the applicable dutiable value is RM1,500,000, duty at 8% is RM120,000. This is not the complete acquisition cost or a confirmation that the property is eligible for a foreign buyer.");
  text("Request an itemised quote for legal fees, searches, consent fees or levies, registration, valuation, finance documentation and loan duty where relevant. Separately allow for currency conversion, furnishing, insurance, service charges, sinking fund, local assessments and repairs.");
  heading("Before you commit, obtain written answers");
  text("[ ] Can I acquire this exact title, at this price, under current rules?\n[ ] Which approval is needed and what happens if it is refused?\n[ ] Who holds the deposit, and when can it be refunded?\n[ ] What are the total cash requirement and ongoing annual costs?\n[ ] Is my intended rental use permitted by all relevant rules?\n[ ] What tax and sale costs should I plan for on a later exit?", 10, false, ink, 6);
  heading("Plan your purchase with PF EuroAsia");
  text("Share your location, budget, intended use and timing. We can help shortlist opportunities and coordinate introductions to local property, legal, finance and residency specialists. Contact enquiry@pfeuroasia.com or +34 647 026 881.", 10, false, ink, 6);
  heading("References and further reading");
  text("[1] JKPTG: jkptg.gov.my/en/pemilik-tanah\n[2] Kuala Lumpur land office: ptgwp.gov.my/portal/\n[3] Agency and negotiator verification: search.lppeh.gov.my/Search.aspx\n[4] HASiL: hasil.gov.my/en/perundangan/garis-panduan/ (30 June 2026, Part C, pages 10-11).\n[5] MM2H programme authority: mm2h.gov.my\nFurther reading: Juwai.asia, How to Buy Property in Malaysia as a Foreigner: Ultimate Guide - juwai.asia/main/news/15734", 8, false, grey, 5);
  text("General information only, not legal, tax, mortgage or investment advice. Rules and individual treatment can change. Obtain independent Malaysian advice before signing or transferring funds.", 8, false, grey, 0);
  return pdf.save();
}
