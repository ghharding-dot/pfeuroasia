import Image from "next/image";
import styles from "./GlobalPresence.module.css";

const locations = [
  {
    region: "Spain",
    city: "Marbella",
    detail: "European base",
  },
  {
    region: "Middle East",
    city: "Riyadh & Gulf",
    detail: "Private network",
  },
  {
    region: "Malaysia",
    city: "Kuala Lumpur & Labuan",
    detail: "Asia base",
  },
];

export function GlobalPresence() {
  return (
    <section className={styles.section} aria-labelledby="global-presence-title">
      <div className="site-shell">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow light">Our international presence</p>
            <h2 id="global-presence-title">One world.<em>Three strategic regions.</em></h2>
          </div>
          <p>
            A direct relationship connecting established expertise in Southern
            Spain with trusted private networks across the Gulf and Southeast Asia.
          </p>
        </div>

        <div className={styles.mapFrame}>
          <div className={styles.mapImage}>
            <Image
              src="/images/world-map-oval.svg"
              alt="Classic oval world map highlighting Spain, the Middle East and Malaysia"
              fill
              sizes="(max-width: 760px) 100vw, 1200px"
              priority={false}
            />
          </div>
        </div>

        <div className={styles.locations}>
          {locations.map((location, index) => (
            <article className={styles.location} key={location.region}>
              <span className={styles.number}>0{index + 1}</span>
              <div>
                <strong>{location.region}</strong>
                <span>{location.city}</span>
              </div>
              <small>{location.detail}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
