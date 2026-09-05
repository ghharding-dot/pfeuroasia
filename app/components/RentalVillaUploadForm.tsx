"use client";

import { upload } from "@vercel/blob/client";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { RentalVilla } from "../lib/rentalVillaStore";

type PhotoKind =
  | "main"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "fifth"
  | "sixth"
  | "seventh"
  | "eighth";

type Props = {
  partnerCode: string;
  partnerName: string;
  canPublish?: boolean;
  villa?: RentalVilla;
};

const PHOTO_FIELDS: Array<{ kind: PhotoKind; label: string; required: boolean }> = [
  { kind: "main", label: "Main photograph", required: true },
  { kind: "secondary", label: "Second photograph", required: true },
  { kind: "tertiary", label: "Third photograph", required: true },
  { kind: "quaternary", label: "Fourth photograph", required: true },
  { kind: "fifth", label: "Fifth photograph", required: false },
  { kind: "sixth", label: "Sixth photograph", required: false },
  { kind: "seventh", label: "Seventh photograph", required: false },
  { kind: "eighth", label: "Eighth photograph", required: false },
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
  "Daily housekeeping",
  "Dedicated concierge",
  "Breakfast service",
  "Home cooking",
  "Spa facilities",
];

function splitAmenities(value?: string) {
  return String(value || "")
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

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
  villa,
}: Props) {
  const router = useRouter();
  const existingAmenities = splitAmenities(villa?.amenities);
  const [files, setFiles] = useState<Partial<Record<PhotoKind, File>>>({});
  const [amenities, setAmenities] = useState<string[]>(
    existingAmenities.filter((amenity) => AMENITIES.includes(amenity)),
  );
  const [otherAmenities, setOtherAmenities] = useState(
    existingAmenities.filter((amenity) => !AMENITIES.includes(amenity)).join(", "),
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const isEditing = Boolean(villa);

  function existingPhoto(kind: PhotoKind) {
    if (!villa) return "";
    const images = villa.galleryImages?.length
      ? villa.galleryImages
      : [villa.image, villa.secondaryImage, villa.thirdImage, villa.fourthImage];
    return images[PHOTO_FIELDS.findIndex((photo) => photo.kind === kind)] || "";
  }

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

    if (!isEditing && PHOTO_FIELDS.some((photo) => photo.required && !files[photo.kind])) {
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
          const file = files[photo.kind];
          if (!file) return [photo.kind, existingPhoto(photo.kind)] as const;
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
      const galleryImages = PHOTO_FIELDS.map((photo) => images[photo.kind]).filter(Boolean);

      const response = await fetch(
        isEditing ? "/api/rental-villas/" + villa?.id : "/api/rental-villas",
        {
        method: isEditing ? "PATCH" : "POST",
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
          galleryImages,
        }),
        },
      );

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
            Public descriptions are limited to the first 150 words.
          </p>
        </div>

        <div className="vault-form-grid">
          <label>
            <span>Villa name *</span>
            <input name="title" required maxLength={160} placeholder="Villa name" defaultValue={villa?.title} />
          </label>
          <label>
            <span>Location *</span>
            <input name="location" required maxLength={160} placeholder="Benahavís" defaultValue={villa?.location} />
          </label>
          <label>
            <span>Sleeps</span>
            <input name="guests" min="1" type="number" placeholder="12" defaultValue={villa?.guests || ""} />
          </label>
          <label>
            <span>Bedrooms</span>
            <input name="bedrooms" min="1" type="number" placeholder="6" defaultValue={villa?.bedrooms || ""} />
          </label>
          <label>
            <span>Bathrooms</span>
            <input name="bathrooms" min="1" type="number" placeholder="6" defaultValue={villa?.bathrooms || ""} />
          </label>
          <label>
            <span>Currency</span>
            <select name="currency" defaultValue={villa?.currency || "EUR"}>
              <option value="EUR">EUR €</option>
              <option value="GBP">GBP £</option>
              <option value="USD">USD $</option>
            </select>
          </label>
          <label>
            <span>Weekly price from</span>
            <input name="priceFrom" maxLength={80} placeholder="20,000" defaultValue={villa?.priceFrom} />
          </label>
          <label>
            <span>Weekly price to</span>
            <input name="priceTo" maxLength={80} placeholder="35,000" defaultValue={villa?.priceTo} />
          </label>
          {canPublish && (
            <label>
              <span>{isEditing ? "Publication status" : "Initial status"}</span>
              <select name="status" defaultValue={villa?.status || "draft"}>
                <option value="draft">Draft / pending review</option>
                <option value="published">Publish immediately</option>
              </select>
            </label>
          )}
        </div>

        <label className="vault-full-field">
          <span>Brief description * — maximum 150 words</span>
          <textarea
            name="description"
            required
            maxLength={1800}
            rows={8}
            placeholder="A concise description for the centre of the carousel."
            defaultValue={villa?.description}
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
            Upload four required photographs and up to four optional extras. Best results:
            1650 × 1200 px, landscape JPG or WebP. The website keeps four fixed frames.
          </p>
        </div>
        <div className="vault-upload-grid" style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
          {PHOTO_FIELDS.map((photo) => (
            <label className={"vault-upload-box " + (files[photo.kind] || existingPhoto(photo.kind) ? "has-file" : "")} key={photo.kind}>
              {existingPhoto(photo.kind) && !files[photo.kind] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="vault-upload-preview" src={existingPhoto(photo.kind)} alt="Current villa" />
              ) : (
                <span className="vault-upload-icon">＋</span>
              )}
              <input
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                required={!isEditing && photo.required}
                type="file"
                onChange={(event) =>
                  setFiles((current) => ({
                    ...current,
                    [photo.kind]: event.target.files?.[0],
                  }))
                }
              />
              <strong>{photo.label}</strong>
              <small>
                {isEditing
                  ? existingPhoto(photo.kind)
                    ? "Keep the current photograph or choose a replacement"
                    : photo.required
                      ? "A photograph is required"
                      : "Optional extra photograph"
                  : photo.required
                    ? "Required · 1650 × 1200 px recommended"
                    : "Optional · 1650 × 1200 px recommended"}
              </small>
              <em>{files[photo.kind]?.name || (isEditing ? "Current photograph retained" : "")}</em>
            </label>
          ))}
        </div>
      </section>

      <div className="vault-publish-bar">
        <div>
          <strong>{canPublish ? "Save villa rental" : isEditing ? "Send changes for PF EuroAsia approval" : "Send for PF EuroAsia approval"}</strong>
          <p>
            {canPublish
              ? "Drafts remain private. Published villas appear in the public rental carousel."
              : "Your submission remains private until PF EuroAsia approves it."}
          </p>
          {message && <p className="vault-form-message" role="alert">{message}</p>}
        </div>
        <button className="vault-primary-button" type="submit" disabled={saving}>
          {saving ? "Saving villa…" : isEditing ? "Save Changes" : canPublish ? "Save Villa" : "Submit Villa"}
        </button>
      </div>
    </form>
  );
}
