import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./CompanyResidency.module.css";

export const metadata: Metadata = {
  title: "Asian Company Formation & Residency Options",
  description:
    "Compare Malaysia and Labuan with company-formation options in Singapore and Hong Kong, coordinated through trusted local advisers.",
  alternates: {
    canonical: "/asia-gateway/company-residency",
  },
};

const routes = [
  {
    key: "malaysia",
    label: "Primary focus",
    region: "Malaysia · Labuan",
    title: "Malaysia & Labuan",
    summary:
      "Our principal Asian pathway for clients considering company formation, residency, relocation and selected property opportunities.",
    points: [
      "Labuan company formation and operating structures",
      "Employment-pass and residency coordination",
      "Malaysia tax-residency guidance",
      "Kuala Lumpur property and relocation support",
    ],
    href: "/services/labuan-company-residency",
    cta: "Explore Malaysia & Labuan",
  },
  {
    key: "singapore",
    label: "Company formation",
    region: "Singapore",
    title: "Singapore",
    summary:
      "A stable and internationally recognised base for genuine regional business, introduced and coordinated through local corporate advisers.",
    points: [
      "Private limited company setup",
      "Foreign shareholder structures",
      "Local director, secretary and compliance support",
      "Work-pass guidance assessed separately",
    ],
    href: "/asia-gateway/enquire",
    cta: "Discuss a Singapore company",
  },
  {
    key: "hongkong",
    label: "Company formation",
    region: "Hong Kong",
    title: "Hong Kong",
    summary:
      "An established international business and trading centre, with company setup coordinated through experienced Hong Kong advisers.",
    points: [
      "Private limited company setup",
      "Foreign director and shareholder structures",
      "Registered office, secretary and compliance support",
      "Entrepreneur and residence routes assessed separately",
    ],
    href: "/asia-gateway/enquire",
    cta: "Discuss a Hong Kong company",
  },
];

const comparison = [
  {
    location: "Malaysia & Labuan",
    company: "Core PF EuroAsia service",
    residence: "Central part of the conversation",
    bestFor: "Company, residency, relocation and Malaysia investment",
  },
  {
    location: "Singapore",
    company: "Available through local advisers",
    residence: "Separate and selective",
    bestFor: "Regional operations, credibility and international business",
  },
  {
    location: "Hong Kong",
    company: "Available through local advisers",
    residence: "Separate application",
    bestFor: "Trading, investment and access to Asian markets",
  },
];

export default function CompanyResidencyPage() {
  return (
    <main>
      <Header
        transparent
        enquireHref="/asia-gateway/enquire"
        enquireLabel="Asia enquiry"
      />

      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={["site-shell", styles.heroInner].join(" ")}>
          <p className="eyebrow light">Asia Gateway · Company & residency</p>
          <h1>
            Begin with the right
            <em>Asian structure.</em>
          </h1>
          <p>
            Malaysia and Labuan remain our principal focus. Where Singapore or
            Hong Kong is more appropriate, PF EuroAsia can coordinate company
            formation through experienced local advisers.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button-gold" href="#options">
              Compare the options <span>→</span>
            </Link>
            <Link className={styles.heroLink} href="/asia-gateway/enquire">
              Arrange a confidential consultation <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={["site-shell", styles.introGrid].join(" ")}>
          <div>
            <p className="eyebrow">A clear starting point</p>
            <h2>
              Three jurisdictions.
              <em>Different purposes.</em>
            </h2>
          </div>
          <div>
            <p>
              The first decision is not simply where a company is easiest to
              register. It is where the business will operate, where its
              management will be based and whether the client also needs a
              credible residence pathway.
            </p>
            <p>
              Company ownership does not automatically create personal
              residence. Our role is to identify the appropriate route and then
              introduce the relevant local corporate, tax and immigration
              specialists.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.options} id="options">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div>
              <p className="eyebrow">Basic information tree</p>
              <h2>Choose where to begin.</h2>
            </div>
            <p>
              Start with Malaysia and Labuan, or compare Singapore and Hong Kong
              where the commercial objective points to a different structure.
            </p>
          </div>

          <div className={styles.routeTree}>
            <div className={styles.treeRoot}>
              <span>PF EuroAsia</span>
              <strong>Asian company & residency options</strong>
            </div>
            <span className={styles.treeStem} aria-hidden="true" />
            <div className={styles.cards}>
              {routes.map((route) => (
                <article
                  className={[
                    styles.card,
                    route.key === "malaysia" ? styles.featuredCard : "",
                  ].join(" ")}
                  key={route.key}
                >
                  <div className={styles.cardTop}>
                    <span>{route.label}</span>
                    <small>{route.region}</small>
                  </div>
                  <h3>{route.title}</h3>
                  <p>{route.summary}</p>
                  <ul>
                    {route.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <Link href={route.href}>
                    {route.cta} <span>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.comparison}>
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div>
              <p className="eyebrow light">At a glance</p>
              <h2>Company and residence are separate decisions.</h2>
            </div>
            <p>
              This initial comparison is intentionally simple. Detailed
              eligibility, costs and tax treatment are confirmed after a
              confidential discussion with the appropriate adviser.
            </p>
          </div>

          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Jurisdiction</th>
                  <th>Company formation</th>
                  <th>Residence position</th>
                  <th>Common objective</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((item) => (
                  <tr key={item.location}>
                    <th>{item.location}</th>
                    <td>{item.company}</td>
                    <td>{item.residence}</td>
                    <td>{item.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={["site-shell", styles.processGrid].join(" ")}>
          <div>
            <p className="eyebrow">How we assist</p>
            <h2>One enquiry.<br />The right local adviser.</h2>
          </div>
          <ol>
            <li>
              <span>01</span>
              <div>
                <strong>Understand the objective</strong>
                <p>Business activity, preferred location, residence needs and timing.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Compare suitable routes</strong>
                <p>Malaysia and Labuan first, with Singapore or Hong Kong where appropriate.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Introduce the local specialist</strong>
                <p>Company, tax, compliance and immigration advice from the relevant jurisdiction.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={["site-shell", styles.ctaInner].join(" ")}>
          <p className="eyebrow light">A private conversation</p>
          <h2>Which Asian route fits your plans?</h2>
          <p>
            Tell us what you want to achieve. We will begin with Malaysia and
            Labuan, then compare Singapore or Hong Kong where those jurisdictions
            better suit the business.
          </p>
          <Link className="button button-gold" href="/asia-gateway/enquire">
            Register your interest <span>→</span>
          </Link>
          <small>
            General information only. Eligibility, taxation and regulatory
            requirements must be confirmed by qualified local advisers.
          </small>
        </div>
      </section>

      <Footer />
    </main>
  );
}
