"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./InteractiveLegalPartners.module.css";
import layoutStyles from "./InteractiveAsiaPartners.module.css";

export function InteractiveAsiaPartners() {
  const [active, setActive] = useState(false);

  return (
    <div className={layoutStyles.grid}>
      <article
        className={styles.card}
        data-active={active ? "true" : "false"}
        onPointerEnter={(event) => {
          if (event.pointerType !== "touch") setActive(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "touch") setActive(false);
        }}
      >
        <button
          className={styles.revealButton}
          type="button"
          aria-expanded={active}
          aria-label={`${active ? "Hide" : "Show"} details about AIMS Trust Group`}
          onClick={() => setActive((current) => !current)}
        >
          <span className={styles.front}>
            <span className={styles.logoWrap}>
              <span className={layoutStyles.aimsLogo} aria-label="AIMS Trust Group">
                <strong>AIMS</strong>
                <span>Trust Group · Labuan</span>
              </span>
            </span>
            <span className={styles.hint}>Hover or tap to discover <b>+</b></span>
          </span>
        </button>

        <div className={styles.reveal} aria-hidden={!active}>
          <span className={styles.watermark} aria-hidden="true">A</span>
          <p className={styles.kicker}>Labuan corporate & trust services</p>
          <h3>AIMS Trust Group</h3>
          <p className={styles.description}>
            Our Labuan collaboration for company formation, corporate administration,
            work permits and selected cross-border structures for international clients.
          </p>
          <div className={styles.partnerActions}>
            <Link className={styles.visitLink} href="/go/aims">
              Make an enquiry <span>→</span>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
