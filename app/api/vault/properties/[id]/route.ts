import { NextResponse } from "next/server";
import { hasVaultAccess } from "../../../../lib/vaultSession";
import {
  normalizeImagePosition,
  normalizePropertyMarket,
  normalizePropertyAccessLevel,
  normalizePropertyVisibility,
  readProperties,
  writeProperties,
  type VaultProperty,
} from "../../../../lib/propertyStore";

function clean(value: unknown, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await hasVaultAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid property update." }, { status: 400 });
  }

  const properties = await readProperties();
  const index = properties.findIndex((property) => property.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Property not found." }, { status: 404 });
  }

  const existing = properties[index];
  const hasStatusUpdate = body.status === "published" || body.status === "draft";
  const status: VaultProperty["status"] = hasStatusUpdate
    ? body.status === "published"
      ? "published"
      : "draft"
    : existing.status;

  if (status === "published" && !existing.brochure) {
    return NextResponse.json(
      { error: "Attach one sales brochure PDF before publishing this property." },
      { status: 400 },
    );
  }

  const hasAccessUpdate =
    typeof body.visibility === "string" || typeof body.accessLevel === "string";
  const hasDetailUpdate = body.verifyListingDetails === true;
  const requestedVisibility = hasAccessUpdate
    ? normalizePropertyVisibility(body.visibility)
    : existing.visibility || "confidential";
  const accessLevel = hasAccessUpdate
    ? normalizePropertyAccessLevel(body.accessLevel, requestedVisibility)
    : normalizePropertyAccessLevel(existing.accessLevel, existing.visibility);
  const visibility: VaultProperty["visibility"] =
    accessLevel === "registered"
      ? "public"
      : requestedVisibility === "public"
        ? "teaser"
        : requestedVisibility;

  const updated: VaultProperty = {
    ...existing,
    status,
    accessLevel,
    visibility,
    publicTitle: hasAccessUpdate
      ? clean(body.publicTitle, 120)
      : existing.publicTitle || "",
    publicLocation: hasAccessUpdate
      ? clean(body.publicLocation, 120)
      : existing.publicLocation || "",
    publicImageApproved: hasAccessUpdate
      ? visibility === "confidential"
        ? false
        : body.publicImageApproved === true
      : existing.publicImageApproved || false,
    imagePosition: hasAccessUpdate
      ? normalizeImagePosition(body.imagePosition)
      : existing.imagePosition || "center",
    featuredOnHomepage: hasDetailUpdate
      ? body.featuredOnHomepage === true
      : existing.featuredOnHomepage || false,
    homepagePriority: hasDetailUpdate
      ? Math.min(100, Math.max(1, Number(body.homepagePriority) || 100))
      : existing.homepagePriority,
    approximateLocation: hasDetailUpdate
      ? clean(body.approximateLocation, 180) || existing.location
      : existing.approximateLocation,
    market: hasDetailUpdate
      ? normalizePropertyMarket(body.market || existing.market)
      : existing.market,
    country: hasDetailUpdate ? clean(body.country, 120) : existing.country,
    setting: hasDetailUpdate ? clean(body.setting, 120) : existing.setting,
    views: hasDetailUpdate ? clean(body.views, 240) : existing.views,
    yearOfConstruction: hasDetailUpdate
      ? clean(body.yearOfConstruction, 80)
      : existing.yearOfConstruction,
    developer: hasDetailUpdate ? clean(body.developer, 180) : existing.developer,
    salesAgent: hasDetailUpdate ? clean(body.salesAgent, 180) : existing.salesAgent,
    annualCosts: hasDetailUpdate ? clean(body.annualCosts, 1000) : existing.annualCosts,
    adviserName: hasDetailUpdate
      ? clean(body.adviserName, 120) || "PF EuroAsia Property Adviser"
      : existing.adviserName,
    adviserWhatsApp: hasDetailUpdate
      ? clean(body.adviserWhatsApp, 40)
      : existing.adviserWhatsApp,
    approvalStatus: status === "published" ? "approved" : existing.approvalStatus,
    lastVerifiedAt:
      hasDetailUpdate || (status === "published" && existing.status !== "published")
        ? new Date().toISOString()
        : existing.lastVerifiedAt,
    updatedAt: new Date().toISOString(),
  };

  properties[index] = updated;
  await writeProperties(properties);

  return NextResponse.json(updated);
}
