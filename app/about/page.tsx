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
          <div className="about-image" />
          <div>
            <p className="eyebrow">Experience on the ground</p>
            <h2>Southern Spain, understood from the inside.</h2>
            <p>
              Our perspective has been shaped by more than 25 years working
              with prime property and international owners in Marbella, La
              Zagaleta and El Madroñal. That experience matters: it brings
              context to value, realism to negotiation and trusted people to
              the table when they are needed.
            </p>
            <p>
              EuroAsia extends that experience eastward—serving clients and
              professional partners who want a capable, accountable presence in
              Spain.
            </p>
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
