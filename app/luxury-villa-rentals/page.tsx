import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { RentalEnquiryForm } from "./RentalEnquiryForm";
import "./luxury-villa-rentals.css";

const areas = [
  {
    name: "La Zagaleta",
    location: "Benahavís",
    image: "/images/luxury-villa-rentals/la-zagaleta.jpg",
  },
  {
    name: "El Madroñal",
    location: "Benahavís",
    image: "/images/luxury-villa-rentals/el-madronal.jpg",
  },
  {
    name: "Marbella Golden Mile",
    location: "Marbella",
    image: "/images/luxury-villa-rentals/golden-mile.jpg",
  },
  {
    name: "Benahavís",
    location: "Mountain estates",
    image: "https://images.unsplash.com/photo-1776761731066-c89caa8d25e6?auto=format&fit=crop&q=84&w=1600",
  },
  {
    name: "Puerto Banús",
    location: "Marina living",
    image: "https://images.unsplash.com/photo-1751054551120-1ccbe689d091?auto=format&fit=crop&q=84&w=1600",
  },
  {
    name: "Sierra Blanca",
    location: "Marbella hills",
    image: "/images/luxury-villa-rentals/sierra-blanca.jpg",
  },
];

type ServiceIconName =
  | "transfer"
  | "car"
  | "chauffeur"
  | "yacht"
  | "aviation"
  | "chef"
  | "golf"
  | "wellness"
  | "security";

const conciergeServices: { name: string; icon: ServiceIconName }[] = [
  { name: "Private airport transfers", icon: "transfer" },
  { name: "Luxury vehicle hire", icon: "car" },
  { name: "Chauffeur services", icon: "chauffeur" },
  { name: "Yacht charter", icon: "yacht" },
  { name: "Private aviation", icon: "aviation" },
  { name: "Private chefs", icon: "chef" },
  { name: "Golf reservations", icon: "golf" },
  { name: "Spa and wellness", icon: "wellness" },
  { name: "Private security", icon: "security" },
];

function ServiceIcon({ name }: { name: ServiceIconName }) {
  const common = {
    width: 42,
    height: 42,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "transfer") {
    return <svg {...common}><path d="M8 31h32M12 31l3-10h18l4 10M16 21l3-6h10l4 6M14 31v5M34 31v5"/><circle cx="17" cy="31" r="2.5"/><circle cx="31" cy="31" r="2.5"/><path d="M24 8v7M20 11l4-3 4 3"/></svg>;
  }
  if (name === "car") {
    return <svg {...common}><path d="M7 30h34l-3-10H12L7 30Z"/><path d="M12 20l4-7h16l4 7M10 30v6M38 30v6"/><circle cx="15" cy="30" r="3"/><circle cx="33" cy="30" r="3"/><path d="M17 17h14"/></svg>;
  }
  if (name === "chauffeur") {
    return <svg {...common}><circle cx="24" cy="14" r="6"/><path d="M13 38c1-9 5-14 11-14s10 5 11 14M18 27l6 6 6-6M24 33v6"/><path d="M17 11c2-4 12-4 14 0"/></svg>;
  }
  if (name === "yacht") {
    return <svg {...common}><path d="M7 31h34c-3 6-8 9-17 9S10 37 7 31Z"/><path d="M14 31l5-17h10l5 17M24 14V7M19 14h10M10 25h28"/><path d="M5 43c4-2 7-2 11 0 4-2 7-2 11 0 4-2 7-2 11 0"/></svg>;
  }
  if (name === "aviation") {
    return <svg {...common}><path d="M6 27l36-13-13 12 8 8-4 2-11-7-8 8-3-2 5-11-10 3Z"/><path d="M22 29l-2 10"/></svg>;
  }
  if (name === "chef") {
    return <svg {...common}><path d="M14 21c-5-7 3-14 9-9 4-7 14-3 12 5 7 0 8 10 1 12H13c-7-1-7-8 1-8Z"/><path d="M14 29v10h22V29M20 33v6M28 33v6"/></svg>;
  }
  if (name === "golf") {
    return <svg {...common}><path d="M15 41l12-33M27 8l11 5-13 5"/><circle cx="13" cy="39" r="3"/><path d="M9 43h16"/></svg>;
  }
  if (name === "wellness") {
    return <svg {...common}><path d="M24 40c-1-11 3-20 12-28 3 10-1 18-12 28ZM24 40C14 35 9 28 10 18c10 3 15 10 14 22Z"/><path d="M24 40c0-9-1-16-5-22"/></svg>;
  }
  return <svg {...common}><path d="M24 6l15 6v10c0 10-6 17-15 21C15 39 9 32 9 22V12l15-6Z"/><path d="M18 24l4 4 8-9"/></svg>;
}

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
            <Link className="villa-rentals-button" href="#villa-enquiry">
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

      <section className="villa-rentals-areas" aria-labelledby="panoramic-heading">
        <div className="site-shell">
          <div className="villa-rentals-section-heading">
            <p className="villa-rentals-eyebrow">Panoramic Mediterranean living</p>
            <h2 id="panoramic-heading">Views that define the experience.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            <figure style={{ margin: 0 }}>
              <img
                src="/images/luxury-villa-rentals/panoramic-twilight.jpg"
                alt="Twilight panoramic view from a luxury Marbella villa terrace"
                style={{ display: "block", width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
              />
              <figcaption style={{ marginTop: 14, color: "rgba(255,255,255,.62)", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase" }}>
                Evening light across the Mediterranean
              </figcaption>
            </figure>
            <figure style={{ margin: 0 }}>
              <img
                src="/images/luxury-villa-rentals/panoramic-day.jpg"
                alt="Panoramic Mediterranean view towards Gibraltar and North Africa"
                style={{ display: "block", width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
              />
              <figcaption style={{ marginTop: 14, color: "rgba(255,255,255,.62)", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase" }}>
                Views towards Gibraltar and North Africa
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="villa-rentals-areas" style={{ paddingTop: 0 }}>
        <div className="site-shell">
          <div className="villa-rentals-section-heading">
            <p className="villa-rentals-eyebrow">Hand-picked luxury villas</p>
            <h2>Prime addresses across the Marbella region.</h2>
          </div>
          <div className="villa-rentals-area-grid">
            {areas.map((area, index) => (
              <a className="villa-rentals-area-card" href="#villa-enquiry" key={area.name}>
                <span
                  className="villa-rentals-area-photo"
                  style={{ backgroundImage: `url(${area.image})` }}
                  aria-hidden="true"
                />
                <span className="villa-rentals-area-shade" aria-hidden="true" />
                <span className="villa-rentals-area-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="villa-rentals-area-copy">
                  <p>{area.location}</p>
                  <h3>{area.name}</h3>
                  <small>Request villas <b>→</b></small>
                </div>
              </a>
            ))}
          </div>
          <p className="villa-rentals-image-note">Representative location imagery. Individual villa selections are shared privately in response to each enquiry.</p>
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
              <div
                key={service.name}
                style={{
                  minHeight: 150,
                  paddingBlock: 24,
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 13,
                  color: "var(--gold)",
                  textAlign: "center",
                }}
              >
                <ServiceIcon name={service.icon} />
                <span style={{ color: "var(--ink)", fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", lineHeight: 1.45 }}>
                  {service.name}
                </span>
              </div>
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

      <section className="villa-rentals-enquiry" id="villa-enquiry">
        <div className="site-shell villa-rentals-enquiry-layout">
          <div className="villa-rentals-enquiry-copy">
            <p className="villa-rentals-eyebrow">Private enquiries</p>
            <h2>Request your bespoke villa selection.</h2>
            <p>
              Share your preferred dates, group size, bedroom requirement, location and
              approximate budget. We will respond personally with carefully selected options.
            </p>
            <ul>
              <li>Confidential, individually managed enquiries</li>
              <li>Access to on-market and privately available villas</li>
              <li>Full concierge support before and during your stay</li>
            </ul>
          </div>
          <RentalEnquiryForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
