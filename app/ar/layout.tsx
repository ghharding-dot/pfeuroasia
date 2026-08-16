import { createMetadata } from "../lib/seo";

export const metadata = createMetadata("homeAr");

export default function ArabicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="ar-SA" dir="rtl">{children}</div>;
}
