"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

async function uploadFile(file: File, reference: string) {
  const form = new FormData();
  form.append("file", file);
  form.append("reference", reference);
  const response = await fetch("/api/vault/upload", { method: "POST", body: form });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Upload failed.");
  return result.url as string;
}

function formatSize(size: number) {
  if (!size) return "";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function ImageUpload({ name, title, required = false }: { name: string; title: string; required?: boolean }) {
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
      {preview ? <img className="vault-upload-preview" src={preview} alt="Selected property" /> : <span className="vault-upload-icon">＋</span>}
      <strong>{title}</strong>
      <small>{required ? "Required" : "Optional"} · JPG, PNG or WebP</small>
      <em>{file ? `${file.name} · ${formatSize(file.size)}` : "Tap here to select an image"}</em>
      <span className="vault-file-action">{file ? "Replace image" : "Choose image"}</span>
      <input name={name} type="file" accept="image/jpeg,image/png,image/webp" required={required} onChange={(e) => setFile(e.target.files?.[0] || null)} />
    </label>
  );
}

function PdfUpload() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <label className={`vault-upload-box vault-upload-pdf ${file ? "has-file" : ""}`}>
      <span className="vault-upload-icon">PDF</span>
      <strong>Property brochure PDF</strong>
      <small>Optional · PDF document</small>
      <em>{file ? `${file.name} · ${formatSize(file.size)}` : "Tap here to select the brochure"}</em>
      <span className="vault-file-action">{file ? "Replace PDF" : "Choose PDF"}</span>
      <input name="brochure" type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
    </label>
  );
}

export function PropertyForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("Uploading photographs and brochure...");

    try {
      const form = new FormData(event.currentTarget);
      const uploadKey = `property-${Date.now()}`;
      const main = form.get("mainImage") as File;
      const second = form.get("secondaryImage") as File;
      const pdf = form.get("brochure") as File;

      const image = await uploadFile(main, uploadKey);
      const secondaryImage = second?.size ? await uploadFile(second, uploadKey) : "";
      const brochure = pdf?.size ? await uploadFile(pdf, uploadKey) : "";

      setMessage("Saving property details...");
      const payload = Object.fromEntries(form.entries());
      delete payload.mainImage;
      delete payload.secondaryImage;
      delete payload.brochure;

      const response = await fetch("/api/vault/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, image, secondaryImage, brochure }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Property could not be saved.");

      router.push("/vault/dashboard");
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
          <p>The property reference is generated automatically when saved.</p>
        </div>
        <div className="vault-form-grid">
          <label><span>Property title</span><input name="title" placeholder="The Retreat" required /></label>
          <label><span>Location</span><input name="location" placeholder="La Zagaleta, Benahavís" required /></label>
          <label><span>Price</span><input name="price" placeholder="€11,600,000" /></label>
          <label><span>Status</span><select name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select></label>
          <label><span>Bedrooms</span><input name="bedrooms" type="number" min="0" placeholder="6" /></label>
          <label><span>Bathrooms</span><input name="bathrooms" type="number" min="0" placeholder="6" /></label>
          <label><span>Built size</span><input name="builtSize" placeholder="958 m²" /></label>
          <label><span>Plot size</span><input name="plotSize" placeholder="5,394 m²" /></label>
          <label><span>Terraces</span><input name="terraces" placeholder="490 m²" /></label>
        </div>
        <label className="vault-full-field"><span>Description</span><textarea name="description" rows={8} placeholder="Enter the property description shown in the Private Collection." /></label>
      </section>

      <section className="vault-panel vault-form-section vault-upload-section">
        <div className="vault-section-heading">
          <div><p className="vault-kicker">Step 2</p><h2>Photographs and brochure</h2></div>
          <p>Select the two website images and the downloadable sales brochure.</p>
        </div>
        <div className="vault-upload-grid">
          <ImageUpload name="mainImage" title="Main property image" required />
          <ImageUpload name="secondaryImage" title="Second property image" />
          <PdfUpload />
        </div>
      </section>

      <section className="vault-publish-bar">
        <div>
          <strong>Ready to save?</strong>
          <p>Choose Draft above to keep it private, or Published to display it in the Private Collection.</p>
        </div>
        <button className="vault-primary-button" type="submit" disabled={saving}>{saving ? "Saving property..." : "Save Property"}</button>
      </section>
      {message && <p className="vault-form-message">{message}</p>}
    </form>
  );
}
