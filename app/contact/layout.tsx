import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Bridal Makeup Bookings | Gauthami Harsha",
  description:
    "Contact Gauthami Harsha for bridal makeup, engagement makeup, reception looks, and special occasion bookings in A S Rao Nagar, Hyderabad.",
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
