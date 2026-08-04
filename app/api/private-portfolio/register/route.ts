import { NextResponse } from "next/server";
import {
  registerPrivateClient,
  type PrivateClientRegistration,
} from "../../../lib/privateClientStore";

export const runtime = "nodejs";

function clean(value: unknown, maxLength = 2000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validEmail(value: string) {
  return value.includes("@") && !value.startsWith("@") && !value.endsWith("@");
}

function notificationAddress() {
  const configured = process.env.ENQUIRY_NOTIFICATION_FROM || "enquiries@pfeuroasia.com";
  const match = configured.match(/<([^>]+)>/);
  return (match?.[1] || configured).trim();
}

async function sendEmail(args: {
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `PF EuroAsia Private Collection <${notificationAddress()}>`,
      to: args.to,
      subject: args.subject,
      text: args.text,
      reply_to: args.replyTo || "enquiry@pfeuroasia.com",
    }),
  });

  if (!response.ok) {
    console.error("private-client-registration-email-failed", {
      status: response.status,
      response: await response.text(),
    });
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "The registration could not be read." }, { status: 400 });
  }

  if (clean(body.companyWebsite, 200)) {
    return NextResponse.json({ success: true });
  }

  const registration: PrivateClientRegistration = {
    fullName: clean(body.fullName, 160),
    email: clean(body.email, 320).toLowerCase(),
    telephone: clean(body.telephone, 120),
    nationality: clean(body.nationality, 120),
    countryOfResidence: clean(body.countryOfResidence, 160),
    residentialAddress: clean(body.residentialAddress, 500),
    wechatId: clean(body.wechatId, 120) || undefined,
    preferredLanguage: clean(body.preferredLanguage, 80),
    companyName: clean(body.companyName, 160) || undefined,
    occupation: clean(body.occupation, 160) || undefined,
    propertyType: clean(body.propertyType, 160),
    preferredLocation: clean(body.preferredLocation, 160),
    indicativeBudget: clean(body.indicativeBudget, 120),
    purchaseTimeframe: clean(body.purchaseTimeframe, 120),
    referralSource: clean(body.referralSource, 160) || undefined,
    additionalRequirements: clean(body.additionalRequirements, 5000) || undefined,
  };

  if (
    !registration.fullName ||
    !validEmail(registration.email) ||
    !registration.telephone ||
    !registration.nationality ||
    !registration.countryOfResidence ||
    !registration.residentialAddress ||
    !registration.preferredLanguage ||
    !registration.propertyType ||
    !registration.preferredLocation ||
    !registration.indicativeBudget ||
    !registration.purchaseTimeframe
  ) {
    return NextResponse.json(
      { error: "Please complete all required registration fields." },
      { status: 400 },
    );
  }

  try {
    const client = await registerPrivateClient(registration);
    const mainRecipient = process.env.ENQUIRY_EMAIL || "enquiry@pfeuroasia.com";
    const submittedAt = new Date().toISOString();

    const internalText = [
      "A new Private Collection access application has been registered.",
      "",
      `Status: ${client.status}`,
      `Submitted: ${submittedAt}`,
      `Client ID: ${client.id}`,
      "",
      `Name: ${client.fullName}`,
      `Email: ${client.email}`,
      `Telephone / WhatsApp: ${client.telephone}`,
      `Nationality: ${client.nationality}`,
      `Country of residence: ${client.countryOfResidence}`,
      `Residential address: ${client.residentialAddress}`,
      `WeChat: ${client.wechatId || "Not provided"}`,
      `Preferred language: ${client.preferredLanguage}`,
      `Company: ${client.companyName || "Not provided"}`,
      `Occupation: ${client.occupation || "Not provided"}`,
      "",
      `Interested in: ${client.propertyType}`,
      `Preferred location: ${client.preferredLocation}`,
      `Indicative budget: ${client.indicativeBudget}`,
      `Purchase timeframe: ${client.purchaseTimeframe}`,
      `Referral source: ${client.referralSource || "Not provided"}`,
      `Additional requirements: ${client.additionalRequirements || "Not provided"}`,
      "",
      "Review and approve this applicant in the PF EuroAsia Vault dashboard.",
      "https://www.pfeuroasia.com/vault/dashboard",
    ].join("\n");

    const clientText = [
      `Dear ${client.fullName},`,
      "",
      "Thank you for registering for the Property Facilitators EuroAsia Private Collection.",
      "",
      "Your application has been received and will be reviewed individually. Registration does not automatically grant access.",
      "",
      "Once approved, we will email you with instructions to sign in using your email address and a secure one-time code.",
      "",
      "Property Facilitators EuroAsia",
      "enquiry@pfeuroasia.com",
    ].join("\n");

    await Promise.all([
      sendEmail({
        to: [mainRecipient],
        subject: `Private Collection application — ${client.fullName}`,
        text: internalText,
        replyTo: client.email,
      }),
      sendEmail({
        to: [client.email],
        subject: "Your PF EuroAsia Private Collection application",
        text: clientText,
      }),
    ]);

    return NextResponse.json({
      success: true,
      status: client.status,
    });
  } catch (error) {
    console.error("private-client-registration-failed", error);
    return NextResponse.json(
      { error: "Your registration could not be saved. Please try again." },
      { status: 500 },
    );
  }
}
