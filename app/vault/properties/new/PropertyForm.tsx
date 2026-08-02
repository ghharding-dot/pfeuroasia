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

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("Uploading files...");

    try {
      const form = new FormData(event.currentTarget);
      const reference = String(form.get("reference") || "property");
      const main = form.get("mainImage") as File;
      const second = form.get("secondaryImage") as File;
      const pdf = form.get("brochure") as File;

      const image = await uploadFile(main, reference);
      const secondaryImage = second?.size ? await uploadFile(second, reference) : "";
      const brochure = pdf?.size ? await uploadFile(pdf, reference) : "";

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
      <section className="vault-panel">
        <h2>Property details</h2>
        <div className="vault-form-grid">
          <label>Reference<input name="reference" required /></label>
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

      <section className="vault-panel">
        <h2>Images and brochure</h2>
        <div className="vault-form-grid">
          <label>Main image<input name="mainImage" type="file" accept="image/jpeg,image/png,image/webp" required /></label>
          <label>Second image<input name="secondaryImage" type="file" accept="image/jpeg,image/png,image/webp" /></label>
          <label>PDF brochure<input name="brochure" type="file" accept="application/pdf" /></label>
        </div>
      </section>

      <div className="vault-form-actions">
        <button className="vault-primary-button" type="submit" disabled={saving}>{saving ? "Working..." : "Save Property"}</button>
        {message && <p>{message}</p>}
      </div>
    </form>
  );
}
