import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { hasVaultAccess } from "../../../lib/vaultSession";

const MAX_UPLOAD_SIZE = 60 * 1024 * 1024;

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!(await hasVaultAccess())) {
          throw new Error("Unauthorized");
        }

        if (!pathname.startsWith("private-portfolio/")) {
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
          tokenPayload: JSON.stringify({ reference, kind }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.info("vault-upload-completed", {
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
