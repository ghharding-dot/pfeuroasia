import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SwedishHeader } from "../../SwedishHeader";

export const metadata: Metadata = {
  title: "Malaysia och Asien | PF EuroAsia",
  description: "Svensk introduktion till fastigheter, relocation, uppehåll och företagsetablering i Malaysia och Asien.",
  alternates: { canonical: "https://www.pfeuroasia.com/sv/markets/malaysia" },
};

export default function SwedishMalaysiaPage() {
  return <main>
    <SwedishHeader />
    <section className="malaysia-split-hero">
      <div className="malaysia-split-images" aria-hidden="true"><div className="malaysia-city-panel"><Image src="/images/kl%20BACK%20GORUND.avif" alt="" width={2016} height={3000} priority sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="malaysia-island-panel"><Image src="/images/Emerald%20bay%20pkl.jpg" alt="" width={2048} height={1365} priority sizes="(max-width: 760px) 100vw, 50vw" /></div></div>
      <div className="malaysia-split-shade" />
      <div className="site-shell malaysia-split-copy"><p className="eyebrow light">Malaysia · Stad och livsstil</p><h1>Från världsstad till stränder och öar.</h1><p className="malaysia-split-line">Malaysia erbjuder mer.</p><p className="malaysia-split-intro">Kuala Lumpur kombinerar internationella affärer, fastigheter och goda förbindelser med tropiska öar, kustliv och hög livskvalitet.</p><div className="malaysia-split-actions"><Link className="button button-gold" href="/asia-gateway/enquire">Utforska Malaysia <span>→</span></Link><a className="text-link light-link" href="#malaysia-sv">Se möjligheterna <span>→</span></a></div></div>
    </section>
    <section className="market-landing-intro section-pad" id="malaysia-sv"><div className="site-shell narrow-grid"><p className="eyebrow">Malaysia och Asien</p><div><h2>En praktisk internationell bas.</h2><p>För svenska entreprenörer, investerare och familjer kan Malaysia erbjuda en attraktiv kombination av fastigheter, kostnadsnivå, internationell skolgång, företag och uppehållslösningar. Vi samordnar kontakten med etablerade lokala specialister.</p></div></div></section>
    <section className="malaysia-services section-pad"><div className="site-shell"><p className="eyebrow light">Så kopplar vi samman marknaderna</p><div className="area-feature-grid"><article><span>01</span><h2>Fastigheter</h2><p>Utvalda bostäder och nyproduktion i Kuala Lumpur och andra relevanta marknader.</p></article><article><span>02</span><h2>Relocation och uppehåll</h2><p>Samordning med lokala specialister kring familj, boende och aktuella uppehållsvägar.</p></article><article><span>03</span><h2>Företag</h2><p>Introduktioner för bolagsbildning, professionell rådgivning och gränsöverskridande verksamhet.</p></article></div></div></section>
    <section className="china-contact section-pad"><div className="site-shell china-contact-grid"><div><p className="eyebrow">Nästa steg</p><h2>Utforska innan<br />du bestämmer dig.</h2></div><div><p>Vi kan strukturera en första genomgång av fastigheter, livsstil, företag och praktiska förutsättningar utifrån dina egna mål.</p><div className="channel-tags"><span>Fastigheter</span><span>Relocation</span><span>Företag</span></div><Link className="button button-dark" href="/asia-gateway/enquire">Kontakta Asien-teamet <span>→</span></Link></div></div></section>
  </main>;
}
