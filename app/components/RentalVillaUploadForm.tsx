"use client";

import { upload } from "@vercel/blob/client";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type PhotoKind = "main" | "secondary" | "tertiary" | "quaternary";

type Props = {
  partnerCode: string;
  partnerName: string;
  canPublish?: boolean;
};

const PHOTO_FIELDS: Array<{ kind: PhotoKind; label: string }> = [
  { kind: "main", label: "Main photograph" },
  { kind: "secondary", label: "Second photograph" },
  { kind: "tertiary", label: "Third photograph" },
  { kind: "quaternary", label: "Fourth photograph" },
];

const AMENITIES = [
  "Private pool",
  "Heated pool",
  "Indoor pool",
  "Gym",
  "Sauna",
  "Cinema room",
  "Games room",
  "Sea views",
  "Golf views",
  "Outdoor kitchen",
  "Staff accommodation",
  "Gated security",
];

function safeExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension && ["jpg", "jpeg", "png", "webp"].includes(extension)
    ? extension
    : "jpg";
}

export function RentalVillaUploadForm({
  partnerCode,
  partnerName,
  canPublish = false,
}: Props) {
  const router = useRouter();
  const [files, setFiles] = useState<Partial<Record<PhotoKind, File>>>({});
  const [amenities, setAmenities] = useState<string[]>([]);
  const [otherAmenities, setOtherAmenities] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const selectedAmenities = useMemo(
    () =>
      [...amenities, ...otherAmenities.split(",").map((item) => item.trim())]
        .filter(Boolean)
        .join(", "),
    [amenities, otherAmenities],
  );

  function toggleAmenity(value: string, checked: boolean) {
    setAmenities((current) =>
      checked
        ? Array.from(new Set([...current, value]))
        : current.filter((item) => item !== value),
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (PHOTO_FIELDS.some((photo) => !files[photo.kind])) {
      setMessage("Please select all four villa photographs.");
      return;
    }

    setSaving(true);
    const form = new FormData(event.currentTarget);
    const uploadKey = Date.now().toString() + "-" + crypto.randomUUID();
    const basePath = canPublish
      ? "private-portfolio/rentals/" + uploadKey
      : "collaborator-submissions/" + partnerCode.toLowerCase() + "/rentals/" + uploadKey;

    try {
      const uploadedPhotos = await Promise.all(
        PHOTO_FIELDS.map(async (photo) => {
          const file = files[photo.kind] as File;
          const blob = await upload(
            basePath + "/" + photo.kind + "." + safeExtension(file),
            file,
            {
              access: "public",
              handleUploadUrl: "/api/vault/upload",
              clientPayload: JSON.stringify({
                reference: String(form.get("title") || "rental-villa").slice(0, 100),
                kind: photo.kind,
              }),
            },
          );
          return [photo.kind, blob.url] as const;
        }),
      );
      const images = Object.fromEntries(uploadedPhotos) as Record<PhotoKind, string>;

      const response = await fetch("/api/rental-villas", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          title: form.get("title"),
          location: form.get("location"),
          bedrooms: form.get("bedrooms"),
          bathrooms: form.get("bathrooms"),
          guests: form.get("guests"),
          priceFrom: form.get("priceFrom"),
          priceTo: form.get("priceTo"),
          currency: form.get("currency"),
          description: form.get("description"),
          amenities: selectedAmenities,
          listingPartnerCode: partnerCode,
          status: canPublish ? form.get("status") : "draft",
          image: images.main,
          secondaryImage: images.secondary,
          thirdImage: images.tertiary,
          fourthImage: images.quaternary,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The villa could not be saved.");

      router.push(canPublish ? "/vault/rentals" : "/collaborators/dashboard");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The villa could not be saved.");
      setSaving(false);
    }
  }

  return (
    <form className="vault-property-form" onSubmit={handleSubmit}>
      <section className="vault-panel vault-form-section">
        <div className="vault-section-heading">
          <div>
            <p className="vault-kicker">Villa details</p>
            <h2>Rental listing</h2>
          </div>
          <p>
            {partnerName}. Each submission receives its own visible LVC reference.
            Public descriptions are limited to the first 100 words.
          </p>
        </div>

        <div className="vault-form-grid">
          <label>
            <span>Villa name *</span>
            <input name="title" required maxLength={160} placeholder="Villa name" />
          </label>
          <label>
            <span>Location *</span>
            <input name="location" required maxLength={160} placeholder="Benahavís" />
          </label>
          <label>
            <span>Sleeps</span>
            <input name="guests" min="1" type="number" placeholder="12" />
          </label>
          <label>
            <span>Bedrooms</span>
            <input name="bedrooms" min="1" type="number" placeholder="6" />
          </label>
          <label>
            <span>Bathrooms</span>
            <input name="bathrooms" min="1" type="number" placeholder="6" />
          </label>
          <label>
            <span>Currency</span>
            <select name="currency" defaultValue="EUR">
              <option value="EUR">EUR €</option>
              <option value="GBP">GBP £</option>
              <option value="USD">USD $</option>
            </select>
          </label>
          <label>
            <span>Weekly price from</span>
            <input name="priceFrom" maxLength={80} placeholder="20,000" />
          </label>
          <label>
            <span>Weekly price to</span>
            <input name="priceTo" maxLength={80} placeholder="35,000" />
          </label>
          {canPublish && (
            <label>
              <span>Initial status</span>
              <select name="status" defaultValue="draft">
                <option value="draft">Draft / pending review</option>
                <option value="published">Publish immediately</option>
              </select>
            </label>
          )}
        </div>

        <label className="vault-full-field">
          <span>Brief description * — maximum 100 words</span>
          <textarea
            name="description"
            required
            maxLength={900}
            rows={6}
            placeholder="A concise description for the centre of the carousel."
          />
        </label>

        <div className="vault-full-field vault-amenities-picker">
          <span>Amenities</span>
          <details>
            <summary>
              {amenities.length ? amenities.length + " selected" : "Choose amenities"}
              <b aria-hidden="true">⌄</b>
            </summary>
            <div className="vault-amenities-menu">
              <div className="vault-amenities-options">
                {AMENITIES.map((amenity) => (
                  <label key={amenity}>
                    <input
                      type="checkbox"
                      checked={amenities.includes(amenity)}
                      onChange={(event) => toggleAmenity(amenity, event.target.checked)}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
              <label className="vault-amenities-other">
                Other amenities, separated by commas
                <input
                  value={otherAmenities}
                  onChange={(event) => setOtherAmenities(event.target.value)}
                  placeholder="Padel court, lift, wine cellar"
                />
              </label>
            </div>
          </details>
        </div>
      </section>

      <section className="vault-panel vault-form-section vault-upload-section">
        <div className="vault-section-heading">
          <div>
            <p className="vault-kicker">Four-photo carousel</p>
            <h2>Villa photographs</h2>
          </div>
          <p>
            Best results: 1650 × 1200 px, landscape JPG or WebP. The website uses
            fixed frames and crops cleanly without changing the carousel height.
          </p>
        </div>
        <div className="vault-upload-grid" style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
          {PHOTO_FIELDS.map((photo) => (
            <label className={"vault-upload-box " + (files[photo.kind] ? "has-file" : "")} key={photo.kind}>
              <input
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                required
                type="file"
                onChange={(event) =>
                  setFiles((current) => ({
                    ...current,
                    [photo.kind]: event.target.files?.[0],
                  }))
                }
              />
              <span className="vault-upload-icon">＋</span>
              <strong>{photo.label}</strong>
              <small>1650 × 1200 px recommended</small>
              {files[photo.kind] && <em>{files[photo.kind]?.name}</em>}
            </label>
          ))}
        </div>
      </section>

      <div className="vault-publish-bar">
        <div>
          <strong>{canPublish ? "Save villa rental" : "Send for PF EuroAsia approval"}</strong>
          <p>
            {canPublish
              ? "Drafts remain private. Published villas appear in the public rental carousel."
              : "Your submission remains private until PF EuroAsia approves it."}
          </p>
          {message && <p className="vault-form-message" role="alert">{message}</p>}
        </div>
        <button className="vault-primary-button" type="submit" disabled={saving}>
          {saving ? "Uploading four photographs…" : canPublish ? "Save Villa" : "Submit Villa"}
        </button>
      </div>
    </form>
  );
}
