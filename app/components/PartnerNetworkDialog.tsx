"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PartnerNetworkDialog.module.css";

export function PartnerNetworkDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }

    if (!dialog.open) dialog.showModal();
  }, [open]);

  return (
    <>
      <button className={styles.trigger} type="button" onClick={() => setOpen(true)}>
        Read our full mission <span aria-hidden="true">＋</span>
      </button>

      <dialog
        className={styles.dialog}
        ref={dialogRef}
        aria-labelledby="partner-dialog-title"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className={styles.panel}>
          <button className={styles.close} type="button" onClick={() => setOpen(false)} aria-label="Close partner panel">
            ×
          </button>
          <p className={styles.eyebrow}>PF EuroAsia</p>
          <h3 id="partner-dialog-title">Our Mission</h3>
          <div className={styles.missionText}>
            <p>
              PF EuroAsia was created to bring trusted professionals together across borders,
              combining established relationships, specialist knowledge and local expertise
              within one coordinated international network.
            </p>
            <p>
              We collaborate with real estate professionals, lawyers, tax and corporate
              advisers, residency specialists and relocation experts. This allows each
              professional to retain the trust of their existing clients while giving those
              clients access to verified opportunities, services and expertise in markets they
              may not previously have considered.
            </p>
            <p>
              Our objective is to help clients explore international property, investment,
              relocation, tax-residency and company-formation options with greater confidence.
              Whether considering Spain, Gibraltar, Scandinavia, Malaysia or the wider Asian
              market, clients are introduced to experienced professionals with the appropriate
              local knowledge.
            </p>
            <p>
              PF EuroAsia is not simply another property agency. It is a collaborative gateway
              connecting trusted advisers, their clients and carefully selected international
              opportunities.
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
