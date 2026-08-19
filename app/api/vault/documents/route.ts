import { NextResponse } from "next/server";
import {
  isCollaboratorDocumentCategory,
  isCollaboratorDocumentMarket,
  readCollaboratorDocuments,
  writeCollaboratorDocuments,
  type CollaboratorDocumentRecord,
} from "../../../lib/collaboratorDocumentStore";
import { hasVaultAccess } from "../../../lib/vaultSession";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await hasVaultAccess())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await readCollaboratorDocuments());
}

export async function POST(request: Request) {
  if (!(await hasVaultAccess())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const market = body?.market;
  const category = body?.category;
  const title = String(body?.title || "").trim().slice(0, 180);
  const description = String(body?.description || "").trim().slice(0, 800);
  const url = String(body?.url || "").trim();
  const fileName = String(body?.fileName || "document.pdf").trim().slice(0, 220);

  let blobUrl: URL;
  try {
    blobUrl = new URL(url);
  } catch {
    return NextResponse.json({ error: "The uploaded PDF URL is invalid." }, { status: 400 });
  }

  if (!blobUrl.hostname.endsWith("blob.vercel-storage.com")) {
    return NextResponse.json({ error: "The PDF was not uploaded to approved storage." }, { status: 400 });
  }
  if (!isCollaboratorDocumentMarket(market) || !isCollaboratorDocumentCategory(category) || !title) {
    return NextResponse.json({ error: "Country, category and document title are required." }, { status: 400 });
  }

  const documents = await readCollaboratorDocuments();
  const now = new Date().toISOString();
  const document: CollaboratorDocumentRecord = {
    id: crypto.randomUUID(),
    market,
    category,
    title,
    description,
    url,
    fileName,
    createdAt: now,
    updatedAt: now,
  };

  documents.unshift(document);
  await writeCollaboratorDocuments(documents);
  return NextResponse.json(document, { status: 201 });
}
