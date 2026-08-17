import { get, list, put } from "@vercel/blob";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { NextRequest, NextResponse } from "next/server";
import { verifyBrochureDownloadToken } from "../../../../lib/brochureAccess";
import {
  decryptStoredBrochure,
  encryptPrivateRecord,
  parseEncryptedBrochure,
} from "../../../../lib/brochureStorage";
import { getPartnerContact } from "../../../../lib/partnerContacts";
import { findPublishedPrivateProperty } from "../../../../lib/privatePropertyLookup";
import { hasPrivatePortfolioRequestAccess } from "../../../../lib/privatePortfolioRequest";

export const runtime = "nodejs";
export const maxDuration = 300;

function ascii(value: string, maxLength = 180) {
  return value.replace(/[^\x20-\x7E]/g, "").trim().slice(0, maxLength);
}

function safeFilename(value: string) {
  return ascii(value, 80)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "property-brochure";
}

async function readBrochureBytes(source: string, request: NextRequest) {
  if (parseEncryptedBrochure(source)) {
    return decryptStoredBrochure(source);
  }

  if (/^https?:\/\//i.test(source)) {
    try {
      const privateResult = await get(source, {
        access: "private",
        useCache: false,
      });
      if (privateResult?.statusCode === 200 && privateResult.stream) {
        return new Uint8Array(
          await new Response(privateResult.stream).arrayBuffer(),
        );
      }
    } catch {
      // Older brochures may still be public and are fetched below.
    }

    const response = await fetch(source, { cache: "no-store" });
    if (!response.ok) throw new Error("Brochure could not be retrieved.");
    return new Uint8Array(await response.arrayBuffer());
  }

  const response = await fetch(new URL(source, request.url), {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Brochure could not be retrieved.");
  return new Uint8Array(await response.arrayBuffer());
}

async function createWatermarkedPdf(
  source: Uint8Array,
  details: {
    fullName: string;
    email: string;
    reference: string;
    downloadedAt: string;
  },
) {
  const pdf = await PDFDocument.load(source, { ignoreEncryption: true });
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const name = ascii(details.fullName, 70) || "Verified client";
  const email = ascii(details.email, 100);
  const reference = ascii(details.reference, 40);
  const downloadedAt = ascii(details.downloadedAt, 40);
  const diagonal = "CONFIDENTIAL - PF EUROASIA - VERIFIED CLIENT COPY";
  const footer = `Released to ${name} | ${email} | ${reference} | ${downloadedAt} | Not for onward circulation`;

  for (const page of pdf.getPages()) {
    const { width, height } = page.getSize();
    const diagonalSize = Math.max(18, Math.min(34, width / 17));
    const diagonalWidth = bold.widthOfTextAtSize(diagonal, diagonalSize);

    page.drawText(diagonal, {
      x: Math.max(20, (width - diagonalWidth) / 2),
      y: height * 0.48,
      size: diagonalSize,
      font: bold,
      color: rgb(0.42, 0.34, 0.18),
      opacity: 0.13,
      rotate: degrees(32),
    });

    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height: 24,
      color: rgb(1, 1, 1),
      opacity: 0.9,
    });

    const footerSize = Math.max(5.5, Math.min(7.2, width / 90));
    page.drawText(footer, {
      x: 12,
      y: 8,
      size: footerSize,
      font: regular,
      color: rgb(0.16, 0.16, 0.16),
      maxWidth: width - 24,
    });
  }

  pdf.setTitle(`${reference} - Personalised confidential brochure`);
  pdf.setSubject(`Released by Property Facilitators EuroAsia to ${name}`);
  pdf.setCreator("Property Facilitators EuroAsia Private Collection");
  return pdf.save();
}

async function recordFirstAccess(
  nonce: string,
  record: Record<string, unknown>,
) {
  const pathname = `private-portfolio/access-log/${nonce}.pfea`;
  try {
    const existing = await list({ prefix: pathname, limit: 1 });
    if (existing.blobs.some((blob) => blob.pathname === pathname)) return false;

    const encrypted = encryptPrivateRecord(record, nonce);
    await put(pathname, encrypted, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/octet-stream",
    });
    return true;
  } catch (error) {
    console.error("brochure-access-log-failed", error);
    return true;
  }
}

async function sendAccessNotification(args: {
  propertyTitle: string;
  propertyReference: string;
  partnerCode?: string;
  partnerName?: string;
  fullName: string;
  email: string;
  telephone: string;
  downloadedAt: string;
  country: string;
  city: string;
  maskedIp: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const mainRecipient =
    process.env.ENQUIRY_EMAIL || "enquiry@pfeuroasia.com";
  const partner = getPartnerContact(args.partnerCode);
  const recipients = Array.from(
    new Set([mainRecipient, partner.email].filter(Boolean) as string[]),
  );
  const partnerName = args.partnerName || partner.name;

  const text = [
    `Dear ${partnerName},`,
    "",
    "A verified client has downloaded a personalised, watermarked sales brochure through the PF EuroAsia Private Collection.",
    "",
    `Property: ${args.propertyTitle}`,
    `Reference: ${args.propertyReference}`,
    `Listing collaborator: ${partnerName}`,
    "",
    `Client: ${args.fullName}`,
    `Email: ${args.email}`,
    `Telephone/WhatsApp: ${args.telephone || "Not provided"}`,
    `Downloaded: ${args.downloadedAt}`,
    `Approximate location: ${
      [args.city, args.country].filter(Boolean).join(", ") || "Unavailable"
    }`,
    `Masked IP: ${args.maskedIp || "Unavailable"}`,
    "",
    "The client confirmed that their details and interest in this property may be shared with the listing collaborator.",
    "This access has been recorded by Property Facilitators EuroAsia.",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "PF EuroAsia Private Collection <enquiries@pfeuroasia.com>",
      to: recipients,
      subject: `Verified brochure download — ${args.propertyReference} — ${args.propertyTitle}`,
      text,
      reply_to: args.email,
    }),
  });

  if (!response.ok) {
    console.error(
      "brochure-access-notification-failed",
      await response.text(),
    );
  }
}

function maskedIp(request: NextRequest) {
  const value =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
  if (value.includes(".")) {
    const parts = value.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
    }
  }
  if (value.includes(":")) {
    return `${value.split(":").slice(0, 3).join(":")}:…`;
  }
  return value ? "Masked" : "";
}

export async function GET(request: NextRequest) {
  if (!(await hasPrivatePortfolioRequestAccess(request))) {
    return NextResponse.json(
      { error: "Private Collection access has expired." },
      { status: 401 },
    );
  }

  const token = request.nextUrl.searchParams.get("token") || "";
  const client = verifyBrochureDownloadToken(token);
  if (!client || !client.consent) {
    return NextResponse.json(
      { error: "This brochure link is invalid or has expired." },
      { status: 401 },
    );
  }

  const property = await findPublishedPrivateProperty(
    client.propertyReference,
  );
  if (!property) {
    return NextResponse.json(
      { error: "This property is not currently available." },
      { status: 404 },
    );
  }
  const brochureSource = client.edition === "partner" ? property.unbrandedBrochure : property.brochure;
  if (!brochureSource) {
    return NextResponse.json(
      { error: "This brochure is not currently available." },
      { status: 404 },
    );
  }

  try {
    const downloadedAt = new Date().toISOString();
    const source = await readBrochureBytes(brochureSource, request);
    const watermarked = await createWatermarkedPdf(source, {
      fullName: client.fullName,
      email: client.email,
      reference: property.reference,
      downloadedAt,
    });

    const record = {
      event: "verified-brochure-download",
      propertyReference: property.reference,
      propertyTitle: property.title,
      brochureEdition: client.edition,
      listingPartnerCode: property.listingPartnerCode || "DIRECT",
      listingPartnerName:
        property.listingPartnerName || "Property Facilitators EuroAsia",
      clientName: client.fullName,
      clientEmail: client.email,
      clientTelephone: client.telephone,
      consent: client.consent,
      downloadedAt,
      country: request.headers.get("x-vercel-ip-country") || "",
      city: request.headers.get("x-vercel-ip-city") || "",
      maskedIp: maskedIp(request),
      userAgent: request.headers.get("user-agent") || "",
    };

    const firstAccess = await recordFirstAccess(client.nonce, record);
    if (firstAccess) {
      console.info("verified-brochure-download", record);
      await sendAccessNotification({
        propertyTitle: property.title,
        propertyReference: property.reference,
        partnerCode: property.listingPartnerCode,
        partnerName: property.listingPartnerName,
        fullName: client.fullName,
        email: client.email,
        telephone: client.telephone,
        downloadedAt,
        country: String(record.country),
        city: String(record.city),
        maskedIp: String(record.maskedIp),
      });
    }

    return new NextResponse(Buffer.from(watermarked), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFilename(
          property.title,
        )}-${property.reference}-${client.edition === "partner" ? "partner" : "branded"}-verified.pdf"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("brochure-watermark-failed", error);
    return NextResponse.json(
      {
        error:
          "The brochure could not be prepared. PF EuroAsia has been notified.",
      },
      { status: 500 },
    );
  }
}
