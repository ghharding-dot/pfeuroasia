import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RentalVillaUploadForm } from "../../../components/RentalVillaUploadForm";
import { getCollaboratorSession } from "../../../lib/collaboratorSession";
import "../../../vault/vault.css";
import "../../portal.css";

export const metadata: Metadata = {
  title: "Submit Rental Villa | PF EuroAsia Collaborator Portal",
  robots: { index: false, follow: false },
};

export default async function CollaboratorNewRentalVillaPage() {
  const collaborator = await getCollaboratorSession();
  if (!collaborator) redirect("/collaborators");
  if (collaborator.partnerCode !== "LVC") redirect("/collaborators/dashboard");

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">Luxury Villa Collection submission</p>
            <h1>Add Rental Villa</h1>
            <p>{collaborator.partnerName} · Pending PF EuroAsia approval</p>
          </div>
          <Link className="vault-secondary-button" href="/collaborators/dashboard">
            Back to Dashboard
          </Link>
        </header>
        <RentalVillaUploadForm
          partnerCode={collaborator.partnerCode}
          partnerName={collaborator.partnerName}
        />
      </div>
    </main>
  );
}
