import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { readRentalVillas } from "../../lib/rentalVillaStore";
import { hasVaultAccess } from "../../lib/vaultSession";
import { RentalStatusButton } from "./RentalStatusButton";
import "../vault.css";

export const metadata: Metadata = {
  title: "Villa Rentals | The Vault",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function VaultRentalsPage() {
  if (!(await hasVaultAccess())) redirect("/vault");

  const villas = (await readRentalVillas()).sort(
    (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
  );

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">The Vault</p>
            <h1>Villa Rentals</h1>
            <p>Review collaborator submissions and control the public rental carousel.</p>
          </div>
          <div className="vault-header-actions">
            <Link className="vault-secondary-button" href="/vault/dashboard">Back to Dashboard</Link>
            <Link className="vault-primary-button" href="/vault/rentals/new">Add Rental Villa</Link>
          </div>
        </header>

        <section className="vault-panel">
          <div className="vault-panel-header">
            <h2>Luxury Villa Collection submissions</h2>
          </div>
          {villas.length === 0 ? (
            <div className="vault-empty">
              No rental villas yet. Add the first villa or ask the collaborator to submit one.
            </div>
          ) : (
            <div className="vault-property-list">
              {villas.map((villa) => (
                <article className="vault-property-row" key={villa.id}>
                  <div className="vault-property-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={villa.image} alt="" />
                  </div>
                  <div className="vault-property-copy">
                    <span>{villa.reference} · {villa.location}</span>
                    <h3>{villa.title}</h3>
                    <p>{villa.bedrooms || "—"} bedrooms · sleeps {villa.guests || "—"}</p>
                    <small>Submitted by {villa.listingPartnerName}</small>
                  </div>
                  <span className={"vault-status vault-status-" + villa.status}>
                    {villa.status === "published" ? "Published" : "Pending review"}
                  </span>
                  <RentalStatusButton id={villa.id} status={villa.status} />
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
