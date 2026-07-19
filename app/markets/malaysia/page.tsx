import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export default function MalaysiaPage() {
  return <main>
    <Header />
    <section className="market-landing-hero malaysia-landing"><div className="area-overlay"/><div className="site-shell market-landing-copy"><p className="eyebrow light">Asia desk</p><h1>Malaysia</h1><p>A practical, relationship-led bridge between Malaysian clients, professional partners and Spanish property.</p></div></section>
    <section className="market-landing-intro section-pad"><div className="site-shell narrow-grid"><p className="eyebrow">Spain made closer</p><div><h2>Local representation across borders.</h2><p>For clients based in Malaysia, we provide an accountable presence in Spain—qualifying opportunities, arranging focused visits, coordinating advisers and representing the client through the commercial process.</p></div></div></section>
    <section className="malaysia-services section-pad"><div className="site-shell"><p className="eyebrow light">How we connect the markets</p><div className="area-feature-grid"><article><span>01</span><h2>Private clients</h2><p>Spanish acquisition advice built around lifestyle, residency plans and long-term ownership.</p></article><article><span>02</span><h2>Professional partners</h2><p>A Spain-side brokerage relationship for trusted agents, advisers and family offices in Asia.</p></article><article><span>03</span><h2>Cross-border coordination</h2><p>One point of contact to organise property, legal, tax and relocation workstreams.</p></article></div></div></section>

    <section className="kl-opportunities section-pad">
      <div className="site-shell">
        <div className="kl-heading">
          <div>
            <p className="eyebrow">Kuala Lumpur property</p>
            <h2>Selected opportunities.<br />Direct local access.</h2>
          </div>
          <div>
            <p>We provide access to selected new developments across Kuala Lumpur, with opportunities in the wider portfolio from approximately <strong>US$150,000</strong>.</p>
            <Link className="text-link" href="/enquire">Request current opportunities <span>→</span></Link>
          </div>
        </div>

        <article className="kl-feature">
          <div className="kl-feature-image">
            <img src="/images/kl-armani-skyline.png" alt="Artist's impression showing Armani Hallson KLCC within the Kuala Lumpur skyline" />
            <span>Artist&apos;s impression</span>
          </div>
          <div className="kl-feature-copy">
            <p className="eyebrow">Featured development</p>
            <h3>Armani Hallson KLCC</h3>
            <p>A freehold development on Jalan Ampang, positioned approximately 300 metres from KLCC and designed around panoramic city views, flexible SOHO and SOVO layouts and elevated lifestyle facilities.</p>
            <ul>
              <li>Central KLCC location</li>
              <li>Freehold tenure</li>
              <li>Layouts from 406 to 1,182 sq ft</li>
              <li>Rooftop pools, gyms, sky lounge and viewing deck</li>
              <li>Scheduled completion in 2029</li>
            </ul>
            <small>Availability, specifications and prices are subject to confirmation. Full details are provided privately.</small>
          </div>
        </article>

        <div className="kl-gallery">
          <figure><img src="/images/kl-armani-arrival.png" alt="Artist's impression of the Armani Hallson KLCC arrival and drop-off" /><figcaption><span>01</span>Arrival</figcaption></figure>
          <figure><img src="/images/kl-armani-rooftop.png" alt="Artist's impression of Armani Hallson KLCC rooftop facilities" /><figcaption><span>02</span>Rooftop facilities</figcaption></figure>
          <figure><img src="/images/kl-armani-pool.png" alt="Artist's impression of the level 76 pool deck overlooking the Petronas Towers" /><figcaption><span>03</span>KLCC pool deck</figcaption></figure>
          <figure><img src="/images/kl-armani-gym.png" alt="Artist's impression of the sky gym overlooking Kuala Lumpur" /><figcaption><span>04</span>Sky gym</figcaption></figure>
        </div>
        <p className="kl-image-note">All development imagery shown is an artist&apos;s impression supplied for marketing purposes.</p>
      </div>
    </section>

    <section className="china-contact section-pad"><div className="site-shell china-contact-grid"><div><p className="eyebrow">Serving wider Asia</p><h2>Malaysia first.<br />China ready.</h2></div><div><p>Malaysia provides the operational bridge, while mainland China requires a different communication approach. China enquiries should use email, WeChat or the secure enquiry form rather than relying on WhatsApp.</p><div className="channel-tags"><span>Email</span><span>WeChat</span><span>Secure form</span></div><Link className="button button-dark" href="/enquire">Contact the Asia desk <span>→</span></Link></div></div></section>
    <Footer />
  </main>;
}
