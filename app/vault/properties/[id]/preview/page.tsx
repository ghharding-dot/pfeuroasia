import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PrivatePropertyCard } from "../../../../components/PrivatePropertyCard";
import { readProperties } from "../../../../lib/propertyStore";
import { hasVaultAccess } from "../../../../lib/vaultSession";
import { StatusButton } from "./StatusButton";
import "../../../vault.css";
import "../../../../private-portfolio/portfolio-collection.css";

export const metadata: Metadata = {
  title: "Property Preview | EuroAsia Vault",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PropertyPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await hasVaultAccess())) redirect("/vault");

  const { id } = await params;
  const properties = await readProperties();
  const property = properties.find((item) => item.id === id);
  if (!property) notFound();

  return (
    <main className="vault-dashboard-page vault-preview-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header vault-preview-header">
          <div>
            <p className="vault-kicker">Private Collection layout preview</p>
            <h1>{property.title}</h1>
            <p>{property.reference} · {property.location}</p>
          </div>
          <div className="vault-header-actions">
            <Link className="vault-secondary-button" href="/vault/dashboard">← Back to Vault</Link>
            <StatusButton id={property.id} status={property.status} />
          </div>
        </header>

        <section className="vault-preview-notice">
          <div>
            <strong>{property.status === "published" ? "Published" : "Draft preview"}</strong>
            <p>
              {property.status === "published"
                ? "This property is visible inside the password-protected Private Collection."
                : "This is the exact property-card presentation, but the listing is not visible to clients yet."}
            </p>
          </div>
          <span className={`vault-status vault-status-${property.status}`}>{property.status}</span>
        </section>

        <section className="private-collection-grid vault-preview-grid">
          <PrivatePropertyCard property={property} showEnquiry={false} />
        </section>
      </div>
    </main>
  );
}
