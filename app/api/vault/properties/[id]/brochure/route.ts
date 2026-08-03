import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { decryptStoredBrochure, parseEncryptedBrochure } from "../../../../../lib/brochureStorage";
import { readProperties } from "../../../../../lib/propertyStore";
import { hasVaultAccess } from "../../../../../lib/vaultSession";

function safeFilename(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "property-brochure";
}

async function readBrochure(source: string) {
  if (parseEncryptedBrochure(source)) {
    return decryptStoredBrochure(source);
  }

  if (/^https?:\/\//i.test(source)) {
    try {
      const privateResult = await get(source, { access: "private", useCache: false });
      if (privateResult?.statusCode === 200 && privateResult.stream) {
        return new Uint8Array(await new Response(privateResult.stream).arrayBuffer());
      }
    } catch {
      // Older brochures may be public.
    }

    const response = await fetch(source, { cache: "no-store" });
    if (!response.ok) throw new Error("Brochure could not be retrieved.");
    return new Uint8Array(await response.arrayBuffer());
  }

  throw new Error("Brochure location is invalid.");
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await hasVaultAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const properties = await readProperties();
  const property = properties.find((item) => item.id === id);

  if (!property?.brochure) {
    return NextResponse.json({ error: "This property has no brochure attached." }, { status: 404 });
  }

  try {
    const brochure = await readBrochure(property.brochure);
    return new NextResponse(Buffer.from(brochure), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${safeFilename(property.title)}-${property.reference}-secured.pdf"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("vault-brochure-review-failed", {
      propertyId: id,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      { error: "The secured brochure could not be opened." },
      { status: 500 },
    );
  }
}
