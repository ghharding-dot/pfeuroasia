import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PrivatePortfolioRegistration } from "../components/PrivatePortfolioRegistration";
import { createMetadata } from "../lib/seo";
import "./private-portfolio.css";
import "./private-portfolio-mobile-fix.css";
import "./client-access.css";

export const metadata = createMetadata("portfolioEn");

const portfolioFaqs = [
  {
    question: "Are all off-market properties shown publicly?",
    answer: "No. Some owners request controlled, confidential marketing. Suitable opportunities are shared only after a purchaser's identity and requirements have been reviewed.",
  },
  {
    question: "Which locations does the private portfolio cover?",
    answer: "The principal focus is Marbella and Benahavís, including the Golden Mile, La Zagaleta, El Madroñal and selected prime areas across the wider Costa del Sol.",
  },
  {
    question: "Who can request access?",
    answer: "Prospective purchasers, family offices and professional advisers may apply. Every request is assessed individually and registration does not guarantee access.",
  },
  {
    question: "What happens after registration?",
    answer: "We review your identity, buying criteria, preferred locations, budget and timeframe. If approved, you receive secure access and relevant opportunities can then be discussed privately.",
  },
];

export default function PrivatePortfolioPage() {
  return (
    <main className="private-registration-page">
      <Header />
      <PrivatePortfolioRegistration />
      <section className="portfolio-public-overview" aria-labelledby="portfolio-overview-heading">
        <div className="site-shell">
          <div className="portfolio-public-heading">
            <p className="eyebrow">A discreet route to the market</p>
            <h2 id="portfolio-overview-heading">Why selected properties are handled privately.</h2>
            <p>Not every owner wants broad online exposure. Our role is to understand the brief on both sides, qualify interest and introduce appropriate parties without publishing sensitive property details.</p>
          </div>
          <div className="portfolio-opportunity-grid">
            <article><span>01</span><h3>Private villas &amp; estates</h3><p>Distinctive homes where the owner prefers controlled introductions and limited distribution.</p></article>
            <article><span>02</span><h3>Quiet-market residences</h3><p>Apartments, penthouses and family homes considered for sale without a conventional portal campaign.</p></article>
            <article><span>03</span><h3>Investment opportunities</h3><p>Selected land, development, hospitality and income-producing assets reviewed for suitable purchasers.</p></article>
          </div>
        </div>
      </section>

      <section className="portfolio-access-process" aria-labelledby="portfolio-process-heading">
        <div className="site-shell portfolio-process-layout">
          <div>
            <p className="eyebrow light">How access works</p>
            <h2 id="portfolio-process-heading">Relevant opportunities, shared with care.</h2>
          </div>
          <ol>
            <li><span>01</span><div><h3>Define your criteria</h3><p>Tell us your preferred locations, property type, budget, timeframe and intended use.</p></div></li>
            <li><span>02</span><div><h3>Individual review</h3><p>We assess each request to protect owners, purchasers and confidential information.</p></div></li>
            <li><span>03</span><div><h3>Private introduction</h3><p>Approved clients receive secure access and a tailored discussion of suitable opportunities.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="portfolio-locations" aria-labelledby="portfolio-locations-heading">
        <div className="site-shell">
          <div className="portfolio-locations-heading">
            <div><p className="eyebrow">Local market guidance</p><h2 id="portfolio-locations-heading">Explore prime Marbella &amp; Benahavís locations.</h2></div>
            <Link href="/guides/marbella-property-international-buyers">International buyer guide <span aria-hidden="true">→</span></Link>
          </div>
          <nav className="portfolio-location-links" aria-label="Private portfolio locations">
            <Link href="/areas/marbella-golden-mile">Marbella Golden Mile <span>→</span></Link>
            <Link href="/areas/benahavis">Benahavís <span>→</span></Link>
            <Link href="/areas/la-zagaleta">La Zagaleta <span>→</span></Link>
            <Link href="/areas/el-madronal">El Madroñal <span>→</span></Link>
          </nav>
        </div>
      </section>

      <section className="portfolio-faq" aria-labelledby="portfolio-faq-heading">
        <div className="site-shell portfolio-faq-layout">
          <div><p className="eyebrow">Private portfolio FAQ</p><h2 id="portfolio-faq-heading">Before you request access.</h2></div>
          <div className="portfolio-faq-list">
            {portfolioFaqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: portfolioFaqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
      <Footer />
    </main>
  );
}
