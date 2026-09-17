import Link from "next/link";
import styles from "../HomePhase2.module.css";

export function SwedishHomePhase2() {
  return (
    <section className={styles.gatewayHero} aria-labelledby="swedish-gateway-heading">
      <div className={styles.gatewayOverlay} />
      <div className={`site-shell ${styles.gatewayInner}`}>
        <div className={styles.gatewayIntro}>
          <div>
            <p className="eyebrow light">Europa och Asien sammanlänkade</p>
            <h1 id="swedish-gateway-heading">Välj din riktning.<em>Vi guidar dig vidare.</em></h1>
          </div>
          <p>Fastigheter i Spanien och Sverige samt etablering och möjligheter i Asien – samordnat genom ett personligt internationellt nätverk.</p>
        </div>
        <div className={styles.gatewayCards}>
          <Link className={`${styles.gatewayCard} ${styles.spainPath}`} href="/sv/properties">
            <div className={styles.cardOverlay} />
            <div className={styles.gatewayCardCopy}>
              <span className={styles.pathLabel}>Fastigheter</span>
              <h2>Utvalda bostäder i Spanien och Sverige.</h2>
              <p>Se publicerade objekt, privata möjligheter och personlig köprådgivning genom våra lokala samarbetspartner.</p>
              <strong>Visa fastigheter <span aria-hidden="true">→</span></strong>
            </div>
          </Link>
          <Link className={`${styles.gatewayCard} ${styles.asiaPath}`} href="/sv/markets/malaysia">
            <div className={styles.cardOverlay} />
            <div className={styles.gatewayCardCopy}>
              <span className={styles.pathLabel}>Asien</span>
              <h2>Malaysia som bas för livsstil och affärer.</h2>
              <p>Utforska fastigheter, relocation, uppehållslösningar och företagsmöjligheter i Malaysia och utvalda asiatiska marknader.</p>
              <strong>Utforska Asien <span aria-hidden="true">→</span></strong>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
