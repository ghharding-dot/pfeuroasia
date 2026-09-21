import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export const metadata: Metadata = {
  title: "Sweden Luxury Property | PF EuroAsia",
  description:
    "Selected luxury homes in Sweden presented internationally through Bremberg International Estate and Property Facilitators EuroAsia.",
};

export default function SwedenPropertyPage() {
  return (
    <main>
      <Header enquireHref="/enquire" enquireLabel="Sweden enquiry" />

      <section
        className="market-landing-hero"
        style={{
          background:
            "linear-gradient(135deg, #0d1824 0%, #1b3445 55%, #7893a3 100%)",
        }}
      >
        <div className="area-overlay" />
        <div className="site-shell market-landing-copy">
          <p className="eyebrow light">Sweden property</p>
          <h1>Selected homes in Sweden</h1>
          <p>
            Waterfront and coastal residences represented by Bremberg
            International Estate and introduced to qualified international
            buyers through PF EuroAsia.
          </p>
        </div>
      </section>

      <section className="market-landing-intro section-pad">
        <div className="site-shell narrow-grid">
          <p className="eyebrow">Stockholm and the Öresund coast</p>
          <div>
            <h2>Swedish expertise. International buyer access.</h2>
            <p>
              Eric Bremberg remains the responsible listing agent for these
              properties. PF EuroAsia supports their international presentation
              through trusted buyer and professional networks across Europe,
              the Middle East and Asia.
            </p>
          </div>
        </div>
      </section>

      <section className="malaysia-services section-pad" aria-labelledby="sweden-listings">
        <div className="site-shell">
          <p className="eyebrow light">Current opportunities</p>
          <h2 id="sweden-listings" className="sr-only">
            Sweden property opportunities
          </h2>

          <div className="area-feature-grid">
            <article>
              <span>01</span>
              <p className="eyebrow light">Confidential introduction</p>
              <h2>Saltsjö-Boo, Stockholm</h2>
              <p>
                Recently completed waterfront residence across three levels,
                approximately 232 m² of living area plus 96 m² of additional
                space, on a 1,848 m² sea plot.
              </p>
              <p>
                Four bedrooms, private lift, large pool, separate waterfront
                guesthouse and a substantial private jetty. Approximately 15
                minutes from central Stockholm.
              </p>
              <p><strong>Asking price: SEK 55,000,000</strong></p>
              <Link className="button button-gold" href="/enquire">
                Request a confidential introduction <span>→</span>
              </Link>
            </article>

            <article>
              <span>02</span>
              <p className="eyebrow light">Public listing</p>
              <h2>Heimdalsgatan 29, Glumslöv</h2>
              <p>
                Newly completed coastal residence of approximately 600 m² with
                panoramic views across Öresund, Ven and the Danish coast, set on
                a 1,712 m² plot.
              </p>
              <p>
                Five bedrooms, twelve rooms, separate 45 m² guesthouse, sauna,
                hobby room, garage, carport and electric entrance gate.
              </p>
              <p><strong>Asking price: SEK 30,000,000</strong></p>
              <a
                className="button button-gold"
                href="https://brembergestate.com/en/fastigheter/heimdalsgatan-29-g2w-vns/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the live listing <span>→</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="site-shell cta-inner">
          <p className="eyebrow light">International enquiries</p>
          <h2>Discuss either Sweden property in confidence.</h2>
          <p>
            Tell us where you are based and which residence interests you. We
            will coordinate the introduction directly with Eric Bremberg.
          </p>
          <Link className="button button-gold" href="/enquire">
            Contact PF EuroAsia <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
