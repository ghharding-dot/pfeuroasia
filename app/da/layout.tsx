import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "International ejendomsrådgivning mellem Europa og Asien",
    template: "%s | Property Facilitators EuroAsia",
  },
  description: "Uafhængig rådgivning om luksusejendomme, relocation, ophold og virksomhedsudvidelse i Spanien, Malaysia og Asien for danske og skandinaviske kunder.",
};

export default function DanishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="da-DK">{children}</div>;
}
