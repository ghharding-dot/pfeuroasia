import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import {
  createEncryptedBrochureReference,
  encryptBrochureBytes,
} from "../../../../lib/brochureStorage";
import { getCollaboratorSession } from "../../../../lib/collaboratorSession";
import { getPartnerContact } from "../../../../lib/partnerContacts";
import { hasVaultAccess } from "../../../../lib/vaultSession";

export const runtime = "nodejs";
export const maxDuration = 300;

const MAX_PDF_SIZE = 60 * 1024 * 1024;

function cleanFilename(value: unknown) {
  return String(value || "brochure.pdf")
    .replace(/[^a-zA-Z0-9._ -]+/g, "")
    .trim()
    .slice(0, 120) || "brochure.pdf";
}

function validBlobUrl(value: unknown) {
  try {
    const url = new URL(String(value || ""));
    if (
      url.protocol !== "https:" ||
      !url.hostname.endsWith(".blob.vercel-storage.com")
    ) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

function pathnameFor(url: URL) {
  try {
    return decodeURIComponent(url.pathname.replace(/^\/+/, ""));
  } catch {
    return url.pathname.replace(/^\/+/, "");
  }
}

export async function POST(request: Request) {
  const vaultAccess = await hasVaultAccess();
  const collaborator = await getCollaboratorSession();
  if (!vaultAccess && !collaborator) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const sourceUrl = validBlobUrl(body?.url);
  if (!sourceUrl) {
    return NextResponse.json(
      { error: "The temporary brochure upload could not be identified." },
      { status: 400 },
    );
  }

  const path = pathnameFor(sourceUrl);
  const collaboratorPrefix = collaborator
    ? `collaborator-submissions/${collaborator.partnerCode.toLowerCase()}/`
    : "";
  const isAdminUpload = vaultAccess && path.startsWith("private-portfolio/");
  const isCollaboratorUpload = Boolean(
    collaborator && path.startsWith(collaboratorPrefix),
  );
  const permittedPath = isAdminUpload || isCollaboratorUpload;

  const permittedBrochureType =
    /(?:^|\/)(?:brochure|partnerBrochure)-/i.test(path);

  if (!permittedPath || !permittedBrochureType) {
    return NextResponse.json(
      { error: "This brochure upload does not belong to the current account." },
      { status: 403 },
    );
  }

  const requestedOwnerCode = String(body?.ownerCode || "DIRECT")
    .trim()
    .toUpperCase();
  const owner = isCollaboratorUpload && collaborator
    ? getPartnerContact(collaborator.partnerCode)
    : getPartnerContact(requestedOwnerCode);

  if (!isCollaboratorUpload && owner.code !== requestedOwnerCode) {
    return NextResponse.json(
      { error: "The listing collaborator could not be identified." },
      { status: 400 },
    );
  }

  const filename = cleanFilename(body?.name);

  try {
    const response = await fetch(sourceUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Temporary brochure could not be retrieved.");

    const contentLength = Number(response.headers.get("content-length") || 0);
    if (contentLength > MAX_PDF_SIZE) {
      throw new Error("The brochure PDF is larger than 60 MB.");
    }

    const source = new Uint8Array(await response.arrayBuffer());
    if (!source.length || source.length > MAX_PDF_SIZE) {
      throw new Error("The brochure PDF is empty or larger than 60 MB.");
    }

    const signature = new TextDecoder().decode(source.subarray(0, 5));
    if (signature !== "%PDF-") {
      throw new Error("The uploaded brochure is not a valid PDF.");
    }

    const encrypted = encryptBrochureBytes(source, owner.code, filename);
    const pathname = `protected-brochures/${owner.code.toLowerCase()}/${encrypted.keyId}.pfea`;
    const stored = await put(pathname, encrypted.payload, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/octet-stream",
    });

    const brochure = createEncryptedBrochureReference({
      v: 1,
      url: stored.url,
      iv: encrypted.iv,
      keyId: encrypted.keyId,
      ownerCode: encrypted.ownerCode,
      name: filename,
      originalSize: encrypted.originalSize,
    });

    console.info("brochure-encrypted-and-stored", {
      ownerCode: owner.code,
      pathname: stored.pathname,
      originalSize: encrypted.originalSize,
    });

    return NextResponse.json({ brochure });
  } catch (error) {
    console.error("brochure-finalize-failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The brochure could not be secured.",
      },
      { status: 400 },
    );
  } finally {
    try {
      await del(sourceUrl.toString());
    } catch (error) {
      console.error("temporary-brochure-delete-failed", error);
    }
  }
}
