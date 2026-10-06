"use client";

import styles from "./MayaOpenButton.module.css";

export function MayaOpenButton() {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => window.dispatchEvent(new Event("euroasia:open-maya"))}
    >
      Talk to Maya
    </button>
  );
}
