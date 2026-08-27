import { createMetadata, RouteSeo } from "../../../../lib/seo";

export const metadata = createMetadata("labuanAdviserEs");

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RouteSeo pageKey="labuanAdviserEs">{children}</RouteSeo>;
}
