import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const PORTFOLIO_COOKIE_NAME = "pfea_private_portfolio";
const PORTFOLIO_TOKEN_PAYLOAD = "pfeuroasia-private-portfolio-access-v1";

export function createPortfolioToken(secret: string) {
  return createHmac("sha256", secret)
    .update(PORTFOLIO_TOKEN_PAYLOAD)
    .digest("hex");
}

export function secretsMatch(candidate: string, configured: string) {
  const candidateHash = createHash("sha256").update(candidate).digest();
  const configuredHash = createHash("sha256").update(configured).digest();
  return timingSafeEqual(candidateHash, configuredHash);
}
