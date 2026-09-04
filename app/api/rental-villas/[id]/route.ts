import { NextResponse } from "next/server";
import {
  readRentalVillas,
  writeRentalVillas,
  type RentalVilla,
} from "../../../lib/rentalVillaStore";
import { hasVaultAccess } from "../../../lib/vaultSession";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await hasVaultAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body || (body.status !== "published" && body.status !== "draft")) {
    return NextResponse.json({ error: "Choose a valid publication status." }, { status: 400 });
  }

  const villas = await readRentalVillas();
  const index = villas.findIndex((villa) => villa.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Villa not found." }, { status: 404 });
  }

  const existing = villas[index];
  const status: RentalVilla["status"] =
    body.status === "published" ? "published" : "draft";

  if (
    status === "published" &&
    (!existing.image ||
      !existing.secondaryImage ||
      !existing.thirdImage ||
      !existing.fourthImage)
  ) {
    return NextResponse.json(
      { error: "Four photographs are required before publication." },
      { status: 400 },
    );
  }

  const updated: RentalVilla = {
    ...existing,
    status,
    approvalStatus: status === "published" ? "approved" : existing.approvalStatus,
    updatedAt: new Date().toISOString(),
  };

  villas[index] = updated;
  await writeRentalVillas(villas);
  return NextResponse.json(updated);
}
