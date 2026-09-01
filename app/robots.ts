import type { MetadataRoute } from "next";

const privatePaths = [
  "/api/",
  "/vault/",
  "/collaborators/",
  "/private-portfolio/access",
  "/private-portfolio/collection",
];

const searchCrawlers = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: searchCrawlers,
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: "https://www.pfeuroasia.com/sitemap.xml",
    host: "https://www.pfeuroasia.com",
  };
}
