import type { NextRequest } from "next/server";
import {
  PORTFOLIO_COOKIE_NAME,
  verifyPrivateClientSession,
} from "./portfolioAuth";
import { findPrivateClientById } from "./privateClientStore";

export async function hasPrivatePortfolioRequestAccess(request: NextRequest) {
  const session = verifyPrivateClientSession(
    request.cookies.get(PORTFOLIO_COOKIE_NAME)?.value,
  );
  if (!session) return false;

  const client = await findPrivateClientById(session.clientId);
  return Boolean(
    client &&
      client.status === "approved" &&
      client.email === session.email,
  );
}
