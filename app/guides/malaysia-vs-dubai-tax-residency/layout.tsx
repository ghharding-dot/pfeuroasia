import { createMetadata, RouteSeo } from "../../lib/seo";

export const metadata = createMetadata("malaysiaVsDubaiEn");

export default function MalaysiaVsDubaiLayout({ children }: { children: React.ReactNode }) {
  return <RouteSeo pageKey="malaysiaVsDubaiEn">{children}</RouteSeo>;
}
