"use client";

import { useState } from "react";
import cardStyles from "./InteractiveLegalPartners.module.css";
import partnerStyles from "./PartnerStrip.module.css";
import styles from "./InteractivePropertyPartners.module.css";

type PartnerKey = "pfiberia" | "aylesford" | "housecountry" | "fixer";

type Partner = {
  key: PartnerKey;
  name: string;
  representative: string;
  href: string;
  kicker: string;
  description: string;
  mark: string;
};

const partners: Partner[] = [
  {
    key: "pfiberia",
    name: "Property Facilitators Iberia",
    representative: "Jeff Harding",
    href: "/go/pfiberia",
    kicker: "Marbella property representation",
    description:
      "Our Spain-side collaboration partner for discreet property sourcing, owner representation and practical coordination across Marbella and the Costa del Sol.",
    mark: "PF",
  },
  {
    key: "aylesford",
    name: "Aylesford Spain",
    representative: "Michael Cory-Reed",
    href: "/go/aylesford",
    kicker: "Prime residential property",
    description:
      "Established property specialists working with international buyers and sellers across Marbella, the Golden Mile and surrounding prime residential areas.",
    mark: "AY",
  },
  {
    key: "housecountry",
    name: "House & Country Real Estate",
    representative: "Jaime Paralade",
    href: "/go/house-country",
    kicker: "Marbella & country property",
    description:
      "A trusted local property relationship providing access to selected homes, estates and opportunities across Marbella and the wider Andalusian market.",
    mark: "HC",
  },
  {
    key: "fixer",
    name: "The Fixer",
    representative: "Robert Basil",
    href: "/go/the-fixer",
    kicker: "Property advisory & problem solving",
    description:
      "Practical on-the-ground support for property owners and buyers, coordinating solutions, trusted contacts and the details that make transactions work.",
    mark: "FX",
  },
];

function FrontLogo({ partner }: { partner: Partner }) {
  if (partner.key === "pfiberia") {
    return <img src="/images/partner-pf-iberia.png" alt="Property Facilitators Iberia" />;
  }

  if (partner.key === "aylesford") {
    return (
      <div className={partnerStyles.aylesfordLogo} aria-label="Aylesford Spain">
        <span>Aylesford</span>
        <small>Spain</small>
        <b>Est. 1966</b>
      </div>
    );
  }

  if (partner.key === "housecountry") {
    return <img src="/images/partner-house-country.png" alt="House and Country Real Estate" />;
  }

  return <img className={styles.fixerImage} src="/images/partner-the-fixer.svg" alt="The Fixer property advisory" />;
}

export function InteractivePropertyPartners() {
  const [active, setActive] = useState<PartnerKey | null>(null);

  return (
    <div className={styles.grid}>
      {partners.map((partner) => {
        const revealed = active === partner.key;

        return (
          <article
            className={cardStyles.card}
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
              className={cardStyles.revealButton}
              type="button"
              aria-expanded={revealed}
              aria-label={`${revealed ? "Hide" : "Show"} details about ${partner.name}`}
              onClick={() => setActive(revealed ? null : partner.key)}
            >
              <span className={cardStyles.front}>
                <span className={cardStyles.logoWrap}><FrontLogo partner={partner} /></span>
                <span className={cardStyles.hint}>Hover or tap to discover <b>+</b></span>
              </span>
            </button>

            <div className={cardStyles.reveal} aria-hidden={!revealed}>
              <span className={cardStyles.watermark} aria-hidden="true">{partner.mark}</span>
              <p className={cardStyles.kicker}>{partner.kicker}</p>
              <h3>{partner.name}</h3>
              <p className={cardStyles.representative}><span>Representative</span>{partner.representative}</p>
              <p className={cardStyles.description}>{partner.description}</p>
              <a className={cardStyles.visitLink} href={partner.href}>
                Visit partner <span>→</span>
              </a>
            </div>
          </article>
        );
      })}

      <a className={styles.luxoCard} href="/go/luxoestates" aria-label="Enquire through LuxoEstates">
        <span>Luxo</span><b>Estates</b>
      </a>
    </div>
  );
}
