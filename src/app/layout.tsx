import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import JsonLd from "../components/JsonLd";
import { organization } from "../lib/seo/jsonld";
import "../styles/tokens.css";
import "../styles/globals.css";

const manrope = Manrope({
  weight: ["400", "500", "600"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Baza — одежда и аксессуары российских дизайнеров",
    template: "%s · Baza",
  },
  description:
    "Мультибренд-магазин одежды и аксессуаров российских дизайнеров. База гардероба от локальных брендов.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        <JsonLd data={organization()} />
        {children}
      </body>
    </html>
  );
}
