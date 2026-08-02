import { cookies } from "next/headers";
import { createVaultToken, getVaultPassword, VAULT_COOKIE_NAME } from "./vaultAuth";

export async function hasVaultAccess() {
  const password = getVaultPassword();
  if (!password) return false;
  const cookieStore = await cookies();
  return cookieStore.get(VAULT_COOKIE_NAME)?.value === createVaultToken(password);
}
