import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

const conciergeServices = [
  {
    title: "Private airport transfers",
    text: "VIP collection and departure services with luxury Mercedes V-Class vehicles, executive minibuses and luggage coordination.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Luxury vehicle hire",
    text: "Prestige, sports and luxury vehicles selected around your stay, itinerary and preferred driving experience.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Chauffeur services",
    text: "Discreet professional drivers for individual journeys, full-day availability, events and extended stays.",
    image: "https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Yacht charter",
    text: "Private day charters and longer Mediterranean itineraries, with crew, catering and marina arrangements coordinated.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Private aviation",
    text: "Private jet and helicopter charter support, including ground transfers and closely coordinated arrival logistics.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Private chefs & dining",
    text: "Private chefs, villa dining, celebration menus, restaurant reservations and carefully planned culinary experiences.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Golf experiences",
    text: "Tee times, private tuition, equipment, transport and access to leading courses across Marbella and the Costa del Sol.",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Spa & wellness",
    text: "In-villa treatments, spa reservations, personal training, yoga and tailored wellness programmes during your stay.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Private security",
    text: "Discreet personal, residential and event security arranged through appropriately qualified local professionals.",
    image: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Andalusian day trips",
    text: "Privately organised visits to Ronda, Seville, Granada, Málaga, Córdoba and Andalucía’s historic white villages.",
    image: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Sports & leisure",
    text: "Padel, tennis, polo, horse riding, watersports, football hospitality and major sporting events arranged to suit your group.",
    image: "https://images.unsplash.com/photo-1530137073520-4ea6e2f10a48?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function RelocationConciergePage() {
  return (
    <main>
      <Header />

      <section className="concierge-hero">
        <div className="concierge-hero-shade" />
        <div className="site-shell concierge-hero-copy">
          <p className="eyebrow light">Relocation & concierge</p>
          <h1>Every detail<br /><em>considered.</em></h1>
          <p>
            From the moment you arrive, our trusted network can coordinate transport,
            aviation, dining, leisure, security and personalised experiences throughout
            Marbella, the Costa del Sol and Andalucía.
          </p>
          <Link className="button button-gold" href="/enquire">
            Discuss your requirements <span>→</span>
          </Link>
        </div>
      </section>

      <section className="concierge-intro section-pad">
        <div className="site-shell concierge-intro-grid">
          <p className="eyebrow">A single point of contact</p>
          <div>
            <h2>Exceptional service should feel effortless.</h2>
            <p>
              We arrange each service around the client rather than offering a fixed
              package. Requirements may begin with a single airport transfer or extend
              to the complete coordination of an international family stay, private
              event or property ownership programme.
            </p>
          </div>
        </div>
      </section>

      <section className="concierge-gallery section-pad">
        <div className="site-shell">
          <div className="concierge-heading">
            <div>
              <p className="eyebrow light">Private concierge services</p>
              <h2>Designed around<br />the way you live.</h2>
            </div>
            <p>
              Every arrangement is handled discreetly through trusted local providers,
              with clear coordination before, during and after your stay.
            </p>
          </div>

          <div className="concierge-card-grid">
            {conciergeServices.map((service, index) => (
              <article
                className={`concierge-card ${index === 3 || index === 9 ? "concierge-card-wide" : ""}`}
                key={service.title}
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="concierge-card-shade" />
                <div className="concierge-card-copy">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <Link href="/enquire">Request this service <b>→</b></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="concierge-process section-pad">
        <div className="site-shell concierge-process-grid">
          <div>
            <p className="eyebrow">How we work</p>
            <h2>Personal, practical and discreet.</h2>
          </div>
          <div className="concierge-process-list">
            <article><span>01</span><div><h3>Understand</h3><p>We establish your itinerary, preferences, party requirements and the level of support needed.</p></div></article>
            <article><span>02</span><div><h3>Arrange</h3><p>We coordinate suitable providers, availability, timings and the practical details behind each service.</p></div></article>
            <article><span>03</span><div><h3>Oversee</h3><p>We remain your local point of contact, helping ensure every element runs smoothly and discreetly.</p></div></article>
          </div>
        </div>
      </section>

      <section className="mini-cta">
        <div className="site-shell">
          <p className="eyebrow light">Begin with your itinerary</p>
          <h2>Tell us what would make your stay exceptional.</h2>
          <Link className="button button-gold" href="/enquire">Make an enquiry <span>→</span></Link>
        </div>
      </section>

      <Footer />

      <style>{`
        .concierge-hero { position: relative; min-height: 760px; display: flex; align-items: flex-end; isolation: isolate; color: white; background: #171916 url("https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?auto=format&fit=crop&w=2200&q=88") center 56%/cover no-repeat; }
        .concierge-hero-shade { position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgba(5,8,10,.86) 0%, rgba(5,8,10,.53) 46%, rgba(5,8,10,.12) 78%), linear-gradient(0deg, rgba(4,5,5,.5), transparent 55%); }
        .concierge-hero-copy { padding-block: 150px 115px; }
        .concierge-hero h1 { margin: 0; font-family: var(--serif); font-size: clamp(72px, 8vw, 118px); font-weight: 400; letter-spacing: -.045em; line-height: .9; }
        .concierge-hero h1 em { color: var(--gold-light); font-weight: 400; }
        .concierge-hero-copy > p:not(.eyebrow) { max-width: 650px; margin: 38px 0 42px; color: rgba(255,255,255,.75); font-family: var(--serif); font-size: 21px; line-height: 1.58; }
        .concierge-intro { background: var(--stone); }
        .concierge-intro-grid { display: grid; grid-template-columns: 250px minmax(0,850px); gap: 80px; }
        .concierge-intro h2 { margin: 0; font-family: var(--serif); font-size: clamp(50px,5vw,76px); font-weight: 400; letter-spacing: -.035em; line-height: 1.04; }
        .concierge-intro-grid div > p { max-width: 720px; margin: 38px 0 0 auto; color: #5f615a; font-size: 16px; line-height: 1.85; }
        .concierge-gallery { background: var(--ink); color: white; }
        .concierge-heading { display: grid; grid-template-columns: 1fr 420px; align-items: end; gap: 80px; margin-bottom: 72px; }
        .concierge-heading h2 { margin: 0; font-family: var(--serif); font-size: clamp(55px,5.8vw,84px); font-weight: 400; letter-spacing: -.04em; line-height: 1; }
        .concierge-heading > p { margin: 0 0 8px; color: rgba(255,255,255,.54); font-size: 14px; line-height: 1.8; }
        .concierge-card-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 18px; }
        .concierge-card { position: relative; min-height: 490px; overflow: hidden; background-position: center; background-size: cover; isolation: isolate; transition: transform 260ms ease; }
        .concierge-card-wide { grid-column: span 2; }
        .concierge-card:hover { transform: translateY(-5px); }
        .concierge-card-shade { position: absolute; inset: 0; z-index: -1; background: linear-gradient(0deg, rgba(4,5,5,.92) 0%, rgba(4,5,5,.42) 58%, rgba(4,5,5,.08) 100%); transition: background 260ms ease; }
        .concierge-card:hover .concierge-card-shade { background: linear-gradient(0deg, rgba(4,5,5,.94) 0%, rgba(4,5,5,.48) 64%, rgba(4,5,5,.12) 100%); }
        .concierge-card-copy { position: absolute; right: 32px; bottom: 32px; left: 32px; }
        .concierge-card-copy > span { color: var(--gold-light); font-size: 9px; letter-spacing: .18em; }
        .concierge-card h3 { margin: 15px 0 12px; font-family: var(--serif); font-size: 34px; font-weight: 400; line-height: 1.08; }
        .concierge-card p { max-width: 470px; margin: 0; color: rgba(255,255,255,.65); font-size: 12px; line-height: 1.7; }
        .concierge-card a { display: inline-flex; gap: 14px; margin-top: 22px; padding-bottom: 7px; border-bottom: 1px solid var(--gold); font-size: 9px; font-weight: 650; letter-spacing: .12em; text-transform: uppercase; }
        .concierge-card a b { color: var(--gold-light); font-weight: 400; }
        .concierge-process { background: var(--ivory); }
        .concierge-process-grid { display: grid; grid-template-columns: .85fr 1.2fr; gap: 100px; }
        .concierge-process h2 { max-width: 480px; margin: 0; font-family: var(--serif); font-size: clamp(50px,4.8vw,68px); font-weight: 400; line-height: 1.08; }
        .concierge-process-list { border-top: 1px solid var(--line); }
        .concierge-process-list article { display: grid; grid-template-columns: 55px 1fr; gap: 34px; padding-block: 34px; border-bottom: 1px solid var(--line); }
        .concierge-process-list article > span { color: #98784c; font-size: 10px; letter-spacing: .12em; }
        .concierge-process-list h3 { margin: 0 0 10px; font-family: var(--serif); font-size: 28px; font-weight: 400; }
        .concierge-process-list p { margin: 0; color: #65675f; font-size: 13px; line-height: 1.7; }
        @media (max-width: 1050px) {
          .concierge-card-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
          .concierge-card-wide { grid-column: auto; }
          .concierge-heading { grid-template-columns: 1fr 330px; gap: 50px; }
        }
        @media (max-width: 760px) {
          .concierge-hero { min-height: 700px; background-position: 62% center; }
          .concierge-hero-copy { padding-block: 130px 75px; }
          .concierge-hero h1 { font-size: clamp(58px,17vw,82px); }
          .concierge-hero-copy > p:not(.eyebrow) { font-size: 18px; }
          .concierge-intro-grid, .concierge-heading, .concierge-process-grid { grid-template-columns: 1fr; gap: 34px; }
          .concierge-heading { margin-bottom: 48px; }
          .concierge-card-grid { grid-template-columns: 1fr; gap: 14px; }
          .concierge-card { min-height: 440px; }
          .concierge-card-copy { right: 24px; bottom: 25px; left: 24px; }
          .concierge-card h3 { font-size: 31px; }
        }
      `}</style>
    </main>
  );
}
