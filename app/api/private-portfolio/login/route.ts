import { NextResponse } from "next/server";
import {
  createPortfolioToken,
  PORTFOLIO_COOKIE_NAME,
  secretsMatch,
} from "../../../lib/portfolioAuth";

export async function POST(request: Request) {
  const configuredPassword = process.env.PRIVATE_PORTFOLIO_PASSWORD;

  if (!configuredPassword) {
    return NextResponse.json(
      { error: "Private access is not yet configured." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  const submittedPassword = typeof body?.password === "string" ? body.password : "";

  if (!submittedPassword || !secretsMatch(submittedPassword, configuredPassword)) {
    return NextResponse.json({ error: "Incorrect access password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: PORTFOLIO_COOKIE_NAME,
    value: createPortfolioToken(configuredPassword),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/private-portfolio/collection",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
