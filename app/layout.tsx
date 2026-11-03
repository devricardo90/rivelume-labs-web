import type { Metadata } from "next";
import "./globals.css";

// Placeholder técnico (RIV-12): sem conteúdo comercial nem identidade visual.
// O idioma principal do site é o inglês (Fonte da Verdade §2.4); a estratégia
// de internacionalização é definida na RIV-15 e implementada na RIV-16.
export const metadata: Metadata = {
  title: "Rivelume Labs",
  description: "Rivelume Labs website (under construction).",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
