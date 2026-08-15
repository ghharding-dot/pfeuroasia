import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { LabuanAdviserAccess } from "./LabuanAdviserAccess";
import pageStyles from "./AdviserPage.module.css";

export const metadata: Metadata = {
  title: "Ask EuroAsia | Malaysia Living & Labuan Adviser",
  description:
    "Ask practical questions about living in Malaysia, Kuala Lumpur, travel, property, healthcare and the PF EuroAsia Labuan company and residency pathway.",
};

export default function LabuanAdviserPage() {
  return (
    <main className={pageStyles.page}>
      <Header enquireHref="/asia-gateway/enquire" enquireLabel="Asia enquiry" />

      <section className={pageStyles.section}>
        <div className={`site-shell ${pageStyles.shell}`}>
          <p className="eyebrow">Malaysia · Living · Property · Labuan</p>
          <div className={pageStyles.introGrid}>
            <div>
              <h1>
                Ask EuroAsia.<br />Malaysia & Labuan.
              </h1>
            </div>
            <div className={pageStyles.introCopy}>
              <p>
                Ask practical questions about living in Malaysia, Kuala Lumpur property and costs, healthcare, transport, international connections, destinations and the PF EuroAsia Labuan company and residency pathway. Answers are drawn from a controlled, sourced knowledge base and market-sensitive information is dated so it can be kept current.
              </p>
              <Link href="/services/labuan-company-residency" className="text-link">
                Read the full Labuan guide <span>→</span>
              </Link>
            </div>
          </div>

          <LabuanAdviserAccess />
        </div>
      </section>

      <Footer />
    </main>
  );
}
