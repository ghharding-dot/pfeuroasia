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
];

export function OwnerListingSection() {
  return (
    <div className={styles.representationPage}>
      <section className={`site-shell ${styles.representationHero}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">For property owners</p>
          <h1>Confidential property representation.</h1>
          <p className={styles.heroLead}>
            A considered strategy for distinctive homes and owners who expect
            privacy, judgement and personal attention at every stage.
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
            alt="Private luxury villa in Southern Spain"
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
            <h2>Selling a significant property requires more than a listing.</h2>
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
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={`site-shell ${styles.faqGrid}`}>
          <div>
            <p className="eyebrow light">Before we begin</p>
            <h2>A private first conversation.</h2>
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
  );
}
