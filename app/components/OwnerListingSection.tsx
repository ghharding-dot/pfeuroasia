import Link from "next/link";
import styles from "./OwnerListingSection.module.css";

const ownerServices = [
  {
    number: "01",
    title: "Asian portal exposure",
    text: "Considered presentation through selected property portals and professional channels across Malaysia, China and the wider Asian market.",
  },
  {
    number: "02",
    title: "Agent and buyer networks",
    text: "Direct introduction to relevant agents, private buyers and cross-border partners where the property is a suitable match.",
  },
  {
    number: "03",
    title: "Discreet representation",
    text: "Confidential or off-market positioning can be arranged for owners who prefer controlled exposure rather than public advertising.",
  },
];

export function OwnerListingSection() {
  return (
    <section className={styles.ownerSection} id="list-your-property">
      <div className={`site-shell ${styles.ownerGrid}`}>
        <div className={styles.ownerIntro}>
          <p className="eyebrow">For property owners</p>
          <h2>Introduce your property to buyers across Asia.</h2>
          <p>
            Property Facilitators EuroAsia works with selected portals, agents
            and private buyer networks across Malaysia, China and the wider
            Asian market.
          </p>
          <Link className="button button-dark" href="/enquire">
            Submit your property <span>→</span>
          </Link>
        </div>

        <div className={styles.ownerDetails}>
          <p className={styles.ownerLead}>
            We welcome enquiries from property owners, developers and authorised
            representatives seeking carefully managed international exposure.
          </p>

          <div className={styles.ownerServiceList}>
            {ownerServices.map((service) => (
              <article key={service.title}>
                <span>{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </article>
            ))}
          </div>

          <p className={styles.ownerNote}>
            Send us the property location, asking price, a brief description and
            available photographs or brochure. We will review the opportunity
            and advise whether it is suitable for our Asian marketing network.
          </p>
        </div>
      </div>
    </section>
  );
}
