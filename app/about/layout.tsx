import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Gauthami Harsha | Makeup Artist in Hyderabad",
  description:
    "Meet Gauthami Harsha, a makeup artist in Hyderabad creating elegant, personalized bridal and occasion makeup looks.",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
