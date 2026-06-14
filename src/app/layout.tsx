import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import JsonLd from "../components/JsonLd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { organization } from "../lib/seo/jsonld";
import { SITE } from "../lib/seo/config";
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
    default: SITE.title,
    template: "%s · Baza",
  },
  description: SITE.description,
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
        <Header />
        <main style={{ paddingTop: "var(--space-5)", minHeight: "60vh" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
