import type { ReactNode } from "react";
import { PortalHomeLink } from "../components/PortalHomeLink";

export default function CollaboratorsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <PortalHomeLink />
      {children}
    </>
  );
}
