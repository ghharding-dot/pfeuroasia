import { NextResponse } from "next/server";
import {
  imageObjectPosition,
  normalizePropertyMarket,
  readProperties,
} from "@/app/lib/propertyStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function titleKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function GET() {
  try {
    const catalogue = await readProperties();
    const visible = catalogue
      .filter(
        (property) =>
          property.status === "published" &&
          normalizePropertyMarket(property.market) === "spain" &&
          property.listingType !== "new-development" &&
          (property.visibility === "teaser" || property.visibility === "public") &&
          property.publicImageApproved === true &&
          Boolean(property.image),
      )
      .filter(
        (property, index, items) =>
          items.findIndex(
            (candidate) =>
              titleKey(candidate.publicTitle || candidate.title) ===
              titleKey(property.publicTitle || property.title),
          ) === index,
      )
      .sort((a, b) => {
        if (a.featuredOnHomepage !== b.featuredOnHomepage) {
          return a.featuredOnHomepage ? -1 : 1;
        }
        return (a.homepagePriority || 100) - (b.homepagePriority || 100);
      })
      .slice(0, 10)
      .map((property) => {
        const isPublic = property.visibility === "public";
        return {
          id: property.id,
          reference: property.reference,
          title:
            property.publicTitle ||
            (isPublic ? property.title : "Private property opportunity"),
          location:
            property.publicLocation ||
            (isPublic ? property.location : "Southern Spain"),
          price: isPublic ? property.price || "Price on application" : "Price on application",
          bedrooms: property.bedrooms || 0,
          bathrooms: property.bathrooms || 0,
          plot: property.plotSize || "—",
          built: property.builtSize || "—",
          description:
            isPublic && property.description
              ? property.description
              : "A discreet property opportunity available by private introduction through PF Iberia and PF EuroAsia.",
          images: [
            property.image,
            property.secondaryImage,
            property.thirdImage,
            property.fourthImage,
          ].filter((image): image is string => Boolean(image)),
          imagePosition: imageObjectPosition(property.imagePosition),
          detailUrl: isPublic
            ? `https://www.pfeuroasia.com/properties/${encodeURIComponent(property.id)}`
            : "https://www.pfeuroasia.com/private-portfolio",
          access: isPublic ? "public" : "private",
        };
      });

    return NextResponse.json(
      {
        properties: visible,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("pfiberia-property-feed-unavailable", error);
    return NextResponse.json(
      { properties: [], updatedAt: new Date().toISOString() },
      {
        status: 503,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
