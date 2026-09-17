import type { Metadata } from "next";
import Link from "next/link";
import { SwedishHeader } from "./SwedishHeader";
import { SwedishHomePhase2 } from "./SwedishHomePhase2";

export const metadata: Metadata = {
  title: "Fastigheter i Europa och Asien | PF EuroAsia",
  description: "Svensk vägledning för fastigheter i Spanien och Sverige samt möjligheter, relocation och etablering i Malaysia och Asien.",
  alternates: { canonical: "https://www.pfeuroasia.com/sv" },
};

export default function SwedishHome() {
  return (
    <main>
      <SwedishHeader />
      <SwedishHomePhase2 />
      <section className="cta-section">
        <div className="site-shell cta-inner">
          <p className="eyebrow light">En personlig kontakt</p>
          <h2>Berätta vad du vill uppnå.</h2>
          <p>Fastighetsköp, försäljning, relocation eller en internationell etablering – vi samordnar rätt lokala expertis.</p>
          <Link className="button button-gold" href="/enquire?goal=sweden-property">Kontakta oss <span>→</span></Link>
        </div>
      </section>
    </main>
  );
}
