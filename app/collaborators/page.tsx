import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CollaboratorLogin } from "../components/CollaboratorLogin";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { getCollaboratorSession } from "../lib/collaboratorSession";
import "./collaborators.css";

export const metadata: Metadata = {
  title: "Collaborator Login | Property Facilitators EuroAsia",
  description: "Secure property submission portal for approved PF EuroAsia collaborators.",
  robots: { index: false, follow: false },
};

export default async function CollaboratorLoginPage() {
  if (await getCollaboratorSession()) redirect("/collaborators/dashboard");

  return (
    <main className="collaborator-login-page">
      <Header />
      <section className="collaborator-access site-shell">
        <div className="collaborator-access-copy">
          <p className="eyebrow">Approved collaboration partners</p>
          <h1>Collaborator Portal</h1>
          <p>
            Securely submit properties and access shared residency, company-formation and application documents.
          </p>
          <ul>
            <li>Your company is automatically attached to each submission.</li>
            <li>Properties remain pending until PF EuroAsia approves them.</li>
            <li>Client brochure access is verified, recorded and individually watermarked.</li>
            <li>Spain and Malaysia information PDFs are available to every approved collaborator.</li>
          </ul>
        </div>
        <div className="collaborator-access-card">
          <p className="eyebrow">Secure email access</p>
          <h2>Sign in without a password</h2>
          <p>Enter the approved email address registered for your company. We will send a six-digit access code.</p>
          <CollaboratorLogin />
        </div>
      </section>
      <Footer />
    </main>
  );
}
