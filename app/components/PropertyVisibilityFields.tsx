"use client";

import { useState } from "react";
import type {
  PropertyAccessLevel,
  PropertyImagePosition,
  PropertyVisibility,
} from "../lib/propertyStore";
import styles from "./PropertyVisibilityFields.module.css";

export function PropertyVisibilityFields({
  defaultVisibility = "confidential",
  defaultAccessLevel,
  defaultPublicTitle = "",
  defaultPublicLocation = "",
  defaultPublicImageApproved = false,
  defaultImagePosition = "center",
  collaboratorRequest = false,
}: {
  defaultVisibility?: PropertyVisibility;
  defaultAccessLevel?: PropertyAccessLevel;
  defaultPublicTitle?: string;
  defaultPublicLocation?: string;
  defaultPublicImageApproved?: boolean;
  defaultImagePosition?: PropertyImagePosition;
  collaboratorRequest?: boolean;
}) {
  const initialAccessLevel =
    defaultAccessLevel || (defaultVisibility === "public" ? "registered" : "private");
  const [accessLevel, setAccessLevel] = useState<PropertyAccessLevel>(initialAccessLevel);
  const [visibility, setVisibility] = useState<PropertyVisibility>(
    initialAccessLevel === "registered"
      ? "public"
      : defaultVisibility === "public"
        ? "teaser"
        : defaultVisibility,
  );

  function changeAccessLevel(next: PropertyAccessLevel) {
    setAccessLevel(next);
    if (next === "registered") {
      setVisibility("public");
    } else if (visibility === "public") {
      setVisibility("teaser");
    }
  }

  return (
    <section className={`vault-panel vault-form-section ${styles.panel}`}>
      <div className="vault-section-heading">
        <div>
          <p className="vault-kicker">Client access and public exposure</p>
          <h2>{collaboratorRequest ? "Requested access route" : "Website access route"}</h2>
        </div>
        <p>
          {collaboratorRequest
            ? "PF EuroAsia reviews and approves the requested access route, public image and presentation before publication."
            : "Choose whether this is a general registered listing or a genuinely private off-market opportunity."}
        </p>
      </div>

      <div className={`vault-form-grid ${styles.grid}`}>
        <label>
          <span>Client access level</span>
          <select
            name="accessLevel"
            value={accessLevel}
            onChange={(event) => changeAccessLevel(event.target.value as PropertyAccessLevel)}
          >
            <option value="registered">Registered listing — automatic access after contact verification</option>
            <option value="private">Private off-market — detailed application and PF EuroAsia approval</option>
          </select>
        </label>

        <label>
          <span>Public presentation</span>
          <select
            name="visibility"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value as PropertyVisibility)}
          >
            {accessLevel === "registered" ? (
              <option value="public">Public carousel listing — approved summary and one photograph</option>
            ) : (
              <>
                <option value="confidential">Fully confidential — nothing appears publicly</option>
                <option value="teaser">Private teaser — one photograph and discreet wording</option>
              </>
            )}
          </select>
        </label>

        {visibility !== "confidential" && (
          <>
            <label>
              <span>Public title</span>
              <input
                name="publicTitle"
                defaultValue={defaultPublicTitle}
                placeholder={accessLevel === "registered" ? "Fairways" : "Private property opportunity"}
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
        {accessLevel === "registered" && (
          <p>
            <strong>Registered listing:</strong> the visitor provides their name, email and telephone number, verifies a six-digit email code and receives immediate access to full particulars for 30 days. Your approval is not required.
          </p>
        )}
        {accessLevel === "private" && visibility === "teaser" && (
          <p>
            <strong>Private off-market teaser:</strong> one approved photograph and discreet wording appear publicly. The client must complete the detailed Private Collection application and receive your approval.
          </p>
        )}
        {accessLevel === "private" && visibility === "confidential" && (
          <p>
            <strong>Fully confidential:</strong> nothing from this property appears publicly. Access remains limited to approved Private Collection clients.
          </p>
        )}
      </div>
    </section>
  );
}
