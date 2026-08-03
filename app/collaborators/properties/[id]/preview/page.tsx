import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PrivatePropertyCard } from "../../../../components/PrivatePropertyCard";
import { getCollaboratorSession } from "../../../../lib/collaboratorSession";
import { readProperties } from "../../../../lib/propertyStore";
import "../../../../vault/vault.css";
import "../../../../private-portfolio/portfolio-collection.css";

export const metadata: Metadata = {
  title: "Property Preview | PF EuroAsia Collaborator Portal",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CollaboratorPropertyPreviewPage({
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

  const status = property.status === "published"
    ? "Published"
    : property.approvalStatus === "changes-requested"
      ? "Changes requested"
      : "Pending PF EuroAsia approval";

  return (
    <main className="vault-dashboard-page vault-preview-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header vault-preview-header">
          <div>
            <p className="vault-kicker">Collaborator property preview</p>
            <h1>{property.title}</h1>
            <p>{property.reference} · {property.location}</p>
          </div>
          <Link className="vault-secondary-button" href="/collaborators/dashboard">
            ← Back to Dashboard
          </Link>
        </header>

        <section className="vault-preview-notice">
          <div>
            <strong>{status}</strong>
            <p>
              {property.status === "published"
                ? "This property is live inside the password-protected Private Collection."
                : "PF EuroAsia will review the details, photography and brochure before publication."}
            </p>
          </div>
          <span className={`vault-status vault-status-${property.status}`}>{property.status}</span>
        </section>

        <section className="private-collection-grid vault-preview-grid">
          <PrivatePropertyCard property={property} showEnquiry={false} brochureMode="preview" />
        </section>
      </div>
    </main>
  );
}
