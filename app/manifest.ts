import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Property Facilitators EuroAsia",
    short_name: "EuroAsia",
    description: "Property, rentals, residency, relocation and business support across Spain, Malaysia and Asia.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#10120f",
    theme_color: "#10120f",
    orientation: "portrait",
    icons: [
      {
        src: "/images/pf-gold-symbol.png",
        sizes: "430x590",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
}
