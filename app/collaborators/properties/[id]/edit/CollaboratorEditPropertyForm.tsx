"use client";

import { upload } from "@vercel/blob/client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PropertyVisibilityFields } from "../../../../components/PropertyVisibilityFields";
import type { VaultProperty } from "../../../../lib/propertyStore";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
const MAX_PDF_SIZE = 60 * 1024 * 1024;
const UPLOAD_TIMEOUT_MS = 10 * 60 * 1000;
const FINALIZE_TIMEOUT_MS = 5 * 60 * 1000;

function safeFilename(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "") || "file";
}

function formatSize(size: number) {
  if (!size) return "";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

async function uploadFile(
  file: File,
  partnerCode: string,
  uploadKey: string,
  kind: "main" | "secondary" | "tertiary" | "quaternary" | "brochure" | "partnerBrochure",
  onProgress: (message: string) => void,
) {
  const pathname = `collaborator-submissions/${partnerCode.toLowerCase()}/${uploadKey}/${kind}-${safeFilename(file.name)}`;
  const label = kind === "brochure" || kind === "partnerBrochure" ? "brochure PDF" : "photograph";
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);
  let highestPercentage = 0;

  try {
    const result = await upload(pathname, file, {
      access: "public",
      handleUploadUrl: "/api/vault/upload",
      clientPayload: JSON.stringify({ reference: uploadKey, kind }),
      contentType: file.type || (kind === "brochure" || kind === "partnerBrochure" ? "application/pdf" : undefined),
      multipart: file.size > 10 * 1024 * 1024,
      abortSignal: controller.signal,
      onUploadProgress: ({ percentage }) => {
        highestPercentage = Math.max(highestPercentage, Math.round(percentage));
        onProgress(`Uploading replacement ${label} · ${highestPercentage}%`);
      },
    });
    return result.url;
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(`The replacement ${label} upload timed out. Please try again.`);
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function secureBrochure(
  temporaryUrl: string,
  partnerCode: string,
  file: File,
  onProgress: (message: string) => void,
) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), FINALIZE_TIMEOUT_MS);
  onProgress("Encrypting and securing the replacement brochure...");

  try {
    const response = await fetch("/api/vault/brochure/finalize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: temporaryUrl, ownerCode: partnerCode, name: file.name }),
      signal: controller.signal,
    });
    const result = await response.json();
    if (!response.ok || !result.brochure) {
      throw new Error(result.error || "The replacement brochure could not be secured.");
    }
    return String(result.brochure);
  } finally {
    window.clearTimeout(timeout);
  }
}

function validateImage(file: File | null) {
  if (!file?.size) return;
  if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not a supported image.`);
  if (file.size > MAX_IMAGE_SIZE) throw new Error(`${file.name} is larger than 20 MB.`);
}

function validatePdf(file: File | null) {
  if (!file?.size) return;
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) throw new Error("The replacement brochure must be a PDF.");
  if (file.size > MAX_PDF_SIZE) throw new Error(`${file.name} is larger than 60 MB.`);
}

function ReplacementImage({
  name,
  title,
  currentUrl,
  required = false,
}: {
  name: string;
  title: string;
  currentUrl?: string;
  required?: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(currentUrl || "");

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function selectFile(nextFile: File | null) {
    setFile(nextFile);
    setPreview(nextFile ? URL.createObjectURL(nextFile) : currentUrl || "");
  }

  return (
    <label className={`vault-upload-box ${preview ? "has-file" : ""}`}>
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="vault-upload-preview" src={preview} alt="Current property" />
      ) : (
        <span className="vault-upload-icon">＋</span>
      )}
      <strong>{title}</strong>
      <small>Leave unchanged or select a replacement · JPG, PNG or WebP · maximum 20 MB</small>
      <em>{file ? `${file.name} · ${formatSize(file.size)}` : currentUrl ? "Current image retained" : "No image attached"}</em>
      <span className="vault-file-action">{file ? "Change replacement" : "Choose replacement"}</span>
      <input
        name={name}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        required={required && !currentUrl}
        onChange={(event) => selectFile(event.target.files?.[0] || null)}
      />
    </label>
  );
}

export function CollaboratorEditPropertyForm({
  property,
  partnerCode,
  partnerName,
}: {
  property: VaultProperty;
  partnerCode: string;
  partnerName: string;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [authorityConfirmed, setAuthorityConfirmed] = useState(false);
  const [listingType, setListingType] = useState<"resale" | "new-development">(
    property.listingType === "new-development" ? "new-development" : "resale",
  );
  const [propertyType, setPropertyType] = useState(
    property.propertyType || (property.listingType === "new-development" ? "new-build" : "villa"),
  );

  function changeListingType(next: "resale" | "new-development") {
    setListingType(next);
    setPropertyType(next === "new-development" ? "apartment" : "villa");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("Checking updated property details...");

    try {
      if (!authorityConfirmed) {
        throw new Error("Please confirm that your company remains authorised to present this property.");
      }

      const form = new FormData(event.currentTarget);
      const uploadKey = `property-edit-${property.id}-${Date.now()}`;
      const main = form.get("mainImage") as File | null;
      const second = form.get("secondaryImage") as File | null;
      const third = form.get("thirdImage") as File | null;
      const fourth = form.get("fourthImage") as File | null;
      const pdf = form.get("brochure") as File | null;
      const partnerPdf = form.get("unbrandedBrochure") as File | null;

      validateImage(main);
      validateImage(second);
      validateImage(third);
      validateImage(fourth);
      validatePdf(pdf);
      validatePdf(partnerPdf);

      let brochure = "";
      if (pdf?.size) {
        const temporaryBrochure = await uploadFile(pdf, partnerCode, uploadKey, "brochure", setMessage);
        brochure = await secureBrochure(temporaryBrochure, partnerCode, pdf, setMessage);
      }

      let unbrandedBrochure = "";
      if (partnerPdf?.size) {
        const temporaryPartnerBrochure = await uploadFile(partnerPdf, partnerCode, uploadKey, "partnerBrochure", setMessage);
        unbrandedBrochure = await secureBrochure(temporaryPartnerBrochure, partnerCode, partnerPdf, setMessage);
      }

      const image = main?.size
        ? await uploadFile(main, partnerCode, uploadKey, "main", setMessage)
        : "";
      const secondaryImage = second?.size
        ? await uploadFile(second, partnerCode, uploadKey, "secondary", setMessage)
        : "";
      const thirdImage = third?.size
        ? await uploadFile(third, partnerCode, uploadKey, "tertiary", setMessage)
        : "";
      const fourthImage = fourth?.size
        ? await uploadFile(fourth, partnerCode, uploadKey, "quaternary", setMessage)
        : "";

      const payload = Object.fromEntries(form.entries());
      delete payload.mainImage;
      delete payload.secondaryImage;
      delete payload.thirdImage;
      delete payload.fourthImage;
      delete payload.brochure;
      delete payload.unbrandedBrochure;

      setMessage("Sending the updated property for PF EuroAsia review...");
      const response = await fetch(`/api/collaborators/properties/${property.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          image,
          secondaryImage,
          thirdImage,
          fourthImage,
          brochure,
          unbrandedBrochure,
          publicImageApproved: form.get("publicImageApproved") === "true",
          removeSecondaryImage: form.get("removeSecondaryImage") === "on",
          removeThirdImage: form.get("removeThirdImage") === "on",
          removeFourthImage: form.get("removeFourthImage") === "on",
          authorityConfirmed: true,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The property could not be updated.");

      router.push(`/collaborators/properties/${property.id}/preview`);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <form className="vault-property-form" onSubmit={submit}>
      <section className="vault-panel vault-form-section">
        <div className="vault-section-heading">
          <div><p className="vault-kicker">Edit listing</p><h2>Property details</h2></div>
          <p>Any change returns the listing to PF EuroAsia for approval before it is published again.</p>
        </div>
        <fieldset className="collaborator-listing-type">
          <legend>Choose the homepage property section</legend>
          <label>
            <input type="radio" name="listingType" value="resale" checked={listingType === "resale"} onChange={() => changeListingType("resale")} />
            <span><strong>Villa and current property showcase</strong><small>Existing villas, completed homes and conventional resale listings.</small></span>
          </label>
          <label>
            <input type="radio" name="listingType" value="new-development" checked={listingType === "new-development"} onChange={() => changeListingType("new-development")} />
            <span><strong>New developments and under construction</strong><small>Investment projects, off-plan releases and multi-unit developments.</small></span>
          </label>
        </fieldset>
        <div className="vault-form-grid">
          <label>
            <span>Property type</span>
            <select name="propertyType" value={propertyType} onChange={(event) => setPropertyType(event.target.value as typeof propertyType)} required>
              {listingType === "resale" ? (
                <>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="new-construction">New construction</option>
                </>
              ) : (
                <>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="villa">Villa</option>
                  <option value="new-build">New build</option>
                </>
              )}
            </select>
          </label>
          <label><span>Property title</span><input name="title" defaultValue={property.title} required /></label>
          <label>
            <span>Market / country</span>
            <select name="market" defaultValue={property.market || "spain"} required>
              <option value="spain">Spain</option>
              <option value="malaysia">Malaysia</option>
              <option value="international">Other international market</option>
            </select>
          </label>
          <label><span>Location</span><input name="location" defaultValue={property.location} required /></label>
          <label><span>Approximate public location</span><input name="approximateLocation" defaultValue={property.approximateLocation || property.location} /></label>
          <label>
            <span>{listingType === "new-development" ? "Price from" : "Listing price"}</span>
            <input
              name="priceAmount"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              defaultValue={property.priceAmount || ""}
              placeholder="400000"
              required={listingType === "new-development"}
            />
            <small>Numbers only. Currency formatting is added automatically.</small>
          </label>
          {listingType === "new-development" && (
            <label>
              <span>Price to</span>
              <input
                name="priceToAmount"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                defaultValue={property.priceToAmount || ""}
                placeholder="1200000"
                required
              />
              <small>Enter the highest current price in the development.</small>
            </label>
          )}
          <label>
            <span>Currency</span>
            <select name="priceCurrency" defaultValue={property.priceCurrency || "EUR"}>
              <option value="EUR">EUR — Euro</option>
              <option value="USD">USD — US Dollar</option>
              <option value="GBP">GBP — British Pound</option>
              <option value="MYR">MYR — Malaysian Ringgit</option>
              <option value="AED">AED — UAE Dirham</option>
            </select>
          </label>
          <label><span>Bedrooms</span><input name="bedrooms" type="number" min="0" defaultValue={property.bedrooms} /></label>
          <label><span>Bathrooms</span><input name="bathrooms" type="number" min="0" defaultValue={property.bathrooms} /></label>
          <label><span>Built size</span><input name="builtSize" defaultValue={property.builtSize} /></label>
          <label><span>Plot size</span><input name="plotSize" defaultValue={property.plotSize} /></label>
          <label><span>Terraces</span><input name="terraces" defaultValue={property.terraces || ""} /></label>
          <label><span>Annual running costs</span><input name="annualCosts" defaultValue={property.annualCosts || ""} placeholder="Approx. €42,000 per year" /></label>
          <label><span>Direct adviser name</span><input name="adviserName" defaultValue={property.adviserName || "PF EuroAsia Property Adviser"} /></label>
          <label><span>Adviser WhatsApp</span><input name="adviserWhatsApp" type="tel" defaultValue={property.adviserWhatsApp || ""} placeholder="+34 600 000 000" /></label>
        </div>
        <label className="vault-full-field">
          <span>Brief website description</span>
          <textarea name="description" rows={8} defaultValue={property.description} />
        </label>
      </section>

      <PropertyVisibilityFields
        collaboratorRequest
        defaultVisibility={property.visibility || "confidential"}
        defaultPublicTitle={property.publicTitle || ""}
        defaultPublicLocation={property.publicLocation || ""}
        defaultPublicImageApproved={property.publicImageApproved || false}
        defaultImagePosition={property.imagePosition || "center"}
      />

      <section className="vault-panel vault-form-section vault-upload-section">
        <div className="vault-section-heading">
          <div><p className="vault-kicker">Optional replacements</p><h2>Photography and brochure</h2></div>
          <p>Leave files untouched to retain them, or select replacements below.</p>
        </div>
        <div className="vault-upload-grid">
          <ReplacementImage name="mainImage" title="Main website image" currentUrl={property.image} />
          <ReplacementImage name="secondaryImage" title="Second website image" currentUrl={property.secondaryImage} required={listingType === "new-development"} />
          {listingType === "new-development" && (
            <>
              <ReplacementImage name="thirdImage" title="Third development image" currentUrl={property.thirdImage} required />
              <ReplacementImage name="fourthImage" title="Fourth development image" currentUrl={property.fourthImage} required />
            </>
          )}
          <label className="vault-upload-box vault-upload-pdf has-file">
            <span className="vault-upload-icon">PDF</span>
            <strong>Protected sales brochure</strong>
            <small>Current protected brochure retained unless you select a replacement · maximum 60 MB</small>
            <em>Protected brochure currently attached</em>
            <span className="vault-file-action">Choose replacement PDF</span>
            <input name="brochure" type="file" accept="application/pdf,.pdf" />
          </label>
          <label className={`vault-upload-box vault-upload-pdf ${property.unbrandedBrochure ? "has-file" : ""}`}>
            <span className="vault-upload-icon">PDF</span>
            <strong>Unbranded partner brochure</strong>
            <small>{property.unbrandedBrochure ? "Current partner edition retained unless replaced" : "Optional partner-ready edition"} · maximum 60 MB</small>
            <em>{property.unbrandedBrochure ? "Unbranded brochure currently attached" : "No unbranded brochure attached"}</em>
            <span className="vault-file-action">Choose replacement PDF</span>
            <input name="unbrandedBrochure" type="file" accept="application/pdf,.pdf" />
          </label>
        </div>
        {property.secondaryImage && (
          <label className="collaborator-authority-check collaborator-remove-check">
            <input name="removeSecondaryImage" type="checkbox" />
            <span>Remove the current second photograph instead of retaining it.</span>
          </label>
        )}
        {listingType === "new-development" && property.thirdImage && (
          <label className="collaborator-authority-check collaborator-remove-check">
            <input name="removeThirdImage" type="checkbox" />
            <span>Remove the current third photograph instead of retaining it.</span>
          </label>
        )}
        {listingType === "new-development" && property.fourthImage && (
          <label className="collaborator-authority-check collaborator-remove-check">
            <input name="removeFourthImage" type="checkbox" />
            <span>Remove the current fourth photograph instead of retaining it.</span>
          </label>
        )}
      </section>

      <section className="vault-panel vault-form-section collaborator-authority-panel">
        <label className="collaborator-authority-check">
          <input
            type="checkbox"
            checked={authorityConfirmed}
            onChange={(event) => setAuthorityConfirmed(event.target.checked)}
          />
          <span>
            I confirm that {partnerName} remains directly authorised to present this property and that the updated information is accurate.
          </span>
        </label>
      </section>

      <section className="vault-publish-bar">
        <div>
          <strong>Save changes for review</strong>
          <p>The edited property and any revised public exposure request will return to Pending Review for PF EuroAsia approval.</p>
        </div>
        <button className="vault-primary-button" type="submit" disabled={saving || !authorityConfirmed}>
          {saving ? "Working..." : "Save Changes"}
        </button>
      </section>
      {message && <p className="vault-form-message" role="status">{message}</p>}
    </form>
  );
}
