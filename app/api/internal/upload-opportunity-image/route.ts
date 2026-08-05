import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const UPLOAD_KEY = "pfea-opportunity-images-8f4c2d71";

export async function POST(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("key") !== UPLOAD_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const filename = String(formData.get("filename") || "").replace(/[^a-z0-9.-]/gi, "-");

  if (!(file instanceof File) || !filename) {
    return NextResponse.json({ error: "File and filename are required." }, { status: 400 });
  }

  const blob = await put(`homepage-opportunities/${filename}`, file, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: file.type || "image/webp",
  });

  return NextResponse.json({ url: blob.url, pathname: blob.pathname });
}
