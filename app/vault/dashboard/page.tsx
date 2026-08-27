import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createVaultToken, getVaultPassword, VAULT_COOKIE_NAME } from "../../lib/vaultAuth";
import {
  readPrivateClients,
  type PrivateClient,
} from "../../lib/privateClientStore";
import {
  readRegisteredListingLeads,
  type RegisteredListingLead,
} from "../../lib/registeredLeadStore";
import {
  normalizePropertyAccessLevel,
  readProperties,
  type VaultProperty,
} from "../../lib/propertyStore";
import { VaultClientActions } from "../VaultClientActions";
import "../vault.css";
import "../client-access.css";
import "../registered-leads.css";

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
  return {
    label: "Carousel live",
    reason: property.market === "malaysia" || property.market === "asia"
      ? "Visible on the Asia property carousel"
      : "Visible on the homepage carousel",
    state: "live",
  };
}

function formatDate(value?: string) {
  if (!value) return "Never";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function orderClients(clients: PrivateClient[]) {
  const priority = { pending: 3, approved: 2, revoked: 1 } as const;
  return [...clients].sort((a, b) => {
    const statusDifference = priority[b.status] - priority[a.status];
    if (statusDifference !== 0) return statusDifference;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

function orderRegisteredLeads(leads: RegisteredListingLead[]) {
  return [...leads].sort(
    (a, b) => new Date(b.lastLoginAt).getTime() - new Date(a.lastLoginAt).getTime(),
  );
}

export default async function VaultDashboardPage() {
  const configuredPassword = getVaultPassword();
  const cookieStore = await cookies();
  const token = cookieStore.get(VAULT_COOKIE_NAME)?.value;

  if (!configuredPassword || token !== createVaultToken(configuredPassword)) {
    redirect("/vault");
  }

  const [properties, clientResult, registeredLeadResult] = await Promise.all([
    readProperties(),
    readPrivateClients().catch((error) => {
      console.error("vault-private-clients-unavailable", error);
      return [] as PrivateClient[];
    }),
    readRegisteredListingLeads().catch((error) => {
      console.error("vault-registered-leads-unavailable", error);
      return [] as RegisteredListingLead[];
    }),
  ]);
  const clients = orderClients(clientResult);
  const registeredLeads = orderRegisteredLeads(registeredLeadResult);
  const published = properties.filter((property) => property.status === "published").length;
  const carouselLive = properties.filter(
    (property) => carouselStatus(property).state === "live",
  ).length;
  const pendingReview = properties.filter(
    (property) => property.status === "draft" && property.approvalStatus === "pending-review",
  ).length;
  const pendingClients = clients.filter((client) => client.status === "pending").length;
  const approvedClients = clients.filter((client) => client.status === "approved").length;
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
            <p>Manage properties, registered listing leads, Malaysia Adviser leads and approved Private Collection access.</p>
          </div>
          <div className="vault-header-actions">
            <Link className="vault-row-action" href="/vault/documents">Document Manager</Link>
            <Link className="vault-row-action" href="/vault/malaysia-adviser">Malaysia Adviser Register</Link>
            <Link className="vault-primary-button" href="/vault/properties/new">Add New Property</Link>
          </div>
        </header>

        <section className="vault-stats vault-stats-expanded vault-stats-access" aria-label="Vault summary">
          <article className="vault-stat"><strong>{properties.length}</strong><span>Properties</span></article>
          <article className="vault-stat"><strong>{pendingReview}</strong><span>Property reviews</span></article>
          <article className="vault-stat"><strong>{published}</strong><span>Published</span></article>
          <article className="vault-stat"><strong>{carouselLive}</strong><span>Carousel live</span></article>
          <article className="vault-stat"><strong>{registeredLeads.length}</strong><span>Verified listing leads</span></article>
          <article className="vault-stat vault-stat-attention"><strong>{pendingClients}</strong><span>Private approvals</span></article>
          <article className="vault-stat"><strong>{approvedClients}</strong><span>Approved private clients</span></article>
        </section>

        <section className="vault-panel vault-registered-panel">
          <div className="vault-panel-header vault-client-panel-header">
            <div>
              <h2>Registered Listing Leads</h2>
              <p>Visitors who supplied their name, email and telephone number and successfully verified their email. Access was granted automatically.</p>
            </div>
          </div>

          {registeredLeads.length === 0 ? (
            <div className="vault-empty">No registered-listing contact verifications have been completed yet.</div>
          ) : (
            <div className="vault-registered-lead-list">
              {registeredLeads.map((lead) => {
                const viewedProperties = lead.viewedPropertyIds
                  .map((id) => properties.find((property) => property.id === id))
                  .filter((property): property is VaultProperty => Boolean(property));

                return (
                  <article className="vault-registered-lead-row" key={lead.id}>
                    <div className="vault-client-main">
                      <span className="vault-client-status vault-registered-badge">Verified</span>
                      <div>
                        <h3>{lead.fullName}</h3>
                        <p>{lead.email} · {lead.telephone}</p>
                        <small>
                          {viewedProperties.length > 0
                            ? viewedProperties.map((property) => `${property.reference} — ${property.title}`).join(" · ")
                            : `${lead.viewedPropertyIds.length} registered listing access record(s)`}
                        </small>
                      </div>
                    </div>
                    <div className="vault-client-dates">
                      <span>First verified <strong>{formatDate(lead.createdAt)}</strong></span>
                      <span>Latest access <strong>{formatDate(lead.lastLoginAt)}</strong></span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="vault-panel vault-client-panel">
          <div className="vault-panel-header vault-client-panel-header">
            <div>
              <h2>Private Off-Market Clients</h2>
              <p>Approve detailed applications, review client requirements or withdraw access immediately.</p>
            </div>
            <Link className="vault-row-action" href="/private-portfolio/access" target="_blank">
              Open private client login
            </Link>
          </div>

          {clients.length === 0 ? (
            <div className="vault-empty">No Private Collection client registrations have been received yet.</div>
          ) : (
            <div className="vault-client-list">
              {clients.map((client) => (
                <article className="vault-client-row" key={client.id}>
                  <div className="vault-client-main">
                    <span className={`vault-client-status vault-client-status-${client.status}`}>
                      {client.status}
                    </span>
                    <div>
                      <h3>{client.fullName}</h3>
                      <p>{client.email} · {client.telephone}</p>
                      <small>
                        {client.propertyType} · {client.preferredLocation} · {client.indicativeBudget}
                      </small>
                    </div>
                  </div>

                  <div className="vault-client-dates">
                    <span>Registered <strong>{formatDate(client.createdAt)}</strong></span>
                    <span>Last login <strong>{formatDate(client.lastLoginAt)}</strong></span>
                  </div>

                  <VaultClientActions clientId={client.id} status={client.status} />

                  <details className="vault-client-details">
                    <summary>Review full application</summary>
                    <div className="vault-client-detail-grid">
                      <div><span>Nationality</span><strong>{client.nationality}</strong></div>
                      <div><span>Country of residence</span><strong>{client.countryOfResidence}</strong></div>
                      <div><span>Preferred language</span><strong>{client.preferredLanguage}</strong></div>
                      <div><span>Company</span><strong>{client.companyName || "Not provided"}</strong></div>
                      <div><span>Occupation</span><strong>{client.occupation || "Not provided"}</strong></div>
                      <div><span>Purchase timeframe</span><strong>{client.purchaseTimeframe}</strong></div>
                      <div><span>Referral source</span><strong>{client.referralSource || "Not provided"}</strong></div>
                      <div><span>WeChat</span><strong>{client.wechatId || "Not provided"}</strong></div>
                      <div className="vault-client-detail-full"><span>Residential address</span><strong>{client.residentialAddress}</strong></div>
                      <div className="vault-client-detail-full"><span>Additional requirements</span><strong>{client.additionalRequirements || "Not provided"}</strong></div>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          )}
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
                const accessLevel = normalizePropertyAccessLevel(
                  property.accessLevel,
                  property.visibility,
                );

                return (
                  <article className="vault-property-row" key={property.id}>
                    <div className="vault-property-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={property.image} alt="" />
                    </div>
                    <div className="vault-property-copy">
                      <span>
                        {property.reference} · {property.location}
                        {property.market === "malaysia" ? " · Malaysia" : property.market === "asia" ? ` · ${property.country || "Asia"}` : property.market === "international" ? " · International" : " · Spain"}
                        {property.brochure ? " · Protected PDF attached" : " · PDF pending"}
                      </span>
                      <h3>{property.title}</h3>
                      <p>{property.price || "Price on application"}</p>
                      <small>Listing collaborator: {property.listingPartnerName || "Property Facilitators EuroAsia"}</small>
                      <small className="vault-property-access">
                        {accessLevel === "registered"
                          ? "Registered listing · automatic verified access"
                          : "Private off-market · manual client approval"}
                      </small>
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
