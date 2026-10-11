import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Gauthami Harsha | Makeup Artist in Hyderabad",
  description:
    "Meet Gauthami Harsha, a makeup artist in Hyderabad creating elegant, personalized bridal and occasion makeup looks.",
  openGraph: {
    title: "About Gauthami Harsha | Makeup Artist in Hyderabad",
    description:
      "Meet Gauthami Harsha, a makeup artist in Hyderabad creating elegant, personalized bridal and occasion makeup looks.",
    url: "https://gauthamiharsha.com/about",
    siteName: "Gauthami Harsha",
    type: "website",
    images: [
      {
        url: "/images/isha-khanna-masterclass-certificate.jpg",
        width: 1200,
        height: 1600,
        alt: "Gauthami Harsha, makeup artist in Hyderabad",
      },
    ],
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}