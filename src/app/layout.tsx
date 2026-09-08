import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

// A single typeface (IBM Plex Sans) for both display and body text.
// We tried pairing it with a separate display font (Sora) earlier, but
// Sora is missing the Azerbaijani schwa glyph (ə), which made the browser
// silently fall back to a mismatched system font mid-headline. Plex Sans
// has full coverage, confirmed by the body text rendering correctly --
// headings just lean on heavier weights instead of a different typeface.
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
      <body className={`${plex.variable} antialiased`}>{children}</body>
    </html>
  );
}
