import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { RentalVillaUploadForm } from "../../../../components/RentalVillaUploadForm";
import { getCollaboratorSession } from "../../../../lib/collaboratorSession";
import { readRentalVillas } from "../../../../lib/rentalVillaStore";
import "../../../../vault/vault.css";
import "../../../portal.css";

export const metadata: Metadata = {
  title: "Edit Rental Villa | PF EuroAsia Collaborator Portal",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CollaboratorEditRentalVillaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const collaborator = await getCollaboratorSession();
  if (!collaborator) redirect("/collaborators");
  if (collaborator.partnerCode !== "LVC") redirect("/collaborators/dashboard");

  const { id } = await params;
  const villa = (await readRentalVillas()).find(
    (item) => item.id === id && item.listingPartnerCode === collaborator.partnerCode,
  );
  if (!villa) notFound();

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">Luxury Villa Collection · {villa.reference}</p>
            <h1>Edit {villa.title}</h1>
            <p>Saved changes return to PF EuroAsia for approval.</p>
          </div>
          <Link className="vault-secondary-button" href="/collaborators/dashboard">
            Back to Dashboard
          </Link>
        </header>
        <RentalVillaUploadForm
          partnerCode={collaborator.partnerCode}
          partnerName={collaborator.partnerName}
          villa={villa}
        />
      </div>
    </main>
  );
}
