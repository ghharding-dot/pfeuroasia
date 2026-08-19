import { NextResponse } from "next/server";
import {
  readCollaboratorDocuments,
  removeCollaboratorDocument,
  writeCollaboratorDocuments,
} from "../../../../lib/collaboratorDocumentStore";
import { hasVaultAccess } from "../../../../lib/vaultSession";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await hasVaultAccess())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const documents = await readCollaboratorDocuments();
  const document = documents.find((item) => item.id === id);
  if (!document) return NextResponse.json({ error: "Document not found." }, { status: 404 });

  await removeCollaboratorDocument(document);
  await writeCollaboratorDocuments(documents.filter((item) => item.id !== id));
  return NextResponse.json({ success: true });
}
