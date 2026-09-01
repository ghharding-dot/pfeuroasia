import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { AuthorityReview } from "../../components/AuthorityReview";
import styles from "../../guides/MalaysiaSeoGuide.module.css";

const structures = [
  { title: "Malaysian local company", text: "A locally incorporated company may suit businesses operating in mainland Malaysia. Foreign ownership, licences, directors, capital and sector conditions depend on the activity.", points: ["Registered through SSM", "Local operating presence", "Sector approvals may apply"] },
  { title: "Registered foreign company", text: "An overseas company may carry on business through a registered foreign company, with a Malaysian agent and the documentation required under the Companies Act.", points: ["Existing overseas entity", "Local registration and agent", "Licensing remains separate"] },
  { title: "Labuan company", text: "A distinct international business structure for suitable activities. Tax treatment, employment, operating expenditure and substance depend on what the company genuinely does.", points: ["Labuan-specific framework", "Resident secretary and office", "Business-led work-permit conversation"] },
  { title: "Regional comparison", text: "Singapore or Hong Kong may be more appropriate where the commercial activity, clients, banking or management are centred elsewhere in Asia.", points: ["Commercial purpose first", "Residence assessed separately", "Local professional advice"] },
];

const questions = [
  ["01", "Where will business happen?", "Customers, contracts, staff and management should support the chosen jurisdiction."],
  ["02", "What activity is proposed?", "Trading, consulting, investment holding and regulated services can have different requirements."],
  ["03", "Who will own and manage it?", "Shareholders, directors, beneficial owners and authorised signatories must be established."],
  ["04", "Is a work pass required?", "Company registration does not automatically grant the owner permission to live or work in Malaysia."],
  ["05", "What substance is needed?", "Office, employees, expenditure, records and management requirements depend on the structure and activity."],
  ["06", "What is the complete cost?", "Formation, licences, accounting, audit, tax, company secretary, immigration and renewals should be budgeted together."],
];

const faqs = [
  { question: "Can a foreigner set up a company in Malaysia?", answer: "Foreign participation is possible, but the appropriate structure, ownership position, licences, directors and capital depend on the proposed activity and applicable rules. A local corporate professional should confirm the route." },
  { question: "Is a Labuan company the same as a Malaysian Sdn Bhd?", answer: "No. They are formed under different frameworks and serve different purposes. The correct choice depends on where the business operates, its income, management, substance and immigration needs." },
  { question: "Does company formation include Malaysian residency?", answer: "No. Company registration and immigration permission are separate. An eligible role within a qualifying company may support a work-pass application, but approval is never automatic." },
  { question: "Does every Labuan company pay 3% tax?", answer: "No. The outcome depends on the actual activity and whether the relevant substance, audit and regulatory conditions are satisfied. Formal Malaysian tax advice is required." },
];

export default function MalaysiaCompanyFormationPage() {
  return (
    <main className={styles.page}>
      <Header transparent enquireHref="/asia-gateway/enquire" enquireLabel="Company enquiry" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }) }} />

      <section className={styles.hero}>
        <Image className={styles.heroImage} src="/images/asia-network.webp" alt="Kuala Lumpur business district representing Malaysia company formation" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={`site-shell ${styles.heroInner}`}><p className="eyebrow light">Malaysia · Business setup</p><h1>Malaysia company formation<em>for international entrepreneurs.</em></h1><p className={styles.heroCopy}>Compare mainland Malaysian, registered foreign-company and Labuan structures before appointing the local professionals to form and maintain the business.</p><div className={styles.heroActions}><Link className="button button-gold" href="/asia-gateway/enquire">Discuss your proposed business <span>→</span></Link><Link className="text-link light-link" href="/services/labuan-company-residency">Explore the Labuan package <span>→</span></Link></div></div>
      </section>

      <AuthorityReview focus="malaysia" />

      <section className={styles.intro}><div className={`site-shell ${styles.introGrid}`}><div><p className="eyebrow">Structure follows activity</p><h2>Start with what the company will actually do.</h2></div><div className={styles.lead}><p>The best jurisdiction is not simply the one with the fastest registration or lowest headline tax. It should fit the customers, contracts, management, banking, employees and owners.</p><p>PF EuroAsia coordinates the initial review and introduces established Malaysian corporate, accounting, immigration and tax specialists for formal advice and implementation.</p></div></div></section>

      <section className={styles.cardsSection}><div className="site-shell"><div className={styles.sectionHeading}><div><p className="eyebrow light">Company setup options</p><h2>Choose the right starting structure.</h2></div><p>A local company, foreign-company registration and Labuan company are not interchangeable. Each has its own purpose, obligations and cost profile.</p></div><div className={styles.cardGrid}>{structures.map((structure, index) => <article className={styles.card} key={structure.title}><span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{structure.title}</h3><p>{structure.text}</p><ul>{structure.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div></div></section>

      <section className={styles.comparison}><div className="site-shell"><div className={styles.sectionHeading}><div><p className="eyebrow">Before incorporation</p><h2>Six decisions to make first.</h2></div><p>Resolving these points early helps the appointed professionals recommend a defensible structure and realistic budget.</p></div><div className={styles.comparisonGrid}>{questions.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className={styles.process}><div className={`site-shell ${styles.processGrid}`}><div className={styles.processIntro}><p className="eyebrow">A coordinated process</p><h2>From commercial idea to compliant company.</h2><p>The exact procedure depends on structure and activity, but a properly organised setup normally follows these stages.</p></div><ol className={styles.steps}><li><span>01</span><div><strong>Suitability and scope</strong><p>Confirm the activity, owners, customers, operating location, staffing and residence objectives.</p></div></li><li><span>02</span><div><strong>Structure and name</strong><p>The local adviser recommends the appropriate entity and completes name availability checks.</p></div></li><li><span>03</span><div><strong>KYC and incorporation</strong><p>Prepare ownership, director, beneficial-owner and source-of-funds information for filing.</p></div></li><li><span>04</span><div><strong>Post-formation compliance</strong><p>Coordinate banking, licences, accounting, tax, employment, substance and annual obligations.</p></div></li></ol></div></section>

      <section className={styles.sources}><div className="site-shell"><p className="eyebrow">Official starting points</p><h2>Company formation sources.</h2><div className={styles.sourceGrid}><a href="https://www.mida.gov.my/invest-in-malaysia/setting-up-business/" target="_blank" rel="noreferrer">MIDA — Setting up business in Malaysia <span>↗</span></a><a href="https://www.ssm.com.my/Pages/Legal_Framework/GUIDELINES/7-GUIDELINES-FOR-REGISTRATION-OF-FOREIGN-COMPANIES.pdf" target="_blank" rel="noreferrer">SSM — Foreign company registration <span>↗</span></a><a href="https://www.labuanibfc.com/clients/asset_52E835CC-1342-4701-B6FA-E2CD03AD74B4/contentms/img/publications/brochures/NEW-2023_Labuan-Co.pdf" target="_blank" rel="noreferrer">Labuan IBFC — Guide to Labuan companies <span>↗</span></a><Link href="/asia-gateway/company-residency">Compare Malaysia, Singapore and Hong Kong <span>→</span></Link></div></div></section>

      <section className={styles.faq}><div className={`site-shell ${styles.faqGrid}`}><div><p className="eyebrow light">Malaysia company FAQ</p><h2>Questions to answer before setup.</h2></div><div>{faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>

      <section className={styles.cta}><div className={`site-shell ${styles.ctaGrid}`}><div><p className="eyebrow">Private business assessment</p><h2>Planning a Malaysian company?</h2></div><div className={styles.ctaCopy}><p>Tell us what the business will do, where its clients are based, who will own it and whether residency is also required. We will coordinate the appropriate local introduction.</p><Link className="button button-dark" href="/asia-gateway/enquire">Discuss company formation <span>→</span></Link></div></div></section>
      <section className={styles.disclaimer}><div className="site-shell"><p>General information only. Company, licensing, tax, banking, immigration and substance requirements depend on current rules and individual facts. PF EuroAsia coordinates introductions; formal advice and regulated services are provided by the appointed professionals.</p></div></section>
      <Footer />
    </main>
  );
}
