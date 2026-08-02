"use client";

import { FormEvent, useState } from "react";
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

export function PropertyForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [mainName, setMainName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [pdfName, setPdfName] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("Uploading files...");

    try {
      const form = new FormData(event.currentTarget);
      const uploadKey = `property-${Date.now()}`;
      const main = form.get("mainImage") as File;
      const second = form.get("secondaryImage") as File;
      const pdf = form.get("brochure") as File;

      const image = await uploadFile(main, uploadKey);
      const secondaryImage = second?.size ? await uploadFile(second, uploadKey) : "";
      const brochure = pdf?.size ? await uploadFile(pdf, uploadKey) : "";

      setMessage("Saving property...");
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
        <h2>Property details</h2>
        <div className="vault-form-grid">
          <label>Property title<input name="title" required /></label>
          <label>Location<input name="location" required /></label>
          <label>Price<input name="price" placeholder="€13,900,000" /></label>
          <label>Bedrooms<input name="bedrooms" type="number" min="0" /></label>
          <label>Bathrooms<input name="bathrooms" type="number" min="0" /></label>
          <label>Plot size<input name="plotSize" placeholder="12,481 m²" /></label>
          <label>Built size<input name="builtSize" placeholder="1,048 m²" /></label>
          <label>Terraces<input name="terraces" placeholder="252 m²" /></label>
          <label>Status<select name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select></label>
        </div>
        <label className="vault-full-field">Description<textarea name="description" rows={8} /></label>
      </section>

      <section className="vault-panel vault-form-section vault-upload-section">
        <div className="vault-upload-heading">
          <div>
            <p className="vault-kicker">Media uploads</p>
            <h2>Add photographs and brochure</h2>
          </div>
          <p>Click each box below to select the file from your computer.</p>
        </div>

        <div className="vault-upload-grid">
          <label className="vault-upload-box">
            <span className="vault-upload-icon">＋</span>
            <strong>Main property image</strong>
            <small>Required · JPG, PNG or WebP</small>
            <em>{mainName || "Click here to choose the main photo"}</em>
            <input name="mainImage" type="file" accept="image/jpeg,image/png,image/webp" required onChange={(e) => setMainName(e.target.files?.[0]?.name || "")} />
          </label>

          <label className="vault-upload-box">
            <span className="vault-upload-icon">＋</span>
            <strong>Second property image</strong>
            <small>Optional · JPG, PNG or WebP</small>
            <em>{secondName || "Click here to choose the second photo"}</em>
            <input name="secondaryImage" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setSecondName(e.target.files?.[0]?.name || "")} />
          </label>

          <label className="vault-upload-box vault-upload-pdf">
            <span className="vault-upload-icon">PDF</span>
            <strong>Property brochure</strong>
            <small>Optional · PDF document</small>
            <em>{pdfName || "Click here to choose the brochure PDF"}</em>
            <input name="brochure" type="file" accept="application/pdf" onChange={(e) => setPdfName(e.target.files?.[0]?.name || "")} />
          </label>
        </div>
      </section>

      <div className="vault-form-actions">
        <button className="vault-primary-button" type="submit" disabled={saving}>{saving ? "Working..." : "Save Property"}</button>
        {message && <p>{message}</p>}
      </div>
    </form>
  );
}
