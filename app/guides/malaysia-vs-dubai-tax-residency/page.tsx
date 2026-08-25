import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./page.module.css";

const comparisonRows = [
  {
    topic: "Personal income tax",
    malaysia: "Malaysia is not a zero-personal-income-tax jurisdiction. Resident individual rates are progressive and the treatment of income depends on residence, source, remittance and the rules in force.",
    dubai: "The UAE does not levy personal income tax on individuals. That does not automatically end tax residence or liabilities in the country a person is leaving.",
  },
  {
    topic: "Tax residence",
    malaysia: "Section 7 includes the well-known 182-day route plus connected-period, prior-year and consecutive-year tests. A visa alone is not the answer.",
    dubai: "UAE tax residence is also a separate legal test. A residence visa, Emirates ID or company connection should not be treated as automatic proof for every purpose.",
  },
  {
    topic: "Long-stay pathways",
    malaysia: "Potential routes include MM2H, DE Rantau, employment passes and, for suitable business owners, a Labuan company and work-permit pathway.",
    dubai: "Routes can include employment, business or investment-linked residence, Green Residence and Golden Residence, subject to the current category requirements.",
  },
  {
    topic: "Company taxation",
    malaysia: "Malaysia has a mainstream corporate regime. Qualifying Labuan activities can fall under a separate framework, but activity, substance, audit and compliance conditions matter.",
    dubai: "UAE companies are within the federal corporate-tax framework. The general rates include 0% on the first AED 375,000 of taxable income and 9% above it; qualifying free-zone income has separate conditions.",
  },
  {
    topic: "Business geography",
    malaysia: "A practical base for Southeast Asia, with Kuala Lumpur as the principal international city and Labuan serving a distinct international business role.",
    dubai: "A highly connected Gulf business centre positioned between Europe, Asia and Africa, with an established international professional-services ecosystem.",
  },
  {
    topic: "Lifestyle",
    malaysia: "Tropical, green and culturally varied, with city, island and nature options. Kuala Lumpur can suit clients wanting an Asian base with more space and a different pace.",
    dubai: "Highly developed, service-led and internationally familiar, with strong luxury, hospitality and aviation infrastructure in an arid Gulf climate.",
  },
  {
    topic: "Europe and Asia access",
    malaysia: "Longer journeys to Europe, but strong access across Southeast and East Asia. It can suit people whose future business and travel are increasingly Asia-focused.",
    dubai: "Generally more convenient for frequent travel between Europe and the Gulf, while also providing extensive onward connections to Asia and Africa.",
  },
  {
    topic: "Cost planning",
    malaysia: "Housing, household support, dining, healthcare and schooling should be budgeted around the chosen area and standard. Malaysia may offer greater value, but not every item is cheaper.",
    dubai: "Housing, schooling, insurance, licensing and lifestyle costs can be substantial. The absence of personal income tax should be assessed alongside the complete annual budget.",
  },
];

const decisionQuestions = [
  ["01", "Where will you genuinely live?", "A defensible residence plan begins with real presence, a home, family arrangements and a credible day-to-day life."],
  ["02", "Where does your income arise?", "Employment, business profits, investment income, property and pensions can each be treated differently."],
  ["03", "Which country are you leaving?", "Spain, the UK, Denmark, Sweden and other countries apply their own departure, residence and treaty rules."],
  ["04", "Where should the business operate?", "Choose a company jurisdiction for genuine commercial reasons, then meet its management, substance and reporting obligations."],
  ["05", "What does the family need?", "Healthcare, schools, language, climate, housing and travel patterns may matter more than a headline tax rate."],
  ["06", "What is the full annual cost?", "Compare tax, housing, insurance, education, travel, company administration and professional compliance together."],
];

const sourceLinks = [
  { label: "Malaysia residence status — HASiL", href: "https://www.hasil.gov.my/individu/taraf-mastautin/" },
  { label: "Malaysia individual tax rates — HASiL", href: "https://www.hasil.gov.my/en/individu/kadar-cukai/" },
  { label: "UAE taxation — Official UAE portal", href: "https://u.ae/en/information-and-services/finance-and-investment/taxation" },
  { label: "UAE corporate tax — Ministry of Finance", href: "https://mof.gov.ae/en/public-finance/tax/corporate-tax-in-the-uae/" },
  { label: "UAE tax-residence decision — Federal Tax Authority", href: "https://tax.gov.ae/en/content/cabinet.decision.no.85.of.2022.on.determination.of.tax.residency.home.aspx" },
  { label: "UAE Golden Residence — Official UAE portal", href: "https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas/golden-visa" },
];

const faqs = [
  {
    question: "Is Malaysia a tax-free alternative to Dubai?",
    answer: "No. The UAE does not levy personal income tax on individuals, while Malaysia has an individual income-tax system. Malaysia may still be attractive for lifestyle, Asian access, business or a suitable Labuan structure, but it should not be promoted as simply tax-free.",
  },
  {
    question: "Which is better for tax residency: Malaysia or Dubai?",
    answer: "Neither is universally better. The answer depends on where the person will genuinely live, their income and companies, the country they are leaving, family needs and whether they can meet the relevant immigration and tax-residence rules.",
  },
  {
    question: "Does a Dubai residence visa automatically make me a UAE tax resident?",
    answer: "A residence visa and tax residence are related but separate matters. UAE domestic tests, supporting evidence, tax-residence certificate requirements and any applicable treaty should be reviewed for the individual case.",
  },
  {
    question: "Does a Malaysian visa automatically make me tax resident?",
    answer: "No. Malaysian immigration permission and personal tax residence are separate. Section 7 residence tests and the person’s travel history must be considered.",
  },
  {
    question: "Can a Labuan company replace a Dubai free-zone company?",
    answer: "Sometimes it may be worth comparing them, but they are not interchangeable products. Activity, customer location, banking, management, substance, licensing, tax and where the owners actually live all affect suitability.",
  },
  {
    question: "Can PF EuroAsia tell me which country to choose?",
    answer: "PF EuroAsia can help structure an initial comparison and coordinate introductions. Final legal, tax, immigration and company advice must come from appropriately qualified professionals who have reviewed the complete circumstances.",
  },
];

export default function MalaysiaVsDubaiPage() {
  return (
    <main className={styles.page}>
      <Header transparent enquireHref="/asia-gateway/enquire" enquireLabel="Compare options" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />

      <section className={styles.hero}>
        <div className={styles.heroImages} aria-hidden="true">
          <div className={`${styles.heroPanel} ${styles.malaysiaPanel}`}>
            <Image
              className={styles.heroImage}
              src="/images/kl%20BACK%20GORUND.avif"
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <span className={styles.cityLabel}>Kuala Lumpur · Malaysia</span>
          </div>
          <div className={`${styles.heroPanel} ${styles.dubaiPanel}`}>
            <Image
              className={styles.heroImage}
              src="/images/burj-khalifa-dubai.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <span className={styles.cityLabel}>Dubai · UAE</span>
          </div>
        </div>
        <div className={styles.heroShade} />
        <div className={`site-shell ${styles.heroInner}`}>
          <p className="eyebrow light">International relocation comparison · 2026</p>
          <h1>Malaysia vs Dubai:<br /><em>which base fits your life?</em></h1>
          <p>A practical comparison of tax residence, visas, business, lifestyle, costs and connectivity for Europeans and internationally mobile families.</p>
          <div className={styles.heroActions}>
            <Link className="button button-gold" href="/asia-gateway/enquire">Request a private comparison <span>→</span></Link>
            <Link className="text-link light-link" href="/services/labuan-company-residency/adviser">Ask the Malaysia adviser <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.intro} aria-labelledby="comparison-intro">
        <div className={`site-shell ${styles.introGrid}`}>
          <p className="eyebrow">Not the same proposition</p>
          <div>
            <h2 id="comparison-intro">Malaysia is an alternative to consider—not a Southeast Asian version of Dubai.</h2>
            <p>Dubai’s strongest headline is the UAE’s absence of personal income tax. Malaysia’s case is different: Southeast Asian access, a tropical lifestyle, Kuala Lumpur property and business options, plus specialist pathways including Labuan for appropriate clients.</p>
            <p>The right decision is therefore not simply “which country has the lowest rate?” It is which country supports a genuine, compliant and sustainable life.</p>
          </div>
        </div>
      </section>

      <section className={styles.snapshot} aria-labelledby="snapshot-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">Side-by-side snapshot</p><h2 id="snapshot-heading">Malaysia and Dubai compared.</h2></div>
            <p>General information only. Rules, programmes and personal outcomes can change; always verify the current position before acting.</p>
          </div>
          <div className={styles.tableWrap}>
            <table>
              <thead><tr><th>Decision area</th><th>Malaysia</th><th>Dubai / UAE</th></tr></thead>
              <tbody>{comparisonRows.map((row) => <tr key={row.topic}><th scope="row">{row.topic}</th><td>{row.malaysia}</td><td>{row.dubai}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.taxFocus} aria-labelledby="tax-focus-heading">
        <div className={`site-shell ${styles.taxGrid}`}>
          <div>
            <p className="eyebrow">The tax headline</p>
            <h2 id="tax-focus-heading">0% personal income tax is not the same as 0% tax everywhere.</h2>
          </div>
          <div>
            <p>The UAE does not levy personal income tax on individuals, but corporate tax, VAT, business rules and liabilities in other countries still need consideration. Malaysia taxes individuals under its own residence and income rules; qualifying Labuan companies operate under a separate corporate framework rather than creating an automatic personal result.</p>
            <p>For anyone leaving Europe, the decisive work often begins in the country of departure: ending residence correctly, reviewing homes and family ties, understanding exit rules and applying the relevant treaty.</p>
            <div className={styles.taxLinks}>
              <Link className="text-link" href="/guides/malaysia-tax-residency-for-foreigners">Read the Malaysia tax-residency guide <span>→</span></Link>
              <Link className="text-link" href="/services/labuan-company-residency">Explore the Labuan company pathway <span>→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.fit} aria-labelledby="fit-heading">
        <div className="site-shell">
          <div className={styles.fitHeading}><p className="eyebrow">Which profile sounds closer?</p><h2 id="fit-heading">Start with the life you are building.</h2></div>
          <div className={styles.fitGrid}>
            <article>
              <span>Malaysia may deserve closer consideration if…</span>
              <ul>
                <li>Your future clients, investments or travel are increasingly focused on Asia.</li>
                <li>You prefer a green, tropical environment and want Kuala Lumpur as a city base.</li>
                <li>You want to compare MM2H, DE Rantau, employment or a genuine business-led route.</li>
                <li>You are willing to assess Malaysian personal tax rather than assuming the country is tax-free.</li>
              </ul>
              <Link className="text-link" href="/markets/malaysia">Explore Malaysia <span>→</span></Link>
            </article>
            <article>
              <span>Dubai may remain the stronger fit if…</span>
              <ul>
                <li>No UAE personal income tax is central to the plan and the wider position supports it.</li>
                <li>You need frequent, convenient travel between Europe, the Gulf and Africa.</li>
                <li>Your business, professional network or family is already established in the UAE.</li>
                <li>You prefer Dubai’s highly developed, international and service-led environment.</li>
              </ul>
              <Link className="text-link" href="/markets/middle-east#uae">Explore the UAE market <span>→</span></Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.decisions} aria-labelledby="decision-heading">
        <div className={`site-shell ${styles.decisionGrid}`}>
          <div className={styles.decisionIntro}><p className="eyebrow light">Before choosing</p><h2 id="decision-heading">Six questions for a proper comparison.</h2></div>
          <div className={styles.decisionList}>{decisionQuestions.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className={styles.sources} aria-labelledby="sources-heading">
        <div className={`site-shell ${styles.sourcesGrid}`}>
          <div><p className="eyebrow">Check the current rules</p><h2 id="sources-heading">Official starting points.</h2></div>
          <div>{sourceLinks.map((source) => <a href={source.href} key={source.href} target="_blank" rel="noreferrer">{source.label}<span>↗</span></a>)}</div>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="comparison-faq-heading">
        <div className={`site-shell ${styles.faqGrid}`}>
          <div><p className="eyebrow light">Malaysia vs Dubai FAQ</p><h2 id="comparison-faq-heading">The questions behind the search.</h2></div>
          <div className={styles.faqList}>{faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`site-shell ${styles.ctaGrid}`}>
          <div><p className="eyebrow">Private relocation review</p><h2>Comparing Malaysia with Dubai?</h2></div>
          <div><p>Tell us where you live now, who is moving, how your income is earned, what business you operate and how much time you expect to spend in each country. We can help organise the right specialist conversations.</p><div className={styles.ctaActions}><Link className="button button-dark" href="/asia-gateway/enquire">Discuss your circumstances <span>→</span></Link><Link className="text-link" href="/services/labuan-company-residency/adviser">Ask a general question <span>→</span></Link></div></div>
        </div>
      </section>

      <section className={styles.disclaimer}><div className="site-shell"><p>Last reviewed: August 2026. This comparison provides general information only and is not legal, tax, immigration, accounting, financial or investment advice. Immigration permission, domestic tax residence, treaty residence and company taxation are separate questions. Obtain written advice from appropriately qualified professionals in every relevant jurisdiction before acting.</p><p className={styles.photoCredit}>Dubai skyline: Vamos John / Wikimedia Commons, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>. Image cropped and optimised for display.</p></div></section>
      <Footer />
    </main>
  );
}
