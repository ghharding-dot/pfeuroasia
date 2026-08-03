import type { NextRequest } from "next/server";
import {
  createPortfolioToken,
  PORTFOLIO_COOKIE_NAME,
} from "./portfolioAuth";

export function hasPrivatePortfolioRequestAccess(request: NextRequest) {
  const password = process.env.PRIVATE_PORTFOLIO_PASSWORD;
  if (!password) return false;
  return request.cookies.get(PORTFOLIO_COOKIE_NAME)?.value === createPortfolioToken(password);
}
