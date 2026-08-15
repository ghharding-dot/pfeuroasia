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

function loadWidget() {
  (window as SkyscannerWindow).skyscanner?.widgets?.load?.();
}

export function SkyscannerFlightSearch() {
  return (
    <div>
      <div
        data-skyscanner-widget="FlightSearchWidget"
        data-locale="en-GB"
        data-market="UK"
        data-currency="EUR"
        data-origin-geo-lookup="true"
        data-destination-name="Kuala Lumpur"
        data-destination-iata-code="KUL"
        data-target="_blank"
        data-flight-type="return"
        data-direct-flights="true"
        data-flights-cabin-classes="true"
        data-colour="transparent"
        data-font-colour="#1b241d"
        data-button-colour="#b59059"
        data-button-font-colour="#ffffff"
        data-button-label="Search flights"
        data-powered-by-logo-colour="dark"
        data-widget-padding="0"
        data-widget-border-radius="0"
        data-web-only-redirects="true"
      />
      <Script
        id="skyscanner-flight-widget-loader"
        src={SKYSCRANNER_LOADER}
        strategy="afterInteractive"
        onLoad={loadWidget}
        onReady={loadWidget}
      />
    </div>
  );
}
