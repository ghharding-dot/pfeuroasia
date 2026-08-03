import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCollaboratorSession } from "../../lib/collaboratorSession";
import { readProperties } from "../../lib/propertyStore";
import { LogoutButton } from "./LogoutButton";
import "../../vault/vault.css";
import "../portal.css";

export const metadata: Metadata = {
  title: "Collaborator Dashboard | Property Facilitators EuroAsia",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function statusLabel(property: {
  status: "draft" | "published";
  approvalStatus?: "approved" | "pending-review" | "changes-requested";
}) {
  if (property.status === "published") return "Published";
  if (property.approvalStatus === "changes-requested") return "Changes requested";
  return "Pending review";
}

export default async function CollaboratorDashboardPage() {
  const collaborator = await getCollaboratorSession();
  if (!collaborator) redirect("/collaborators");

  const allProperties = await readProperties();
  const properties = allProperties.filter(
    (property) => property.listingPartnerCode === collaborator.partnerCode,
  );
  const published = properties.filter((property) => property.status === "published").length;
  const pending = properties.length - published;

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">PF EuroAsia approved collaborator</p>
            <h1>{collaborator.partnerName}</h1>
            <p>Submit and monitor your properties. PF EuroAsia controls final publication.</p>
          </div>
          <div className="vault-header-actions">
            <Link className="vault-primary-button" href="/collaborators/properties/new">
              Add New Property
            </Link>
            <LogoutButton />
          </div>
        </header>

        <section className="vault-stats" aria-label="Collaborator property summary">
          <article className="vault-stat"><strong>{properties.length}</strong><span>Your properties</span></article>
          <article className="vault-stat"><strong>{pending}</strong><span>Pending review</span></article>
          <article className="vault-stat"><strong>{published}</strong><span>Published</span></article>
        </section>

        <section className="vault-panel">
          <div className="vault-panel-header">
            <div>
              <h2>Your property submissions</h2>
              <p className="vault-panel-note">Only properties assigned to {collaborator.partnerName} are shown.</p>
            </div>
          </div>
          {properties.length === 0 ? (
            <div className="vault-empty">
              No properties have been submitted yet. Use Add New Property to send the first listing for review.
            </div>
          ) : (
            <div className="vault-property-list">
              {properties.map((property) => {
                const label = statusLabel(property);
                const statusClass = property.status === "published" ? "published" : "draft";
                return (
                  <article className="vault-property-row" key={property.id}>
                    <div className="vault-property-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={property.image} alt="" />
                    </div>
                    <div className="vault-property-copy">
                      <span>
                        {property.reference} · {property.location}
                        {property.brochure ? " · Protected PDF attached" : " · PDF missing"}
                      </span>
                      <h3>{property.title}</h3>
                      <p>{property.price || "Price on application"}</p>
                    </div>
                    <span className={`vault-status vault-status-${statusClass}`}>{label}</span>
                    <Link className="vault-row-action" href={`/collaborators/properties/${property.id}/preview`}>
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
