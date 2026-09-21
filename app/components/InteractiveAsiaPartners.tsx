"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./InteractiveLegalPartners.module.css";
import layoutStyles from "./InteractiveAsiaPartners.module.css";

export function InteractiveAsiaPartners() {
  const [active, setActive] = useState<"aims" | "armani" | null>(null);

  return (
    <div className={layoutStyles.grid}>
      <article
        className={styles.card}
        data-active={active === "aims" ? "true" : "false"}
        onPointerEnter={(event) => {
          if (event.pointerType !== "touch") setActive("aims");
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "touch") setActive(null);
        }}
      >
        <button
          className={styles.revealButton}
          type="button"
          aria-expanded={active === "aims"}
          aria-label={`${active === "aims" ? "Hide" : "Show"} details about AIMS Trust Group`}
          onClick={() => setActive((current) => current === "aims" ? null : "aims")}
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

        <div className={styles.reveal} aria-hidden={active !== "aims"}>
          <Image
            className={styles.backgroundImage}
            src="/images/partner-aims-team.webp"
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 320px"
          />
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

      <article
        className={styles.card}
        data-active={active === "armani" ? "true" : "false"}
        onPointerEnter={(event) => {
          if (event.pointerType !== "touch") setActive("armani");
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "touch") setActive(null);
        }}
      >
        <button
          className={styles.revealButton}
          type="button"
          aria-expanded={active === "armani"}
          aria-label={`${active === "armani" ? "Hide" : "Show"} details about Armani Hallson KLCC`}
          onClick={() => setActive((current) => current === "armani" ? null : "armani")}
        >
          <span className={styles.front}>
            <span className={styles.logoWrap}>
              <span className={layoutStyles.armaniLogo} aria-label="Armani Hallson KLCC">
                <strong>ARMANI</strong>
                <span>Hallson · KLCC</span>
              </span>
            </span>
            <span className={styles.hint}>Hover or tap to discover <b>+</b></span>
          </span>
        </button>

        <div className={styles.reveal} aria-hidden={active !== "armani"}>
          <Image className={styles.backgroundImage} src="/images/kl-armani-skyline.webp" alt="" fill sizes="(max-width: 640px) 100vw, 320px" />
          <span className={styles.watermark} aria-hidden="true">AH</span>
          <p className={styles.kicker}>Kuala Lumpur property development</p>
          <h3>Armani Hallson KLCC</h3>
          <p className={styles.description}>A freehold SOHO and SOVO development on Jalan Ampang, presented to international buyers through our Malaysian property collaboration network.</p>
          <div className={styles.partnerActions}>
            <Link className={styles.visitLink} href="/malaysia-property-developments/armani-hallson-klcc">View development <span>→</span></Link>
          </div>
        </div>
      </article>
    </div>
  );
}
