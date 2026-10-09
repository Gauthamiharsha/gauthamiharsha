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
  metadataBase: new URL("https://gauthamiharsha.vercel.app"),
  title: {
    default: "Gauthami Harsha | Bridal Makeup Artist in Hyderabad",
    template: "%s | Gauthami Harsha",
  },
  description:
    "Gauthami Harsha is a bridal makeup artist in Hyderabad, specializing in bridal, engagement, reception, and occasion makeup. Enquire for bookings.",
  keywords: [
    "Gauthami Harsha",
    "bridal makeup artist in Hyderabad",
    "makeup artist in Hyderabad",
    "bridal makeup Hyderabad",
    "engagement makeup Hyderabad",
    "reception makeup Hyderabad",
    "HD makeup Hyderabad",
    "airbrush makeup Hyderabad",
    "makeup artist A S Rao Nagar",
  ],
  authors: [{ name: "Gauthami Harsha" }],
  creator: "Gauthami Harsha",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gauthamiharsha.vercel.app",
    siteName: "Gauthami Harsha",
    title: "Gauthami Harsha | Bridal Makeup Artist in Hyderabad",
    description:
      "Elegant bridal, engagement, reception, and occasion makeup by Gauthami Harsha in Hyderabad.",
    images: [
      {
        url: "/images/hero-bride.jpg",
        width: 1200,
        height: 1600,
        alt: "Bridal makeup by Gauthami Harsha in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gauthami Harsha | Bridal Makeup Artist in Hyderabad",
    description:
      "Bridal, engagement, reception, and occasion makeup in Hyderabad.",
    images: ["/images/hero-bride.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${manrope.variable} ${monteCarlo.variable} ${greatVibes.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  );
}