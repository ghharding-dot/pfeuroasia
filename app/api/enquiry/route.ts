import { NextRequest, NextResponse } from "next/server";

const PF_RECIPIENT = "enquiry@pfeuroasia.com";
const LVC_RECIPIENT = "reservations@theluxuryvillacollection.com";

function clean(value: unknown, fallback = "Not provided") {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 2000) : fallback;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isRental = body.enquiryType === "rental";
    const apiKey = process.env.RESEND_API_KEY;
    const sender =
      process.env.PARTNER_NOTIFICATION_FROM ||
      "PF EuroAsia <notifications@pfeuroasia.com>";

    if (!apiKey) {
      return NextResponse.json({ error: "Email service unavailable" }, { status: 500 });
    }

    const fullName = clean(body.fullName);
    const email = clean(body.email);
    const subject = isRental
      ? `New luxury villa rental enquiry: ${fullName}`
      : `New PF EuroAsia enquiry: ${fullName}`;

    const lines = [
      isRental
        ? "A new luxury villa rental enquiry has been submitted through pfeuroasia.com."
        : "A new enquiry has been submitted through pfeuroasia.com.",
      "",
      `Enquiry type: ${clean(body.enquiryType)}`,
      `Full name: ${fullName}`,
      `Email: ${email}`,
      `Telephone / WhatsApp: ${clean(body.telephoneOrWhatsapp)}`,
      `Preferred channel: ${clean(body.preferredChannel)}`,
      `Contact desk: ${clean(body.contactDesk)}`,
      `Current location: ${clean(body.currentLocation)}`,
      `WeChat ID: ${clean(body.wechatId)}`,
      "",
      `Preferred destination / area / property: ${clean(body.preferredAreaOrProperty)}`,
      `Indicative budget / value: ${clean(body.indicativeBudgetOrValue)}`,
      ...(isRental
        ? [
            `Arrival date: ${clean(body.arrivalDate)}`,
            `Departure date: ${clean(body.departureDate)}`,
            `Number of guests: ${clean(body.guests)}`,
            `Bedrooms required: ${clean(body.bedrooms)}`,
          ]
        : []),
      `Requirements: ${clean(body.requirements)}`,
      "",
      "Referral source: Property Facilitators EuroAsia",
      "Website: pfeuroasia.com",
    ];

    const recipients = isRental
      ? [PF_RECIPIENT, LVC_RECIPIENT]
      : [PF_RECIPIENT];

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: recipients,
        reply_to: email !== "Not provided" ? email : undefined,
        subject,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("enquiry-email-failed", response.status, error);
      return NextResponse.json({ error: "Unable to send enquiry" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("enquiry-handler-failed", error);
    return NextResponse.json({ error: "Invalid enquiry" }, { status: 400 });
  }
}
