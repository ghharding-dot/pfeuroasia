import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createVaultToken, getVaultPassword, VAULT_COOKIE_NAME } from "../../lib/vaultAuth";
import { readProperties, type VaultProperty } from "../../lib/propertyStore";
import "../vault.css";

export const metadata: Metadata = {
  title: "Vault Dashboard | Property Facilitators EuroAsia",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function carouselStatus(property: VaultProperty) {
  if (property.status !== "published") {
    return { label: "Not on carousel", reason: "Property is not published", state: "off" };
  }
  if (property.visibility !== "teaser" && property.visibility !== "public") {
    return { label: "Not on carousel", reason: "Visibility is fully confidential", state: "off" };
  }
  if (property.publicImageApproved !== true) {
    return { label: "Not on carousel", reason: "Public photograph not approved", state: "warning" };
  }
  if (!property.image) {
    return { label: "Not on carousel", reason: "Main photograph missing", state: "warning" };
  }
  return { label: "Carousel live", reason: "Visible on the homepage carousel", state: "live" };
}

export default async function VaultDashboardPage() {
  const configuredPassword = getVaultPassword();
  const cookieStore = await cookies();
  const token = cookieStore.get(VAULT_COOKIE_NAME)?.value;

  if (!configuredPassword || token !== createVaultToken(configuredPassword)) {
    redirect("/vault");
  }

  const properties = await readProperties();
  const published = properties.filter((property) => property.status === "published").length;
  const carouselLive = properties.filter(
    (property) => carouselStatus(property).state === "live",
  ).length;
  const pendingReview = properties.filter(
    (property) => property.status === "draft" && property.approvalStatus === "pending-review",
  ).length;
  const orderedProperties = [...properties].sort((a, b) => {
    const aPending = a.status === "draft" && a.approvalStatus === "pending-review" ? 1 : 0;
    const bPending = b.status === "draft" && b.approvalStatus === "pending-review" ? 1 : 0;
    if (aPending !== bPending) return bPending - aPending;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">Property Facilitators EuroAsia</p>
            <h1>The Vault</h1>
            <p>Upload, review and publish Private Collection properties.</p>
          </div>
          <Link className="vault-primary-button" href="/vault/properties/new">Add New Property</Link>
        </header>

        <section className="vault-stats" aria-label="Vault summary">
          <article className="vault-stat"><strong>{properties.length}</strong><span>Properties</span></article>
          <article className="vault-stat"><strong>{pendingReview}</strong><span>Pending review</span></article>
          <article className="vault-stat"><strong>{published}</strong><span>Published</span></article>
          <article className="vault-stat"><strong>{carouselLive}</strong><span>Carousel live</span></article>
        </section>

        <section className="vault-panel">
          <div className="vault-panel-header"><h2>Vault Properties</h2></div>
          {properties.length === 0 ? (
            <div className="vault-empty">No Vault-managed properties yet. Add the first property to begin.</div>
          ) : (
            <div className="vault-property-list">
              {orderedProperties.map((property) => {
                const isPendingReview =
                  property.status === "draft" && property.approvalStatus === "pending-review";
                const statusLabel = property.status === "published"
                  ? "Published"
                  : isPendingReview
                    ? "Pending review"
                    : "Draft";
                const carousel = carouselStatus(property);

                return (
                  <article className="vault-property-row" key={property.id}>
                    <div className="vault-property-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={property.image} alt="" />
                    </div>
                    <div className="vault-property-copy">
                      <span>
                        {property.reference} · {property.location}
                        {property.brochure ? " · Protected PDF attached" : " · PDF pending"}
                      </span>
                      <h3>{property.title}</h3>
                      <p>{property.price || "Price on application"}</p>
                      <small>Listing collaborator: {property.listingPartnerName || "Property Facilitators EuroAsia"}</small>
                      <small className={`vault-carousel-note vault-carousel-${carousel.state}`}>
                        <strong>{carousel.label}</strong> · {carousel.reason}
                      </small>
                    </div>
                    <span className={`vault-status vault-status-${property.status}`}>{statusLabel}</span>
                    <Link className="vault-row-action" href={`/vault/properties/${property.id}/preview`}>
                      Preview
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
