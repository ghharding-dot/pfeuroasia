import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getCollaboratorSession } from "../../../lib/collaboratorSession";
import { hasVaultAccess } from "../../../lib/vaultSession";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_UPLOAD_SIZE = 60 * 1024 * 1024;
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

function hasAllowedExtension(pathname: string, extensions: string[]) {
  const normalized = pathname.toLowerCase();
  return extensions.some((extension) => normalized.endsWith(extension));
}

export async function POST(request: Request) {
  let body: HandleUploadBody;

  try {
    body = (await request.json()) as HandleUploadBody;
  } catch (error) {
    console.error("property-upload-invalid-request", error);
    return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });
  }

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const vaultAccess = await hasVaultAccess();
        const collaborator = vaultAccess ? null : await getCollaboratorSession();

        if (!vaultAccess && !collaborator) {
          throw new Error("Your secure upload session has expired. Sign in again and retry without closing this page.");
        }

        const validAdminPath = vaultAccess && (
          pathname.startsWith("private-portfolio/") ||
          pathname.startsWith("collaborator-documents/")
        );
        const collaboratorPrefix = collaborator
          ? `collaborator-submissions/${collaborator.partnerCode.toLowerCase()}/`
          : "";
        const validCollaboratorPath = Boolean(
          collaborator && pathname.startsWith(collaboratorPrefix),
        );

        if (!validAdminPath && !validCollaboratorPath) {
          throw new Error("Invalid upload destination.");
        }

        let reference = "property";
        let kind = "document";
        try {
          const parsed = JSON.parse(clientPayload || "{}") as {
            reference?: string;
            kind?: string;
          };
          reference = String(parsed.reference || reference).slice(0, 100);
          kind = String(parsed.kind || kind).slice(0, 40);
        } catch {
          throw new Error("Invalid upload information.");
        }

        const isBrochure = kind === "brochure" || kind === "partnerBrochure";
        const isCollaboratorDocument = kind === "collaboratorDocument";
        const isImage = kind === "main" || kind === "secondary";

        if ((isBrochure || isCollaboratorDocument) && !hasAllowedExtension(pathname, [".pdf"])) {
          throw new Error("The document must be a PDF file.");
        }
        if (isImage && !hasAllowedExtension(pathname, IMAGE_EXTENSIONS)) {
          throw new Error("The property photograph must be JPG, PNG or WebP.");
        }
        if (!isBrochure && !isCollaboratorDocument && !isImage) {
          throw new Error("Unsupported upload type.");
        }

        return {
          allowedContentTypes: isBrochure || isCollaboratorDocument
            ? ["application/pdf", "application/x-pdf", "application/octet-stream"]
            : [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
                "application/octet-stream",
              ],
          maximumSizeInBytes: MAX_UPLOAD_SIZE,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            reference,
            kind,
            uploadedBy: collaborator?.partnerCode || "ADMIN",
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.info("property-upload-completed", {
          pathname: blob.pathname,
          tokenPayload,
        });
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    console.error("property-upload-token-failed", {
      message,
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
