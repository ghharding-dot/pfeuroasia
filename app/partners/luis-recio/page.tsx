import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./LuisRecioProfile.module.css";

export const metadata: Metadata = {
  title: "Luis Recio | Martínez-Echevarría Lawyers | PF EuroAsia",
  description:
    "Meet Luis Recio, Business Manager at Martínez-Echevarría Lawyers, connecting PF EuroAsia clients with multidisciplinary legal expertise across Spain and international offices.",
  alternates: {
    canonical: "https://www.pfeuroasia.com/partners/luis-recio",
  },
};

const expertise = [
  "Fiscal and taxation",
  "M&A and corporate law",
  "Corporate, commercial contracting and corporate governance",
  "Financing and capital markets",
  "Energy",
  "Alternative stock markets and Real Estate Investment Trusts (REITs)",
  "Real estate and urban planning",
  "Litigation and international business",
  "Administrative and regulatory law",
  "Insolvency and restructuring",
  "Labour law and social security",
  "New technologies, industrial and intellectual property law",
  "Competition law",
  "Criminal law and corporate compliance",
  "Insurance",
  "Maritime law and transport",
  "Inheritance and family law",
  "Sports law",
];

const locations = [
  "Southern Spain",
  "Madrid",
  "Portugal",
  "Turkey",
  "Dubai · UAE",
];

export default function LuisRecioProfilePage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={`site-shell ${styles.heroInner}`}>
          <div className={styles.identity}>
            <p className="eyebrow light">International legal collaboration</p>
            <div className={styles.logoPanel} aria-label="Martínez-Echevarría Lawyers">
              <span>Martínez-Echevarría</span>
              <small>Lawyers</small>
            </div>
            <h1>Luis Recio</h1>
            <p className={styles.role}>Business Manager · Martínez-Echevarría Lawyers</p>
          </div>

          <figure className={styles.officeWrap}>
            <Image
              className={styles.officeImage}
              src="/images/partner-martinez-marbella-office.webp"
              alt="Martínez-Echevarría Lawyers office in Marbella"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 32vw"
            />
          </figure>

          <div className={styles.heroCopy}>
            <p>
              Luis Recio serves as the business-management contact connecting PF EuroAsia
              clients with the appropriate specialist teams at Martínez-Echevarría Lawyers.
            </p>
            <Link className="button button-gold" href="/go/martinezechevarria">
              Make a legal enquiry <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={`site-shell ${styles.introduction}`}>
        <article className={styles.story}>
          <p className="eyebrow">About the firm</p>
          <h2>Multidisciplinary advice with international reach.</h2>
          <p>
            Founded in 1983, Martínez-Echevarría provides advisory and litigation
            services for companies, families and individuals. Its international team
            brings together more than 325 professionals across a network of offices in
            Spain, Portugal, Turkey and Dubai in the United Arab Emirates.
          </p>
          <p>
            The firm has a particularly strong presence in southern Spain, including
            Marbella, Málaga, Estepona, Sotogrande and other key Costa del Sol locations,
            alongside its Madrid office and wider international network. This allows
            clients to access coordinated advice across borders and practice areas.
          </p>
          <p>
            Each department is led by highly specialised coordinating partners with
            extensive professional and academic experience. Through Luis, PF EuroAsia
            clients can be directed to the team best suited to their personal, property
            or business requirements.
          </p>
        </article>

        <aside className={styles.networkCard}>
          <p className="eyebrow">International network</p>
          <strong>325+</strong>
          <span>professionals</span>
          <ul>
            {locations.map((location) => <li key={location}>{location}</li>)}
          </ul>
          <Link href="/go/martinezechevarria">
            Discuss a legal requirement <span>→</span>
          </Link>
        </aside>
      </section>

      <section className={styles.expertiseSection}>
        <div className="site-shell">
          <div className={styles.expertiseHeading}>
            <div>
              <p className="eyebrow">Full-service legal expertise</p>
              <h2>Specialist support across every major practice area.</h2>
            </div>
            <p>
              A single point of contact provides access to the firm&apos;s complete legal,
              corporate, financial, property and private-client capability.
            </p>
          </div>
          <div className={styles.expertiseGrid}>
            {expertise.map((item, index) => (
              <div className={styles.expertiseItem} key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <a
            className={styles.sourceLink}
            href="https://www.martinezechevarria.com/en/expertise/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the firm&apos;s complete expertise <span>↗</span>
          </a>
        </div>
      </section>

      <section className={styles.closingSection}>
        <div className={`site-shell ${styles.closingInner}`}>
          <div>
            <p className="eyebrow light">Coordinated legal support</p>
            <h2>One introduction. The right specialist team.</h2>
          </div>
          <div className={styles.closingCopy}>
            <p>
              Tell PF EuroAsia what you need and we will connect your enquiry with
              Luis and the appropriate Martínez-Echevarría department.
            </p>
            <Link className="button button-gold" href="/go/martinezechevarria">
              Contact Luis through PF EuroAsia <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
