import { TrackedAnchor } from "./TrackedAnchor";
import styles from "./InstagramBridge.module.css";

type InstagramBridgeProps = {
  context: string;
  description?: string;
};

const instagramUrl = "https://www.instagram.com/pfiberia/";

export function InstagramBridge({
  context,
  description = "Follow selected property, relocation and residency stories connecting Marbella, Malaysia and wider international markets.",
}: InstagramBridgeProps) {
  return (
    <section className={styles.section} aria-label="PF EuroAsia on Instagram">
      <div className={`site-shell ${styles.shell}`}>
        <div className={styles.copy}>
          <p className="eyebrow light">PF EuroAsia on Instagram</p>
          <h2>Spain ↔ Asia,<br /><em>follow the journey.</em></h2>
        </div>
        <div className={styles.action}>
          <p>{description}</p>
          <TrackedAnchor
            className={styles.button}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            eventName="instagram_click"
            eventParameters={{ location: context, account: "pfiberia" }}
          >
            Follow @pfiberia <span aria-hidden="true">↗</span>
          </TrackedAnchor>
          <span className={styles.note}>Verified PF Iberia account · PF EuroAsia series</span>
        </div>
      </div>
    </section>
  );
}
