import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getCollaboratorSession } from "../../../lib/collaboratorSession";
import { hasVaultAccess } from "../../../lib/vaultSession";

const MAX_UPLOAD_SIZE = 60 * 1024 * 1024;

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const vaultAccess = await hasVaultAccess();
        const collaborator = vaultAccess ? null : await getCollaboratorSession();

        if (!vaultAccess && !collaborator) {
          throw new Error("Unauthorized");
        }

        const validAdminPath = vaultAccess && pathname.startsWith("private-portfolio/");
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
          // The pathname and content type checks below still protect the upload.
        }

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "application/pdf",
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
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 400 },
    );
  }
}
