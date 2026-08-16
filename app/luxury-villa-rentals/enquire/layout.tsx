import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("rentalEnquireEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="rentalEnquireEn">{children}</RouteSeo>; }
