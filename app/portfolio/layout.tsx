import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bridal Makeup Portfolio in Hyderabad | Gauthami Harsha",
  description:
    "Explore bridal, engagement, reception, and special occasion makeup looks by Gauthami Harsha, makeup artist in Hyderabad.",
};

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
