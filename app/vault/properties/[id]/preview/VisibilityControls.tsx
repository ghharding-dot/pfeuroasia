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
          accessLevel: String(form.get("accessLevel") || "private"),
          visibility: String(form.get("visibility") || "confidential"),
          publicTitle: String(form.get("publicTitle") || ""),
          publicLocation: String(form.get("publicLocation") || ""),
          imagePosition: String(form.get("imagePosition") || "center"),
          publicImageApproved: form.get("publicImageApproved") === "true",
          featuredOnHomepage: form.get("featuredOnHomepage") === "true",
          homepagePriority: Number(form.get("homepagePriority") || 100),
          market: String(form.get("market") || property.market || "spain"),
          approximateLocation: String(form.get("approximateLocation") || ""),
          annualCosts: String(form.get("annualCosts") || ""),
          adviserName: String(form.get("adviserName") || ""),
          adviserWhatsApp: String(form.get("adviserWhatsApp") || ""),
          verifyListingDetails: true,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Access settings could not be updated.");
      setMessage("Access and visibility settings saved.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Access settings could not be updated.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <form className="vault-property-form" onSubmit={save}>
      <PropertyVisibilityFields
        defaultVisibility={property.visibility || "confidential"}
        defaultAccessLevel={property.accessLevel}
        defaultPublicTitle={property.publicTitle || ""}
        defaultPublicLocation={property.publicLocation || ""}
        defaultPublicImageApproved={property.publicImageApproved || false}
        defaultImagePosition={property.imagePosition || "center"}
      />
      <section className="vault-panel vault-form-section">
        <div className="vault-section-heading">
          <div><p className="vault-kicker">Property page upgrade</p><h2>Viewing and verification details</h2></div>
          <p>These details appear on the individual property page. Use an approximate area only, never the private street address.</p>
        </div>
        <div className="vault-form-grid">
          <label>
            <span>Homepage showcase</span>
            <select
              name="featuredOnHomepage"
              defaultValue={property.featuredOnHomepage ? "true" : "false"}
            >
              <option value="false">Full property page only</option>
              <option value="true">Feature on homepage</option>
            </select>
          </label>
          <label>
            <span>Homepage position</span>
            <input
              name="homepagePriority"
              type="number"
              min="1"
              max="100"
              defaultValue={property.homepagePriority || 100}
            />
            <small>1 appears first. The homepage displays a maximum of ten villas.</small>
          </label>
          <label>
            <span>Market / country</span>
            <select name="market" defaultValue={property.market || "spain"}>
              <option value="spain">Spain</option>
              <option value="malaysia">Malaysia</option>
              <option value="international">Other international market</option>
            </select>
          </label>
          <label><span>Approximate location</span><input name="approximateLocation" defaultValue={property.approximateLocation || property.location} /></label>
          <label><span>Annual running costs</span><input name="annualCosts" defaultValue={property.annualCosts || ""} placeholder="Approx. €42,000 per year" /></label>
          <label><span>Direct adviser name</span><input name="adviserName" defaultValue={property.adviserName || "PF EuroAsia Property Adviser"} /></label>
          <label><span>Adviser WhatsApp</span><input name="adviserWhatsApp" type="tel" defaultValue={property.adviserWhatsApp || ""} placeholder="+34 600 000 000" /></label>
        </div>
      </section>
      <section className="vault-publish-bar">
        <div>
          <strong>Approve access and verify listing details</strong>
          <p>
            Saving records today as the latest verification date for location, costs, adviser and access settings.
          </p>
        </div>
        <button className="vault-primary-button" type="submit" disabled={working}>
          {working ? "Saving..." : "Save & Verify Details"}
        </button>
      </section>
      {message && <p className="vault-form-message" role="status">{message}</p>}
    </form>
  );
}
