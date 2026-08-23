import { NextResponse } from "next/server";
import { getCollaboratorSession } from "../../../../lib/collaboratorSession";
import {
  formatPropertyCurrency,
  normalizePriceAmount,
  normalizePropertyCurrency,
} from "../../../../lib/propertyPrice";
import {
  normalizeImagePosition,
  normalizePropertyListingType,
  normalizePropertyAccessLevel,
  normalizePropertyVisibility,
  readProperties,
  writeProperties,
  type VaultProperty,
} from "../../../../lib/propertyStore";

function clean(value: unknown, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function sendUpdateEmails(property: VaultProperty, collaboratorEmail: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const partnerNotificationsEmail =
    process.env.PARTNER_NOTIFICATIONS_EMAIL || "partner-notifications@pfeuroasia.com";
  const visibilityLabel =
    property.visibility === "public"
      ? "Public carousel listing"
      : property.visibility === "teaser"
        ? "Private teaser requested"
        : "Fully confidential";
  const accessLabel =
    property.accessLevel === "registered"
      ? "Registered listing — automatic access after contact verification"
      : "Private off-market — detailed application and PF EuroAsia approval";
  const priceLabel = property.priceAmount
    ? formatPropertyCurrency(property.priceAmount, property.priceCurrency || "EUR")
    : "Price on application";
  const text = [
    "A collaborator has updated a property and returned it for PF EuroAsia review.",
    "",
    `Collaborator: ${property.listingPartnerName}`,
    `Collaborator email: ${collaboratorEmail}`,
    `Property: ${property.title}`,
    `Reference: ${property.reference}`,
    `Location: ${property.location}`,
    `Price: ${priceLabel}`,
    `Requested access route: ${accessLabel}`,
    `Requested visibility: ${visibilityLabel}`,
    `Public image permission: ${property.publicImageApproved ? "Confirmed" : "Not confirmed"}`,
    `Brochure: ${property.brochure ? "Protected brochure attached" : "Missing"}`,
    "",
    `Review in the Vault: https://www.pfeuroasia.com/vault/properties/${property.id}/preview`,
  ].join("\n");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "PF EuroAsia Partner Notifications <partner-notifications@pfeuroasia.com>",
      to: [partnerNotificationsEmail],
      subject: `Collaborator property updated — ${property.reference}`,
      text,
      reply_to: collaboratorEmail,
    }),
  });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const collaborator = await getCollaboratorSession();
  if (!collaborator) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid property update." }, { status: 400 });
  }
  if (body.authorityConfirmed !== true) {
    return NextResponse.json(
      { error: "Confirm that your company remains authorised to present this property." },
      { status: 400 },
    );
  }

  const priceAmount = normalizePriceAmount(body.priceAmount);
  if (body.priceAmount && !priceAmount) {
    return NextResponse.json(
      { error: "Enter the listing price as numbers only, for example 8900000." },
      { status: 400 },
    );
  }

  const properties = await readProperties();
  const index = properties.findIndex(
    (property) =>
      property.id === id &&
      property.listingPartnerCode === collaborator.partnerCode,
  );

  if (index === -1) {
    return NextResponse.json({ error: "Property not found." }, { status: 404 });
  }

  const existing = properties[index];
  const requestedVisibility = normalizePropertyVisibility(body.visibility);
  const accessLevel = normalizePropertyAccessLevel(body.accessLevel, requestedVisibility);
  const visibility: VaultProperty["visibility"] =
    accessLevel === "registered"
      ? "public"
      : requestedVisibility === "public"
        ? "teaser"
        : requestedVisibility;
  const updated: VaultProperty = {
    ...existing,
    title: clean(body.title, 180) || existing.title,
    location: clean(body.location, 180) || existing.location,
    approximateLocation: clean(body.approximateLocation, 180) || existing.approximateLocation || existing.location,
    priceAmount,
    priceCurrency: normalizePropertyCurrency(body.priceCurrency),
    price: undefined,
    bedrooms: Number(body.bedrooms || 0),
    bathrooms: Number(body.bathrooms || 0),
    plotSize: clean(body.plotSize, 120),
    builtSize: clean(body.builtSize, 120),
    terraces: clean(body.terraces, 120),
    annualCosts: clean(body.annualCosts, 1000),
    description: clean(body.description),
    image: clean(body.image, 1200) || existing.image,
    secondaryImage:
      body.removeSecondaryImage === true
        ? ""
        : clean(body.secondaryImage, 1200) || existing.secondaryImage || "",
    thirdImage:
      body.removeThirdImage === true
        ? ""
        : clean(body.thirdImage, 1200) || existing.thirdImage || "",
    fourthImage:
      body.removeFourthImage === true
        ? ""
        : clean(body.fourthImage, 1200) || existing.fourthImage || "",
    brochure: clean(body.brochure, 2000) || existing.brochure || "",
    unbrandedBrochure:
      clean(body.unbrandedBrochure, 2000) || existing.unbrandedBrochure || "",
    adviserName: clean(body.adviserName, 120) || existing.adviserName || "PF EuroAsia Property Adviser",
    adviserWhatsApp: clean(body.adviserWhatsApp, 40) || existing.adviserWhatsApp || "",
    accessLevel,
    visibility,
    publicTitle: clean(body.publicTitle, 120),
    publicLocation: clean(body.publicLocation, 120),
    publicImageApproved: visibility === "confidential" ? false : body.publicImageApproved === true,
    imagePosition: normalizeImagePosition(body.imagePosition),
    listingType: normalizePropertyListingType(body.listingType),
    status: "draft",
    lastVerifiedAt: existing.lastVerifiedAt,
    approvalStatus: "pending-review",
    updatedAt: new Date().toISOString(),
  };

  if (!updated.title || !updated.location || !updated.image || !updated.brochure) {
    return NextResponse.json(
      { error: "Property title, location, main image and one brochure PDF are required." },
      { status: 400 },
    );
  }

  if (
    updated.listingType === "new-development" &&
    (!updated.secondaryImage || !updated.thirdImage || !updated.fourthImage)
  ) {
    return NextResponse.json(
      { error: "New-development listings require four property photographs." },
      { status: 400 },
    );
  }

  properties[index] = updated;
  await writeProperties(properties);

  try {
    await sendUpdateEmails(updated, collaborator.email);
  } catch (error) {
    console.error("collaborator-property-update-email-failed", error);
  }

  return NextResponse.json(updated);
}
