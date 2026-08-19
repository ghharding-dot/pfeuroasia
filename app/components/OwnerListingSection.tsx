import Image from "next/image";
import Link from "next/link";
import styles from "./OwnerListingSection.module.css";

const representationRoutes = [
  {
    number: "01",
    title: "International market representation",
    text: "For owners seeking carefully managed visibility across selected property, private-client and international partner channels.",
    points: [
      "Property positioning and presentation advice",
      "Selective international distribution",
      "Qualified enquiry management",
      "Viewing and negotiation coordination",
    ],
  },
  {
    number: "02",
    title: "Private & off-market representation",
    text: "For owners who value discretion above broad exposure, with information shared only through controlled, relevant introductions.",
    points: [
      "Confidential mandate and communication",
      "Buyer qualification before disclosure",
      "Controlled release of property details",
      "Private introductions through trusted networks",
    ],
  },
];

const process = [
  {
    number: "01",
    title: "Private consultation",
    text: "We begin with your objectives, preferred timing, privacy requirements and the circumstances surrounding the property.",
  },
  {
    number: "02",
    title: "Property assessment",
    text: "We review the home, its position in the market and the material required to present it credibly to suitable buyers.",
  },
  {
    number: "03",
    title: "Representation strategy",
    text: "Together we agree the right route: selective market exposure, a discreet off-market approach, or a considered combination of both.",
  },
  {
    number: "04",
    title: "Launch & qualification",
    text: "The property is introduced through the agreed channels. Enquiries are assessed before detailed information or access is provided.",
  },
  {
    number: "05",
    title: "Viewings & negotiation",
    text: "We coordinate private viewings, consolidate feedback and manage commercial conversations with clarity and discretion.",
  },
  {
    number: "06",
    title: "Transaction coordination",
    text: "Once terms are agreed, we remain the central point of contact alongside the owner’s appointed legal, tax and technical advisers.",
  },
];

const reasons = [
  "A single, senior point of contact",
  "Marbella knowledge with an international outlook",
  "Selected relationships across Europe, Asia and the Middle East",
  "Coordination with independent legal, tax and technical specialists",
];

const ownerLocations = [
  {
    name: "Marbella Golden Mile",
    href: "/areas/marbella-golden-mile",
    text: "Beachside apartments, penthouses and established villas across Marbella's most recognised residential corridor.",
  },
  {
    name: "Benahavís",
    href: "/areas/benahavis",
    text: "Private hillside estates, golf communities and substantial family homes above Marbella.",
  },
  {
    name: "La Zagaleta",
    href: "/areas/la-zagaleta",
    text: "Highly private villas and estates requiring controlled information and carefully qualified introductions.",
  },
  {
    name: "El Madroñal",
    href: "/areas/el-madronal",
    text: "Individual villas and country-style estates where setting, views and presentation materially influence positioning.",
  },
];

const questions = [
  {
    question: "Can the conversation begin confidentially and without obligation?",
    answer:
      "Yes. An initial consultation is private and exploratory. We first establish whether the property, owner objectives and our network are a suitable fit before discussing a representation mandate.",
  },
  {
    question: "Does my property need to be advertised publicly?",
    answer:
      "No. Where discretion is important, we can agree a controlled off-market approach. Property information is then released selectively and only after a prospective buyer or representative has been qualified.",
  },
  {
    question: "How are representation terms agreed?",
    answer:
      "The scope, marketing route, responsibilities and commercial terms are agreed individually after we understand the property and the owner’s priorities. Nothing is assumed at the first conversation.",
  },
  {
    question: "Can you assist owners who live outside Spain?",
    answer:
      "Yes. We can coordinate communication, viewings and the wider sales process for internationally based owners, working alongside their chosen advisers in Spain.",
  },
  {
    question: "How do you establish an appropriate asking price?",
    answer:
      "We review the property's location, condition, presentation, recent market evidence and competing supply before discussing a positioning range with the owner. The final asking price and sales strategy are agreed together; a formal valuation can be arranged through an independent qualified valuer when required.",
  },
  {
    question: "Which Marbella and Benahavís areas do you represent?",
    answer:
      "Our core focus includes Marbella Golden Mile, Sierra Blanca, La Zagaleta, El Madroñal and other established Marbella and Benahavís communities. We consider each property individually before accepting a representation mandate.",
  },
];

export function OwnerListingSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className={styles.representationPage}>
      <section className={`site-shell ${styles.representationHero}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">For property owners</p>
          <h1>Sell your Marbella property—confidentially.</h1>
          <p className={styles.heroLead}>
            A considered sales strategy for distinctive homes in Marbella and
            Benahavís, connecting owners with qualified international buyers
            through public or discreet off-market representation.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button-dark" href="/enquire">
              Request a confidential consultation <span>→</span>
            </Link>
            <a className={styles.textLink} href="#representation-options">
              Explore representation options
            </a>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <Image
            src="/images/hero-villa.webp"
            alt="Private luxury villa in Marbella, Southern Spain"
            fill
            priority
            sizes="(max-width: 980px) 100vw, 48vw"
          />
          <div className={styles.heroNote}>
            <span>Spain ↔ International private clients</span>
            <p>Selective exposure. Qualified introductions. Personal handling.</p>
          </div>
        </div>
      </section>

      <section className={styles.positioningSection}>
        <div className={`site-shell ${styles.positioningGrid}`}>
          <p className="eyebrow light">A representation mandate</p>
          <div>
            <h2>Selling a significant Marbella property requires more than a listing.</h2>
            <p>
              It begins with understanding the home, the owner’s objectives and
              the level of confidentiality required. Our role is to shape the
              right strategy, protect the quality of the presentation and create
              relevant introductions—not unnecessary noise.
            </p>
          </div>
        </div>
      </section>

      <section className={`site-shell ${styles.routesSection}`} id="representation-options">
        <div className={styles.sectionHeading}>
          <p className="eyebrow">Two routes, one standard of care</p>
          <h2>Visibility should always be deliberate.</h2>
          <p>
            The appropriate route depends on the property, the likely buyer and
            your appetite for public exposure. We agree it with you before any
            information is released.
          </p>
        </div>

        <div className={styles.routeGrid}>
          {representationRoutes.map((route) => (
            <article key={route.number}>
              <span className={styles.routeNumber}>{route.number}</span>
              <h3>{route.title}</h3>
              <p>{route.text}</p>
              <ul>
                {route.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={`site-shell ${styles.processGrid}`}>
          <div className={styles.processIntro}>
            <p className="eyebrow">How we represent your property</p>
            <h2>A clear process, handled personally.</h2>
            <p>
              Every mandate is individual, but the principles remain the same:
              careful preparation, qualified access and transparent communication.
            </p>
          </div>

          <div className={styles.processList}>
            {process.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`site-shell ${styles.whySection}`}>
        <div className={styles.whyImage}>
          <Image
            src="/images/advisory-interior.webp"
            alt="Quiet interior prepared for a private property consultation"
            fill
            sizes="(max-width: 980px) 100vw, 46vw"
          />
        </div>
        <div className={styles.whyCopy}>
          <p className="eyebrow">Why PF EuroAsia</p>
          <h2>Local context. International reach. Independent coordination.</h2>
          <p>
            We connect Southern Spain with selected private-client and professional
            relationships across Europe, Asia and the Middle East. Our value lies
            in judgement, access and continuity—not volume.
          </p>
          <ul>
            {reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
          <Link className="text-link" href="/guides/marbella-property-international-buyers">
            See how international buyers approach Marbella <span>→</span>
          </Link>
        </div>
      </section>

      <section className={styles.coverageSection} aria-labelledby="owner-locations-heading">
        <div className="site-shell">
          <div className={styles.coverageHeading}>
            <div>
              <p className="eyebrow">Marbella &amp; Benahavís expertise</p>
              <h2 id="owner-locations-heading">Property positioning begins with local context.</h2>
            </div>
            <p>
              Buyer expectations, comparable supply and presentation strategy vary
              by location. Explore our area guidance or begin with a confidential
              discussion about your property.
            </p>
          </div>
          <div className={styles.coverageGrid}>
            {ownerLocations.map((location, index) => (
              <Link href={location.href} key={location.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{location.name}</h3>
                <p>{location.text}</p>
                <small>Explore the area <b aria-hidden="true">→</b></small>
              </Link>
            ))}
          </div>
          <div className={styles.coverageFooter}>
            <Link href="/private-portfolio">See how qualified purchasers access private opportunities <span aria-hidden="true">→</span></Link>
            <Link href="/enquire">Discuss selling your property <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="owner-faq-heading">
        <div className={`site-shell ${styles.faqGrid}`}>
          <div>
            <p className="eyebrow light">Before we begin</p>
            <h2 id="owner-faq-heading">A private first conversation.</h2>
            <p>
              Share only what you are comfortable sharing initially. We can
              discuss location, value, timing and confidentiality before documents
              or detailed property information are exchanged.
            </p>
          </div>
          <div className={styles.faqList}>
            {questions.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={`site-shell ${styles.finalCta}`}>
        <div>
          <p className="eyebrow">Discuss your property privately</p>
          <h2>Begin with a confidential consultation.</h2>
        </div>
        <div>
          <p>
            Tell us the property location, your preferred timing and whether you
            are considering public or off-market representation. A brief outline
            is enough for the first conversation.
          </p>
          <Link className="button button-dark" href="/enquire">
            Request a confidential consultation <span>→</span>
          </Link>
          <small>
            Legal, tax and technical advice is provided by independent appointed
            specialists where required.
          </small>
        </div>
      </section>
      </div>
    </>
  );
}
