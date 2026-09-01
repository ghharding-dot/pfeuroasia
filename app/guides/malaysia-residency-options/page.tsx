import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { AuthorityReview } from "../../components/AuthorityReview";
import { TopicPathway } from "../../components/TopicPathway";
import styles from "../MalaysiaSeoGuide.module.css";

const pathways = [
  {
    title: "Malaysia My Second Home (MM2H)",
    text: "A long-stay programme for eligible applicants who can meet the current financial, property, age and presence conditions for the chosen category.",
    points: ["Long-stay lifestyle route", "Family applications may be possible", "Conditions must be checked before applying"],
  },
  {
    title: "DE Rantau Nomad Pass",
    text: "A route designed for qualifying digital professionals and remote workers who want to live and work from Malaysia for a defined period.",
    points: ["Digital and remote-work focus", "Professional evidence required", "Administered through Malaysia Digital"],
  },
  {
    title: "Employment Pass",
    text: "A company-sponsored route for eligible expatriate roles. The employer, position, salary and duration must meet the applicable requirements.",
    points: ["Linked to genuine employment", "Employer registration and approval", "Dependants considered separately"],
  },
  {
    title: "Labuan business-led pathway",
    text: "For suitable entrepreneurs, a genuine Labuan company may support a work-permit conversation, subject to company activity, substance and regulatory approval.",
    points: ["Company and immigration reviewed together", "Not automatic residency", "Ongoing compliance required"],
  },
];

const considerations = [
  ["01", "Purpose", "Retirement, remote work, employment and running a business point to different routes."],
  ["02", "Time in Malaysia", "Immigration permission and personal tax residence are separate questions."],
  ["03", "Family", "Dependants, schooling, healthcare and housing should be assessed from the outset."],
  ["04", "Income and business", "Where income arises and where a company is managed can affect tax and compliance."],
  ["05", "Country of departure", "Leaving Spain, the UK or another country correctly can matter as much as the Malaysian route."],
  ["06", "Current rules", "Programme criteria change, so eligibility should be verified against official guidance before commitment."],
];

const faqs = [
  { question: "What is the easiest way to obtain residency in Malaysia?", answer: "There is no single easiest route for everyone. The appropriate option depends on age, income, professional activity, family circumstances, intended length of stay and whether the applicant will work or operate a business." },
  { question: "Does buying property give a foreigner Malaysian residency?", answer: "Property ownership and immigration status are separate. Some programmes can include property-related conditions, but purchasing a property alone should not be treated as granting residence." },
  { question: "Does a Malaysian visa automatically create tax residency?", answer: "No. Immigration permission and tax residence are separate. Malaysian residence tests, travel days, income and the rules of any country being left must be reviewed." },
  { question: "Can a Labuan company provide residency?", answer: "A suitable company may form part of a work-permit pathway, but neither incorporation nor share ownership guarantees an immigration outcome. The proposed activity, role, substance and applicant must qualify." },
];

export default function MalaysiaResidencyOptionsPage() {
  return (
    <main className={styles.page}>
      <Header transparent enquireHref="/asia-gateway/enquire" enquireLabel="Malaysia enquiry" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }) }} />

      <section className={styles.hero}>
        <Image className={styles.heroImage} src="/images/kl%20BACK%20GORUND.avif" alt="Kuala Lumpur skyline for people exploring Malaysia residency options" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={`site-shell ${styles.heroInner}`}>
          <p className="eyebrow light">Malaysia · Residency &amp; relocation</p>
          <h1>Malaysia residency options<em>for international clients.</em></h1>
          <p className={styles.heroCopy}>Compare the principal lifestyle, remote-work, employment and business-led pathways before choosing the route that fits your real plans.</p>
          <div className={styles.heroActions}>
            <Link className="button button-gold" href="/asia-gateway/enquire">Request a private assessment <span>→</span></Link>
            <Link className="text-link light-link" href="/guides/malaysia-tax-residency-for-foreigners">Understand tax residency <span>→</span></Link>
          </div>
        </div>
      </section>

      <AuthorityReview focus="malaysia" />

      <section className={styles.intro}>
        <div className={`site-shell ${styles.introGrid}`}>
          <div><p className="eyebrow">Choose by purpose</p><h2>Residency is not a single product.</h2></div>
          <div className={styles.lead}><p>Malaysia offers several possible routes, but they serve different people. A family seeking a long-term lifestyle base has different needs from a remote professional, an employed expatriate or an entrepreneur establishing genuine operations.</p><p>PF EuroAsia helps define the objective, compare suitable pathways and coordinate the right licensed immigration, corporate and tax specialists.</p></div>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className="site-shell">
          <div className={styles.sectionHeading}><div><p className="eyebrow light">Four starting points</p><h2>Which pathway matches the plan?</h2></div><p>This is an initial orientation, not an eligibility decision. Every route remains subject to the current official criteria and approval.</p></div>
          <div className={styles.cardGrid}>{pathways.map((pathway, index) => <article className={styles.card} key={pathway.title}><span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{pathway.title}</h3><p>{pathway.text}</p><ul>{pathway.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div>
        </div>
      </section>

      <section className={styles.comparison}>
        <div className="site-shell">
          <div className={styles.sectionHeading}><div><p className="eyebrow">Before choosing</p><h2>Six questions to resolve.</h2></div><p>The best route is the one that works for the applicant&apos;s actual life, work and family—not simply the most attractive headline.</p></div>
          <div className={styles.comparisonGrid}>{considerations.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={`site-shell ${styles.processGrid}`}>
          <div className={styles.processIntro}><p className="eyebrow">Coordinated planning</p><h2>From enquiry to the right adviser.</h2><p>We organise the first stage so that legal, immigration, corporate and property conversations support one coherent plan.</p></div>
          <ol className={styles.steps}><li><span>01</span><div><strong>Profile and objectives</strong><p>Who is moving, why, for how long and with what work or business activity?</p></div></li><li><span>02</span><div><strong>Pathway comparison</strong><p>Identify realistic options and the information required to test eligibility.</p></div></li><li><span>03</span><div><strong>Specialist introduction</strong><p>Coordinate current advice with the relevant Malaysian professional.</p></div></li><li><span>04</span><div><strong>Relocation planning</strong><p>Connect immigration with housing, property, banking and practical arrival support.</p></div></li></ol>
        </div>
      </section>

      <section className={styles.sources}>
        <div className="site-shell"><p className="eyebrow">Official starting points</p><h2>Verify the current rules.</h2><div className={styles.sourceGrid}><a href="https://www.mm2h.gov.my/" target="_blank" rel="noreferrer">Malaysia My Second Home — Ministry of Tourism <span>↗</span></a><a href="https://www.mdec.my/md-programmes/digital-nomad-pass" target="_blank" rel="noreferrer">DE Rantau — Malaysia Digital <span>↗</span></a><a href="https://esd.imi.gov.my/portal/" target="_blank" rel="noreferrer">Employment Pass — Immigration Department <span>↗</span></a><Link href="/services/labuan-company-residency">Labuan company and residency pathway <span>→</span></Link></div></div>
      </section>

      <TopicPathway
        title="Connect residence with the rest of the move."
        intro="The correct visa or pass still needs to align with tax residence, housing, property eligibility and any company or employment activity."
        links={[
          { label: "Tax residence", title: "Malaysia tax residency", description: "Separate immigration permission from the statutory tax-residence tests.", href: "/guides/malaysia-tax-residency-for-foreigners" },
          { label: "Relocation", title: "Moving from Spain to Malaysia", description: "Plan departure and arrival across one calendar and evidence trail.", href: "/guides/moving-from-spain-to-malaysia" },
          { label: "Property", title: "Buying in Malaysia as a foreigner", description: "Check state rules, title, thresholds and due diligence before committing.", href: "/guides/buying-property-in-malaysia-as-a-foreigner" },
          { label: "Business route", title: "Labuan company and residency", description: "Explore the coordinated company and work-permit pathway for suitable clients.", href: "/services/labuan-company-residency" },
        ]}
      />

      <section className={styles.faq}><div className={`site-shell ${styles.faqGrid}`}><div><p className="eyebrow light">Malaysia residency FAQ</p><h2>Questions clients ask first.</h2></div><div>{faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>

      <section className={styles.cta}><div className={`site-shell ${styles.ctaGrid}`}><div><p className="eyebrow">Private assessment</p><h2>Considering a move to Malaysia?</h2></div><div className={styles.ctaCopy}><p>Tell us about your nationality, family, intended activity, present residence and timing. We will help organise the appropriate first conversation.</p><Link className="button button-dark" href="/asia-gateway/enquire">Discuss Malaysia residency <span>→</span></Link></div></div></section>
      <section className={styles.disclaimer}><div className="site-shell"><p>General information only. Immigration, tax, employment and company rules can change and depend on individual circumstances. PF EuroAsia coordinates introductions; formal advice and applications are provided by the appropriately licensed professionals.</p></div></section>
      <Footer />
    </main>
  );
}
