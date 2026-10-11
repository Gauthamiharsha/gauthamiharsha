import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bridal Makeup Portfolio in Hyderabad | Gauthami Harsha",
  description:
    "Explore bridal, engagement, reception, and special occasion makeup looks by Gauthami Harsha, makeup artist in Hyderabad.",
  openGraph: {
    title: "Bridal Makeup Portfolio in Hyderabad | Gauthami Harsha",
    description:
      "Explore bridal, engagement, reception, and special occasion makeup looks by Gauthami Harsha, makeup artist in Hyderabad.",
    url: "https://gauthamiharsha.com/portfolio",
    siteName: "Gauthami Harsha",
    type: "website",
    images: [
      {
        url: "/images/Portfolio2.jpg",
        width: 1200,
        height: 1600,
        alt: "Bridal makeup portfolio by Gauthami Harsha",
      },
    ],
  },
};

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}