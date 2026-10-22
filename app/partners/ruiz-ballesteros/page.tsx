import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./RuizBallesterosProfile.module.css";

export const metadata: Metadata = {
  title: "Ruiz Ballesteros | Lawyers & Tax Advisors | PF EuroAsia",
  description:
    "Meet Ruiz Ballesteros, a Marbella and Málaga firm providing legal, tax, accounting and corporate advice for Spanish and international clients.",
  alternates: {
    canonical: "https://www.pfeuroasia.com/partners/ruiz-ballesteros",
  },
};

const services = [
  {
    number: "01",
    title: "Financial & taxation",
    text: "Tax planning and advice for individuals, companies, residents and non-residents, including international taxation matters.",
  },
  {
    number: "02",
    title: "Accounting & declarations",
    text: "Accounting oversight and Spanish tax-return support for companies, professionals and private clients.",
  },
  {
    number: "03",
    title: "Corporate & commercial",
    text: "Commercial contracts, corporate operations, mergers and acquisitions, governance and business advisory support.",
  },
  {
    number: "04",
    title: "Property & urban law",
    text: "Legal guidance for property transactions, development matters and the urban-planning framework in Spain.",
  },
  {
    number: "05",
    title: "Succession & inheritance",
    text: "Advice concerning succession planning, inheritance procedures and the related Spanish tax position.",
  },
  {
    number: "06",
    title: "Disputes & compliance",
    text: "Civil, procedural, administrative and contentious-administrative work, together with corporate compliance support.",
  },
];

export default function RuizBallesterosProfilePage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/partner-ruiz-ballesteros-office.jpg"
          alt="Ruiz Ballesteros office"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={`site-shell ${styles.heroInner}`}>
          <p className="eyebrow light">Legal &amp; tax advisory collaboration</p>
          <div className={styles.logoPanel}>
            <Image
              src="/images/partner-ruiz-ballesteros-logo.png"
              alt="Ruiz Ballesteros Lawyers and Tax Advisors"
              width={420}
              height={95}
              priority
            />
          </div>
          <h1>Spanish expertise for international decisions.</h1>
          <p className={styles.heroLead}>
            Lawyers and economists advising private clients, professionals and businesses
            from offices in Marbella and Málaga.
          </p>
          <div className={styles.heroActions}>
            <a className="button button-gold" href="mailto:contact@jrb.es?subject=Tax%20advice%20enquiry%20via%20PF%20EuroAsia">
              Request tax advice <span>→</span>
            </a>
            <a className={styles.secondaryButton} href="https://www.ruizballesteros.es/en/" target="_blank" rel="noopener noreferrer">
              Visit the firm <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className={`site-shell ${styles.introduction}`}>
        <div className={styles.story}>
          <p className="eyebrow">About Ruiz Ballesteros</p>
          <h2>Legal, tax and commercial advice under one roof.</h2>
          <p>
            Ruiz Ballesteros is a firm of lawyers and economists established in 2006.
            Its multidisciplinary team works across Spanish taxation, accounting,
            corporate and commercial law, property matters and private-client advice.
          </p>
          <p>
            The firm supports both Spanish and international clients, combining local
            knowledge in Marbella and Málaga with experience in international taxation
            and cross-border business requirements.
          </p>
          <p>
            Founder and director Jesús R. Ballesteros is both a lawyer and economist,
            with particular expertise in the Spanish tax system, international taxation
            and corporate-commercial law.
          </p>
        </div>

        <aside className={styles.contactCard}>
          <p className="eyebrow">Direct contact</p>
          <h3>Tax advice</h3>
          <a className={styles.emailLink} href="mailto:contact@jrb.es">contact@jrb.es</a>
          <p>Marbella · Málaga · Spain</p>
          <a className={styles.cardButton} href="mailto:contact@jrb.es?subject=Tax%20advice%20enquiry%20via%20PF%20EuroAsia">
            Email the advisory team <span>→</span>
          </a>
        </aside>
      </section>

      <section className={styles.servicesSection}>
        <div className="site-shell">
          <div className={styles.servicesHeading}>
            <div>
              <p className="eyebrow">Areas of support</p>
              <h2>Coordinated advice for property, people and business.</h2>
            </div>
            <p>
              A broad professional team helps clients consider the legal, fiscal,
              accounting and commercial sides of a decision together.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <article className={styles.serviceCard} key={service.number}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
          <a
            className={styles.teamLink}
            href="https://www.ruizballesteros.es/en/our-team/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meet the Ruiz Ballesteros team <span>↗</span>
          </a>
        </div>
      </section>

      <section className={styles.closingSection}>
        <div className={`site-shell ${styles.closingInner}`}>
          <div>
            <p className="eyebrow light">Professional introduction</p>
            <h2>Start with the right advice.</h2>
          </div>
          <div>
            <p>
              For Spanish tax, accounting, corporate or property-law guidance, contact
              the Ruiz Ballesteros team directly and mention PF EuroAsia.
            </p>
            <a className="button button-gold" href="mailto:contact@jrb.es?subject=Professional%20enquiry%20via%20PF%20EuroAsia">
              Contact Ruiz Ballesteros <span>→</span>
            </a>
            <Link className={styles.backLink} href="/#collaboration-network">
              Return to the collaboration network
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
