import { cookies } from "next/headers";
import {
  COLLABORATOR_COOKIE_NAME,
  verifyCollaboratorSession,
} from "./collaboratorAuth";

export async function getCollaboratorSession() {
  const cookieStore = await cookies();
  return verifyCollaboratorSession(cookieStore.get(COLLABORATOR_COOKIE_NAME)?.value);
}
