import { NextRequest, NextResponse } from "next/server";
import {
  updatePrivateClientStatus,
  type PrivateClientStatus,
} from "../../../../lib/privateClientStore";
import {
  createVaultToken,
  getVaultPassword,
  VAULT_COOKIE_NAME,
} from "../../../../lib/vaultAuth";

function hasVaultAccess(request: NextRequest) {
  const password = getVaultPassword();
  return Boolean(
    password &&
      request.cookies.get(VAULT_COOKIE_NAME)?.value === createVaultToken(password),
  );
}

function notificationAddress() {
  const configured = process.env.ENQUIRY_NOTIFICATION_FROM || "enquiries@pfeuroasia.com";
  const match = configured.match(/<([^>]+)>/);
  return (match?.[1] || configured).trim();
}

async function sendStatusEmail(args: {
  email: string;
  fullName: string;
  status: PrivateClientStatus;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const approved = args.status === "approved";
  const subject = approved
    ? "Your PF EuroAsia Private Collection access is approved"
    : "PF EuroAsia Private Collection access update";
  const text = approved
    ? [
        `Dear ${args.fullName},`,
        "",
        "Your application for the Property Facilitators EuroAsia Private Collection has been approved.",
        "",
        "To enter the collection:",
        "1. Open https://www.pfeuroasia.com/private-portfolio/access",
        "2. Enter this approved email address.",
        "3. We will send you a secure six-digit access code.",
        "",
        "After verification, your device will remain signed in for up to 30 days. Access remains personal, confidential and subject to withdrawal.",
        "",
        "Property Facilitators EuroAsia",
        "enquiry@pfeuroasia.com",
      ].join("\n")
    : [
        `Dear ${args.fullName},`,
        "",
        "Your access to the Property Facilitators EuroAsia Private Collection has been withdrawn.",
        "",
        "Please contact enquiry@pfeuroasia.com if you believe this requires review.",
        "",
        "Property Facilitators EuroAsia",
      ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `PF EuroAsia Private Collection <${notificationAddress()}>`,
      to: [args.email],
      subject,
      text,
      reply_to: "enquiry@pfeuroasia.com",
    }),
  });

  if (!response.ok) {
    console.error("private-client-status-email-failed", {
      status: response.status,
      response: await response.text(),
      clientStatus: args.status,
    });
    return false;
  }

  return true;
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!hasVaultAccess(request)) {
    return NextResponse.json({ error: "Vault access required." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const status = body?.status as PrivateClientStatus | undefined;

  if (status !== "pending" && status !== "approved" && status !== "revoked") {
    return NextResponse.json({ error: "Invalid client access status." }, { status: 400 });
  }

  const client = await updatePrivateClientStatus(id, status);
  if (!client) {
    return NextResponse.json({ error: "Client record not found." }, { status: 404 });
  }

  let emailSent = true;
  if (status === "approved" || status === "revoked") {
    emailSent = await sendStatusEmail({
      email: client.email,
      fullName: client.fullName,
      status,
    });
  }

  return NextResponse.json({
    success: true,
    status: client.status,
    emailSent,
  });
}
