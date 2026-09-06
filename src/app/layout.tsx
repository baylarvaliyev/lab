import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <body className={`${sora.variable} ${plex.variable} antialiased`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
