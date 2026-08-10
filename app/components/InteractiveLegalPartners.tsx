"use client";

import { useState } from "react";
import styles from "./InteractiveLegalPartners.module.css";

type PartnerKey = "lawbird" | "legal10" | "martinez";

type Partner = {
  key: PartnerKey;
  name: string;
  href: string;
  kicker: string;
  description: string;
  mark: string;
};

const partners: Partner[] = [
  {
    key: "lawbird",
    name: "Lawbird Legal Services",
    href: "/go/lawbird",
    kicker: "Spanish legal services",
    description:
      "Property, corporate, litigation and immigration advice for international clients operating in or moving to Spain.",
    mark: "LB",
  },
  {
    key: "legal10",
    name: "Legal 10 Abogados Marbella",
    href: "/go/legal10",
    kicker: "Marbella legal · tax · financial",
    description:
      "Personal legal, tax and financial advice with particular experience supporting foreign residents, non-residents and businesses.",
    mark: "10",
  },
  {
    key: "martinez",
    name: "Martínez-Echevarría Lawyers",
    href: "/go/martinezechevarria",
    kicker: "International legal counsel",
    description:
      "Marbella-based legal support for international private and business clients, including real estate, tax and wider commercial matters.",
    mark: "ME",
  },
];

function FrontLogo({ partner }: { partner: Partner }) {
  if (partner.key === "lawbird") {
    return <img src="/images/partner-lawbird.png" alt="Lawbird Legal Services" />;
  }

  if (partner.key === "legal10") {
    return <img src="/images/partner-legal10.jpg" alt="Legal 10 Abogados" />;
  }

  return (
    <div className={styles.martinezLogo} aria-label="Martínez-Echevarría Lawyers">
      <span>Martínez-Echevarría</span>
      <small>Lawyers</small>
    </div>
  );
}

export function InteractiveLegalPartners() {
  const [active, setActive] = useState<PartnerKey | null>(null);

  return (
    <div className={styles.grid}>
      {partners.map((partner) => {
        const revealed = active === partner.key;

        return (
          <article
            className={styles.card}
            data-active={revealed ? "true" : "false"}
            key={partner.key}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setActive(partner.key);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType !== "touch") setActive(null);
            }}
          >
            <button
              className={styles.revealButton}
              type="button"
              aria-expanded={revealed}
              aria-label={`${revealed ? "Hide" : "Show"} details about ${partner.name}`}
              onClick={() => setActive(revealed ? null : partner.key)}
            >
              <span className={styles.front}>
                <span className={styles.logoWrap}><FrontLogo partner={partner} /></span>
                <span className={styles.hint}>Hover or tap to discover <b>+</b></span>
              </span>
            </button>

            <div className={styles.reveal} aria-hidden={!revealed}>
              <span className={styles.watermark} aria-hidden="true">{partner.mark}</span>
              <p className={styles.kicker}>{partner.kicker}</p>
              <h3>{partner.name}</h3>
              <p className={styles.description}>{partner.description}</p>
              <a className={styles.visitLink} href={partner.href}>
                Visit partner <span>→</span>
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
