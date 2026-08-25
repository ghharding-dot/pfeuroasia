"use client";

import Script from "next/script";

const SKYSCRANNER_LOADER = "https://widgets.skyscanner.net/widget-server/js/loader.js";

type SkyscannerWindow = Window & {
  skyscanner?: {
    widgets?: {
      load?: () => void;
    };
  };
};

type SkyscannerFlightSearchProps = {
  destinationName?: string;
  destinationIata?: string;
  buttonLabel?: string;
};

function loadWidget() {
  (window as SkyscannerWindow).skyscanner?.widgets?.load?.();
}

export function SkyscannerFlightSearch({
  destinationName = "Kuala Lumpur",
  destinationIata = "KUL",
  buttonLabel = "Search flights",
}: SkyscannerFlightSearchProps) {
  return (
    <div>
      <div
        data-skyscanner-widget="FlightSearchWidget"
        data-locale="en-GB"
        data-market="UK"
        data-currency="EUR"
        data-origin-geo-lookup="true"
        data-destination-name={destinationName}
        data-destination-iata-code={destinationIata}
        data-target="_blank"
        data-flight-type="return"
        data-direct-flights="true"
        data-flights-cabin-classes="true"
        data-colour="transparent"
        data-font-colour="#1b241d"
        data-button-colour="#b59059"
        data-button-font-colour="#ffffff"
        data-button-label={buttonLabel}
        data-powered-by-logo-colour="dark"
        data-widget-padding="0"
        data-widget-border-radius="0"
        data-web-only-redirects="true"
      />
      <Script
        id="skyscanner-flight-widget-loader"
        src={SKYSCRANNER_LOADER}
        strategy="afterInteractive"
        onReady={loadWidget}
      />
    </div>
  );
}
