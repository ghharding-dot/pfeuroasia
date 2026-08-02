import { createHmac, timingSafeEqual } from "node:crypto";

export const VAULT_COOKIE_NAME = "pfea_vault_access";
const PAYLOAD = "pfeuroasia-vault-access-v1";

export function getVaultPassword() {
  return process.env.VAULT_PASSWORD || process.env.PRIVATE_PORTFOLIO_PASSWORD || "";
}

export function createVaultToken(secret: string) {
  return createHmac("sha256", secret).update(PAYLOAD).digest("hex");
}

export function vaultSecretsMatch(candidate: string, configured: string) {
  const a = createHmac("sha256", "vault-compare").update(candidate).digest();
  const b = createHmac("sha256", "vault-compare").update(configured).digest();
  return timingSafeEqual(a, b);
}
