import type { MetadataRoute } from "next";
import {
  languageAlternates,
  SEO_LAST_UPDATED,
  seoPages,
  SITE_URL,
  type SeoPageKey,
} from "./lib/seo";

function absoluteUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = Object.entries(seoPages)
    .filter(([, page]) => !("index" in page) || page.index !== false)
    .map(([key, page]) => ({
      url: absoluteUrl(page.path),
      lastModified: SEO_LAST_UPDATED,
      changeFrequency: page.path === "/" ? "weekly" : "monthly",
      priority: "priority" in page ? page.priority : 0.8,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(key as SeoPageKey)).map(([locale, path]) => [
            locale,
            absoluteUrl(path),
          ]),
        ),
      },
    }));

  routes.push({
    url: absoluteUrl("/asia-gateway/company-residency"),
    lastModified: SEO_LAST_UPDATED,
    changeFrequency: "monthly",
    priority: 0.85,
  });

  return routes;
}
