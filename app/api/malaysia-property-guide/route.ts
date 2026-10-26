import { NextRequest, NextResponse } from "next/server";
import { recordMalaysiaAdviserAccess } from "../../lib/malaysiaAdviserLeadStore";
import { createMalaysiaPropertyGuidePdf, malaysiaPropertyGuideFilename } from "../../lib/malaysiaPropertyGuidePdf";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let payload: { email?: unknown; consent?: unknown; company_website?: unknown };
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
    payload = body;
  } catch { return NextResponse.json({error: "Invalid request."}, {status: 400}); }
  if (payload.company_website) return NextResponse.json({error: "Invalid request."}, {status: 400});
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || payload.consent !== true) {
    return NextResponse.json({error: "Enter a valid email and accept the privacy notice."}, {status: 400});
  }
  try {
    const bytes = await createMalaysiaPropertyGuidePdf();
    // The PDF is released only after registration has been saved successfully.
    await recordMalaysiaAdviserAccess({fullName: "Property buying guide subscriber", email, source: "Malaysia property buying PDF download | privacy consent accepted (notice 26 October 2026)"});
    return new NextResponse(Buffer.from(bytes), {headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${malaysiaPropertyGuideFilename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    }});
  } catch {
    console.error("malaysia-property-guide-download-failed");
    return NextResponse.json({error: "We could not prepare your registered download. Please try again."}, {status: 503});
  }
}
