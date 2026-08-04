"use client";

import { upload } from "@vercel/blob/client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PropertyVisibilityFields } from "../../../components/PropertyVisibilityFields";

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
  kind: "main" | "secondary" | "brochure",
  onProgress: (message: string) => void,
) {
  const pathname = `collaborator-submissions/${partnerCode.toLowerCase()}/${uploadKey}/${kind}-${safeFilename(file.name)}`;
  const label = kind === "brochure" ? "brochure PDF" : "photograph";
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);
  let highestPercentage = 0;

  onProgress(`Preparing ${label} upload...`);

  try {
    const result = await upload(pathname, file, {
      access: "public",
      handleUploadUrl: "/api/vault/upload",
      clientPayload: JSON.stringify({ reference: uploadKey, kind }),
      contentType: file.type || (kind === "brochure" ? "application/pdf" : undefined),
      multipart: file.size > 10 * 1024 * 1024,
      abortSignal: controller.signal,
      onUploadProgress: ({ percentage }) => {
        highestPercentage = Math.max(highestPercentage, Math.round(percentage));
        onProgress(`Uploading ${label} · ${highestPercentage}%`);
      },
    });
    return result.url;
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(
        `${kind === "brochure" ? "The brochure PDF" : "A photograph"} upload timed out after ten minutes. Please check the connection and try again.`,
      );
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
  onProgress("Encrypting and securing the brochure PDF...");

  try {
    const response = await fetch("/api/vault/brochure/finalize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: temporaryUrl,
        ownerCode: partnerCode,
        name: file.name,
      }),
      signal: controller.signal,
    });
    const result = await response.json();
    if (!response.ok || !result.brochure) {
      throw new Error(result.error || "The brochure PDF could not be secured.");
    }
    return String(result.brochure);
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(
        "The brochure reached the server but took too long to secure. Please try again.",
      );
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

function ImageUpload({
  name,
  title,
  required = false,
}: {
  name: string;
  title: string;
  required?: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <label className={`vault-upload-box ${preview ? "has-file" : ""}`}>
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="vault-upload-preview" src={preview} alt="Selected property" />
      ) : (
        <span className="vault-upload-icon">＋</span>
      )}
      <strong>{title}</strong>
      <small>{required ? "Required" : "Optional"} · JPG, PNG or WebP · maximum 20 MB</small>
      <em>{file ? `${file.name} · ${formatSize(file.size)}` : "Tap here to select an image"}</em>
      <span className="vault-file-action">{file ? "Replace image" : "Choose image"}</span>
      <input
        name={name}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        required={required}
        onChange={(event) => setFile(event.target.files?.[0] || null)}
      />
    </label>
  );
}

function PdfUpload() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <label className={`vault-upload-box vault-upload-pdf ${file ? "has-file" : ""}`}>
      <span className="vault-upload-icon">PDF</span>
      <strong>One protected sales brochure PDF</strong>
      <small>Required · encrypted immediately after upload · maximum 60 MB</small>
      <em>{file ? `${file.name} · ${formatSize(file.size)}` : "Tap here to select the sales brochure"}</em>
      <span className="vault-file-action">{file ? "Replace PDF" : "Choose PDF"}</span>
      <input
        name="brochure"
        type="file"
        accept="application/pdf,.pdf"
        required
        onChange={(event) => setFile(event.target.files?.[0] || null)}
      />
    </label>
  );
}

function validateImage(file: File | null, required: boolean) {
  if (!file?.size) {
    if (required) throw new Error("Please select the main property image.");
    return;
  }
  if (!file.type.startsWith("image/")) {
    throw new Error(`${file.name} is not a supported image.`);
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(`${file.name} is larger than 20 MB.`);
  }
}

function validatePdf(file: File | null) {
  if (!file?.size) throw new Error("Please attach one sales brochure PDF.");
  const isPdf =
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) throw new Error("The property brochure must be a PDF.");
  if (file.size > MAX_PDF_SIZE) {
    throw new Error(`${file.name} is larger than 60 MB.`);
  }
}

export function CollaboratorPropertyForm({
  partnerCode,
  partnerName,
}: {
  partnerCode: string;
  partnerName: string;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [authorityConfirmed, setAuthorityConfirmed] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("Checking property details...");

    try {
      if (!authorityConfirmed) {
        throw new Error(
          "Please confirm that your company is authorised to present this property.",
        );
      }

      const form = new FormData(event.currentTarget);
      const uploadKey = `property-${Date.now()}`;
      const main = form.get("mainImage") as File | null;
      const second = form.get("secondaryImage") as File | null;
      const pdf = form.get("brochure") as File | null;

      validateImage(main, true);
      validateImage(second, false);
      validatePdf(pdf);

      const temporaryBrochure = await uploadFile(
        pdf as File,
        partnerCode,
        uploadKey,
        "brochure",
        setMessage,
      );
      const brochure = await secureBrochure(
        temporaryBrochure,
        partnerCode,
        pdf as File,
        setMessage,
      );

      const image = await uploadFile(
        main as File,
        partnerCode,
        uploadKey,
        "main",
        setMessage,
      );
      const secondaryImage = second?.size
        ? await uploadFile(
            second,
            partnerCode,
            uploadKey,
            "secondary",
            setMessage,
          )
        : "";

      setMessage("Submitting property for PF EuroAsia review...");
      const payload = Object.fromEntries(form.entries());
      delete payload.mainImage;
      delete payload.secondaryImage;
      delete payload.brochure;

      const response = await fetch("/api/collaborators/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          image,
          secondaryImage,
          brochure,
          publicImageApproved: form.get("publicImageApproved") === "true",
          authorityConfirmed: true,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Property could not be submitted.");
      }

      setMessage("Property submitted. Opening your preview...");
      router.push(`/collaborators/properties/${result.id}/preview`);
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
          <div><p className="vault-kicker">Step 1</p><h2>Property details</h2></div>
          <p>This submission will be assigned automatically to {partnerName} and held for PF EuroAsia approval.</p>
        </div>
        <div className="vault-form-grid">
          <label><span>Property title</span><input name="title" placeholder="The Retreat" required /></label>
          <label><span>Location</span><input name="location" placeholder="La Zagaleta, Benahavís" required /></label>
          <label><span>Price</span><input name="price" placeholder="€11,600,000" /></label>
          <label><span>Bedrooms</span><input name="bedrooms" type="number" min="0" placeholder="6" /></label>
          <label><span>Bathrooms</span><input name="bathrooms" type="number" min="0" placeholder="6" /></label>
          <label><span>Built size</span><input name="builtSize" placeholder="958 m²" /></label>
          <label><span>Plot size</span><input name="plotSize" placeholder="5,394 m²" /></label>
          <label><span>Terraces</span><input name="terraces" placeholder="490 m²" /></label>
        </div>
        <label className="vault-full-field">
          <span>Brief website description</span>
          <textarea
            name="description"
            rows={8}
            placeholder="Enter the concise description that PF EuroAsia should show with the two website photographs."
          />
        </label>
      </section>

      <PropertyVisibilityFields collaboratorRequest />

      <section className="vault-panel vault-form-section vault-upload-section">
        <div className="vault-section-heading">
          <div><p className="vault-kicker">Step 2</p><h2>Photography and protected brochure</h2></div>
          <p>Upload one main image, one optional second image, and exactly one current sales brochure PDF.</p>
        </div>
        <div className="vault-upload-grid">
          <ImageUpload name="mainImage" title="Main website image" required />
          <ImageUpload name="secondaryImage" title="Second website image" />
          <PdfUpload />
        </div>
      </section>

      <section className="vault-panel vault-form-section collaborator-authority-panel">
        <label className="collaborator-authority-check">
          <input
            type="checkbox"
            checked={authorityConfirmed}
            onChange={(event) => setAuthorityConfirmed(event.target.checked)}
          />
          <span>
            I confirm that {partnerName} is directly authorised to present this property and that the information and brochure supplied are current and accurate.
          </span>
        </label>
      </section>

      <section className="vault-publish-bar">
        <div>
          <strong>Submit for PF EuroAsia approval</strong>
          <p>The property and any requested public exposure remain unpublished until PF EuroAsia has reviewed the presentation.</p>
        </div>
        <button className="vault-primary-button" type="submit" disabled={saving || !authorityConfirmed}>
          {saving ? "Working..." : "Submit Property"}
        </button>
      </section>
      {message && <p className="vault-form-message" role="status">{message}</p>}
    </form>
  );
}
