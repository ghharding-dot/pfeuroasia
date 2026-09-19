import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { createMetadata } from "../lib/seo";
import styles from "./InvestmentPropertyMarbella.module.css";

export const metadata = createMetadata("investmentMarbellaEn");

const criteria = [
  {
    number: "01",
    title: "The operating model",
    text: "Who manages the residence, how short-term stays are handled, what is included in service charges and which services carry an additional fee.",
  },
  {
    number: "02",
    title: "The legal position",
    text: "Title, planning, tourist-rental authorisation, community rules and the precise restrictions attached to personal use must be independently verified.",
  },
  {
    number: "03",
    title: "The real cost",
    text: "Purchase taxes, furnishing, service charges, management fees, finance, maintenance and selling costs matter as much as the headline price.",
  },
  {
    number: "04",
    title: "The income assumptions",
    text: "Nightly rates, occupancy, distribution costs and owner-use periods should be modelled as scenarios rather than presented as guaranteed returns.",
  },
];

const featuredInvestments = [
  {
    number: "01",
    name: "Azurean Marbella",
    location: "Benahavís · Destination by Hyatt",
    description:
      "Branded, fully furnished residences with a structured hospitality and guest-stay model.",
    href: "/investment-property-marbella/azurean-residences-benahavis",
    action: "View full development",
  },
  {
    number: "02",
    name: "Nueva La Quinta",
    location: "Benahavís · La Quinta",
    description:
      "A selected development opportunity in the hills above Marbella for international purchasers.",
    href: "/enquire",
    action: "Request current details",
  },
  {
    number: "03",
    name: "Vista Lago",
    location: "Benahavís · Real de La Quinta",
    description:
      "Contemporary residences in a natural setting, presented for buyers seeking a distinctive Southern Spain investment.",
    href: "/enquire",
    action: "Request current details",
  },
];

export default function InvestmentPropertyMarbellaPage() {
  return (
    <main className={styles.page}>
      <Header enquireHref="/enquire?partner=azurean-residences" enquireLabel="Investment enquiry" />

      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/azurean/azurean-hero.webp"
          alt="Azurean Marbella branded residences in the Benahavís hills"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={`site-shell ${styles.heroCopy}`}>
          <p className="eyebrow light">Investment property · Marbella &amp; Southern Spain</p>
          <h1>Property with an operating plan.</h1>
          <p>
            A focused collection of residences where ownership, professional
            management and short-term guest stays form part of the proposition.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button-gold" href="#featured-international-investments">
              Explore featured developments <span>→</span>
            </Link>
            <Link href="/enquire?partner=azurean-residences">Discuss your investment brief <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={`site-shell ${styles.introGrid}`}>
          <p className="eyebrow">A distinct property category</p>
          <div>
            <h2>More than a second home. Different from a conventional buy-to-let.</h2>
            <div className={styles.introCopy}>
              <p>
                Managed or branded residences can give an overseas owner a more
                structured route into the Marbella market, with hospitality,
                maintenance and guest operations coordinated on site.
              </p>
              <p>
                The structure also brings rules, costs and limits that must be
                understood before purchase. We present the opportunity clearly,
                organise the current documents and coordinate independent legal,
                tax and financial review where required.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.investmentCollection}
        id="featured-international-investments"
        aria-labelledby="featured-international-investments-heading"
      >
        <div className="site-shell">
          <div className={styles.collectionHeading}>
            <div>
              <p className="eyebrow">Marbella &amp; Benahavís</p>
              <h2 id="featured-international-investments-heading">
                Featured international
                <em>investment properties.</em>
              </h2>
            </div>
            <p>
              Three selected development opportunities for international buyers,
              with direct access to the available presentation or current details.
            </p>
          </div>

          <div className={styles.investmentGrid}>
            {featuredInvestments.map((investment) => (
              <Link
                className={styles.investmentCard}
                href={investment.href}
                key={investment.name}
              >
                <span>{investment.number}</span>
                <div>
                  <p>{investment.location}</p>
                  <h3>{investment.name}</h3>
                  <small>{investment.description}</small>
                </div>
                <strong>{investment.action} <b aria-hidden="true">→</b></strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.featured} aria-labelledby="featured-investment-heading">
        <div className={`site-shell ${styles.featuredGrid}`}>
          <div className={styles.featuredImageWrap}>
            <Image
              src="/images/azurean/azurean-pool.webp"
              alt="Panoramic infinity pool at Azurean Marbella"
              fill
              sizes="(max-width: 860px) 100vw, 52vw"
            />
          </div>
          <div className={styles.featuredCopy}>
            <p className="eyebrow light">First featured development · Benahavís</p>
            <h2 id="featured-investment-heading">Azurean Marbella</h2>
            <p className={styles.destination}>Destination by Hyatt branded residences</p>
            <p>
              133 freehold, fully furnished residences licensed under Andalucía&apos;s
              Vivienda de Uso Turístico framework, with extensive resort facilities
              and professional residence-management services available.
            </p>
            <dl className={styles.featuredFacts}>
              <div><dt>Residences</dt><dd>133</dd></div>
              <div><dt>Bedrooms</dt><dd>1–3</dd></div>
              <div><dt>Guide prices</dt><dd>From €699,000</dd></div>
              <div><dt>Anticipated completion</dt><dd>Q2 2029</dd></div>
            </dl>
            <Link className="button button-gold" href="/investment-property-marbella/azurean-residences-benahavis">
              View the complete development <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.criteria} aria-labelledby="investment-review-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div>
              <p className="eyebrow">Before the numbers</p>
              <h2 id="investment-review-heading">What we examine.</h2>
            </div>
            <p>
              A strong brand and attractive brochure are only the beginning. The
              investment case depends on the contract, operating structure and the
              buyer&apos;s intended use.
            </p>
          </div>
          <div className={styles.criteriaGrid}>
            {criteria.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={`site-shell ${styles.finalCtaGrid}`}>
          <div>
            <p className="eyebrow light">International buyers</p>
            <h2>Start with the objective—not the brochure.</h2>
          </div>
          <div>
            <p>
              Tell us whether you prioritise personal use, managed income,
              diversification, a future base in Spain or a combination of these.
              We will organise the relevant information and current availability.
            </p>
            <Link className="button button-gold" href="/enquire?partner=azurean-residences">
              Make a confidential enquiry <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
