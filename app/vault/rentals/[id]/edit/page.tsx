import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { RentalVillaUploadForm } from "../../../../components/RentalVillaUploadForm";
import { readRentalVillas } from "../../../../lib/rentalVillaStore";
import { hasVaultAccess } from "../../../../lib/vaultSession";
import "../../../vault.css";

export const metadata: Metadata = {
  title: "Edit Rental Villa | The Vault",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditRentalVillaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await hasVaultAccess())) redirect("/vault");

  const { id } = await params;
  const villa = (await readRentalVillas()).find((item) => item.id === id);
  if (!villa) notFound();

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">The Vault · {villa.reference}</p>
            <h1>Edit {villa.title}</h1>
            <p>Update the villa details, services and photographs.</p>
          </div>
          <Link className="vault-secondary-button" href="/vault/rentals">
            Back to Villa Rentals
          </Link>
        </header>
        <RentalVillaUploadForm
          partnerCode={villa.listingPartnerCode}
          partnerName={villa.listingPartnerName}
          villa={villa}
          canPublish
        />
      </div>
    </main>
  );
}
