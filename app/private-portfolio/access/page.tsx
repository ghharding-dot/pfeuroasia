import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { PrivatePortfolioLogin } from "../../components/PrivatePortfolioLogin";
import {
  PORTFOLIO_COOKIE_NAME,
  verifyPrivateClientSession,
} from "../../lib/portfolioAuth";
import { findPrivateClientById } from "../../lib/privateClientStore";
import "../private-portfolio.css";
import "../portfolio-collection.css";
import "../client-access.css";

export const metadata: Metadata = {
  title: "Private Portfolio Access",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PrivatePortfolioAccessPage() {
  const cookieStore = await cookies();
  const session = verifyPrivateClientSession(
    cookieStore.get(PORTFOLIO_COOKIE_NAME)?.value,
  );

  if (session) {
    const client = await findPrivateClientById(session.clientId);
    if (client?.status === "approved" && client.email === session.email) {
      redirect("/private-portfolio/collection");
    }
  }

  return (
    <main className="private-registration-page">
      <Header />
      <section className="portfolio-access site-shell">
        <div>
          <p className="eyebrow">Approved client access</p>
          <h1>Private Property Collection</h1>
          <p>
            Enter your approved email address. We will send you a secure six-digit access code. Access is reserved for approved prospective purchasers and professional advisers.
          </p>
          <PrivatePortfolioLogin theme="light" showRegistrationLink />
        </div>
      </section>
      <Footer />
    </main>
  );
}
