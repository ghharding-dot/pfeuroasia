import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createVaultToken, getVaultPassword, VAULT_COOKIE_NAME } from "../../lib/vaultAuth";
import "../vault.css";

export const metadata: Metadata = {
  title: "Vault Dashboard | Property Facilitators EuroAsia",
  robots: { index: false, follow: false },
};

export default async function VaultDashboardPage() {
  const configuredPassword = getVaultPassword();
  const cookieStore = await cookies();
  const token = cookieStore.get(VAULT_COOKIE_NAME)?.value;

  if (!configuredPassword || token !== createVaultToken(configuredPassword)) {
    redirect("/vault");
  }

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">Property Facilitators EuroAsia</p>
            <h1>The Vault</h1>
            <p>Private Collection Management</p>
          </div>
          <Link className="vault-primary-button" href="/vault/properties/new">Add Property</Link>
        </header>

        <section className="vault-stats" aria-label="Vault summary">
          <article className="vault-stat"><strong>0</strong><span>Properties</span></article>
          <article className="vault-stat"><strong>0</strong><span>Published</span></article>
          <article className="vault-stat"><strong>0</strong><span>Drafts</span></article>
        </section>

        <section className="vault-panel">
          <div className="vault-panel-header">
            <h2>Properties</h2>
          </div>
          <div className="vault-empty">No Vault-managed properties yet. Add the first property to begin.</div>
        </section>
      </div>
    </main>
  );
}
