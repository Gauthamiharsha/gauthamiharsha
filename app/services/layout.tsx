import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bridal Makeup Services in Hyderabad | Gauthami Harsha",
  description:
    "Explore bridal airbrush and HD makeup, engagement and reception makeup, bridesmaid and groom makeup, hairstyling, saree draping, and private makeup classes by Gauthami Harsha in Hyderabad.",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
