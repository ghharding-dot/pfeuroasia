import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RentalVillaUploadForm } from "../../../components/RentalVillaUploadForm";
import { getPartnerContact } from "../../../lib/partnerContacts";
import { hasVaultAccess } from "../../../lib/vaultSession";
import "../../vault.css";

export const metadata: Metadata = {
  title: "Add Rental Villa | The Vault",
  robots: { index: false, follow: false },
};

export default async function NewRentalVillaPage() {
  if (!(await hasVaultAccess())) redirect("/vault");
  const partner = getPartnerContact("LVC");

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">The Vault</p>
            <h1>Add Rental Villa</h1>
            <p>Prepare a four-photo Luxury Villa Collection carousel entry.</p>
          </div>
          <Link className="vault-secondary-button" href="/vault/rentals">Back to Villa Rentals</Link>
        </header>
        <RentalVillaUploadForm partnerCode={partner.code} partnerName={partner.name} canPublish />
      </div>
    </main>
  );
}
