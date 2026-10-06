"use client";

import { useEffect, useState } from "react";
import styles from "./InstallEuroAsiaApp.module.css";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallEuroAsiaApp() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { standalone?: boolean };
    setIsIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    setStandalone(window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true);

    const handler = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (standalone) return <span className={styles.installed}>Installed as your EuroAsia app</span>;

  if (promptEvent) {
    return (
      <button
        type="button"
        className={styles.button}
        onClick={async () => {
          await promptEvent.prompt();
          const choice = await promptEvent.userChoice;
          if (choice.outcome === "accepted") setStandalone(true);
          setPromptEvent(null);
        }}
      >
        Install EuroAsia App
      </button>
    );
  }

  if (isIos) {
    return (
      <div className={styles.ios}>
        <strong>Add EuroAsia to your iPhone</strong>
        <span>Tap Share, then “Add to Home Screen”.</span>
      </div>
    );
  }

  return <span className={styles.hint}>Use your browser menu to install EuroAsia on this device.</span>;
}
