"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./PartnerNetworkDialog.module.css";

const partnerGroups = [
  {
    title: "Property representation",
    partners: [
      ["Property Facilitators Iberia", "/go/pfiberia"],
      ["Aylesford Spain", "/go/aylesford"],
      ["House & Country Real Estate", "/go/house-country"],
      ["The Fixer · Robert Bazo", "/go/the-fixer"],
      ["LuxoEstates", "/go/luxoestates"],
    ],
  },
  {
    title: "Legal representation",
    partners: [
      ["Lawbird Legal Services", "/go/lawbird"],
      ["Legal 10 Abogados Marbella", "/go/legal10"],
      ["Martínez-Echevarría Lawyers", "/go/martinezechevarria"],
    ],
  },
  {
    title: "Luxury villa rentals",
    partners: [["The Luxury Villa Collection", "/luxury-villa-rentals#villa-enquiry"]],
  },
] as const;

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
    const closeTimer = window.setTimeout(() => setOpen(false), 8000);
    return () => window.clearTimeout(closeTimer);
  }, [open]);

  return (
    <>
      <button className={styles.trigger} type="button" onClick={() => setOpen(true)}>
        Discover our partners <span aria-hidden="true">＋</span>
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
          <p className={styles.eyebrow}>Our collaboration network</p>
          <h3 id="partner-dialog-title">Trusted specialists, connected across borders.</h3>
          <p className={styles.intro}>
            Select a partner to discover the established professionals working with PF EuroAsia.
          </p>

          <div className={styles.groups}>
            {partnerGroups.map((group) => (
              <section className={styles.group} key={group.title}>
                <h4>{group.title}</h4>
                <div className={styles.partnerList}>
                  {group.partners.map(([name, href]) => (
                    <Link href={href} key={name}>
                      <span>{name}</span><b aria-hidden="true">→</b>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <p className={styles.timerNote}>This panel closes automatically after a few seconds.</p>
        </div>
      </dialog>
    </>
  );
}
