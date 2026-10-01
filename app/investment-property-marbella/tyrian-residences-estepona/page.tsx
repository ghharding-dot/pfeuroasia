import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { createMetadata } from "../../lib/seo";
import styles from "../InvestmentPropertyMarbella.module.css";

export const metadata = createMetadata("tyrianResidencesEn");

const amenities = [
  ["Wellness", "700 m² spa with indoor pool, hammam, saunas and treatment rooms"],
  ["Fitness", "High-tech gym with yoga and Pilates studios"],
  ["Rooftop", "Infinity pool, lounge areas, barbecue spaces and service kitchen"],
  ["Service", "24/7 concierge, valet assistance and a dedicated residents’ app"],
  ["Families", "Children’s playroom, indoor pool and shared family spaces"],
  ["Leisure", "Multimedia room, golf simulator and entertainment spaces"],
  ["Security", "Controlled access, CCTV and round-the-clock monitoring"],
  ["Parking", "EV charging, guest parking and penthouse supergarages"],
];

const residenceTypes = [
  ["Tyros", "3 bedrooms · 280–300 m²", "Advertised from €3,550,000"],
  ["Fenicia", "4 bedrooms · 420–440 m²", "Advertised from €4,150,000"],
  ["Ciro", "3 bedrooms · 510–550 m²", "Advertised from €6,300,000"],
  ["Melkart", "4 bedrooms · 830 m²", "Advertised from €7,600,000"],
];

export default function TyrianResidencesPage() {
  return (
    <main className={styles.page}>
      <Header enquireHref="/enquire?partner=tyrian-residences" enquireLabel="Tyrian enquiry" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ApartmentComplex",
            name: "Tyrian Residences",
            description:
              "A collection of 40 fully serviced three and four-bedroom beachfront residences in Estepona.",
            url: "https://www.pfeuroasia.com/investment-property-marbella/tyrian-residences-estepona",
            image: "https://www.pfeuroasia.com/images/tyrian-residences/tyrian-hero.webp",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Estepona",
              addressRegion: "Málaga",
              addressCountry: "ES",
            },
          }),
        }}
      />

      <section className={styles.detailHero}>
        <Image
          className={styles.heroImage}
          src="/images/tyrian-residences/tyrian-hero.webp"
          alt="Tyrian Residences beachfront development in Estepona"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.detailHeroShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailHeroCopy}`}>
          <p className="eyebrow light">Estepona · Costa del Sol · Beachfront</p>
          <h1>Tyrian<br />Residences.</h1>
          <p>
            Forty fully serviced beachfront homes designed to offer the space and
            privacy of a villa with the support and amenities of a five-star residence.
          </p>
          <div className={styles.detailHeroActions}>
            <Link className="button button-gold" href="/enquire?partner=tyrian-residences">
              Request current availability <span>→</span>
            </Link>
            <Link href="/enquire?partner=tyrian-residences">
              Request brochure &amp; price list <span>→</span>
            </Link>
          </div>
        </div>
        <dl className={styles.heroFacts}>
          <div><dt>Collection</dt><dd>40 residences</dd></div>
          <div><dt>Bedrooms</dt><dd>3–4</dd></div>
          <div><dt>Guide price</dt><dd>From €3.55m</dd></div>
          <div><dt>Position</dt><dd>Beachfront</dd></div>
        </dl>
      </section>

      <section className={styles.model} aria-labelledby="tyrian-overview-heading">
        <div className={`site-shell ${styles.modelGrid}`}>
          <div>
            <p className="eyebrow">Villas in the sky</p>
            <h2 id="tyrian-overview-heading">Beachfront living with space, privacy and service.</h2>
          </div>
          <div className={styles.modelCopy}>
            <p>
              Tyrian is positioned directly on the Estepona beachfront between Marbella
              and Sotogrande. The development comprises 40 residences across four levels,
              with five layouts extending from apartments to duplex penthouses.
            </p>
            <p>
              Floor-to-ceiling glazing, broad terraces, private resident lifts and a
              separate service lift are designed to preserve views, discretion and an
              easy transition between indoor and outdoor living.
            </p>
          </div>
        </div>
        <div className={`site-shell ${styles.modelCards}`}>
          <article><span>01</span><h3>Fully serviced</h3><p>Concierge and security operate around the clock, supported by a dedicated app.</p></article>
          <article><span>02</span><h3>Villa-like scale</h3><p>Three and four-bedroom plans with expansive living spaces and floating terraces.</p></article>
          <article><span>03</span><h3>Wellness led</h3><p>Built under WELL Certification guidelines with an A-rated energy certification.</p></article>
          <article><span>04</span><h3>Frontline position</h3><p>Sea and mountain outlooks from a direct beachfront setting in Estepona.</p></article>
        </div>
      </section>

      <section className={styles.galleryPair}>
        <figure>
          <Image src="/images/tyrian-residences/tyrian-aerial.webp" alt="Aerial view of Tyrian Residences on Estepona beach" fill sizes="(max-width: 760px) 100vw, 60vw" />
          <figcaption>A direct Mediterranean beachfront setting</figcaption>
        </figure>
        <figure>
          <Image src="/images/tyrian-residences/tyrian-terrace.webp" alt="Tyrian penthouse terrace overlooking the Mediterranean" fill sizes="(max-width: 760px) 100vw, 40vw" />
          <figcaption>Private terraces with panoramic sea views</figcaption>
        </figure>
      </section>

      <section className={styles.residences} aria-labelledby="tyrian-residences-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">Residence collection</p><h2 id="tyrian-residences-heading">Apartments, penthouses and duplex penthouses.</h2></div>
            <p>Tyrian presents five layouts with three or four bedrooms. The indicative figures below are those publicly advertised by the developer on 1 October 2026.</p>
          </div>
          <div className={styles.residenceTable} role="table" aria-label="Tyrian residence types and advertised guide prices">
            <div className={styles.tableHead} role="row"><span>Residence</span><span>Configuration</span><span>Guide price</span></div>
            {residenceTypes.map(([name, configuration, price]) => (
              <div role="row" key={name}><strong>{name}</strong><span>{configuration}</span><span>{price}</span></div>
            ))}
          </div>
          <div className={styles.pendingPrice}>
            <span>Publicly advertised entry point</span>
            <strong>From €3,550,000</strong>
            <Link href="/enquire?partner=tyrian-residences">Request the live unit list →</Link>
          </div>
        </div>
      </section>

      <section className={styles.amenities} aria-labelledby="tyrian-amenities-heading">
        <Image className={styles.amenitiesImage} src="/images/tyrian-residences/tyrian-pool.webp" alt="Tyrian rooftop infinity pool overlooking the Mediterranean" fill sizes="100vw" />
        <div className={styles.amenitiesShade} aria-hidden="true" />
        <div className={`site-shell ${styles.amenitiesInner}`}>
          <div className={styles.amenitiesIntro}>
            <p className="eyebrow light">Five-star residential services</p>
            <h2 id="tyrian-amenities-heading">Designed around wellbeing and effortless living.</h2>
          </div>
          <div className={styles.amenitiesGrid}>
            {amenities.map(([category, label]) => <article key={category}><strong>{category}</strong><span>{label}</span></article>)}
          </div>
        </div>
      </section>

      <section className={styles.services} aria-labelledby="tyrian-services-heading">
        <div className={`site-shell ${styles.servicesGrid}`}>
          <div className={styles.servicesImageWrap}>
            <Image src="/images/tyrian-residences/tyrian-spa.webp" alt="Indoor spa pool at Tyrian Residences" fill sizes="(max-width: 860px) 100vw, 52vw" />
          </div>
          <div className={styles.servicesCopy}>
            <p className="eyebrow">Private residential club</p>
            <h2 id="tyrian-services-heading">1,400 m² devoted to leisure.</h2>
            <p>The amenity level includes a 700 m² spa with a 23.5-metre indoor pool, hammam, saunas, treatment rooms, gym and dedicated yoga and Pilates spaces.</p>
            <p>Further facilities include family and children’s areas, a multimedia room, golf simulator, coworking and entertainment spaces, landscaped grounds and a rooftop infinity pool.</p>
          </div>
        </div>
      </section>

      <section className={styles.location} aria-labelledby="tyrian-location-heading">
        <div className={`site-shell ${styles.locationGrid}`}>
          <div>
            <p className="eyebrow">Estepona · Between Marbella &amp; Sotogrande</p>
            <h2 id="tyrian-location-heading">Connected to both ends of the Costa del Sol.</h2>
            <p>The beachfront setting combines direct access to Estepona with practical reach of Marbella, Sotogrande, Málaga Airport and Gibraltar Airport.</p>
            <dl className={styles.locationTimes}>
              <div><dt>Setting</dt><dd>Beachfront Estepona</dd></div>
              <div><dt>Golf</dt><dd>More than 70 Costa del Sol courses</dd></div>
              <div><dt>Sotogrande</dt><dd>Approximately 30 km</dd></div>
              <div><dt>Security</dt><dd>24/7 controlled access</dd></div>
            </dl>
          </div>
          <div className={styles.locationImageWrap}>
            <Image src="/images/tyrian-residences/tyrian-kitchen.webp" alt="Bespoke Tyrian residence kitchen and dining area" fill sizes="(max-width: 860px) 100vw, 48vw" />
          </div>
        </div>
      </section>

      <section className={styles.detailCta}>
        <Image className={styles.detailCtaImage} src="/images/tyrian-residences/tyrian-terrace.webp" alt="Tyrian rooftop terrace and private pool" fill sizes="100vw" />
        <div className={styles.detailCtaShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailCtaCopy}`}>
          <p className="eyebrow light">Private presentation</p>
          <h2>Choose the right residence, floor and outlook.</h2>
          <p>Request the latest availability, price list, floor plans and current development documentation through PF EuroAsia.</p>
          <Link className="button button-gold" href="/enquire?partner=tyrian-residences">Request a private presentation <span>→</span></Link>
        </div>
      </section>

      <section className={styles.legalNote}>
        <div className="site-shell">
          <p><strong>Important:</strong> This independent overview summarises information publicly presented by the developer and reviewed on 1 October 2026. Prices, availability, areas, specifications, services and completion timing may change without notice. Images are illustrative and may differ from the completed development. Prices exclude applicable purchase costs. Buyers should appoint independent Spanish legal and tax advisers and verify title, planning, bank guarantees, specifications, community and service charges, completion dates and the final purchase contract before proceeding.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
