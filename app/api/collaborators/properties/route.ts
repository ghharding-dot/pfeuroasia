import { NextResponse } from "next/server";
import { getCollaboratorSession } from "../../../lib/collaboratorSession";
import {
  generatePropertyReference,
  normalizeImagePosition,
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

  const adminEmail = process.env.ENQUIRY_EMAIL || "enquiry@pfeuroasia.com";
  const visibilityLabel =
    property.visibility === "public"
      ? "Public listing requested"
      : property.visibility === "teaser"
        ? "Public teaser requested"
        : "Fully confidential";
  const adminText = [
    "A collaborator has submitted a new property for PF EuroAsia review.",
    "",
    `Collaborator: ${property.listingPartnerName}`,
    `Collaborator email: ${collaboratorEmail}`,
    `Property: ${property.title}`,
    `Reference: ${property.reference}`,
    `Location: ${property.location}`,
    `Price: ${property.price || "Price on application"}`,
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
    `Requested visibility: ${visibilityLabel}`,
    "",
    "Nothing will appear publicly until PF EuroAsia has reviewed and approved the presentation and visibility settings.",
    "",
    "Property Facilitators EuroAsia",
  ].join("\n");

  await Promise.all([
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "PF EuroAsia Collaborator Portal <enquiry@pfeuroasia.com>",
        to: [adminEmail],
        subject: `Collaborator property awaiting review — ${property.reference}`,
        text: adminText,
        reply_to: collaboratorEmail,
      }),
    }),
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "PF EuroAsia Collaborator Portal <enquiry@pfeuroasia.com>",
        to: [collaboratorEmail],
        subject: `Property submitted for PF EuroAsia review — ${property.reference}`,
        text: collaboratorText,
        reply_to: adminEmail,
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

  const properties = await readProperties();
  const now = new Date().toISOString();
  const visibility = normalizePropertyVisibility(body.visibility);
  const property: VaultProperty = {
    id: crypto.randomUUID(),
    reference: generatePropertyReference(properties),
    title: clean(body.title, 180),
    location: clean(body.location, 180),
    price: clean(body.price, 120),
    bedrooms: Number(body.bedrooms || 0),
    bathrooms: Number(body.bathrooms || 0),
    plotSize: clean(body.plotSize, 120),
    builtSize: clean(body.builtSize, 120),
    terraces: clean(body.terraces, 120),
    description: clean(body.description),
    image: clean(body.image, 1000),
    secondaryImage: clean(body.secondaryImage, 1000),
    brochure: clean(body.brochure, 2000),
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
