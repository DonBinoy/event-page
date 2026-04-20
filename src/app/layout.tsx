import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/Theme";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOLSTICE — An Evening of Art, Sound & Culture",
  description:
    "Join us for SOLSTICE, an immersive multi-disciplinary event blending live music, contemporary art, and curated cultural experiences. June 21, 2026 — The Grand Atrium, Mumbai.",
  keywords: ["event", "live music", "art", "culture", "Mumbai", "festival"],
  openGraph: {
    title: "SOLSTICE 2026",
    description: "An Evening of Art, Sound & Culture",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
