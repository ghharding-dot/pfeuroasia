import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Property Facilitators EuroAsia",
    short_name: "PF EuroAsia",
    description: "Direct access to EuroAsia property, rentals, Malaysia, residency and relocation services.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    background_color: "#10120f",
    theme_color: "#10120f",
    orientation: "portrait",
    icons: [
      {
        src: "/images/property-facilitators-euroasia-logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/images/property-facilitators-euroasia-logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
