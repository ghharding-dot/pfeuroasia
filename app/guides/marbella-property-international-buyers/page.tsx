import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./page.module.css";

const buyerPerspectives = [
  {
    title: "UK & Northern Europe",
    text: "A considered search often begins with year-round living, flight access, schools, healthcare, outdoor space and the practical differences between coastal and hillside communities.",
  },
  {
    title: "Middle East",
    text: "Privacy, security, staff accommodation, plot size, entertaining space and discreet access can be central to the brief. Information and viewings are managed with appropriate confidentiality.",
  },
  {
    title: "Asia",
    text: "Clients may need a reliable Spain-side representative for remote inspections, focused viewing visits, document coordination and communication across time zones.",
  },
  {
    title: "United States & international",
    text: "Differences in the purchase process, property measurement, negotiation and professional roles should be explained clearly before a shortlist becomes a commitment.",
  },
];

const process = [
  ["01", "Define the real brief", "Clarify lifestyle, location, budget, privacy, ownership horizon and the practical purpose of the property."],
  ["02", "Understand the market", "Compare areas, recent market evidence, condition, running considerations and the compromises behind each opportunity."],
  ["03", "Inspect and shortlist", "Filter public, partner and discreet opportunities before arranging a focused programme of viewings."],
  ["04", "Coordinate the purchase", "Support negotiation and bring the appropriate independent legal, tax, technical and financial advisers into the process."],
];

export default function InternationalBuyerGuidePage() {
  return (
    <main className={styles.page}>
      <Header transparent />

      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/hero-villa.webp"
          alt="Luxury Marbella villa viewed by an international property buyer"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={`site-shell ${styles.heroInner}`}>
          <p className="eyebrow light">Marbella · International buyers</p>
          <h1>Marbella property advice<br /><em>for international buyers.</em></h1>
          <p>
            Independent guidance for clients buying from the UK, Scandinavia,
            the Middle East, Asia, the United States and wider international markets.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button-gold" href="/enquire">Discuss your search <span>→</span></Link>
            <Link className="text-link light-link" href="/markets/marbella">Explore Marbella <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={`site-shell ${styles.introGrid}`}>
          <p className="eyebrow">Start with the decision</p>
          <div>
            <h2>A property shortlist is only useful when the strategy behind it is clear.</h2>
            <p>
              International buyers can see thousands of Marbella properties online. The more
              important question is which locations, homes and ownership considerations actually
              fit the client. A capable Marbella property advisor should reduce noise, explain the
              local context and protect the buyer&apos;s time throughout the process.
            </p>
            <p>
              Property Facilitators EuroAsia provides an accountable point of contact in Southern
              Spain, combining local market experience with carefully coordinated professional advice.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.principles}>
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">What good representation covers</p><h2>Clarity before commitment.</h2></div>
            <p>Every search is different, but the disciplines behind a sound acquisition remain consistent.</p>
          </div>
          <div className={styles.principleGrid}>
            <article><span>01</span><h3>Area and lifestyle</h3><p>Daily life, travel time, security, schools, privacy and community—not simply a familiar postcode.</p></article>
            <article><span>02</span><h3>Value and condition</h3><p>Price must be considered alongside plot, orientation, specification, maintenance and future work.</p></article>
            <article><span>03</span><h3>Access and discretion</h3><p>The right home may be public, quietly marketed or available only through trusted relationships.</p></article>
            <article><span>04</span><h3>Professional coordination</h3><p>Independent legal, tax, survey, technical and finance advice should be introduced at the right stage.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.audiences}>
        <div className="site-shell">
          <div className={styles.sectionHeadingDark}>
            <div><p className="eyebrow">International perspective</p><h2>Different starting points.<br />One disciplined process.</h2></div>
            <p>Nationality does not define the brief, but distance, expectations and prior experience often influence the support a buyer needs.</p>
          </div>
          <div className={styles.audienceGrid}>
            {buyerPerspectives.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className={styles.locations}>
        <div className={`site-shell ${styles.locationsGrid}`}>
          <div>
            <p className="eyebrow light">Understanding the coast</p>
            <h2>Marbella is a collection of distinct markets.</h2>
            <p>No single location is automatically best. The correct choice depends on how the property will actually be used.</p>
          </div>
          <div className={styles.locationList}>
            <article><span>Marbella</span><h3>Golden Mile & Sierra Blanca</h3><p>Established prestige, convenient access and a wide range of apartments, villas and gated communities.</p></article>
            <article><span>Golf valley</span><h3>Nueva Andalucía</h3><p>Golf, restaurants, international schools and practical proximity to Puerto Banús.</p></article>
            <article><span>Benahavís</span><h3>La Zagaleta & El Madroñal</h3><p>Private hillside living, significant plots, nature and individual homes.</p><div><Link href="/areas/la-zagaleta">La Zagaleta guide →</Link><Link href="/areas/el-madronal">El Madroñal guide →</Link></div></article>
            <article><span>Western Costa del Sol</span><h3>Estepona & selected areas</h3><p>Modern developments, coastal living and alternatives beyond central Marbella.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className="site-shell">
          <div className={styles.processHeading}><p className="eyebrow">A practical buying sequence</p><h2>Focused from the first conversation.</h2></div>
          <div className={styles.processList}>
            {process.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
          <p className={styles.disclaimer}>This guide is general information, not legal, tax, financial or technical advice. Buyers should obtain independent professional advice appropriate to their circumstances before proceeding.</p>
        </div>
      </section>

      <section className="mini-cta">
        <div className="site-shell">
          <p className="eyebrow light">Begin privately</p>
          <h2>Tell us what you want the property to achieve.</h2>
          <Link className="button button-gold" href="/enquire">Start a confidential conversation <span>→</span></Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
