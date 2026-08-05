import { NextResponse } from "next/server";
import { getCollaboratorSession } from "../../../lib/collaboratorSession";
import { formatPropertyCurrency, normalizePriceAmount, normalizePropertyCurrency } from "../../../lib/propertyPrice";
import {
  generatePropertyReference,
  normalizeImagePosition,
  normalizePropertyAccessLevel,
  normalizePropertyVisibility,
  readProperties,
  writeProperties,
  type VaultProperty,
} from "../../../lib/propertyStore";

function clean(value: unknown, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function sendSubmissionEmails(property: VaultProperty, collaboratorEmail: string) {
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
  const adminText = [
    "A collaborator has submitted a new property for PF EuroAsia review.",
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
    `Brochure: ${property.brochure ? "Attached privately" : "Missing"}`,
    "Authority confirmation: Confirmed by collaborator",
    "",
    `Review in the Vault: https://www.pfeuroasia.com/vault/properties/${property.id}/preview`,
  ].join("\n");

  const collaboratorText = [
    `Dear ${property.listingPartnerName},`,
    "",
    "Your property has been submitted successfully to Property Facilitators EuroAsia.",
    "",
    `Property: ${property.title}`,
    `Reference: ${property.reference}`,
    `Status: Pending PF EuroAsia approval`,
    `Requested access route: ${accessLabel}`,
    `Requested visibility: ${visibilityLabel}`,
    "",
    "Nothing will appear publicly until PF EuroAsia has reviewed and approved the presentation, access route and visibility settings.",
    "",
    "Property Facilitators EuroAsia",
  ].join("\n");

  await Promise.all([
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "PF EuroAsia Partner Notifications <partner-notifications@pfeuroasia.com>",
        to: [partnerNotificationsEmail],
        subject: `Collaborator property awaiting review — ${property.reference}`,
        text: adminText,
        reply_to: collaboratorEmail,
      }),
    }),
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "PF EuroAsia Partner Notifications <partner-notifications@pfeuroasia.com>",
        to: [collaboratorEmail],
        subject: `Property submitted for PF EuroAsia review — ${property.reference}`,
        text: collaboratorText,
        reply_to: partnerNotificationsEmail,
      }),
    }),
  ]);
}

export async function GET() {
  const collaborator = await getCollaboratorSession();
  if (!collaborator) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const properties = await readProperties();
  return NextResponse.json(
    properties.filter((property) => property.listingPartnerCode === collaborator.partnerCode),
  );
}

export async function POST(request: Request) {
  const collaborator = await getCollaboratorSession();
  if (!collaborator) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid property submission." }, { status: 400 });
  if (body.authorityConfirmed !== true) {
    return NextResponse.json(
      { error: "Confirm that your company is directly authorised to present this property." },
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
  const now = new Date().toISOString();
  const requestedVisibility = normalizePropertyVisibility(body.visibility);
  const accessLevel = normalizePropertyAccessLevel(body.accessLevel, requestedVisibility);
  const visibility: VaultProperty["visibility"] =
    accessLevel === "registered"
      ? "public"
      : requestedVisibility === "public"
        ? "teaser"
        : requestedVisibility;
  const property: VaultProperty = {
    id: crypto.randomUUID(),
    reference: generatePropertyReference(properties),
    title: clean(body.title, 180),
    location: clean(body.location, 180),
    priceAmount,
    priceCurrency: normalizePropertyCurrency(body.priceCurrency),
    bedrooms: Number(body.bedrooms || 0),
    bathrooms: Number(body.bathrooms || 0),
    plotSize: clean(body.plotSize, 120),
    builtSize: clean(body.builtSize, 120),
    terraces: clean(body.terraces, 120),
    description: clean(body.description),
    image: clean(body.image, 1000),
    secondaryImage: clean(body.secondaryImage, 1000),
    brochure: clean(body.brochure, 2000),
    accessLevel,
    visibility,
    publicTitle: clean(body.publicTitle, 120),
    publicLocation: clean(body.publicLocation, 120),
    publicImageApproved: visibility === "confidential" ? false : body.publicImageApproved === true,
    imagePosition: normalizeImagePosition(body.imagePosition),
    listingPartnerCode: collaborator.partnerCode,
    listingPartnerName: collaborator.partnerName,
    submittedBy: "collaborator",
    submittedByEmail: collaborator.email,
    approvalStatus: "pending-review",
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };

  if (!property.title || !property.location || !property.image || !property.brochure) {
    return NextResponse.json(
      { error: "Property title, location, main image and one brochure PDF are required." },
      { status: 400 },
    );
  }

  properties.unshift(property);
  await writeProperties(properties);

  try {
    await sendSubmissionEmails(property, collaborator.email);
  } catch (error) {
    console.error("collaborator-property-email-failed", error);
  }

  return NextResponse.json(property, { status: 201 });
}
