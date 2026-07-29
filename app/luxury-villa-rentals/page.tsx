import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { RentalEnquiryForm } from "./RentalEnquiryForm";
import "./luxury-villa-rentals.css";

const areas = [
  { name: "La Zagaleta", location: "Benahavís", image: "/images/luxury-villa-rentals/la-zagaleta.jpg" },
  { name: "El Madroñal", location: "Benahavís", image: "/images/luxury-villa-rentals/el-madronal.jpg" },
  { name: "Marbella Golden Mile", location: "Marbella", image: "/images/luxury-villa-rentals/golden-mile.jpg" },
  { name: "Benahavís", location: "Mountain estates", image: "https://images.unsplash.com/photo-1776761731066-c89caa8d25e6?auto=format&fit=crop&q=84&w=1600" },
  { name: "Puerto Banús", location: "Marina living", image: "https://images.unsplash.com/photo-1751054551120-1ccbe689d091?auto=format&fit=crop&q=84&w=1600" },
  { name: "Sierra Blanca", location: "Marbella hills", image: "/images/luxury-villa-rentals/sierra-blanca.jpg" },
];

const conciergeServices = [
  { name: "Private airport transfers", text: "VIP collection and departure services with luxury Mercedes V-Class vehicles and executive minibuses.", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=84" },
  { name: "Luxury vehicle hire", text: "Prestige, sports and luxury cars selected around your stay and preferred driving experience.", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=84" },
  { name: "Chauffeur services", text: "Discreet professional drivers for individual journeys, full-day availability and events.", image: "https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?auto=format&fit=crop&w=1200&q=84" },
  { name: "Yacht charter", text: "Private Mediterranean charters with crew, catering and marina arrangements coordinated.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=84" },
  { name: "Private aviation", text: "Private jet and helicopter charter support with closely coordinated ground transfers.", image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&q=84" },
  { name: "Private chefs", text: "In-villa chefs, celebration menus, restaurant reservations and private dining experiences.", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=84" },
  { name: "Golf experiences", text: "Tee times, tuition, equipment and transport to leading Costa del Sol courses.", image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=84" },
  { name: "Spa and wellness", text: "In-villa treatments, spa reservations, personal training, yoga and wellness programmes.", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=84" },
  { name: "Private security", text: "Discreet personal, residential and event security through qualified local professionals.", image: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=1200&q=84" },
  { name: "Andalusian day trips", text: "Private visits to Ronda, Seville, Granada, Málaga, Córdoba and the white villages.", image: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&w=1200&q=84" },
  { name: "Sports and leisure", text: "Padel, tennis, polo, riding, watersports and major sporting events arranged privately.", image: "https://images.unsplash.com/photo-1530137073520-4ea6e2f10a48?auto=format&fit=crop&w=1200&q=84" },
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
            <p className="villa-rentals-collaboration">Property Facilitators EuroAsia <span>×</span> The Luxury Villa Collection</p>
            <Link className="villa-rentals-button" href="#villa-enquiry">Request your bespoke villa selection <span>→</span></Link>
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
            <p>Through our collaboration with The Luxury Villa Collection, Property Facilitators EuroAsia provides access to an exceptional portfolio of personally inspected luxury villas across Marbella and the surrounding prime residential areas.</p>
            <p>Whether you are planning a family holiday, an extended stay, a corporate retreat or a private celebration, every enquiry is handled individually and in confidence.</p>
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
              <img src="/images/luxury-villa-rentals/panoramic-twilight.jpg" alt="Twilight panoramic view from a luxury Marbella villa terrace" style={{ display: "block", width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }} />
              <figcaption style={{ marginTop: 14, color: "rgba(255,255,255,.62)", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase" }}>Evening light across the Mediterranean</figcaption>
            </figure>
            <figure style={{ margin: 0 }}>
              <img src="/images/luxury-villa-rentals/panoramic-day.jpg" alt="Panoramic Mediterranean view towards Gibraltar and North Africa" style={{ display: "block", width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }} />
              <figcaption style={{ marginTop: 14, color: "rgba(255,255,255,.62)", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase" }}>Views towards Gibraltar and North Africa</figcaption>
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
                <span className="villa-rentals-area-photo" style={{ backgroundImage: `url(${area.image})` }} aria-hidden="true" />
                <span className="villa-rentals-area-shade" aria-hidden="true" />
                <span className="villa-rentals-area-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="villa-rentals-area-copy"><p>{area.location}</p><h3>{area.name}</h3><small>Request villas <b>→</b></small></div>
              </a>
            ))}
          </div>
          <p className="villa-rentals-image-note">Representative location imagery. Individual villa selections are shared privately in response to each enquiry.</p>
        </div>
      </section>

      <section className="rental-photo-concierge">
        <div className="site-shell">
          <div className="rental-photo-heading">
            <div>
              <p className="villa-rentals-eyebrow">Concierge services</p>
              <h2>Every detail considered.</h2>
            </div>
            <p>Your villa is only the beginning. We can coordinate every practical and lifestyle element required to make your stay effortless, comfortable and entirely personal.</p>
          </div>
          <div className="rental-photo-grid">
            {conciergeServices.map((service, index) => (
              <a className={`rental-photo-card ${index === 3 || index === 9 ? "rental-photo-card-wide" : ""}`} href="#villa-enquiry" key={service.name} style={{ backgroundImage: `url(${service.image})` }}>
                <span className="rental-photo-shade" />
                <span className="rental-photo-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="rental-photo-copy">
                  <h3>{service.name}</h3>
                  <p>{service.text}</p>
                  <small>Request this service <b>→</b></small>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="villa-rentals-partnership">
        <div className="site-shell villa-rentals-partnership-inner">
          <div className="villa-rentals-branding">
            <div className="villa-rentals-euroasia-mark"><img src="/images/pf-gold-symbol.png" alt="" /><strong>Property Facilitators<br />EuroAsia</strong></div>
            <span className="villa-rentals-cross">×</span>
            <div className="villa-rentals-lvc-placeholder" aria-label="The Luxury Villa Collection"><span>The</span><strong>Luxury Villa<br />Collection</strong></div>
          </div>
          <p>Every enquiry is personally managed by Property Facilitators EuroAsia in collaboration with The Luxury Villa Collection, ensuring each client receives a carefully tailored villa selection together with comprehensive concierge support.</p>
        </div>
      </section>

      <section className="villa-rentals-enquiry" id="villa-enquiry">
        <div className="site-shell villa-rentals-enquiry-layout">
          <div className="villa-rentals-enquiry-copy">
            <p className="villa-rentals-eyebrow">Private enquiries</p>
            <h2>Request your bespoke villa selection.</h2>
            <p>Share your preferred dates, group size, bedroom requirement, location and approximate budget. We will respond personally with carefully selected options.</p>
            <ul><li>Confidential, individually managed enquiries</li><li>Access to on-market and privately available villas</li><li>Full concierge support before and during your stay</li></ul>
          </div>
          <RentalEnquiryForm />
        </div>
      </section>

      <Footer />

      <style>{`
        .rental-photo-concierge { padding-block: 130px; background: #10161c; color: white; }
        .rental-photo-heading { display: grid; grid-template-columns: 1fr 480px; gap: 90px; align-items: end; margin-bottom: 68px; }
        .rental-photo-heading h2 { margin: 0; font-family: var(--serif); font-size: clamp(48px,5vw,74px); font-weight: 400; letter-spacing: -.04em; line-height: .98; }
        .rental-photo-heading > p { margin: 0 0 7px; color: rgba(255,255,255,.58); font-family: var(--serif); font-size: 18px; line-height: 1.65; }
        .rental-photo-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 18px; }
        .rental-photo-card { position: relative; display: flex; min-height: 410px; padding: 28px; flex-direction: column; justify-content: space-between; overflow: hidden; background-position: center; background-size: cover; color: white; isolation: isolate; transition: transform 260ms ease, box-shadow 260ms ease; }
        .rental-photo-card-wide { grid-column: span 2; }
        .rental-photo-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,.35); }
        .rental-photo-shade { position: absolute; inset: 0; z-index: -1; background: linear-gradient(180deg,rgba(5,8,10,.12),rgba(5,8,10,.25) 35%,rgba(5,8,10,.93) 100%); }
        .rental-photo-number { color: var(--gold-light); font-size: 10px; letter-spacing: .18em; }
        .rental-photo-copy h3 { margin: 0 0 12px; font-family: var(--serif); font-size: clamp(30px,3vw,42px); font-weight: 400; line-height: 1; }
        .rental-photo-copy p { max-width: 500px; margin: 0; color: rgba(255,255,255,.68); font-size: 12px; line-height: 1.65; }
        .rental-photo-copy small { display: inline-block; margin-top: 20px; padding-bottom: 7px; border-bottom: 1px solid var(--gold); font-size: 9px; font-weight: 650; letter-spacing: .13em; text-transform: uppercase; }
        .rental-photo-copy small b { margin-left: 9px; color: var(--gold-light); font-size: 13px; font-weight: 400; }
        @media (max-width: 1050px) { .rental-photo-heading { grid-template-columns: 1fr 360px; gap: 55px; } .rental-photo-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } .rental-photo-card-wide { grid-column: auto; } }
        @media (max-width: 760px) { .rental-photo-concierge { padding-block: 90px; } .rental-photo-heading { grid-template-columns: 1fr; gap: 28px; margin-bottom: 44px; } .rental-photo-grid { grid-template-columns: 1fr; gap: 14px; } .rental-photo-card { min-height: 420px; padding: 24px; } }
      `}</style>
    </main>
  );
}
