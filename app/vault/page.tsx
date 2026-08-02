import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createVaultToken, getVaultPassword, VAULT_COOKIE_NAME } from "../lib/vaultAuth";
import { VaultLogin } from "./VaultLogin";
import "./vault.css";

export const metadata: Metadata = {
  title: "The Vault | Property Facilitators EuroAsia",
  robots: { index: false, follow: false },
};

export default async function VaultPage() {
  const configuredPassword = getVaultPassword();
  const cookieStore = await cookies();
  const token = cookieStore.get(VAULT_COOKIE_NAME)?.value;

  if (configuredPassword && token === createVaultToken(configuredPassword)) {
    redirect("/vault/dashboard");
  }

  return (
    <main className="vault-page">
      <section className="vault-login-card">
        <p className="vault-kicker">Property Facilitators EuroAsia</p>
        <h1>The Vault</h1>
        <p className="vault-subtitle">Private Collection Management</p>
        <VaultLogin />
      </section>
    </main>
  );
}
