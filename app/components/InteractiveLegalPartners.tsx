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
  instagram?: string;
};

const partners: Partner[] = [
  {
    key: "lawbird",
    name: "Lawbird Legal Services",
    href: "/go/lawbird",
    kicker: "Local Marbella lawyers",
    description:
      "Marbella-based legal support for international clients, including property, corporate, litigation and immigration matters in Spain.",
    mark: "LB",
    instagram: "lawbird_lawyers",
  },
  {
    key: "legal10",
    name: "Legal 10 Abogados Marbella",
    href: "/go/legal10",
    kicker: "Specialist criminal services",
    description:
      "Legal, tax and financial advice with specialist criminal law services and offices in Marbella and Madrid.",
    mark: "10",
  },
  {
    key: "martinez",
    name: "Martínez-Echevarría Lawyers",
    href: "/go/martinezechevarria",
    kicker: "International legal counsel",
    description:
      "International legal support with offices across Portugal, Madrid, Marbella, Málaga, Turkey and Dubai, covering real estate, tax and wider commercial matters.",
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
  const [instagramFeed, setInstagramFeed] = useState<PartnerKey | null>(null);
  const selectedInstagramPartner = partners.find(
    (partner) => partner.key === instagramFeed && partner.instagram,
  );

  return (
    <>
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
              <div className={styles.partnerActions}>
                <a className={styles.visitLink} href={partner.href}>
                  Visit partner <span>→</span>
                </a>
                {partner.instagram ? (
                  <button
                    className={styles.instagramButton}
                    type="button"
                    aria-expanded={instagramFeed === partner.key}
                    aria-controls="legal-partner-instagram-feed"
                    onClick={() =>
                      setInstagramFeed(
                        instagramFeed === partner.key ? null : partner.key,
                      )
                    }
                  >
                    Instagram @{partner.instagram} <span>↘</span>
                  </button>
                ) : null}
              </div>
            </div>
          </article>
        );
        })}
      </div>

      {selectedInstagramPartner ? (
        <section
          className={styles.instagramPanel}
          id="legal-partner-instagram-feed"
          aria-label={`${selectedInstagramPartner.name} Instagram feed`}
        >
          <div className={styles.instagramHeading}>
            <div>
              <p>Instagram</p>
              <h3>{selectedInstagramPartner.name}</h3>
              <span>@{selectedInstagramPartner.instagram}</span>
            </div>
            <div className={styles.instagramHeadingActions}>
              <a
                href={`https://www.instagram.com/${selectedInstagramPartner.instagram}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Instagram <span>↗</span>
              </a>
              <button type="button" onClick={() => setInstagramFeed(null)}>
                Close
              </button>
            </div>
          </div>
          <iframe
            className={styles.instagramEmbed}
            src={`https://www.instagram.com/${selectedInstagramPartner.instagram}/embed/`}
            title={`${selectedInstagramPartner.name} on Instagram`}
            loading="lazy"
            allow="encrypted-media"
          />
          <p className={styles.instagramFallback}>
            Instagram content may be hidden by browser privacy settings. If so,
            use “Open Instagram” above.
          </p>
        </section>
      ) : null}
    </>
  );
}
