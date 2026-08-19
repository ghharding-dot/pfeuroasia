import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { createCollaboratorChallenge } from "../../../lib/collaboratorAuth";

function adminEmail() {
  return (process.env.VAULT_ADMIN_EMAIL || "enquiry@pfeuroasia.com").trim().toLowerCase();
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "").trim().toLowerCase();
  if (email !== adminEmail()) {
    return NextResponse.json({ error: "This email is not approved for Vault administration." }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Email access is not configured." }, { status: 503 });

  const code = String(randomInt(100000, 1000000));
  const challenge = createCollaboratorChallenge(
    { partnerCode: "DIRECT", partnerName: "Property Facilitators EuroAsia", email },
    code,
  );

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "PF EuroAsia Administration <enquiry@pfeuroasia.com>",
      to: [email],
      subject: "Your PF EuroAsia administration code",
      text: [
        "Your secure PF EuroAsia administration code is:",
        "",
        code,
        "",
        "The code expires in 10 minutes.",
        "",
        "Property Facilitators EuroAsia",
      ].join("\n"),
      reply_to: "enquiry@pfeuroasia.com",
    }),
  });

  if (!response.ok) {
    console.error("vault-admin-code-email-failed", { status: response.status });
    return NextResponse.json({ error: "The access email could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ success: true, challenge, maskedEmail: "en••••@pfeuroasia.com" });
}
