import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { LabuanAdviser } from "./LabuanAdviser";
import pageStyles from "./AdviserPage.module.css";

export const metadata: Metadata = {
  title: "Ask EuroAsia | Malaysia & Labuan Adviser",
  description:
    "Ask questions about the PF EuroAsia Malaysia and Labuan company, tax and residency pathway using our controlled knowledge base.",
};

export default function LabuanAdviserPage() {
  return (
    <main className={pageStyles.page}>
      <Header enquireHref="/asia-gateway/enquire" enquireLabel="Asia enquiry" />

      <section className={pageStyles.section}>
        <div className={`site-shell ${pageStyles.shell}`}>
          <p className="eyebrow">Malaysia · Labuan IBFC</p>
          <div className={pageStyles.introGrid}>
            <div>
              <h1>
                Ask EuroAsia.<br />Malaysia & Labuan.
              </h1>
            </div>
            <div className={pageStyles.introCopy}>
              <p>
                Ask practical questions about the current PF EuroAsia Labuan company and residency pathway. The adviser only answers from our controlled Malaysia/Labuan knowledge base and flags anything that still needs professional confirmation.
              </p>
              <Link href="/services/labuan-company-residency" className="text-link">
                Read the full Labuan guide <span>→</span>
              </Link>
            </div>
          </div>

          <LabuanAdviser />
        </div>
      </section>

      <Footer />
    </main>
  );
}
