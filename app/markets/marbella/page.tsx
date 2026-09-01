import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { TopicPathway } from "../../components/TopicPathway";
import "./marbella-market.css";

const marketAreas = [
  {
    number: "01",
    name: "Marbella Golden Mile",
    href: "/areas/marbella-golden-mile",
    text: "Beachfront apartments, established villas and prestigious residential addresses close to central Marbella and Puerto Banús.",
  },
  {
    number: "02",
    name: "Benahavís",
    href: "/areas/benahavis",
    text: "Hillside estates, golf communities and private residential settings across a varied municipality above the coast.",
  },
  {
    number: "03",
    name: "La Zagaleta",
    href: "/areas/la-zagaleta",
    text: "Substantial private villas and country estates where security, space and discretion shape the search.",
  },
  {
    number: "04",
    name: "El Madroñal",
    href: "/areas/el-madronal",
    text: "Wooded hillside living, panoramic views and individual villas within an established gated community.",
  },
];

const propertyRoutes = [
  {
    title: "Buying in Marbella",
    href: "/services/acquisition",
    text: "Independent search, property assessment, professional coordination and negotiation support for international buyers.",
  },
  {
    title: "Off-market property",
    href: "/private-portfolio",
    text: "Confidential access requests for selected villas, residences and opportunities not distributed on conventional portals.",
  },
  {
    title: "Selling a property",
    href: "/property-owners",
    text: "Public or discreet representation for Marbella and Benahavís owners seeking qualified international introductions.",
  },
  {
    title: "Luxury villa rentals",
    href: "/luxury-villa-rentals",
    text: "Personally arranged villa stays and concierge support across Marbella's prime residential locations.",
  },
];

const buyingProcess = [
  {
    number: "01",
    title: "Define the brief",
    text: "We clarify lifestyle, property type, preferred setting, privacy, timing and budget before creating a shortlist.",
  },
  {
    number: "02",
    title: "Compare locations",
    text: "We explain how the Golden Mile, Benahavís, La Zagaleta, El Madroñal and surrounding areas differ in practical terms.",
  },
  {
    number: "03",
    title: "Inspect & assess",
    text: "Viewings are coordinated around relevant options, with independent legal and technical specialists introduced where required.",
  },
  {
    number: "04",
    title: "Negotiate & coordinate",
    text: "We support the commercial discussion and remain a central point of contact through due diligence and completion.",
  },
];

const marbellaFaqs = [
  {
    question: "Which areas are best for luxury property in Marbella?",
    answer: "There is no single best area. Marbella Golden Mile suits buyers prioritising beachside access and convenience, while Benahavís, La Zagaleta and El Madroñal offer different combinations of privacy, views, land and gated-community living. The right choice depends on how the property will be used.",
  },
  {
    question: "Can international buyers purchase property in Marbella?",
    answer: "International clients regularly purchase in Marbella and Benahavís. Each buyer should obtain independent Spanish legal and tax advice for their personal circumstances before committing to a transaction.",
  },
  {
    question: "Can you help find off-market Marbella property?",
    answer: "Yes, where suitable opportunities are available. Some properties are shared only after a purchaser's identity, requirements and readiness have been reviewed, and access is always subject to the owner's instructions.",
  },
  {
    question: "Do you represent Marbella property owners as well as buyers?",
    answer: "Yes. We provide public and confidential representation for selected Marbella and Benahavís properties, including international positioning and controlled introductions to qualified prospective purchasers.",
  },
  {
    question: "How does a Marbella property search begin?",
    answer: "A search begins with a private discussion about location, property type, budget, timing and intended use. We then compare suitable areas, identify relevant opportunities and coordinate viewings and specialist advice.",
  },
];

export default function MarbellaPage() {
  return (
    <main className="marbella-market-page">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: marbellaFaqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />

      <section className="marbella-market-hero">
        <Image
          className="marbella-market-hero-image"
          src="/images/hero-villa.webp"
          alt="Luxury villa overlooking the Marbella coast"
          fill
          priority
          sizes="100vw"
        />
        <div className="marbella-market-hero-overlay" aria-hidden="true" />
        <div className="site-shell marbella-market-hero-copy">
          <p className="eyebrow light">Marbella · Benahavís · Costa del Sol</p>
          <h1>Luxury property in Marbella &amp; Benahavís.</h1>
          <p>
            Independent guidance for international buyers and owners across the
            Golden Mile, La Zagaleta, El Madroñal and selected prime locations.
          </p>
          <div className="marbella-market-hero-actions">
            <Link className="button button-gold" href="/enquire">
              Discuss your requirements <span>→</span>
            </Link>
            <Link href="/guides/marbella-property-international-buyers">
              International buyer guide <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="marbella-market-intro" aria-labelledby="marbella-intro-heading">
        <div className="site-shell marbella-market-intro-grid">
          <p className="eyebrow">A considered property search</p>
          <div>
            <h2 id="marbella-intro-heading">Marbella is not one property market.</h2>
            <div className="marbella-market-intro-copy">
              <p>
                Beachfront apartments, family villas, contemporary architecture,
                golf properties and private country estates each serve a different
                purpose and behave differently in the market.
              </p>
              <p>
                We help clients compare lifestyle, access, privacy, ongoing
                ownership and long-term suitability before focusing on individual
                homes. The objective is not the longest shortlist; it is a clearer
                decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="marbella-market-areas" aria-labelledby="marbella-areas-heading">
        <div className="site-shell">
          <div className="marbella-market-heading">
            <p className="eyebrow light">Prime residential areas</p>
            <h2 id="marbella-areas-heading">Begin with the location.</h2>
            <p>
              Explore the character, property types and practical considerations
              of four core Marbella and Benahavís markets.
            </p>
          </div>
          <div className="marbella-market-area-grid">
            {marketAreas.map((area) => (
              <Link href={area.href} key={area.name}>
                <span>{area.number}</span>
                <h3>{area.name}</h3>
                <p>{area.text}</p>
                <small>Read the area guide <b aria-hidden="true">→</b></small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="marbella-property-routes" aria-labelledby="marbella-routes-heading">
        <div className="site-shell">
          <div className="marbella-routes-heading">
            <div>
              <p className="eyebrow">Property services</p>
              <h2 id="marbella-routes-heading">Choose the route that fits your objective.</h2>
            </div>
            <p>
              Buying, selling, private access and luxury rentals require different
              processes. Each route begins with a direct, confidential discussion.
            </p>
          </div>
          <div className="marbella-routes-grid">
            {propertyRoutes.map((route, index) => (
              <Link href={route.href} key={route.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{route.title}</h3>
                <p>{route.text}</p>
                <small>Explore this service <b aria-hidden="true">→</b></small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="marbella-buying-process" aria-labelledby="marbella-process-heading">
        <div className="site-shell marbella-buying-process-grid">
          <div className="marbella-process-intro">
            <p className="eyebrow light">For international buyers</p>
            <h2 id="marbella-process-heading">From initial brief to coordinated purchase.</h2>
            <p>
              A structured search helps overseas buyers separate attractive
              presentation from genuine suitability and keeps the right advisers
              involved at the right stage.
            </p>
            <Link href="/guides/marbella-property-international-buyers">
              Read the complete buyer guide <span>→</span>
            </Link>
          </div>
          <div className="marbella-process-list">
            {buyingProcess.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marbella-private-market" aria-labelledby="marbella-private-heading">
        <div className="site-shell marbella-private-market-grid">
          <div>
            <p className="eyebrow">Discreet by design</p>
            <h2 id="marbella-private-heading">Some Marbella properties should never become public listings.</h2>
          </div>
          <div>
            <p>
              For owners who require a controlled sale, we qualify interest and
              limit the release of sensitive information. Approved buyers may
              therefore be introduced to opportunities that cannot be found on
              conventional property portals.
            </p>
            <div className="marbella-private-actions">
              <Link className="button button-dark" href="/private-portfolio">Request private access <span>→</span></Link>
              <Link href="/property-owners">For property owners <span>→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <TopicPathway
        title="Continue from market to decision."
        intro="Move from the broad Marbella market into the buyer process, current residence options and the distinct locations that shape value and lifestyle."
        links={[
          { label: "Buyer guide", title: "Marbella for international buyers", description: "Understand representation, due diligence and the acquisition sequence.", href: "/guides/marbella-property-international-buyers" },
          { label: "Residency", title: "Spain Golden Visa alternatives", description: "Review current routes after the investor pathway closed to new applicants.", href: "/guides/spain-golden-visa-alternatives" },
          { label: "Location", title: "Marbella Golden Mile", description: "Explore the beachfront, central and elevated residential submarkets.", href: "/areas/marbella-golden-mile" },
          { label: "Location", title: "Benahavís and private estates", description: "Compare hillside communities, golf areas and substantial private homes.", href: "/areas/benahavis" },
        ]}
      />

      <section className="marbella-market-faq" aria-labelledby="marbella-faq-heading">
        <div className="site-shell marbella-market-faq-grid">
          <div>
            <p className="eyebrow light">Marbella property FAQ</p>
            <h2 id="marbella-faq-heading">Questions before the search begins.</h2>
          </div>
          <div className="marbella-market-faq-list">
            {marbellaFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="marbella-market-cta">
        <div className="site-shell marbella-market-cta-grid">
          <div><p className="eyebrow">A private first conversation</p><h2>Discuss property in Marbella &amp; Benahavís.</h2></div>
          <div><p>Tell us whether you are buying, selling, relocating or arranging a stay. A brief outline of location, timing and budget is enough to begin.</p><Link className="button button-dark" href="/enquire">Make a confidential enquiry <span>→</span></Link></div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
