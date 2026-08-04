"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PropertyVisibilityFields } from "../../../../components/PropertyVisibilityFields";
import type { VaultProperty } from "../../../../lib/propertyStore";

export function VisibilityControls({ property }: { property: VaultProperty }) {
  const router = useRouter();
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("");

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWorking(true);
    setMessage("");

    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch(`/api/vault/properties/${property.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visibility: String(form.get("visibility") || "confidential"),
          publicTitle: String(form.get("publicTitle") || ""),
          publicLocation: String(form.get("publicLocation") || ""),
          imagePosition: String(form.get("imagePosition") || "center"),
          publicImageApproved: form.get("publicImageApproved") === "true",
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Visibility could not be updated.");
      setMessage("Visibility settings saved.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Visibility could not be updated.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <form className="vault-property-form" onSubmit={save}>
      <PropertyVisibilityFields
        defaultVisibility={property.visibility || "confidential"}
        defaultPublicTitle={property.publicTitle || ""}
        defaultPublicLocation={property.publicLocation || ""}
        defaultPublicImageApproved={property.publicImageApproved || false}
        defaultImagePosition={property.imagePosition || "center"}
      />
      <section className="vault-publish-bar">
        <div>
          <strong>Approve public exposure</strong>
          <p>
            A property joins the homepage carousel only when it is published, set to Public Teaser or Public Listing, and the photograph permission is confirmed.
          </p>
        </div>
        <button className="vault-primary-button" type="submit" disabled={working}>
          {working ? "Saving..." : "Save Visibility"}
        </button>
      </section>
      {message && <p className="vault-form-message" role="status">{message}</p>}
    </form>
  );
}
