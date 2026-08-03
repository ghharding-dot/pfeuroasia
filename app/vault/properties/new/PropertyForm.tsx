"use client";

import { upload } from "@vercel/blob/client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
const MAX_PDF_SIZE = 60 * 1024 * 1024;

const listingPartners = [
  ["DIRECT", "Property Facilitators EuroAsia"],
  ["PFI", "Property Facilitators Iberia"],
  ["AYL", "Aylesford Spain"],
  ["HOU", "House and Country Real Estate"],
  ["LUX", "LuxoEstates"],
  ["FIX", "The Fixer"],
] as const;

function safeFilename(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "") || "file";
}

async function uploadFile(
  file: File,
  reference: string,
  kind: "main" | "secondary" | "brochure",
  onProgress: (message: string) => void,
) {
  const pathname = `private-portfolio/${reference}/${kind}-${safeFilename(file.name)}`;
  const result = await upload(pathname, file, {
    access: kind === "brochure" ? "private" : "public",
    handleUploadUrl: "/api/vault/upload",
    clientPayload: JSON.stringify({ reference, kind }),
    multipart: file.size > 10 * 1024 * 1024,
    onUploadProgress: ({ percentage }) => {
      onProgress(`Uploading ${kind === "brochure" ? "private brochure PDF" : "photograph"} · ${Math.round(percentage)}%`);
    },
  });
  return result.url;
}

function formatSize(size: number) {
  if (!size) return "";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
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
      <strong>One private sales brochure PDF</strong>
      <small>Stored privately · watermarked for each verified client · maximum 60 MB</small>
      <em>{file ? `${file.name} · ${formatSize(file.size)}` : "Tap here to select the property brochure"}</em>
      <span className="vault-file-action">{file ? "Replace PDF" : "Choose PDF"}</span>
      <input
        name="brochure"
        type="file"
        accept="application/pdf,.pdf"
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
  if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not a supported image.`);
  if (file.size > MAX_IMAGE_SIZE) throw new Error(`${file.name} is larger than 20 MB.`);
}

function validatePdf(file: File | null, required: boolean) {
  if (!file?.size) {
    if (required) throw new Error("Attach one sales brochure PDF before publishing. You can save the property as a draft without it.");
    return;
  }
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) throw new Error("The property brochure must be a PDF.");
  if (file.size > MAX_PDF_SIZE) throw new Error(`${file.name} is larger than 60 MB.`);
}

export function PropertyForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("Checking property details...");

    try {
      const form = new FormData(event.currentTarget);
      const uploadKey = `property-${Date.now()}`;
      const main = form.get("mainImage") as File | null;
      const second = form.get("secondaryImage") as File | null;
      const pdf = form.get("brochure") as File | null;

      validateImage(main, true);
      validateImage(second, false);
      validatePdf(pdf, status === "published");

      const image = await uploadFile(main as File, uploadKey, "main", setMessage);
      const secondaryImage = second?.size
        ? await uploadFile(second, uploadKey, "secondary", setMessage)
        : "";
      const brochure = pdf?.size
        ? await uploadFile(pdf, uploadKey, "brochure", setMessage)
        : "";

      setMessage("Saving property details...");
      const payload = Object.fromEntries(form.entries());
      delete payload.mainImage;
      delete payload.secondaryImage;
      delete payload.brochure;

      const response = await fetch("/api/vault/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, status, image, secondaryImage, brochure }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Property could not be saved.");

      setMessage("Property saved. Opening the layout preview...");
      router.push(`/vault/properties/${result.id}/preview`);
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
          <p>The reference is generated automatically. Start with Draft while checking the content and layout.</p>
        </div>
        <div className="vault-form-grid">
          <label><span>Property title</span><input name="title" placeholder="The Retreat" required /></label>
          <label><span>Location</span><input name="location" placeholder="La Zagaleta, Benahavís" required /></label>
          <label><span>Price</span><input name="price" placeholder="€11,600,000" /></label>
          <label>
            <span>Listing collaborator</span>
            <select name="listingPartnerCode" defaultValue="DIRECT">
              {listingPartners.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
            </select>
          </label>
          <label>
            <span>Status</span>
            <select
              name="status"
              value={status}
              onChange={(event) => setStatus(event.target.value === "published" ? "published" : "draft")}
            >
              <option value="draft">Draft — preview privately</option>
              <option value="published">Published — show in Private Collection</option>
            </select>
          </label>
          <label><span>Bedrooms</span><input name="bedrooms" type="number" min="0" placeholder="6" /></label>
          <label><span>Bathrooms</span><input name="bathrooms" type="number" min="0" placeholder="6" /></label>
          <label><span>Built size</span><input name="builtSize" placeholder="958 m²" /></label>
          <label><span>Plot size</span><input name="plotSize" placeholder="5,394 m²" /></label>
          <label><span>Terraces</span><input name="terraces" placeholder="490 m²" /></label>
        </div>
        <label className="vault-full-field">
          <span>Description</span>
          <textarea
            name="description"
            rows={8}
            placeholder="Enter the concise property description shown in the Private Collection."
          />
        </label>
      </section>

      <section className="vault-panel vault-form-section vault-upload-section">
        <div className="vault-section-heading">
          <div><p className="vault-kicker">Step 2</p><h2>Website images and protected brochure</h2></div>
          <p>Use one main image, one optional secondary image, and one private sales brochure PDF per property.</p>
        </div>
        <div className="vault-upload-grid">
          <ImageUpload name="mainImage" title="Main website image" required />
          <ImageUpload name="secondaryImage" title="Second website image" />
          <PdfUpload />
        </div>
      </section>

      <section className="vault-publish-bar">
        <div>
          <strong>{status === "published" ? "Publish and preview" : "Save draft and preview"}</strong>
          <p>
            {status === "published"
              ? "The property will appear in the password-protected Private Collection and its brochure will require client verification."
              : "The property remains inside the Vault while we inspect its website presentation."}
          </p>
        </div>
        <button className="vault-primary-button" type="submit" disabled={saving}>
          {saving ? "Working..." : status === "published" ? "Publish & Preview" : "Save Draft & Preview"}
        </button>
      </section>
      {message && <p className="vault-form-message" role="status">{message}</p>}
    </form>
  );
}
