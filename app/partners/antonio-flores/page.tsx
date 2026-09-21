import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./AntonioFloresProfile.module.css";

export const metadata: Metadata = {
  title: "Antonio Flores | Lawbird Legal Services | PF EuroAsia",
  description:
    "Meet Antonio Flores, director and co-founder of Lawbird Legal Services, PF EuroAsia's Spanish legal partner for property, corporate, litigation and immigration matters.",
  alternates: {
    canonical: "https://www.pfeuroasia.com/partners/antonio-flores",
  },
};

const expertise = [
  "Spanish property law",
  "Corporate law",
  "Litigation",
  "Immigration law",
];

export default function AntonioFloresProfilePage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={`site-shell ${styles.heroInner}`}>
          <div className={styles.identity}>
            <p className="eyebrow light">Spanish legal collaboration</p>
            <div className={styles.logoPanel}>
              <Image
                className={styles.logo}
                src="/images/partner-lawbird.png"
                alt="Lawbird Legal Services"
                width={170}
                height={37}
              />
            </div>
            <h1>Antonio Flores</h1>
            <p className={styles.role}>Director · Co-founder · Lawbird Legal Services</p>
          </div>

          <figure className={styles.portraitWrap}>
            <Image
              className={styles.portrait}
              src="/images/partner-lawbird-antonio.webp"
              alt="Antonio Flores, director and co-founder of Lawbird Legal Services"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 32vw"
            />
          </figure>

          <div className={styles.heroCopy}>
            <p>
              PF EuroAsia works with Antonio Flores and Lawbird Legal Services to give
              international clients independent legal support for personal and business
              matters in Spain.
            </p>
            <Link className="button button-gold" href="/go/lawbird">
              Make a legal enquiry <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={`site-shell ${styles.profileGrid}`}>
        <article className={styles.story}>
          <p className="eyebrow">About Lawbird</p>
          <h2>Independent legal advice, built on trust.</h2>
          <p>
            Lawbird is a firm of Spanish lawyers specialising in property law,
            corporate law, litigation and immigration law. The firm was established
            in 2000 by Antonio Flores and his brother Iñigo, and currently employs
            around 30 staff members.
          </p>
          <p>
            Lawbird provides legal advice and services to a wide range of clients from
            the United Kingdom, Ireland, the United States and many other countries
            around the world. The operation is supported by a talented team of
            experienced lawyers, paralegals and administrative staff. This dedicated
            team is the backbone of the ethical and longstanding firm.
          </p>

          <blockquote className={styles.quote}>
            <p>“We work by a code of solid ethics and strong values.”</p>
            <cite>Antonio Flores, Director</cite>
          </blockquote>

          <p>
            Lawbird&apos;s mission is to become the most trustworthy and reliable
            English-speaking law firm in Spain, delivering a <strong>hassle-free,
            independent service</strong> of the highest quality and best value. Its
            clients receive full support and assistance, enabling them to conduct
            personal or business activity in Spain with confidence.
          </p>
          <p>
            The firm is committed to providing the best possible service and avoids
            any business relationship that may compromise its independence.
          </p>
        </article>

        <aside className={styles.expertise}>
          <p className="eyebrow">Core legal services</p>
          <ul>
            {expertise.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <Link href="/go/lawbird">
            Discuss a legal requirement <span>→</span>
          </Link>
        </aside>
      </section>

      <section className={styles.closingSection}>
        <div className={`site-shell ${styles.closingInner}`}>
          <div>
            <p className="eyebrow light">Legal support in Spain</p>
            <h2>Proceed with clarity and confidence.</h2>
          </div>
          <div className={styles.closingCopy}>
            <p>
              Tell PF EuroAsia what you need and we will connect your enquiry with
              Antonio and the appropriate Lawbird team member.
            </p>
            <Link className="button button-gold" href="/go/lawbird">
              Contact Lawbird through PF EuroAsia <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
