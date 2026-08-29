import type { MetadataRoute } from "next";
import {
  languageAlternates,
  SEO_LAST_UPDATED,
  seoPages,
  SITE_URL,
  type SeoPageKey,
} from "./lib/seo";
import {
  normalizePropertyAccessLevel,
  readProperties,
} from "./lib/propertyStore";

function absoluteUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

function absoluteAssetUrl(path: string) {
  return /^https?:\/\//i.test(path) ? path : absoluteUrl(path.startsWith("/") ? path : `/${path}`);
}

function validLastModified(value?: string) {
  if (!value) return SEO_LAST_UPDATED;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? SEO_LAST_UPDATED : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    url: absoluteUrl("/properties"),
    lastModified: SEO_LAST_UPDATED,
    changeFrequency: "weekly",
    priority: 0.95,
    alternates: {
      languages: {
        "en-GB": absoluteUrl("/properties"),
        "es-ES": absoluteUrl("/es/properties"),
        "x-default": absoluteUrl("/properties"),
      },
    },
  });

  routes.push({
    url: absoluteUrl("/es/properties"),
    lastModified: SEO_LAST_UPDATED,
    changeFrequency: "weekly",
    priority: 0.95,
    alternates: {
      languages: {
        "en-GB": absoluteUrl("/properties"),
        "es-ES": absoluteUrl("/es/properties"),
        "x-default": absoluteUrl("/properties"),
      },
    },
  });

  routes.push(
    {
      url: absoluteUrl("/travel/malaysia"),
      lastModified: SEO_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  );

  const properties = await readProperties();
  const propertyRoutes: MetadataRoute.Sitemap = properties
    .filter(
      (property) =>
        property.status === "published" &&
        property.publicImageApproved === true &&
        Boolean(property.image) &&
        (property.listingType === "new-development"
          ? property.visibility === "public" || property.visibility === "teaser"
          : normalizePropertyAccessLevel(property.accessLevel, property.visibility) === "registered"),
    )
    .map((property) => ({
      url: absoluteUrl(`/properties/${property.id}`),
      lastModified: validLastModified(property.updatedAt),
      changeFrequency: "weekly" as const,
      priority: property.listingType === "new-development" ? 0.9 : 0.85,
      images: [absoluteAssetUrl(property.image)],
    }));

  routes.push(...propertyRoutes);

  return routes;
}
