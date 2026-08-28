"use client";

import { useMemo, useState } from "react";

const AMENITY_OPTIONS = [
  "Swimming pool",
  "Gym",
  "Co-working space",
  "Sauna",
  "Spa / wellness",
  "Steam room",
  "Children's play area",
  "Concierge",
  "24-hour security",
  "Parking",
  "EV charging",
  "Landscaped gardens",
  "Rooftop terrace",
  "Residents' lounge",
  "Sports courts",
  "Cinema room",
  "Games room",
  "Pet-friendly facilities",
] as const;

function parseAmenities(value: string) {
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function DevelopmentAmenitiesPicker({ defaultValue = "" }: { defaultValue?: string }) {
  const initialAmenities = useMemo(() => parseAmenities(defaultValue), [defaultValue]);
  const [selected, setSelected] = useState<string[]>(
    initialAmenities.filter((item) => (AMENITY_OPTIONS as readonly string[]).includes(item)),
  );
  const [other, setOther] = useState(
    initialAmenities
      .filter((item) => !(AMENITY_OPTIONS as readonly string[]).includes(item))
      .join(", "),
  );

  const amenities = [...selected, ...parseAmenities(other)].join(", ");

  function toggleAmenity(amenity: string) {
    setSelected((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  }

  return (
    <div className="vault-amenities-picker">
      <input type="hidden" name="amenities" value={amenities} />
      <details>
        <summary>
          <span>{selected.length || other.trim() ? `${selected.length + parseAmenities(other).length} selected` : "Select amenities"}</span>
          <span aria-hidden="true">⌄</span>
        </summary>
        <div className="vault-amenities-menu">
          <div className="vault-amenities-options">
            {AMENITY_OPTIONS.map((amenity) => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  checked={selected.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
          <label className="vault-amenities-other">
            <span>Other amenities</span>
            <input
              value={other}
              onChange={(event) => setOther(event.target.value)}
              placeholder="e.g. golf simulator, yoga studio"
            />
            <small>Separate multiple custom amenities with commas.</small>
          </label>
        </div>
      </details>
      <small>Choose every facility included in this particular development.</small>
    </div>
  );
}
