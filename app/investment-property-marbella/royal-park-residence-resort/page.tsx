import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { createMetadata } from "../../lib/seo";
import styles from "../InvestmentPropertyMarbella.module.css";

export const metadata = createMetadata("royalParkResidenceEn");

const paymentSteps = [
  ["Reservation", "€10,000"],
  ["Upon signing the PPC", "30% + VAT"],
  ["Six months after PPC", "20% + VAT"],
  ["Key delivery", "50% + VAT"],
];

const amenities = [
  ["Wellness", "Spa and relaxation areas"],
  ["Fitness", "Gym, yoga and group classes"],
  ["Sport", "Padel and tennis courts"],
  ["Work", "Coworking and meeting rooms"],
  ["Dining", "Restaurant, takeaway and delivery"],
  ["Convenience", "On-site retail store"],
  ["Families", "Children's adventure areas"],
  ["Security", "Gated community with 24/7 security"],
];

const locationDistances = [
  ["Estepona", "12 km"],
  ["Puerto Banús", "12 km"],
  ["Marbella", "21 km"],
  ["Gibraltar", "58 km"],
  ["Málaga Airport", "65 km"],
];

export default function RoyalParkResidencePage() {
  return (
    <main className={styles.page}>
      <Header enquireHref="/enquire?partner=royal-park-residence" enquireLabel="Royal Park enquiry" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ApartmentComplex",
            name: "Royal Park Residence & Resort",
            description: "A gated collection of luxury two, three and four-bedroom residences with resort facilities on Estepona's New Golden Mile.",
            url: "https://www.pfeuroasia.com/investment-property-marbella/royal-park-residence-resort",
            image: "https://www.pfeuroasia.com/images/royal-park/royal-park-hero.webp",
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
          src="/images/royal-park/royal-park-hero.webp"
          alt="Royal Park Residence and Resort on Estepona's New Golden Mile"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.detailHeroShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailHeroCopy}`}>
          <p className="eyebrow light">New Golden Mile · Estepona · Resort residences</p>
          <h1>Royal Park<br />Residence &amp; Resort.</h1>
          <p>
            Spacious two, three and four-bedroom residences combining private
            terraces, sea views and a complete resort lifestyle within a gated
            community close to the beach.
          </p>
          <div className={styles.detailHeroActions}>
            <Link className="button button-gold" href="/enquire?partner=royal-park-residence">
              Request current availability <span>→</span>
            </Link>
            <a href="/downloads/royal-park/royal-park-residence-resort-brochure.pdf" target="_blank" rel="noopener">
              Download brochure <span>↓</span>
            </a>
          </div>
        </div>
        <dl className={styles.heroFacts}>
          <div><dt>Phase 1</dt><dd>57 apartments</dd></div>
          <div><dt>Bedrooms</dt><dd>2–4</dd></div>
          <div><dt>Beach</dt><dd>10-minute walk</dd></div>
          <div><dt>Prices</dt><dd>On request</dd></div>
        </dl>
      </section>

      <section className={styles.model} aria-labelledby="royal-park-overview-heading">
        <div className={`site-shell ${styles.modelGrid}`}>
          <div>
            <p className="eyebrow">The development</p>
            <h2 id="royal-park-overview-heading">Private residences. Resort-scale living.</h2>
          </div>
          <div className={styles.modelCopy}>
            <p>
              Designed in collaboration with architect Pablo Villarroel, Royal
              Park brings together generous layouts, oversized windows and
              landscaped outdoor spaces on Estepona&apos;s New Golden Mile.
            </p>
            <p>
              Phase 1 comprises 57 apartments, including garden homes and
              penthouses with solariums. Each residence is presented with two
              underground parking spaces and one storage unit.
            </p>
          </div>
        </div>
        <div className={`site-shell ${styles.modelCards}`}>
          <article><span>01</span><h3>Contemporary layouts</h3><p>Two, three and four-bedroom plans with expansive living areas and floor-to-ceiling glazing.</p></article>
          <article><span>02</span><h3>Private outside space</h3><p>Generous terraces, landscaped gardens and selected penthouses with private solariums.</p></article>
          <article><span>03</span><h3>Parking &amp; storage</h3><p>Two underground parking spaces and one private storage unit are allocated to each apartment.</p></article>
          <article><span>04</span><h3>Secure community</h3><p>A gated environment with 24-hour security technology and managed communal areas.</p></article>
        </div>
      </section>

      <section className={styles.galleryPair}>
        <figure>
          <Image src="/images/royal-park/royal-park-aerial.webp" alt="Aerial view of Royal Park Residence and Resort" fill sizes="(max-width: 760px) 100vw, 60vw" />
          <figcaption>Landscaped residential setting</figcaption>
        </figure>
        <figure>
          <Image src="/images/royal-park/royal-park-terrace.webp" alt="Private terrace at Royal Park Residence" fill sizes="(max-width: 760px) 100vw, 40vw" />
          <figcaption>Indoor-outdoor Mediterranean living</figcaption>
        </figure>
      </section>

      <section className={styles.residences} aria-labelledby="royal-park-residences-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">Residence collection</p><h2 id="royal-park-residences-heading">From garden apartments to penthouses.</h2></div>
            <p>Phase 1 offers a choice of two, three and four-bedroom layouts across low-rise blocks on Plots 7 and 8.</p>
          </div>
          <div className={styles.modelCards}>
            <article><span>02 beds</span><h3>Two-bedroom residences</h3><p>Generous open-plan homes with private terraces and selected ground-floor gardens.</p></article>
            <article><span>03 beds</span><h3>Three-bedroom residences</h3><p>Spacious family layouts across garden, upper-floor and penthouse positions.</p></article>
            <article><span>04 beds</span><h3>Four-bedroom residences</h3><p>Limited larger homes, including garden apartments and penthouses with solariums.</p></article>
            <article><span>Phase 1</span><h3>57 residences</h3><p>Current unit-specific plans, areas, orientation and availability are supplied on request.</p></article>
          </div>
          <div className={styles.pendingPrice}>
            <span>Current prices &amp; availability</span>
            <strong>Available on request</strong>
            <Link href="/enquire?partner=royal-park-residence">Request the current unit list →</Link>
          </div>
        </div>
      </section>

      <section className={styles.payment} aria-labelledby="royal-park-payment-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow">Payment structure</p><h2 id="royal-park-payment-heading">A staged purchase plan.</h2></div>
            <p>The developer brochure states that payments are made to the builder&apos;s special account and protected by guarantees. Terms must be confirmed in the unit-specific contract.</p>
          </div>
          <ol className={styles.paymentSteps}>
            {paymentSteps.map(([label, amount], index) => (
              <li key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{amount}</strong><small>{label}</small></li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.amenities} aria-labelledby="royal-park-amenities-heading">
        <Image className={styles.amenitiesImage} src="/images/royal-park/royal-park-gym.webp" alt="Gym and yoga facilities at Royal Park Residence and Resort" fill sizes="100vw" />
        <div className={styles.amenitiesShade} aria-hidden="true" />
        <div className={`site-shell ${styles.amenitiesInner}`}>
          <div className={styles.amenitiesIntro}>
            <p className="eyebrow light">Resort-style living</p>
            <h2 id="royal-park-amenities-heading">Wellness, sport, work and family life.</h2>
          </div>
          <div className={styles.amenitiesGrid}>
            {amenities.map(([category, label]) => <article key={category}><strong>{category}</strong><span>{label}</span></article>)}
          </div>
        </div>
      </section>

      <section className={styles.services} aria-labelledby="royal-park-services-heading">
        <div className={`site-shell ${styles.servicesGrid}`}>
          <div className={styles.servicesImageWrap}>
            <Image src="/images/royal-park/royal-park-restaurant.webp" alt="Restaurant and social area at Royal Park Residence and Resort" fill sizes="(max-width: 860px) 100vw, 52vw" />
          </div>
          <div className={styles.servicesCopy}>
            <p className="eyebrow">Everyday convenience</p>
            <h2 id="royal-park-services-heading">A community designed for daily life.</h2>
            <p>Residents are presented with free access to the gym and spa areas, together with coworking zones, meeting rooms, a restaurant and an on-site retail store.</p>
            <p>Families are also considered, with playgrounds, labyrinths and a children&apos;s zipline adventure area included in the resort concept.</p>
          </div>
        </div>
      </section>

      <section className={styles.location} aria-labelledby="royal-park-location-heading">
        <div className={`site-shell ${styles.locationGrid}`}>
          <div>
            <p className="eyebrow">Estepona · New Golden Mile</p>
            <h2 id="royal-park-location-heading">Between Estepona and Puerto Banús.</h2>
            <p>Royal Park is positioned close to the coast, international schools, golf, beach clubs and the services of both Estepona and Marbella.</p>
            <dl className={styles.locationTimes}>
              {locationDistances.map(([place, distance]) => <div key={place}><dt>{place}</dt><dd>{distance}</dd></div>)}
            </dl>
          </div>
          <div className={styles.locationImageWrap}>
            <Image src="/images/royal-park/royal-park-interior.webp" alt="Contemporary Royal Park residence interior" fill sizes="(max-width: 860px) 100vw, 48vw" />
          </div>
        </div>
      </section>

      <section className={styles.detailCta}>
        <Image className={styles.detailCtaImage} src="/images/royal-park/royal-park-residence.webp" alt="Royal Park Residence and Resort apartment building" fill sizes="100vw" />
        <div className={styles.detailCtaShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailCtaCopy}`}>
          <p className="eyebrow light">Private presentation</p>
          <h2>Choose the right layout, position and orientation.</h2>
          <p>Request the current price list, unit availability, detailed plans and the latest development documentation.</p>
          <Link className="button button-gold" href="/enquire?partner=royal-park-residence">Request current availability <span>→</span></Link>
        </div>
      </section>

      <section className={styles.legalNote}>
        <div className="site-shell">
          <p><strong>Important:</strong> This page summarises developer-supplied material dated June 2026 and is not an offer, contract, financial projection or legal or tax advice. Plans, areas, amenities, specifications, prices, availability and delivery dates may change. Images and furniture are illustrative. Prices exclude applicable taxes and purchase costs. Buyers should appoint independent Spanish legal and tax advisers and review the final purchase, planning, guarantee and community documentation.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
