import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CollaboratorEditPropertyForm } from "./CollaboratorEditPropertyForm";
import { getCollaboratorSession } from "../../../../../lib/collaboratorSession";
import { readProperties } from "../../../../../lib/propertyStore";
import "../../../../../vault/vault.css";
import "../../../../portal.css";

export const metadata: Metadata = {
  title: "Edit Property | PF EuroAsia Collaborator Portal",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CollaboratorEditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const collaborator = await getCollaboratorSession();
  if (!collaborator) redirect("/collaborators");

  const { id } = await params;
  const properties = await readProperties();
  const property = properties.find(
    (item) => item.id === id && item.listingPartnerCode === collaborator.partnerCode,
  );
  if (!property) notFound();

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">Collaborator property update</p>
            <h1>Edit {property.title}</h1>
            <p>{property.reference} · {collaborator.partnerName}</p>
          </div>
          <Link className="vault-secondary-button" href={`/collaborators/properties/${property.id}/preview`}>
            ← Back to Preview
          </Link>
        </header>

        <CollaboratorEditPropertyForm
          property={property}
          partnerCode={collaborator.partnerCode}
          partnerName={collaborator.partnerName}
        />
      </div>
    </main>
  );
}
