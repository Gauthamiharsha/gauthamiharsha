import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bridal Makeup Services in Hyderabad | Gauthami Harsha",
  description:
    "Explore bridal airbrush and HD makeup, engagement and reception makeup, bridesmaid and groom makeup, hairstyling, saree draping, and private makeup classes by Gauthami Harsha in Hyderabad.",
  openGraph: {
    title: "Bridal Makeup Services in Hyderabad | Gauthami Harsha",
    description:
      "Explore bridal airbrush and HD makeup, engagement and reception makeup, bridesmaid and groom makeup, hairstyling, saree draping, and private makeup classes by Gauthami Harsha in Hyderabad.",
    url: "https://gauthamiharsha.com/services",
    siteName: "Gauthami Harsha",
    type: "website",
    images: [
      {
        url: "/images/luxury-products.jpg",
        width: 1200,
        height: 1600,
        alt: "Bridal makeup services by Gauthami Harsha in Hyderabad",
      },
    ],
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}