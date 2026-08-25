"use client";

import { FormEvent, useState } from "react";
import styles from "./SkyscannerFlightSearch.module.css";

type SkyscannerFlightSearchProps = {
  destinationName?: string;
  destinationIata?: string;
  buttonLabel?: string;
};

function compactDate(value: string) {
  return value.slice(2).replaceAll("-", "");
}

export function SkyscannerFlightSearch({
  destinationName = "Kuala Lumpur",
  destinationIata = "KUL",
  buttonLabel = "Search flights",
}: SkyscannerFlightSearchProps) {
  const [origin, setOrigin] = useState("");
  const [outbound, setOutbound] = useState("");
  const [inbound, setInbound] = useState("");
  const [error, setError] = useState("");

  function searchFlights(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const originCode = origin.trim().toLowerCase();

    if (!/^[a-z]{3}$/.test(originCode)) {
      setError("Please enter a three-letter departure airport code, such as LHR, CPH or ARN.");
      return;
    }

    if (!outbound || !inbound || inbound < outbound) {
      setError("Please select valid outbound and return dates.");
      return;
    }

    setError("");
    const destinationCode = destinationIata.toLowerCase();
    const route = `${originCode}/${destinationCode}/${compactDate(outbound)}/${compactDate(inbound)}`;
    const query = new URLSearchParams({
      adultsv2: "1",
      cabinclass: "economy",
      currency: "EUR",
      locale: "en-GB",
      market: "UK",
      preferdirects: "false",
      rtn: "1",
    });

    window.open(
      `https://www.skyscanner.net/transport/flights/${route}/?${query.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form className={styles.search} onSubmit={searchFlights}>
      <div className={styles.brandLine}>
        <span>Flight search</span>
        <strong>via Skyscanner</strong>
      </div>
      <div className={styles.route}>
        <label>
          <span>From</span>
          <input
            aria-describedby={error ? "flight-search-error" : undefined}
            autoComplete="off"
            inputMode="text"
            maxLength={3}
            onChange={(event) => setOrigin(event.target.value.toUpperCase())}
            placeholder="Airport code — e.g. LHR"
            value={origin}
          />
        </label>
        <div className={styles.destination}>
          <span>To</span>
          <strong>{destinationName}</strong>
          <small>{destinationIata}</small>
        </div>
      </div>
      <div className={styles.dates}>
        <label><span>Depart</span><input type="date" value={outbound} onChange={(event) => setOutbound(event.target.value)} /></label>
        <label><span>Return</span><input type="date" value={inbound} min={outbound || undefined} onChange={(event) => setInbound(event.target.value)} /></label>
      </div>
      {error ? <p className={styles.error} id="flight-search-error" role="alert">{error}</p> : null}
      <button type="submit">{buttonLabel}<span aria-hidden="true">→</span></button>
      <small className={styles.note}>Search results and current prices open securely on Skyscanner.</small>
    </form>
  );
}
