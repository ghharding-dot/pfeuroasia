import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Asesoramiento inmobiliario internacional entre Europa y Asia",
    template: "%s | Property Facilitators EuroAsia",
  },
  description:
    "Asesoramiento independiente sobre propiedades, relocation, residencia y expansión empresarial en España, Malasia y Asia.",
};

export default function SpanishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="es-ES">{children}</div>;
}
