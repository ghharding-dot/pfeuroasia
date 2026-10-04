import Image from "next/image";
import Link from "next/link";
import styles from "./InternationalMoneySupport.module.css";

export function InternationalMoneySupport() {
  return (
    <section className={styles.section} aria-label="Estuary FX international transfers and business finance">
      <div className={`site-shell ${styles.inner}`}>
        <div className={styles.partner}>
          <span>Our international payments partner</span>
          <Image src="/images/estuary-fx-logo.png" alt="Estuary FX" width={240} height={90} />
        </div>
        <div className={styles.copy}>
          <h2>Moving money between Europe, Spain &amp; Asia.</h2>
          <p>Currency exchange and international transfers for property purchases, villa rentals, relocation and business. Trade and invoice finance enquiries can also be introduced to Estuary FX, subject to eligibility and approval.</p>
        </div>
        <Link className={styles.link} href="/international-payments">Explore transfers &amp; business finance</Link>
      </div>
    </section>
  );
}
