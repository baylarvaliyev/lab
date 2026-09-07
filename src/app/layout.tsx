import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700", "800"],
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Torpaq, Su və Bitki Analizləri Laboratoriyası | Bakı Mühəndislik Universiteti",
  description:
    "Bakı Mühəndislik Universitetinin Torpaq, Su və Bitki Analizləri Laboratoriyası -- torpaq, suvarma suyu və bitki nümunələrində aqrokimyəvi analizlər.",
};

// Global shell shared by both the locale-prefixed public site and the
// (single-language) /admin area. Nav/Footer live in the [locale] layout
// instead, since /admin doesn't use either.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <body className={`${sora.variable} ${plex.variable} antialiased`}>{children}</body>
    </html>
  );
}
