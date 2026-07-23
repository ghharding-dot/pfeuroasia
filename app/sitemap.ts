import type { MetadataRoute } from "next";

const baseUrl = "https://pfeuroasia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/enquire",
    "/private-portfolio",
    "/services/acquisition",
    "/services/international-sales",
    "/services/relocation-concierge",
    "/markets/marbella",
    "/markets/malaysia",
    "/areas/la-zagaleta",
    "/areas/el-madronal",
    "/zh",
    "/zh/la-zagaleta",
    "/zh/el-madronal",
  ];

  return routes.map((route, index) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/enquire" || route === "/private-portfolio" ? 0.9 : 0.8,
  }));
}
