import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./page.module.css";

const distinctions = [
  {
    number: "01",
    title: "Immigration permission",
    text: "A visa, long-stay programme or employment pass determines whether and on what basis a person may stay in Malaysia. It does not, by itself, settle personal tax residence.",
  },
  {
    number: "02",
    title: "Personal tax residence",
    text: "Malaysia applies statutory residence tests that consider days present and, in some cases, connected periods and residence patterns across multiple years.",
  },
  {
    number: "03",
    title: "Company taxation",
    text: "A Malaysian or Labuan company's tax position is separate from its shareholder's or director's personal tax residence and depends on its real activity and compliance.",
  },
  {
    number: "04",
    title: "Leaving another country",
    text: "Becoming resident in Malaysia does not automatically end residence or reporting obligations elsewhere. Departure rules and treaty questions require country-specific advice.",
  },
];

const pathways = [
  {
    title: "Labuan company & work permit",
    href: "/services/labuan-company-residency",
    text: "A business-led route for suitable entrepreneurs and professionals. Company activity, substance, immigration approval and personal tax residence must each be assessed separately.",
  },
  {
    title: "Malaysia My Second Home",
    href: "https://motac.gov.my/wp-content/uploads/2026/01/Terms-And-Regulations-For-New-Participants-Under-The-Malaysia-My-Second-Home-MM2H-.pdf",
    text: "A long-stay programme administered under current Malaysian rules. Participation provides an immigration pathway, not an automatic personal tax conclusion.",
    external: true,
  },
  {
    title: "DE Rantau Nomad Pass",
    href: "https://mdec.my/md-programmes/digital-nomad-pass",
    text: "A programme for eligible digital professionals and remote workers. Eligibility and tax consequences should be checked independently for the applicant's circumstances.",
    external: true,
  },
  {
    title: "Employment & specialist passes",
    href: "https://esd.imi.gov.my/portal/",
    text: "Employer-sponsored and specialist routes are processed under Malaysia's immigration framework, with requirements depending on role, employer and pass category.",
    external: true,
  },
];

const process = [
  ["01", "Map the current position", "Record citizenships, current residence, family situation, travel pattern, income sources, companies, assets and intended timing."],
  ["02", "Choose a viable immigration route", "Compare the pathways that fit the applicant's genuine activity, financial position, family needs and expected time in Malaysia."],
  ["03", "Obtain cross-border tax advice", "Ask advisers in Malaysia and the current jurisdiction to assess residence, departure, treaty, income-source and company issues together."],
  ["04", "Plan the move and evidence", "Coordinate applications, travel days, housing, banking, business substance and the records required to support the position actually taken."],
];

const faqs = [
  {
    question: "Does a Malaysian visa automatically make me tax resident?",
    answer: "No. Immigration status and personal tax residence are different legal questions. A person must consider Malaysia's statutory residence tests and any continuing residence obligations in another country.",
  },
  {
    question: "How many days are required for Malaysian tax residence?",
    answer: "Presence in Malaysia for 182 days or more is one route under Section 7 of the Malaysian Income Tax Act. The legislation also contains connected-period and prior-year residence tests, so travel history should be reviewed rather than relying on a single headline number.",
  },
  {
    question: "Does owning a Labuan company create personal tax residence?",
    answer: "No. A Labuan company has its own corporate and regulatory position. Incorporation, a work permit and personal tax residence are related planning considerations but none should be treated as automatically proving the others.",
  },
  {
    question: "Is Malaysia a tax-free country for foreigners?",
    answer: "No general statement like that is reliable. Treatment depends on residence status, the nature and source of income, current Malaysian rules, any company structure and obligations in other jurisdictions. Individual professional advice is essential.",
  },
  {
    question: "Can PF EuroAsia provide tax advice?",
    answer: "PF EuroAsia provides general information and coordinates introductions to appropriately qualified Malaysian and international advisers. Formal legal and tax advice must come from the appointed professionals after reviewing the client's full circumstances.",
  },
];

export default function MalaysiaTaxResidencyGuidePage() {
  return (
    <main className={styles.page}>
      <Header transparent enquireHref="/asia-gateway/enquire" enquireLabel="Malaysia enquiry" />
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
        <Image
          className={styles.heroImage}
          src="/images/kl%20BACK%20GORUND.avif"
          alt="Kuala Lumpur skyline for people considering Malaysia tax residency"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={`site-shell ${styles.heroInner}`}>
          <p className="eyebrow light">Malaysia · International residents</p>
          <h1>Malaysia tax residency<br /><em>for foreigners.</em></h1>
          <p>
            A practical starting point for Europeans, international entrepreneurs
            and families comparing Malaysia with Dubai and other relocation options.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button-gold" href="/asia-gateway/enquire">Request a private assessment <span>→</span></Link>
            <Link className="text-link light-link" href="/services/labuan-company-residency">Explore the Labuan pathway <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.intro} aria-labelledby="tax-residency-intro">
        <div className={`site-shell ${styles.introGrid}`}>
          <p className="eyebrow">Start with the distinction</p>
          <div>
            <h2 id="tax-residency-intro">Residency, tax residence and company taxation are not the same thing.</h2>
            <p>
              Search results often combine these subjects into one promise. A sound
              plan separates them, then checks how they interact for the individual,
              the family and any business involved.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.distinctions} aria-labelledby="four-questions-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">Four separate questions</p><h2 id="four-questions-heading">What must be established.</h2></div>
            <p>Each question should be answered on its own facts before anyone describes a move as tax-efficient.</p>
          </div>
          <div className={styles.distinctionGrid}>
            {distinctions.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className={styles.residenceTest} aria-labelledby="residence-test-heading">
        <div className={`site-shell ${styles.residenceTestGrid}`}>
          <div>
            <p className="eyebrow">The Malaysian residence test</p>
            <h2 id="residence-test-heading">The 182-day rule is important—but it is not the whole rule.</h2>
          </div>
          <div>
            <p>
              Malaysia&apos;s Inland Revenue Board explains that an individual may be
              resident when present for 182 days or more. Section 7 also includes
              connected-period provisions, a 90-day test linked to prior years and
              a test based on residence across consecutive years.
            </p>
            <p>
              Temporary absences can be treated differently in specified
              circumstances. Anyone planning around travel days should therefore
              have their complete calendar and prior-year history reviewed.
            </p>
            <a className="text-link" href="https://www.hasil.gov.my/individu/taraf-mastautin/" target="_blank" rel="noreferrer">Read the official HASiL residence guidance <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className={styles.pathways} aria-labelledby="residency-pathways-heading">
        <div className="site-shell">
          <div className={styles.pathwayHeading}>
            <div><p className="eyebrow">Immigration pathways</p><h2 id="residency-pathways-heading">Different routes for different lives.</h2></div>
            <p>No single programme is appropriate for every retiree, remote worker, entrepreneur, employee or family.</p>
          </div>
          <div className={styles.pathwayGrid}>
            {pathways.map((item, index) => (
              <a href={item.href} key={item.title} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <small>{item.external ? "Official programme information" : "Explore the pathway"} <b aria-hidden="true">{item.external ? "↗" : "→"}</b></small>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="planning-process-heading">
        <div className={`site-shell ${styles.processGrid}`}>
          <div className={styles.processIntro}>
            <p className="eyebrow light">A coordinated assessment</p>
            <h2 id="planning-process-heading">Plan the move before choosing the structure.</h2>
            <p>Good planning starts with the person&apos;s real circumstances and objectives—not with a product.</p>
          </div>
          <div className={styles.processList}>
            {process.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className={styles.comparison} aria-labelledby="comparison-heading">
        <div className={`site-shell ${styles.comparisonGrid}`}>
          <div><p className="eyebrow">Comparing international options</p><h2 id="comparison-heading">Malaysia may be an alternative to Dubai—not a copy of it.</h2></div>
          <div><p>Tax is only one part of the decision. Families and entrepreneurs should also compare residency security, genuine business activity, living costs, healthcare, education, climate, travel connections and the amount of time they actually want to spend in the country.</p><p>Our Malaysia and Dubai guide compares these practical questions without presenting either destination as universally better.</p><Link className="text-link" href="/guides/malaysia-vs-dubai-tax-residency">Compare Malaysia with Dubai <span>→</span></Link></div>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="tax-residency-faq-heading">
        <div className={`site-shell ${styles.faqGrid}`}>
          <div><p className="eyebrow light">Malaysia tax residency FAQ</p><h2 id="tax-residency-faq-heading">Questions to resolve early.</h2></div>
          <div className={styles.faqList}>{faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`site-shell ${styles.ctaGrid}`}>
          <div><p className="eyebrow">Private suitability review</p><h2>Considering Malaysia as your next base?</h2></div>
          <div><p>Tell us your current country, intended activity, family needs and expected time in Malaysia. We can coordinate an initial conversation with the relevant local specialists.</p><Link className="button button-dark" href="/asia-gateway/enquire">Discuss your circumstances <span>→</span></Link></div>
        </div>
      </section>

      <section className={styles.disclaimer}><div className="site-shell"><p>This guide provides general information only. It is not legal, tax, immigration, accounting or financial advice. Rules and individual outcomes can change and depend on personal facts, travel history, income, company activity and other jurisdictions. Obtain written advice from appropriately qualified professionals before acting.</p></div></section>
      <Footer />
    </main>
  );
}
