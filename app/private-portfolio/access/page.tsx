import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { PrivatePortfolioLogin } from "../../components/PrivatePortfolioLogin";
import "../private-portfolio.css";

export const metadata: Metadata = {
  title: "Private Portfolio Access | Property Facilitators EuroAsia",
  robots: { index: false, follow: false },
};

export default function PrivatePortfolioAccessPage() {
  return (
    <main className="private-registration-page">
      <Header />
      <section className="portfolio-access site-shell">
        <div>
          <p className="eyebrow">Approved client access</p>
          <h1>Private Property Collection</h1>
          <p>
            Enter the password supplied by Property Facilitators EuroAsia. Access is reserved for approved prospective purchasers and professional advisers.
          </p>
          <PrivatePortfolioLogin />
        </div>
      </section>
      <Footer />
    </main>
  );
}
