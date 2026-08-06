import Link from "next/link";
import styles from "../HomeGatewayHero.module.css";

export function HomeGatewayHero() {
  return (
    <section className={styles.hero} aria-labelledby="gateway-heading">
      <div className={styles.overlay} />
      <div className={`site-shell ${styles.inner}`}>
        <div className={styles.intro}>
          <p className="eyebrow light">Europe & Asia connected</p>
          <h1 id="gateway-heading">
            Two clear pathways.
            <span>One trusted relationship.</span>
          </h1>
          <p>
            Choose the direction that matches your plans. Our established Spain
            property services remain separate from our growing Asia investment,
            residency and relocation platform.
          </p>
        </div>

        <div className={styles.pathGrid}>
          <Link className={`${styles.pathCard} ${styles.spainCard}`} href="/markets/marbella">
            <div className={styles.cardShade} />
            <div className={styles.cardContent}>
              <span className={styles.pathLabel}>Spain property</span>
              <h2>Looking to buy property in Spain?</h2>
              <p>
                Luxury homes, private opportunities, buyer representation,
                villa rentals and concierge services across Marbella and the
                Costa del Sol.
              </p>
              <div className={styles.tags} aria-label="Spain services">
                <span>Buy</span>
                <span>Sell</span>
                <span>Rent</span>
                <span>Concierge</span>
              </div>
              <strong>Explore Spain <span aria-hidden="true">→</span></strong>
            </div>
          </Link>

          <Link className={`${styles.pathCard} ${styles.asiaCard}`} href="/asia-gateway">
            <div className={styles.cardShade} />
            <div className={styles.cardContent}>
              <span className={styles.pathLabel}>Asia gateway</span>
              <h2>Have you considered investing in Asia?</h2>
              <p>
                Begin with Malaysia and explore property, residency programmes,
                company formation, relocation and carefully coordinated
                discovery visits.
              </p>
              <div className={styles.tags} aria-label="Asia services">
                <span>Invest</span>
                <span>Relocate</span>
                <span>Residency</span>
                <span>Business</span>
              </div>
              <strong>Explore Asia & Malaysia <span aria-hidden="true">→</span></strong>
            </div>
          </Link>
        </div>
      </div>

      <div className={`site-shell ${styles.footer}`}>
        <span>Property in Spain</span>
        <span>Asia investment · relocation · residency</span>
      </div>
    </section>
  );
}
