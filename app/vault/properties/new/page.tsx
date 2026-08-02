import { redirect } from "next/navigation";
import { hasVaultAccess } from "../../../lib/vaultSession";
import { PropertyForm } from "./PropertyForm";
import "../../vault.css";

export default async function NewPropertyPage() {
  if (!(await hasVaultAccess())) redirect("/vault");

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">The Vault</p>
            <h1>Add Property</h1>
            <p>Create a new Private Collection listing.</p>
          </div>
        </header>
        <PropertyForm />
      </div>
    </main>
  );
}
