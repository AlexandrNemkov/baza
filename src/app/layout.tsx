import type { Metadata } from "next";
import { Rubik, JetBrains_Mono } from "next/font/google";
import JsonLd from "../components/JsonLd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { organization } from "../lib/seo/jsonld";
import { SITE } from "../lib/seo/config";
import "../styles/tokens.css";
import "../styles/globals.css";

const rubik = Rubik({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
  display: "swap",
});

const mono = JetBrains_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
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
    <html lang="ru" className={`${rubik.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={organization()} />
        <Header />
        <main style={{ minHeight: "60vh" }}>
          {children}
        </main>
        <Footer />
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
