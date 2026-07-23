import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PrivatePortfolioRegistration } from "../components/PrivatePortfolioRegistration";
import "./private-portfolio.css";

export const metadata: Metadata = {
  title: "Private Property Portfolio | Property Facilitators EuroAsia",
  description: "Register for confidential access to selected off-market and discreetly marketed luxury property opportunities in Southern Spain.",
  robots: { index: true, follow: true },
};

export default function PrivatePortfolioPage() {
  return (
    <main className="private-registration-page">
      <Header />
      <PrivatePortfolioRegistration />
      <Footer />
    </main>
  );
}
