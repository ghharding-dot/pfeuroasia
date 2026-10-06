import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Property Facilitators EuroAsia",
    short_name: "PF EuroAsia",
    description: "Property, residency, relocation and investment guidance across Spain, Malaysia and Asia.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#111210",
    theme_color: "#111210",
    categories: ["business", "lifestyle", "travel"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/images/property-facilitators-euroasia-logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/property-facilitators-euroasia-logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
