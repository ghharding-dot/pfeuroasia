import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function AboutPage() {
  return (
    <main>
      <Header />
      <section className="about-hero">
        <div className="site-shell about-grid">
          <div>
            <p className="eyebrow">Our approach</p>
            <h1>Personal by design.<br /><em>International by nature.</em></h1>
          </div>
          <p>
            Property Facilitators EuroAsia was created for clients who value
            informed advice, direct access and a relationship that continues
            beyond a single transaction.
          </p>
        </div>
      </section>
      <section className="about-story section-pad">
        <div className="site-shell about-story-grid">
          <figure className="about-founder-portrait">
            <Image
              src="/images/geoff-harding-founder.png"
              alt="Geoff Harding, founder of Property Facilitators EuroAsia"
              width={1024}
              height={1536}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </figure>
          <div className="about-founder-copy">
            <p className="eyebrow">Founder &amp; international property facilitator</p>
            <h2>Geoff Harding</h2>
            <p>
              Geoff has lived and worked in Spain since 1984. His early career
              was in the motor trade, followed by international vehicle trading
              from 1994, connecting opportunities in South Korea and wider Asia
              with clients and markets in Spain.
            </p>
            <p>
              In 2002 he began a long-standing professional relationship with
              a prominent Malaysian family, later working with Madroñal 2004
              S.L. and overseeing prime homes in El Madroñal. That experience
              developed into more than two decades of trusted work with
              international owners, luxury property and private estates.
            </p>
            <p>
              Geoff moved into property sales in 2020, established Property
              Facilitators Iberia in 2024 and founded PF EuroAsia in 2026. Today
              he connects clients and trusted professional partners across
              Spain, Scandinavia, Malaysia and the wider Asian market—combining
              personal relationships, local knowledge and straightforward
              commercial advice.
            </p>
            <dl className="about-founder-details">
              <div><dt>Spain</dt><dd>Based here since 1984</dd></div>
              <div><dt>Europe &amp; Asia</dt><dd>International trading since 1994</dd></div>
              <div><dt>Prime property</dt><dd>Trusted relationships since 2002</dd></div>
            </dl>
          </div>
        </div>
      </section>
      <section className="values-section section-pad">
        <div className="site-shell">
          <p className="eyebrow light">What guides us</p>
          <div className="values-grid">
            <article><h2>Access</h2><p>Relationships that create genuine opportunity, not just more listings.</p></article>
            <article><h2>Clarity</h2><p>Direct, commercial advice—even when the honest answer is to wait.</p></article>
            <article><h2>Discretion</h2><p>Privacy, restraint and careful control of information at every stage.</p></article>
          </div>
        </div>
      </section>
      <section className="mini-cta">
        <div className="site-shell"><p className="eyebrow light">A better way to begin</p><h2>Start with a private conversation.</h2><Link className="button button-gold" href="/enquire">Make an enquiry <span>→</span></Link></div>
      </section>
      <Footer />
    </main>
  );
}
