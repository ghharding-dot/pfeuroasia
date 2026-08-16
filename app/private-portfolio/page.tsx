import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PrivatePortfolioRegistration } from "../components/PrivatePortfolioRegistration";
import { createMetadata } from "../lib/seo";
import "./private-portfolio.css";
import "./private-portfolio-mobile-fix.css";
import "./client-access.css";

export const metadata = createMetadata("portfolioEn");

export default function PrivatePortfolioPage() {
  return (
    <main className="private-registration-page">
      <Header />
      <PrivatePortfolioRegistration />
      <Footer />
    </main>
  );
}
