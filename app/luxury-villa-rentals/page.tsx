import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "./luxury-villa-rentals.css";

const areas = [
  "La Zagaleta",
  "El Madroñal",
  "Marbella Golden Mile",
  "Benahavís",
  "Puerto Banús",
  "Sierra Blanca",
];

const conciergeServices = [
  "Private airport transfers",
  "Luxury vehicle hire",
  "Chauffeur services",
  "Yacht charter",
  "Private aviation",
  "Private chefs",
  "Golf reservations",
  "Spa and wellness",
  "Private security",
];

export default function LuxuryVillaRentalsPage() {
  return (
    <main className="villa-rentals-page">
      <Header transparent />

      <section className="villa-rentals-hero">
        <div className="villa-rentals-overlay" />
        <div className="site-shell villa-rentals-hero-inner">
          <div className="villa-rentals-hero-copy">
            <p className="villa-rentals-eyebrow">Luxury villa rentals</p>
            <h1>Exceptional homes.<br /><em>Personal service.</em></h1>
            <p className="villa-rentals-tagline">Complete discretion.</p>
            <p className="villa-rentals-collaboration">
              Property Facilitators EuroAsia <span>×</span> The Luxury Villa Collection
            </p>
            <Link className="villa-rentals-button" href="mailto:enquiries@pfeuroasia.com?cc=villas@theluxuryvillacollection.com&subject=Request%20for%20a%20Bespoke%20Villa%20Selection">
              Request your bespoke villa selection <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="villa-rentals-intro">
        <div className="site-shell villa-rentals-intro-grid">
          <div>
            <p className="villa-rentals-eyebrow dark">A carefully selected collection</p>
            <h2>Luxury stays, personally arranged.</h2>
          </div>
          <div className="villa-rentals-body-copy">
            <p>
              Through our collaboration with The Luxury Villa Collection, Property
              Facilitators EuroAsia provides access to an exceptional portfolio of
              personally inspected luxury villas across Marbella and the surrounding
              prime residential areas.
            </p>
            <p>
              Whether you are planning a family holiday, an extended stay, a corporate
              retreat or a private celebration, every enquiry is handled individually
              and in confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="villa-rentals-areas">
        <div className="site-shell">
          <div className="villa-rentals-section-heading">
            <p className="villa-rentals-eyebrow">Featured locations</p>
            <h2>Prime addresses across the Marbella region.</h2>
          </div>
          <div className="villa-rentals-area-grid">
            {areas.map((area, index) => (
              <article className="villa-rentals-area-card" key={area}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{area}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="villa-rentals-concierge">
        <div className="site-shell villa-rentals-concierge-grid">
          <div>
            <p className="villa-rentals-eyebrow dark">Concierge services</p>
            <h2>Every detail considered.</h2>
            <p>
              Your villa is only the beginning. Our teams can coordinate the services
              required to make your stay effortless, comfortable and entirely personal.
            </p>
          </div>
          <div className="villa-rentals-service-list">
            {conciergeServices.map((service) => (
              <div key={service}><span>◆</span>{service}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="villa-rentals-partnership">
        <div className="site-shell villa-rentals-partnership-inner">
          <div className="villa-rentals-branding">
            <div className="villa-rentals-euroasia-mark">
              <img src="/images/pf-gold-symbol.png" alt="" />
              <strong>Property Facilitators<br />EuroAsia</strong>
            </div>
            <span className="villa-rentals-cross">×</span>
            <div className="villa-rentals-lvc-placeholder" aria-label="The Luxury Villa Collection">
              <span>The</span>
              <strong>Luxury Villa<br />Collection</strong>
            </div>
          </div>
          <p>
            Every enquiry is personally managed by Property Facilitators EuroAsia in
            collaboration with The Luxury Villa Collection, ensuring each client receives
            a carefully tailored villa selection together with comprehensive concierge support.
          </p>
        </div>
      </section>

      <section className="villa-rentals-enquiry">
        <div className="site-shell villa-rentals-enquiry-inner">
          <p className="villa-rentals-eyebrow">Private enquiries</p>
          <h2>Request your bespoke villa selection.</h2>
          <p>
            Send us your preferred dates, number of guests, bedroom requirement, area and
            approximate budget. We will respond personally with suitable options.
          </p>
          <div className="villa-rentals-actions">
            <a className="villa-rentals-button" href="mailto:enquiries@pfeuroasia.com?cc=villas@theluxuryvillacollection.com&subject=Request%20for%20a%20Bespoke%20Villa%20Selection">
              Email your requirements <span>→</span>
            </a>
            <span className="villa-rentals-whatsapp-note">Asia WhatsApp concierge coming soon</span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
