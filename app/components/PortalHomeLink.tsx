import Link from "next/link";
import styles from "./PortalHomeLink.module.css";

export function PortalHomeLink() {
  return (
    <nav className={styles.homeNav} aria-label="Portal navigation">
      <Link className={styles.homeLink} href="/" aria-label="Return to the PF EuroAsia home page">
        <span aria-hidden="true">⌂</span>
        Home Page
      </Link>
    </nav>
  );
}
