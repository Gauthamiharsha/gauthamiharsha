import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  MonteCarlo,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const monteCarlo = MonteCarlo({
  variable: "--font-monte-carlo",
  subsets: ["latin"],
  weight: "400",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Gauthami Harsha | Makeup Artist in Hyderabad",
  description:
    "Gauthami Harsha is a makeup artist in Hyderabad, creating elegant and personalized looks for bridal and special occasions.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${monteCarlo.variable} ${greatVibes.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  );
}