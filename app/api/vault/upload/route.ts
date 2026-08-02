import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { hasVaultAccess } from "../../../lib/vaultSession";

export async function POST(request: Request) {
  if (!(await hasVaultAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const reference = String(form.get("reference") || "property")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file supplied." }, { status: 400 });
  }

  const allowed = file.type.startsWith("image/") || file.type === "application/pdf";
  if (!allowed) {
    return NextResponse.json({ error: "Only images and PDF brochures are accepted." }, { status: 400 });
  }

  const blob = await put(`private-portfolio/${reference}/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url, pathname: blob.pathname });
}
