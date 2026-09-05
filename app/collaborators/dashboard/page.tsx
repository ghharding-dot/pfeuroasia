import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCollaboratorSession } from "../../lib/collaboratorSession";
import { readProperties } from "../../lib/propertyStore";
import { readRentalVillas } from "../../lib/rentalVillaStore";
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

  const [allProperties, allRentalVillas] = await Promise.all([
    readProperties(),
    readRentalVillas(),
  ]);
  const properties = allProperties.filter(
    (property) => property.listingPartnerCode === collaborator.partnerCode,
  );
  const rentalVillas = allRentalVillas.filter(
    (villa) => villa.listingPartnerCode === collaborator.partnerCode,
  );
  const submissions = collaborator.partnerCode === "LVC" ? rentalVillas : properties;
  const published = submissions.filter((item) => item.status === "published").length;
  const pending = submissions.length - published;

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">PF EuroAsia approved collaborator</p>
            <h1>{collaborator.partnerName}</h1>
            <p>Submit and monitor your listings. PF EuroAsia controls final publication.</p>
          </div>
          <div className="vault-header-actions">
            <Link className="vault-secondary-button" href="/collaborators/documents">
              Document Centre
            </Link>
            {collaborator.partnerCode === "LVC" ? (
              <Link className="vault-primary-button" href="/collaborators/rentals/new">
                Add Rental Villa
              </Link>
            ) : (
              <Link className="vault-primary-button" href="/collaborators/properties/new">
                Add New Property
              </Link>
            )}
            <LogoutButton />
          </div>
        </header>

        <section className="vault-stats" aria-label="Collaborator property summary">
          <article className="vault-stat"><strong>{submissions.length}</strong><span>Your listings</span></article>
          <article className="vault-stat"><strong>{pending}</strong><span>Pending review</span></article>
          <article className="vault-stat"><strong>{published}</strong><span>Published</span></article>
        </section>

        <section className="vault-panel collaborator-resource-panel">
          <div className="collaborator-resource-copy">
            <p className="vault-kicker">Shared collaborator resources</p>
            <h2>Residency, company formation and application documents</h2>
            <p>
              Access the same current Spain and Malaysia guidance, information packs and
              application forms available to every approved PF EuroAsia collaborator.
              Property brochures are managed separately and are not included here.
            </p>
          </div>
          <Link className="vault-primary-button" href="/collaborators/documents">
            Open Document Centre
          </Link>
        </section>

        {collaborator.partnerCode === "LVC" ? (
          <section className="vault-panel">
            <div className="vault-panel-header">
              <div>
                <h2>Your rental villa submissions</h2>
                <p className="vault-panel-note">Edit any villa here. Updated published villas return to PF EuroAsia for approval.</p>
              </div>
            </div>
            {rentalVillas.length === 0 ? (
              <div className="vault-empty">
                No rental villas have been submitted yet. Use Add Rental Villa to send the first villa for review.
              </div>
            ) : (
              <div className="vault-property-list">
                {rentalVillas.map((villa) => {
                  const label = statusLabel(villa);
                  const statusClass = villa.status === "published" ? "published" : "draft";
                  return (
                    <article className="vault-property-row" key={villa.id}>
                      <div className="vault-property-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={villa.image} alt="" />
                      </div>
                      <div className="vault-property-copy">
                        <span>{villa.reference} · {villa.location}</span>
                        <h3>{villa.title}</h3>
                        <p>{villa.bedrooms || "—"} bedrooms · sleeps {villa.guests || "—"}</p>
                      </div>
                      <span className={`vault-status vault-status-${statusClass}`}>{label}</span>
                      <div className="vault-row-actions">
                        <Link className="vault-row-action" href={`/collaborators/rentals/${villa.id}/edit`}>
                          Edit
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        ) : (
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
                    <div className="vault-row-actions">
                      <Link className="vault-row-action" href={`/collaborators/properties/${property.id}/preview`}>
                        Preview
                      </Link>
                      <Link className="vault-row-action" href={`/collaborators/properties/${property.id}/edit`}>
                        Edit
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        )}
      </div>
    </main>
  );
}
