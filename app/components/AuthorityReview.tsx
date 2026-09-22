import styles from "./AuthorityReview.module.css";

type AuthorityReviewProps = {
  focus: "malaysia" | "spain";
  updated?: string;
};

export function AuthorityReview({ focus, updated = "1 September 2026" }: AuthorityReviewProps) {
  const reviewText = focus === "malaysia"
    ? "Reviewed by Geoff Harding, founder of PF EuroAsia, with input from its Malaysian professional collaboration network."
    : "Reviewed by Geoff Harding, founder of PF EuroAsia, using direct Costa del Sol market experience.";

  return (
    <aside className={styles.review} aria-label="Editorial review information">
      <div className={`site-shell ${styles.inner}`}>
        <div>
          <span className={styles.label}>Editorial review</span>
          <strong>{reviewText}</strong>
        </div>
        <p>
          Updated {updated}. General information only; individual legal,
          tax and immigration advice should be obtained from appropriately qualified professionals.
        </p>
      </div>
    </aside>
  );
}
