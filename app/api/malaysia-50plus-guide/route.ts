import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { recordMalaysiaAdviserAccess } from "../../lib/malaysiaAdviserLeadStore";

export const runtime = "nodejs";
const ink = rgb(0.12, 0.18, 0.24);
const gold = rgb(0.65, 0.48, 0.22);
const muted = rgb(0.37, 0.42, 0.47);

export async function POST(request: NextRequest) {
  let payload: { email?: unknown; consent?: unknown; company_website?: unknown };
  try { payload = await request.json(); } catch { return NextResponse.json({error:"Invalid request"}, {status:400}); }
  if (payload.company_website) return NextResponse.json({error:"Invalid request"}, {status:400});
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase().slice(0,320) : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || payload.consent !== true) return NextResponse.json({error:"Enter a valid email and accept the privacy notice."},{status:400});
  try {
    await recordMalaysiaAdviserAccess({fullName:"PDF guide subscriber",email,source:"Malaysia 50+ and 60+ residency PDF download"});
  } catch (error) {
    console.error("malaysia-pdf-lead-registration-failed",error);
    return NextResponse.json({error:"We could not register your download. Please try again."},{status:503});
  }
  const pdf = await PDFDocument.create();
  pdf.setTitle("Malaysia Residency for Over-50s and Over-60s | PF EuroAsia");
  pdf.setAuthor("Property Facilitators EuroAsia");
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pages = [pdf.addPage([595,842]),pdf.addPage([595,842])];
  let pageIndex=0, y=785;
  const left=49, width=497;
  function line(text:string, size=10, weight=false, color=ink, gap=7) {
    const font=weight?bold:regular;
    const words=text.split(/\s+/);
    let current="";
    for (const word of words) {
      const candidate=current?current+" "+word:word;
      if (font.widthOfTextAtSize(candidate,size)>width && current) {
        pages[pageIndex].drawText(current,{x:left,y,size,font,color});
        y-=size+5; current=word;
      } else current=candidate;
    }
    if(current){pages[pageIndex].drawText(current,{x:left,y,size,font,color});y-=size+gap;}
  }
  function heading(t:string){y-=8;line(t,13,true,gold,11);}
  function next(){pageIndex=1;y=785;}
  for (const p of pages) {
    p.drawRectangle({x:0,y:816,width:595,height:26,color:ink});
    p.drawText("PROPERTY FACILITATORS EUROASIA  |  MALAYSIA",{x:left,y:825,size:9,font:bold,color:rgb(1,1,1)});
    p.drawLine({start:{x:left,y:42},end:{x:546,y:42},thickness:0.7,color:gold});
    p.drawText("pfeuroasia.com  |  enquiry@pfeuroasia.com",{x:left,y:28,size:9,font:regular,color:muted});
  }
  line("MALAYSIA RESIDENCY",21,true,ink,9);
  line("For applicants aged 50+ and 60+",15,true,gold,13);
  line("A practical two-page orientation | October 2026",9,false,muted,15);
  line("Malaysia offers several distinct long-stay routes. Age can affect eligibility and minimum-stay conditions, but there is no universal over-50 or over-60 visa. Programme rules and application approvals must be confirmed with the relevant authorities.",10);
  heading("Financial comparison - published programme thresholds");
  line("Federal Silver: USD 150,000 fixed deposit; RM 600,000 minimum home; 5-year pass.",9);
  line("Federal Gold: USD 500,000 fixed deposit; RM 1,000,000 minimum home; 15-year pass.",9);
  line("Federal Platinum: USD 1,000,000 fixed deposit; RM 2,000,000 minimum home; 20-year pass.",9);
  line("Johor SEZ (age 50+): USD 32,000 fixed deposit; compulsory qualifying Forest City property, price set under the applicable Johor policy; 10-year pass.",9);
  line("Sarawak S-MM2H: RM 500,000 fixed deposit, plus income evidence of RM 10,000/month individual or RM 15,000/month with dependants, OR qualifying savings evidence; minimum 30 days/year in Sarawak.",9);
  line("Sabah: financial and property thresholds must be confirmed with the current Sabah authority; no unverified figure is quoted.",9);
  line("Sources: mm2h.gov.my/category/overview; mm2h.gov.my/category/sez; mtcp.sarawak.gov.my (2025 S-MM2H guidelines). Figures checked October 2026.",8,false,muted,8);
  heading("1  Federal Malaysia My Second Home (MM2H)");
  line("Silver, Gold and Platinum are separate categories. They differ in required fixed deposits, qualifying property purchases, pass duration and other conditions. Applicants aged 50 and above may benefit from different minimum-stay rules; verify the latest wording rather than assuming all obligations are waived.");
  line("Ask for: current fixed deposit and permitted withdrawal, property threshold and holding restrictions, minimum presence, dependants, medical cover, renewals and work rights.");
  heading("2  Johor / Forest City Special Economic Zone");
  line("A distinct MM2H pathway linked to qualifying property in the designated area. Deposit arrangements may differ for applicants aged 50+, but property commitment, resale restrictions and total cost can be material. It is not simply a cheaper version of standard MM2H.");
  heading("3  Sarawak MM2H and Sabah MM2H");
  line("These state programmes have their own eligibility, financial evidence, minimum-stay, family and renewal requirements. Federal MM2H terms should not be applied to them. Confirm whether the intended place of residence is compatible with the issuing programme.");
  heading("4  Other routes");
  line("An active entrepreneur may need an appropriate Employment Pass linked to genuine business activity, including where Labuan is involved. Premium Visa Programme is another higher-capital route. DE Rantau is a separate temporary option for qualifying remote professionals, not a retirement pass.");
  next();
  line("BEFORE YOU APPLY",17,true,ink,10);
  line("The 50+ and 60+ decision checklist",14,true,gold,13);
  heading("Financial commitments");
  line("Compare the full cost, not only the headline deposit: locked funds, property purchase and transaction costs, insurance, agent and government fees, renewal charges, exchange-rate exposure and potential exit restrictions.");
  heading("Spouse, children and elderly parents");
  line("Dependant eligibility is programme-specific. Do not assume an elderly parent qualifies automatically. Ask for written confirmation of permitted relationships, age limits, proof of support, separate applications and medical insurance requirements.");
  heading("Healthcare and lifestyle");
  line("Assess private health insurance acceptance, exclusions and premiums at older ages; proximity to hospitals; accessibility; and whether you prefer Kuala Lumpur, Penang, Johor, Sarawak or Sabah. Medical cover requirements can vary by route.");
  heading("Tax and permission to work");
  line("An immigration pass does not automatically create Malaysian tax residence or end tax obligations in Spain, the UK or elsewhere. Company ownership, local work and overseas remote work each raise separate immigration and tax questions. Obtain specialist cross-border advice.");
  heading("Questions to take to your adviser");
  line("1. Which programmes accept our ages and family composition?");
  line("2. What are the current deposit, property and annual-stay rules?");
  line("3. Can our spouse or elderly parent qualify, and on what terms?");
  line("4. What are the complete first-year and renewal costs?");
  line("5. Are we permitted to work, manage a company or work remotely?");
  heading("Official starting points");
  line("Federal MM2H: mm2h.gov.my   |   Sarawak: mtcp.sarawak.gov.my",9);
  line("DE Rantau: mdec.my   |   Malaysia Immigration: imi.gov.my",9);
  y-=8;
  line("For a personalised comparison, contact PF EuroAsia at enquiry@pfeuroasia.com or visit pfeuroasia.com/asia-gateway/enquire.",10,true);
  line("Information is general, not immigration, financial or tax advice. Rules change; verify eligibility and current requirements before transferring funds or buying property.",8,false,muted,5);
  const bytes=await pdf.save();
  return new NextResponse(Buffer.from(bytes),{headers:{"Content-Type":"application/pdf","Content-Disposition":"attachment; filename=PF-EuroAsia-Malaysia-Residency-50-Plus-Guide.pdf","Cache-Control":"no-store"}});
}
