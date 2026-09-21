import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./JuanAntonioAlvarezProfile.module.css";

export const metadata: Metadata = {
  title: "Juan Antonio Álvarez | Legal 10 Abogados | PF EuroAsia",
  description:
    "Meet Juan Antonio Álvarez of Legal 10 Abogados Marbella, providing personalised legal, tax, accounting and financial advice for residents, non-residents and businesses.",
  alternates: {
    canonical: "https://www.pfeuroasia.com/partners/juan-antonio-alvarez",
  },
};

const advisoryServices = [
  "Financial accounting",
  "Advice and fiscal management for companies",
  "Preparation and filing of tax declarations",
  "Treasury inspections",
];

export default function JuanAntonioAlvarezProfilePage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={`site-shell ${styles.heroInner}`}>
          <div className={styles.identity}>
            <p className="eyebrow light">Legal, tax &amp; financial collaboration</p>
            <div className={styles.logoPanel}>
              <Image
                className={styles.logo}
                src="/images/partner-legal10.jpg"
                alt="Legal 10 Abogados"
                width={170}
                height={170}
                priority
              />
            </div>
            <h1>Juan Antonio Álvarez</h1>
            <p className={styles.role}>Legal 10 Abogados Marbella</p>
          </div>

          <div className={styles.heroStatement} aria-hidden="true">
            <span>10</span>
            <small>Legal · Tax · Financial</small>
          </div>

          <div className={styles.heroCopy}>
            <p>
              PF EuroAsia works with Juan Antonio Álvarez and Legal 10 Abogados
              Marbella to provide international clients with personalised legal,
              tax and financial guidance in Spain.
            </p>
            <Link className="button button-gold" href="/go/legal10">
              Make a legal enquiry <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={`site-shell ${styles.profileGrid}`}>
        <article className={styles.story}>
          <p className="eyebrow">About Legal 10</p>
          <h2>Personal advice centred on each client.</h2>
          <p>
            At Legal 10 Abogados, a multidisciplinary team of professionals is at
            each client&apos;s disposal, offering a personalised service and always
            protecting their personal and economic interests.
          </p>
          <p>
            The team provides legal, tax and financial advice, with particular
            experience advising foreign clients, both residents and non-residents,
            as well as small and medium-sized enterprises.
          </p>
          <p>
            Legal 10&apos;s goal is to satisfy its clients&apos; interests and needs while
            making life easier in both business and personal matters. Its specialised
            lawyers and economists provide attentive, individual support and develop
            solutions for each specific case according to the client&apos;s needs.
          </p>
        </article>

        <aside className={styles.services}>
          <p className="eyebrow">Tax &amp; accounting advice</p>
          <p className={styles.servicesIntro}>
            Permanent or specific advice is available across tax and accounting matters.
          </p>
          <ul>
            {advisoryServices.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <Link href="/go/legal10">
            Discuss a legal or financial requirement <span>→</span>
          </Link>
        </aside>
      </section>

      <section className={styles.closingSection}>
        <div className={`site-shell ${styles.closingInner}`}>
          <div>
            <p className="eyebrow light">Advice for life and business</p>
            <h2>Practical solutions for your circumstances.</h2>
          </div>
          <div className={styles.closingCopy}>
            <p>
              Tell PF EuroAsia what support you need and we will connect your enquiry
              with Juan Antonio and the appropriate Legal 10 professional.
            </p>
            <Link className="button button-gold" href="/go/legal10">
              Contact Legal 10 through PF EuroAsia <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
