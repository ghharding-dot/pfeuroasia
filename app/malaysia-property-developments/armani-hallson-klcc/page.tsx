import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "../../investment-property-marbella/InvestmentPropertyMarbella.module.css";

export const metadata: Metadata = {
  title: "Armani Hallson KLCC | Malaysia Property Developments | PF EuroAsia",
  description:
    "Explore Armani Hallson KLCC, a freehold SOHO and SOVO development on Jalan Ampang, Kuala Lumpur, presented through the PF EuroAsia collaboration network.",
};

const layouts = [
  ["SOVO Type B", "406 sq ft", "672 units"],
  ["SOVO Type B1", "438 sq ft", "372 units"],
  ["SOHO Type B", "538 sq ft", "319 units"],
  ["SOHO Type A", "558 sq ft", "456 units"],
  ["SOVO Type A", "776 sq ft", "224 units"],
  ["SOVO Type C", "813 sq ft", "112 units"],
  ["SOVO Type D", "813 sq ft", "36 units"],
  ["SOVO Type E", "1,182 sq ft", "24 units"],
];

const features = [
  ["Freehold", "Tenure"],
  ["2.6 acres", "Site area"],
  ["3 towers", "1 SOHO · 2 SOVO"],
  ["2,215", "Total units"],
  ["1,189", "Parking spaces"],
  ["2029", "Scheduled completion"],
];

const amenities = [
  ["Level 10", "Landscaped arrival, lagoon, pavilions, gardens and family spaces"],
  ["Level 76", "Infinity pool, onsen, hydro spa, heated pool, sauna and sun decks"],
  ["Level 77", "Sky gym, Regent Lounge, Windsor Bar and elevated social spaces"],
  ["Level 78", "East and west viewing decks above the Kuala Lumpur skyline"],
];

const faqs = [
  {
    question: "Is Armani Hallson KLCC freehold?",
    answer:
      "Yes. The developer's August 2025 sales kit describes the development as freehold. The purchaser's independent Malaysian lawyer should still verify the title and unit-specific contract before commitment.",
  },
  {
    question: "What is the difference between the SOHO and SOVO units?",
    answer:
      "The project comprises one SOHO tower and two SOVO towers, with different layouts, floor arrangements and intended uses. Buyers should take Malaysian legal and tax advice on the permitted use, financing and treatment of the selected unit.",
  },
  {
    question: "Are prices and availability shown online?",
    answer:
      "Current prices, unit selection, incentives and payment terms are provided on request so they can be reconfirmed directly against the developer's latest availability.",
  },
  {
    question: "When is completion scheduled?",
    answer:
      "The supplied sales kit states completion in 2029. Construction milestones, handover timing and contractual remedies should be checked in the final sale and purchase agreement.",
  },
];

export default function ArmaniHallsonKlccPage() {
  return (
    <main className={`${styles.page} ${styles.armaniPage}`}>
      <Header enquireHref="/asia-gateway/enquire?development=armani-hallson-klcc" enquireLabel="Malaysia enquiry" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ApartmentComplex",
            name: "Armani Hallson KLCC",
            description: "A freehold SOHO and SOVO development on Jalan Ampang, Kuala Lumpur.",
            url: "https://www.pfeuroasia.com/malaysia-property-developments/armani-hallson-klcc",
            image: "https://www.pfeuroasia.com/images/kl-armani-skyline.webp",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jalan Ampang",
              addressLocality: "Kuala Lumpur",
              addressCountry: "MY",
            },
          }),
        }}
      />

      <section className={`${styles.detailHero} ${styles.armaniHero}`}>
        <Image className={styles.heroImage} src="/images/kl-armani-skyline.webp" alt="Artist's impression of Armani Hallson KLCC in the Kuala Lumpur skyline" fill priority sizes="100vw" />
        <div className={styles.detailHeroShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailHeroCopy}`}>
          <p className="eyebrow light">Jalan Ampang · Kuala Lumpur · Freehold</p>
          <h1>Armani Hallson<br />KLCC.</h1>
          <p>A three-tower SOHO and SOVO address combining panoramic city views, layered resort facilities and direct access to the heart of Kuala Lumpur.</p>
          <div className={styles.detailHeroActions}>
            <Link className="button button-gold" href="/asia-gateway/enquire?development=armani-hallson-klcc">Request prices &amp; availability <span>→</span></Link>
          </div>
        </div>
        <dl className={styles.heroFacts}>
          <div><dt>Tenure</dt><dd>Freehold</dd></div>
          <div><dt>Layouts</dt><dd>406–1,182 sq ft</dd></div>
          <div><dt>Prices</dt><dd>On application</dd></div>
          <div><dt>Completion</dt><dd>2029</dd></div>
        </dl>
      </section>

      <section className={styles.model} aria-labelledby="armani-overview-heading">
        <div className={`site-shell ${styles.modelGrid}`}>
          <div><p className="eyebrow">The development</p><h2 id="armani-overview-heading">An elevated address beside KLCC.</h2></div>
          <div className={styles.modelCopy}>
            <p>Armani Hallson KLCC is planned on a 2.6-acre freehold site on Jalan Ampang. The development comprises one 69-storey SOHO tower and two 78-storey SOVO towers, with retail, parking and extensive shared facilities.</p>
            <p>Its central position provides access to KLCC, Tun Razak Exchange, major roads and the city's commercial, retail and hospitality districts. PF EuroAsia presents the project through its Malaysian collaboration network for international buyers.</p>
          </div>
        </div>
        <div className={`site-shell ${styles.resortFactGrid}`}>
          {features.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}
        </div>
      </section>

      <section className={`${styles.amenities} ${styles.armaniAmenities}`} aria-labelledby="armani-amenities-heading">
        <Image className={styles.amenitiesImage} src="/images/kl-armani-pool.webp" alt="Artist's impression of the Level 76 pool deck overlooking the Petronas Towers" fill sizes="100vw" />
        <div className={styles.amenitiesShade} aria-hidden="true" />
        <div className={`site-shell ${styles.amenitiesInner}`}>
          <div className={styles.amenitiesIntro}><p className="eyebrow light">Facilities across four levels</p><h2 id="armani-amenities-heading">From garden retreat to rooftop skyline.</h2></div>
          <div className={styles.armaniAmenityList}>
            {amenities.map(([level, description]) => <article key={level}><strong>{level}</strong><span>{description}</span></article>)}
          </div>
        </div>
      </section>

      <section className={styles.residences} aria-labelledby="armani-layouts-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">SOHO &amp; SOVO collection</p><h2 id="armani-layouts-heading">Eight layouts. Different ways to use the city.</h2></div>
            <p>Areas and unit counts below are taken from the developer's August 2025 sales kit. Current unit orientation, floor, price and availability must be reconfirmed.</p>
          </div>
          <div className={styles.collectionList}>
            {layouts.map(([name, size, count], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{name}</h3><p>{size}</p></div><strong>{count}</strong></article>)}
          </div>
          <div className={styles.pendingPrice}><span>Current developer release</span><strong>Prices and unit list on request</strong><Link href="/asia-gateway/enquire?development=armani-hallson-klcc">Request availability →</Link></div>
        </div>
      </section>

      <section className={styles.galleryPair}>
        <figure><Image src="/images/kl-armani-arrival.webp" alt="Artist's impression of the Armani Hallson KLCC arrival" fill sizes="(max-width: 760px) 100vw, 60vw" /><figcaption>Arrival and porte-cochère</figcaption></figure>
        <figure><Image src="/images/kl-armani-rooftop.webp" alt="Artist's impression of Armani Hallson KLCC rooftop facilities" fill sizes="(max-width: 760px) 100vw, 40vw" /><figcaption>Rooftop facilities</figcaption></figure>
      </section>

      <section className={styles.services} aria-labelledby="armani-developer-heading">
        <div className={`site-shell ${styles.servicesGrid}`}>
          <div className={styles.servicesImageWrap}><Image src="/images/kl-armani-gym.webp" alt="Artist's impression of the Armani Hallson KLCC sky gym" fill sizes="(max-width: 860px) 100vw, 52vw" /></div>
          <div className={styles.servicesCopy}>
            <p className="eyebrow">Developer profile</p>
            <h2 id="armani-developer-heading">Armani Group Malaysia.</h2>
            <p>The supplied corporate profile describes a Malaysian group active in property development, construction, trading and furniture manufacturing, with residential, hotel, commercial and industrial projects.</p>
            <p>Armani Hallson KLCC Sdn Bhd is named as the project developer. Buyers should conduct independent legal, financial and technical due diligence on the developer, land, approvals and sale documentation.</p>
            <Link className="text-link" href="/asia-gateway/enquire?development=armani-hallson-klcc">Request project information through PF EuroAsia <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="armani-faq-heading">
        <div className={`site-shell ${styles.faqGrid}`}>
          <div><p className="eyebrow light">Important questions</p><h2 id="armani-faq-heading">Confirm the unit and structure before reserving.</h2></div>
          <div className={styles.faqList}>{faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.detailCta}>
        <Image className={styles.detailCtaImage} src="/images/kl-armani-skyline.webp" alt="Artist's impression of Armani Hallson KLCC and the Kuala Lumpur skyline" fill sizes="100vw" />
        <div className={styles.detailCtaShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailCtaCopy}`}>
          <p className="eyebrow light">International buyer presentation</p>
          <h2>Select the right floor, view and layout.</h2>
          <p>Request the current unit list, prices and payment schedule through PF EuroAsia. We will coordinate all communication on your behalf.</p>
          <Link className="button button-gold" href="/asia-gateway/enquire?development=armani-hallson-klcc">Request the current release <span>→</span></Link>
        </div>
      </section>

      <section className={styles.legalNote}><div className="site-shell"><p><strong>Important:</strong> This independent presentation summarises developer-supplied material dated April and August 2025 and is provided through the PF EuroAsia collaboration network. It is not an offer, contract, valuation, return projection or legal, tax or financial advice. Images are artists' impressions. Plans, areas, facilities, views, prices, incentives, availability and completion timing may change. Purchasers should appoint independent Malaysian legal and tax advisers and verify the title, permitted use, approvals, financing, developer documentation, sale and purchase agreement, maintenance charges and all acquisition costs before commitment.</p></div></section>

      <Footer />
    </main>
  );
}
