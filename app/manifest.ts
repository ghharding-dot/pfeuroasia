import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Property Facilitators EuroAsia",
    short_name: "EuroAsia",
    description: "Direct access to EuroAsia property, rentals, Malaysia, residency and relocation services.",
    start_url: "/app",
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
