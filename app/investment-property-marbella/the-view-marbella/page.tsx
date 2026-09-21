import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { createMetadata } from "../../lib/seo";
import styles from "../InvestmentPropertyMarbella.module.css";

export const metadata = createMetadata("theViewMarbellaEn");

const amenities = [
  ["Pools", "Indoor, outdoor and saltwater pools"],
  ["Wellness", "Spa, sauna and treatment spaces"],
  ["Fitness", "Premium gym and outdoor training"],
  ["Balance", "Yoga and meditation areas"],
  ["Work", "Business centre and sports lounge"],
  ["Play", "Golf and football simulator"],
  ["Social", "Billiards, table tennis and pétanque"],
  ["Families", "Dedicated children's areas"],
];

const planningFacts = [
  ["Works licence", "No. 496/2024"],
  ["Phase 2A", "22 apartments"],
  ["Parking", "48 garage spaces"],
  ["Target delivery", "Q4 2026"],
];

export default function TheViewMarbellaPage() {
  return (
    <main className={styles.page}>
      <Header enquireHref="/enquire?partner=the-view-marbella" enquireLabel="The View Marbella enquiry" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ApartmentComplex",
            name: "The View Marbella",
            description:
              "A boutique collection of 58 two, three and four-bedroom sea-view residences and penthouses in Benahavís, Marbella.",
            url: "https://www.pfeuroasia.com/investment-property-marbella/the-view-marbella",
            image: "https://www.pfeuroasia.com/images/the-view-marbella/the-view-hero.webp",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Benahavís",
              addressRegion: "Málaga",
              addressCountry: "ES",
            },
          }),
        }}
      />

      <section className={styles.detailHero}>
        <Image
          className={styles.heroImage}
          src="/images/the-view-marbella/the-view-hero.webp"
          alt="The View Marbella hillside residences overlooking the Mediterranean"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.detailHeroShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailHeroCopy}`}>
          <p className="eyebrow light">Benahavís · Marbella · Phases II &amp; III</p>
          <h1>The View<br />Marbella.</h1>
          <p>
            Fifty-eight two, three and four-bedroom residences shaped around
            Mediterranean views, exceptional space and a private resort lifestyle.
          </p>
          <div className={styles.detailHeroActions}>
            <Link className="button button-gold" href="/enquire?partner=the-view-marbella">
              Request current availability <span>→</span>
            </Link>
            <Link href="/enquire?partner=the-view-marbella">
              Request brochure &amp; price list <span>→</span>
            </Link>
          </div>
        </div>
        <dl className={styles.heroFacts}>
          <div><dt>Collection</dt><dd>58 residences</dd></div>
          <div><dt>Bedrooms</dt><dd>2–4</dd></div>
          <div><dt>Guide prices</dt><dd>From €899,000</dd></div>
          <div><dt>Phase 2A</dt><dd>Q4 2026 target</dd></div>
        </dl>
      </section>

      <section className={styles.model} aria-labelledby="the-view-overview-heading">
        <div className={`site-shell ${styles.modelGrid}`}>
          <div>
            <p className="eyebrow">The development</p>
            <h2 id="the-view-overview-heading">Apartment living with the scale of a villa.</h2>
          </div>
          <div className={styles.modelCopy}>
            <p>
              The View Marbella is a low-density hillside community in Benahavís.
              Phases II and III extend the completed first phase with 58 residences,
              all presented with sea views and expansive indoor-outdoor living.
            </p>
            <p>
              Ground-floor homes introduce private gardens and pools, while selected
              penthouses add rooftop solariums and private pools above the coast.
            </p>
          </div>
        </div>
        <div className={`site-shell ${styles.modelCards}`}>
          <article><span>01</span><h3>Sea views</h3><p>Every residence is positioned to engage with the Mediterranean outlook.</p></article>
          <article><span>02</span><h3>Private pools</h3><p>Selected garden homes and penthouses include their own private pool.</p></article>
          <article><span>03</span><h3>Exceptional scale</h3><p>Generous plans extend from 160 m² to more than 629 m² in total area.</p></article>
          <article><span>04</span><h3>Gated privacy</h3><p>Landscaped grounds, managed amenities and 24-hour security.</p></article>
        </div>
      </section>

      <section className={styles.galleryPair}>
        <figure>
          <Image src="/images/the-view-marbella/the-view-residence.webp" alt="Terraced architecture and pools at The View Marbella" fill sizes="(max-width: 760px) 100vw, 60vw" />
          <figcaption>Terraced architecture above Marbella</figcaption>
        </figure>
        <figure>
          <Image src="/images/the-view-marbella/the-view-terrace.webp" alt="Private rooftop terrace at The View Marbella" fill sizes="(max-width: 760px) 100vw, 40vw" />
          <figcaption>Private outdoor living</figcaption>
        </figure>
      </section>

      <section className={styles.residences} aria-labelledby="the-view-residences-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">Residence collection</p><h2 id="the-view-residences-heading">Garden homes, elevated residences and penthouses.</h2></div>
            <p>Current guide prices below reflect the developer&apos;s list dated 31 August 2026. Unit-specific areas, orientation and availability are supplied on request.</p>
          </div>
          <div className={styles.modelCards}>
            <article><span>02 beds</span><h3>Two-bedroom residences</h3><p>Approximately 160–548 m² total area. Current listed homes from €899,000.</p></article>
            <article><span>03 beds</span><h3>Three-bedroom residences</h3><p>Approximately 251–594 m² total area. Current listed homes from €1,549,000.</p></article>
            <article><span>04 beds</span><h3>Four-bedroom penthouses</h3><p>Approximately 495–629 m² total area. Current listed homes from €2,590,000.</p></article>
            <article><span>Phases II &amp; III</span><h3>58 residences</h3><p>Low-rise homes with parking, storage and access to the wider community facilities.</p></article>
          </div>
          <div className={styles.pendingPrice}>
            <span>Current guide price range</span>
            <strong>€899,000–€3,399,000</strong>
            <Link href="/enquire?partner=the-view-marbella">Request the live unit list →</Link>
          </div>
        </div>
      </section>

      <section className={styles.amenities} aria-labelledby="the-view-amenities-heading">
        <Image className={styles.amenitiesImage} src="/images/the-view-marbella/the-view-pool.webp" alt="Pool and landscaped gardens at The View Marbella" fill sizes="100vw" />
        <div className={styles.amenitiesShade} aria-hidden="true" />
        <div className={`site-shell ${styles.amenitiesInner}`}>
          <div className={styles.amenitiesIntro}>
            <p className="eyebrow light">Five-star amenities</p>
            <h2 id="the-view-amenities-heading">Wellness, work and leisure at home.</h2>
          </div>
          <div className={styles.amenitiesGrid}>
            {amenities.map(([category, label]) => <article key={category}><strong>{category}</strong><span>{label}</span></article>)}
          </div>
        </div>
      </section>

      <section className={styles.services} aria-labelledby="the-view-services-heading">
        <div className={`site-shell ${styles.servicesGrid}`}>
          <div className={styles.servicesImageWrap}>
            <Image src="/images/the-view-marbella/the-view-business-centre.webp" alt="Business centre at The View Marbella" fill sizes="(max-width: 860px) 100vw, 52vw" />
          </div>
          <div className={styles.servicesCopy}>
            <p className="eyebrow">Beyond the residence</p>
            <h2 id="the-view-services-heading">A private club atmosphere.</h2>
            <p>The community blends a wellness-led residential setting with spaces for working, socialising and family time.</p>
            <p>Residents of Phases II and III are presented with access to the established Phase I facilities, including indoor and outdoor pools, health club, spa, gym and children&apos;s area.</p>
          </div>
        </div>
      </section>

      <section className={styles.location} aria-labelledby="the-view-location-heading">
        <div className={`site-shell ${styles.locationGrid}`}>
          <div>
            <p className="eyebrow">La Alborada · Benahavís</p>
            <h2 id="the-view-location-heading">A terraced hillside setting above Marbella.</h2>
            <p>The masterplan arranges the residences across the slope to prioritise outlook, privacy and landscaped open space.</p>
            <dl className={styles.locationTimes}>
              {planningFacts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </div>
          <div className={`${styles.locationImageWrap} ${styles.masterplanImage}`}>
            <Image src="/images/the-view-marbella/the-view-masterplan.webp" alt="Masterplan of The View Marbella Phases II and III" fill sizes="(max-width: 860px) 100vw, 48vw" />
          </div>
        </div>
      </section>

      <section className={styles.detailCta}>
        <Image className={styles.detailCtaImage} src="/images/the-view-marbella/the-view-interior.webp" alt="Contemporary interior at The View Marbella" fill sizes="100vw" />
        <div className={styles.detailCtaShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailCtaCopy}`}>
          <p className="eyebrow light">Private presentation</p>
          <h2>Choose the right phase, position and view.</h2>
          <p>Request the latest availability, price list, plans and development documentation through PF EuroAsia.</p>
          <Link className="button button-gold" href="/enquire?partner=the-view-marbella">Request a private presentation <span>→</span></Link>
        </div>
      </section>

      <section className={styles.legalNote}>
        <div className="site-shell">
          <p><strong>Important:</strong> This page summarises developer-supplied material. Prices and availability are based on a list dated 31 August 2026 and may change without notice. The stated Phase 2A delivery is a developer target. Areas are approximate, images are illustrative and prices exclude applicable purchase costs; VAT is currently stated at 10%. At the date of the supplied legal information, the declaration of new construction and horizontal division had not yet been executed. Buyers should appoint independent Spanish legal and tax advisers and verify title, planning, guarantees, specifications, community arrangements and the final purchase contract before proceeding.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
