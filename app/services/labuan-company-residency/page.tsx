import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./Labuan.module.css";

export const metadata: Metadata = {
  title: "Labuan Company & Malaysia Residency | PF EuroAsia",
  description:
    "A coordinated route to Labuan company formation, Malaysian work permits and dependent residency, delivered with regulated local specialists.",
};

const formationItems = [
  ["Name search & reservation", "US$202.50"],
  ["Incorporation & LFSA registration", "US$2,430"],
  ["Statutory documents & company kit", "US$472.50"],
  ["Registered office & resident secretary - year one", "US$2,025"],
  ["Regulatory filing & compliance setup", "US$945"],
];

const residencyItems = [
  ["Employment Pass processing - principal", "US$3,577.50"],
  ["Immigration filing & approval fees", "US$2,025"],
  ["Dependent / associate residency processing", "US$1,822.50"],
];

export default function LabuanCompanyResidencyPage() {
  return (
    <main className={styles.page}>
      <Header enquireHref="/asia-gateway/enquire" enquireLabel="Discuss Labuan" />

      <section className={styles.hero}>
        <Image
          src="/images/kl%20BACK%20GORUND.avif"
          alt="Kuala Lumpur skyline at dusk"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <div className={`site-shell ${styles.heroCopy}`}>
          <p className="eyebrow light">Malaysia · Labuan IBFC</p>
          <h1>A company structure.<br />A residency pathway.</h1>
          <p>
            One coordinated route for international entrepreneurs and families - from
            Labuan incorporation and compliance to work permit and dependent residency applications.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button-gold" href="/services/labuan-company-residency/adviser">
              Ask the Malaysia & Labuan adviser <span>→</span>
            </Link>
            <a className="text-link light-link" href="#package">View the package <span>↓</span></a>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={`site-shell ${styles.introGrid}`}>
          <div>
            <p className="eyebrow">Why Labuan</p>
            <h2>Internationally minded.<br />Practically coordinated.</h2>
          </div>
          <div className={styles.leadCopy}>
            <p>
              Labuan is Malaysia&apos;s international business and financial centre. For the right
              client and activity, a Labuan company can combine an efficient corporate framework
              with access to a Malaysian work permit pathway.
            </p>
            <p>
              Property Facilitators EuroAsia coordinates the process with an established Labuan
              corporate and advisory specialist, providing one clear point of contact from initial
              suitability review through documentation and filing.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.highlights}>
        <div className="site-shell">
          <div className={styles.highlightGrid}>
            <article><span>01</span><strong>Up to four directors</strong><p>A company may support work permit applications for eligible director or senior professional roles, subject to approval and the company&apos;s genuine operating needs.</p></article>
            <article><span>02</span><strong>Family included</strong><p>Dependent applications can be coordinated for qualifying immediate family members alongside the principal applicant.</p></article>
            <article><span>03</span><strong>Renewable pathway</strong><p>Work permits are commonly structured on a renewable term, with every application and renewal remaining subject to LFSA and Immigration approval.</p></article>
            <article><span>04</span><strong>Remote-first setup</strong><p>Company formation and initial banking introductions can begin remotely. Certain banks may later require an in-person signature or verification.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.taxSection}>
        <div className={`site-shell ${styles.taxGrid}`}>
          <div className={styles.taxImageWrap}>
            <Image src="/images/Emerald%20bay%20pkl.jpg" alt="Coastal landscape in Malaysia" fill sizes="(max-width: 800px) 100vw, 48vw" className={styles.taxImage} />
          </div>
          <div className={styles.taxCopy}>
            <p className="eyebrow light">Tax framework</p>
            <h2>Potentially efficient.<br />Always fact-specific.</h2>
            <div className={styles.taxCards}>
              <article><strong>3%</strong><p>Labuan trading activity may be taxed at 3% of audited net profits where the applicable substance and regulatory requirements are met.</p></article>
              <article><strong>0%</strong><p>Qualifying Labuan non-trading investment-holding activity may not be subject to Labuan business activity tax when the relevant conditions are satisfied.</p></article>
            </div>
            <p className={styles.caution}>
              Classification depends on the company&apos;s actual activities, income and substance.
              Failure to satisfy the applicable requirements can result in Malaysian tax at 24%.
              Independent tax advice is essential before proceeding.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.requirements}>
        <div className={`site-shell ${styles.requirementGrid}`}>
          <div><p className="eyebrow">Core requirements</p><h2>Designed for genuine business activity.</h2></div>
          <div className={styles.requirementList}>
            <article><span>RM10,000+</span><div><h3>Minimum monthly income</h3><p>Current LFSA guidance sets a minimum monthly income of RM10,000, or the foreign-currency equivalent, for a work permit applicant.</p></div></article>
            <article><span>KYC</span><div><h3>Professional and financial standing</h3><p>Applicants should expect passport, CV, reference, role, experience and fit-and-proper checks, with further documents requested where necessary.</p></div></article>
            <article><span>Substance</span><div><h3>Activity-led compliance</h3><p>Employee, annual operating expenditure, office, management and record-keeping requirements vary with the company&apos;s activity.</p></div></article>
            <article><span>Renewal</span><div><h3>Ongoing evidence</h3><p>Renewals require continuing compliance and evidence such as recent salary slips, bank statements and annual employment-income documentation.</p></div></article>
          </div>
        </div>
      </section>

      <section className={styles.package} id="package">
        <div className="site-shell">
          <div className={styles.packageHeading}>
            <div><p className="eyebrow light">Indicative professional package</p><h2>Formation through residency.</h2></div>
            <div><strong>US$13,500</strong><span>Total for the stated scope</span></div>
          </div>
          <div className={styles.priceColumns}>
            <article>
              <header><div><span>Phase 1</span><h3>Company formation</h3></div><strong>US$6,075</strong></header>
              <ul>{formationItems.map(([label, price]) => <li key={label}><span>{label}</span><b>{price}</b></li>)}</ul>
            </article>
            <article>
              <header><div><span>Phase 2</span><h3>Visa & residency</h3></div><strong>US$7,425</strong></header>
              <ul>{residencyItems.map(([label, price]) => <li key={label}><span>{label}</span><b>{price}</b></li>)}</ul>
            </article>
          </div>
          <div className={styles.packageNotes}>
            <p><strong>Expected timing:</strong> approximately 3-4 weeks from receipt of complete documentation through company formation and LFSA approval; immigration timing can vary.</p>
            <p><strong>Ongoing administration:</strong> budget from approximately US$4,050 per year, subject to the company&apos;s activity, compliance, accounting, audit, licence and substance requirements.</p>
            <p><strong>Scope:</strong> pricing reflects one principal and one dependent / associate as described. Additional applicants, bank requirements, tax advice and out-of-scope government or professional fees are quoted separately.</p>
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className="site-shell">
          <div className={styles.processHeading}><p className="eyebrow">The process</p><h2>Four clear stages.</h2></div>
          <ol>
            <li><span>Week 1</span><div><h3>Suitability, KYC & name approval</h3><p>We establish the proposed activity, applicant profile and family requirements before documents and the preferred company name are submitted.</p></div></li>
            <li><span>Week 2</span><div><h3>Incorporation documents</h3><p>Corporate and supporting documentation is prepared for the Labuan company application.</p></div></li>
            <li><span>Week 3</span><div><h3>LFSA review</h3><p>Regulatory queries are handled while the work permit and residency documents are prepared in parallel.</p></div></li>
            <li><span>Week 4</span><div><h3>Approval & immigration filing</h3><p>Following incorporation and licence approval, the employment and dependent applications proceed to the relevant authorities.</p></div></li>
          </ol>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`site-shell ${styles.ctaGrid}`}>
          <div><p className="eyebrow light">Private assessment</p><h2>Is Labuan right for you?</h2></div>
          <div><p>Tell us about your intended business, current tax residence, family needs and timing. We will coordinate an initial suitability review before any commitment is made.</p><Link className="button button-gold" href="/asia-gateway/enquire">Discuss your structure <span>→</span></Link></div>
        </div>
      </section>

      <section className={styles.disclaimer}><div className="site-shell"><p>This page is general information, not legal, tax or immigration advice. Tax treatment, work permits, dependants, banking and timelines depend on current law, regulatory approval and individual circumstances. No outcome is guaranteed. Final scope and fees are confirmed in writing after assessment.</p></div></section>
      <Footer />
    </main>
  );
}
