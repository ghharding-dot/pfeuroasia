import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { LabuanAdviser } from "./LabuanAdviser";

export const metadata: Metadata = {
  title: "Ask EuroAsia | Malaysia & Labuan Adviser",
  description:
    "Ask questions about the PF EuroAsia Malaysia and Labuan company, tax and residency pathway using our controlled knowledge base.",
};

export default function LabuanAdviserPage() {
  return (
    <main style={{ background: "#f4f1e9", color: "#171916" }}>
      <Header enquireHref="/asia-gateway/enquire" enquireLabel="Asia enquiry" />

      <section style={{ padding: "150px 0 72px" }}>
        <div className="site-shell" style={{ maxWidth: 1120 }}>
          <p className="eyebrow">Malaysia · Labuan IBFC</p>
          <div style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 70, alignItems: "end", marginBottom: 48 }}>
            <div>
              <h1 style={{ margin: "8px 0 0", fontFamily: "var(--serif)", fontSize: "clamp(54px, 7vw, 94px)", fontWeight: 400, letterSpacing: "-.05em", lineHeight: .94 }}>
                Ask EuroAsia.<br />Malaysia & Labuan.
              </h1>
            </div>
            <div>
              <p style={{ margin: 0, color: "#65685f", fontSize: 15, lineHeight: 1.8 }}>
                Ask practical questions about the current PF EuroAsia Labuan company and residency pathway. The adviser only answers from our controlled Malaysia/Labuan knowledge base and flags anything that still needs professional confirmation.
              </p>
              <Link href="/services/labuan-company-residency" className="text-link" style={{ display: "inline-flex", marginTop: 18 }}>
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
