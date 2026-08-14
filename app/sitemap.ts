import type { MetadataRoute } from "next";

const baseUrl = "https://pfeuroasia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/enquire",
    "/private-portfolio",
    "/opportunities/country-estates",
    "/opportunities/investment-opportunities",
    "/services/acquisition",
    "/services/international-sales",
    "/services/relocation-concierge",
    "/services/labuan-company-residency",
    "/markets/marbella",
    "/markets/malaysia",
    "/areas/la-zagaleta",
    "/areas/el-madronal",
    "/zh",
    "/zh/la-zagaleta",
    "/zh/el-madronal",
    "/ar",
    "/da",
    "/da/about",
    "/da/services/acquisition",
    "/da/services/international-sales",
    "/da/services/relocation-concierge",
    "/da/services/labuan-company-residency",
    "/da/markets/marbella",
    "/da/markets/malaysia",
    "/da/markets/middle-east",
    "/da/areas/la-zagaleta",
    "/da/areas/el-madronal",
    "/da/luxury-villa-rentals",
    "/da/commercial",
    "/da/property-owners",
    "/da/private-portfolio",
    "/da/asia-gateway",
    "/da/privacy",
    "/da/enquire",
  ];

  return routes.map((route, index) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority:
      index === 0
        ? 1
        : route === "/enquire" ||
            route === "/private-portfolio" ||
            route.startsWith("/opportunities/") ||
            route === "/ar"
          ? 0.9
          : 0.8,
  }));
}
