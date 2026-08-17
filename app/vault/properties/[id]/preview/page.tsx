import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PrivatePropertyCard } from "../../../../components/PrivatePropertyCard";
import {
  normalizePropertyAccessLevel,
  readProperties,
  type VaultProperty,
} from "../../../../lib/propertyStore";
import { hasVaultAccess } from "../../../../lib/vaultSession";
import { StatusButton } from "./StatusButton";
import { VisibilityControls } from "./VisibilityControls";
import "../../../vault.css";
import "../../../../private-portfolio/portfolio-collection.css";

export const metadata: Metadata = {
  title: "Property Preview | EuroAsia Vault",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function visibilityLabel(value?: string) {
  if (value === "teaser") return "Private teaser";
  if (value === "public") return "Public carousel listing";
  return "Fully confidential";
}

async function findPropertyWithRetry(id: string): Promise<VaultProperty | undefined> {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const properties = await readProperties();
    const property = properties.find((item) => item.id === id);
    if (property) return property;

    if (attempt < 5) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return undefined;
}

export default async function PropertyPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await hasVaultAccess())) redirect("/vault");

  const { id } = await params;
  const property = await findPropertyWithRetry(id);
  if (!property) notFound();

  const accessLevel = normalizePropertyAccessLevel(
    property.accessLevel,
    property.visibility,
  );
  const carouselEligible =
    property.status === "published" &&
    (property.visibility === "teaser" || property.visibility === "public") &&
    property.publicImageApproved === true;

  return (
    <main className="vault-dashboard-page vault-preview-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header vault-preview-header">
          <div>
            <p className="vault-kicker">Property layout preview</p>
            <h1>{property.title}</h1>
            <p>{property.reference} · {property.location}</p>
          </div>
          <div className="vault-header-actions">
            <Link className="vault-secondary-button" href="/vault/dashboard">← Back to Vault</Link>
            {property.brochure && (
              <a
                className="vault-secondary-button"
                href={`/api/vault/properties/${property.id}/brochure`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Check Secured Brochure
              </a>
            )}
            <StatusButton id={property.id} status={property.status} />
          </div>
        </header>

        <section className="vault-preview-notice">
          <div>
            <strong>{property.status === "published" ? "Published" : "Draft preview"}</strong>
            <p>
              {property.status === "published"
                ? accessLevel === "registered"
                  ? "This is a registered market listing. Full particulars open automatically after the visitor verifies their name, email and telephone details."
                  : "This is a Private Off-Market listing. Full particulars are limited to individually approved Private Collection clients."
                : "This is the exact property-card presentation, but the listing is not visible to clients yet."}
            </p>
            <p>
              Client access: <strong>{accessLevel === "registered" ? "Registered listing" : "Private off-market"}</strong>
              {" · "}Public presentation: <strong>{visibilityLabel(property.visibility)}</strong>
              {carouselEligible
                ? " · Approved for the homepage carousel."
                : " · Not currently visible in the homepage carousel."}
            </p>
          </div>
          <span className={`vault-status vault-status-${property.status}`}>{property.status}</span>
        </section>

        <VisibilityControls property={property} />

        <section className="private-collection-grid vault-preview-grid">
          <PrivatePropertyCard property={property} showEnquiry={false} brochureMode="preview" detailMode />
        </section>
      </div>
    </main>
  );
}
