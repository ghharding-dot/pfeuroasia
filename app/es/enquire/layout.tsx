import { createMetadata, RouteSeo } from "../../lib/seo";

export const metadata = createMetadata("enquireEs");

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RouteSeo pageKey="enquireEs">{children}</RouteSeo>;
}
