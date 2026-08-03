import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCollaboratorSession } from "../../../lib/collaboratorSession";
import { CollaboratorPropertyForm } from "./CollaboratorPropertyForm";
import "../../../vault/vault.css";
import "../../portal.css";

export const metadata: Metadata = {
  title: "Submit Property | PF EuroAsia Collaborator Portal",
  robots: { index: false, follow: false },
};

export default async function CollaboratorNewPropertyPage() {
  const collaborator = await getCollaboratorSession();
  if (!collaborator) redirect("/collaborators");

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">Collaborator property submission</p>
            <h1>Add New Property</h1>
            <p>{collaborator.partnerName} · Pending PF EuroAsia approval</p>
          </div>
          <Link className="vault-secondary-button" href="/collaborators/dashboard">
            ← Back to Dashboard
          </Link>
        </header>

        <CollaboratorPropertyForm
          partnerCode={collaborator.partnerCode}
          partnerName={collaborator.partnerName}
        />
      </div>
    </main>
  );
}
