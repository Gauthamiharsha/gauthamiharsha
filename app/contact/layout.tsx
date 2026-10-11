import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Bridal Makeup Bookings | Gauthami Harsha",
  description:
    "Contact Gauthami Harsha for bridal makeup, engagement makeup, reception looks, and special occasion bookings in A S Rao Nagar, Hyderabad.",
  openGraph: {
    title: "Contact & Bridal Makeup Bookings | Gauthami Harsha",
    description:
      "Contact Gauthami Harsha for bridal makeup, engagement makeup, reception looks, and special occasion bookings in A S Rao Nagar, Hyderabad.",
    url: "https://gauthamiharsha.com/contact",
    siteName: "Gauthami Harsha",
    type: "website",
    images: [
      {
        url: "/images/hero-bride.jpg",
        width: 1200,
        height: 1600,
        alt: "Contact Gauthami Harsha for bridal makeup bookings in Hyderabad",
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}