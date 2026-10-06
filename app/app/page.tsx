"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./app.module.css";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function EuroAsiaAppInstallPage() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
    setIsIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    setStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
      navigatorWithStandalone.standalone === true
    );

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  async function install() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    await promptEvent.userChoice;
    setPromptEvent(null);
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <Image
          src="/images/pf-gold-symbol.png"
          alt="Property Facilitators EuroAsia"
          width={74}
          height={102}
          className={styles.logo}
          priority
        />
        <p className={styles.eyebrow}>PROPERTY FACILITATORS EUROASIA</p>
        <h1>Install the EuroAsia app</h1>
        <p className={styles.copy}>
          Add EuroAsia to your phone for a full-screen app experience with direct access to
          property, rentals, residency, relocation and Maya, our AI advisor.
        </p>

        {standalone ? (
          <div className={styles.installed}>EuroAsia is already installed on this device.</div>
        ) : promptEvent ? (
          <button className={styles.installButton} onClick={install} type="button">
            Install EuroAsia App
          </button>
        ) : isIos ? (
          <div className={styles.instructions}>
            <strong>On iPhone or iPad</strong>
            <span>1. Tap the Share button at the bottom of Safari.</span>
            <span>2. Choose <b>Add to Home Screen</b>.</span>
            <span>3. Tap <b>Add</b>.</span>
          </div>
        ) : (
          <div className={styles.instructions}>
            <strong>Install on this device</strong>
            <span>Open your browser menu and choose <b>Install app</b> or <b>Add to Home Screen</b>.</span>
          </div>
        )}

        <Link href="/" className={styles.openLink}>
          Open EuroAsia
        </Link>

        <p className={styles.note}>
          Once installed, launch EuroAsia from the icon on your home screen rather than from the browser.
        </p>
      </div>
    </main>
  );
}
