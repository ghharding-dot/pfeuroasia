import type { ReactNode } from "react";
import { PortalHomeLink } from "../components/PortalHomeLink";

export default function VaultLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <PortalHomeLink />
    </>
  );
}
