"use client";

import { useState } from "react";
import type {
  PropertyImagePosition,
  PropertyVisibility,
} from "../lib/propertyStore";
import styles from "./PropertyVisibilityFields.module.css";

export function PropertyVisibilityFields({
  defaultVisibility = "confidential",
  defaultPublicTitle = "",
  defaultPublicLocation = "",
  defaultPublicImageApproved = false,
  defaultImagePosition = "center",
  collaboratorRequest = false,
}: {
  defaultVisibility?: PropertyVisibility;
  defaultPublicTitle?: string;
  defaultPublicLocation?: string;
  defaultPublicImageApproved?: boolean;
  defaultImagePosition?: PropertyImagePosition;
  collaboratorRequest?: boolean;
}) {
  const [visibility, setVisibility] = useState<PropertyVisibility>(defaultVisibility);

  return (
    <section className={`vault-panel vault-form-section ${styles.panel}`}>
      <div className="vault-section-heading">
        <div>
          <p className="vault-kicker">Public exposure</p>
          <h2>{collaboratorRequest ? "Requested visibility" : "Website visibility"}</h2>
        </div>
        <p>
          {collaboratorRequest
            ? "PF EuroAsia reviews and approves every public image and visibility request before publication."
            : "Choose exactly what may appear publicly. Full property details and brochures remain protected."}
        </p>
      </div>

      <div className={`vault-form-grid ${styles.grid}`}>
        <label>
          <span>Exposure level</span>
          <select
            name="visibility"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value as PropertyVisibility)}
          >
            <option value="confidential">Fully confidential — no public photograph</option>
            <option value="teaser">Public teaser — one photograph, private details</option>
            <option value="public">Public listing — approved summary details</option>
          </select>
        </label>

        {visibility !== "confidential" && (
          <>
            <label>
              <span>Public title</span>
              <input
                name="publicTitle"
                defaultValue={defaultPublicTitle}
                placeholder="Contemporary private estate"
                maxLength={120}
              />
            </label>
            <label>
              <span>Public location</span>
              <input
                name="publicLocation"
                defaultValue={defaultPublicLocation}
                placeholder="La Zagaleta, Benahavís"
                maxLength={120}
              />
            </label>
            <label>
              <span>Photograph focal position</span>
              <select name="imagePosition" defaultValue={defaultImagePosition}>
                <option value="center">Centre</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
            <label className={styles.publicConsent}>
              <input
                name="publicImageApproved"
                type="checkbox"
                value="true"
                defaultChecked={defaultPublicImageApproved}
              />
              <span>
                I confirm that this main photograph may be displayed publicly on the PF EuroAsia website.
              </span>
            </label>
          </>
        )}
      </div>

      <div className={styles.note}>
        {visibility === "confidential" && (
          <p><strong>Fully confidential:</strong> nothing from this property appears on the public website.</p>
        )}
        {visibility === "teaser" && (
          <p><strong>Public teaser:</strong> one approved photograph and generic wording appear publicly. Visitors must register to see the property details.</p>
        )}
        {visibility === "public" && (
          <p><strong>Public listing:</strong> one approved photograph and selected summary wording appear publicly. The full listing and brochure remain behind registration and verification.</p>
        )}
      </div>
    </section>
  );
}
