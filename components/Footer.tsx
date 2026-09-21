import { ArrowRight } from "lucide-react";

const whatsappMessage =
  "Hi Gauthami, I came across your website and I'm interested in your makeup services. I'd love to know more about availability and booking.";

const whatsappUrl = `https://wa.me/919500292511?text=${encodeURIComponent(
  whatsappMessage
)}`;

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Meet Gauthami", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="w-full shrink-0 bg-near-black text-ivory">
      <div className="relative mx-auto flex w-full flex-col px-[24px] py-[70px] sm:px-[40px] sm:py-[80px] lg:h-[355px] lg:px-[64px] lg:py-0">

        {/* Left Section */}
        <div className="flex flex-col items-center text-center lg:absolute lg:left-[126px] lg:top-1/2 lg:-translate-y-1/2 lg:items-start lg:text-left">
          <a
            href="/"
            className="block font-logo text-[48px] font-normal leading-[48px] tracking-[-0.015em] text-antique-gold transition-transform duration-200 hover:scale-[1.01] sm:text-[55px] sm:leading-[52px] lg:text-[60px] lg:leading-[55px]"
          >
            Gauthami Harsha
          </a>

          <p className="mt-[12px] font-body text-[9px] font-medium leading-4 tracking-[0.24em] text-white/70 sm:text-[10px] lg:mt-[14px] lg:text-[11px]">
            BRIDAL MAKEUP ARTIST
          </p>

          <p className="mt-[15px] font-body text-[14px] font-normal leading-[24px] text-ivory sm:text-[15px] lg:mt-[18px] lg:text-[16px] lg:leading-[26px]">
            Making every beautiful moment unforgettable.
          </p>
        </div>

        {/* Center - Quick Links */}
        <div className="mt-[55px] flex flex-col items-center text-center lg:absolute lg:left-1/2 lg:top-[68px] lg:mt-0 lg:-translate-x-1/2 lg:items-start lg:text-left">
          <h3 className="font-heading text-[17px] font-bold leading-[22px] tracking-[-0.01em] text-antique-gold lg:text-[18px]">
            QUICK LINKS
          </h3>

          <nav className="mt-[10px] flex flex-col items-center gap-[8px] lg:items-start lg:gap-[10px]">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-[14px] font-medium leading-6 text-ivory transition-colors duration-200 hover:text-champagne-gold sm:text-[15px] lg:text-[16px]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="mt-[55px] flex w-full flex-col items-center text-center lg:absolute lg:right-[64px] lg:top-1/2 lg:mt-0 lg:w-[560px] lg:-translate-y-1/2">
          <h2 className="font-heading text-[27px] font-bold leading-[34px] tracking-[-0.005em] text-antique-gold sm:text-[30px] sm:leading-[38px] lg:text-[32px] lg:leading-[40px]">
            YOUR MOST BEAUTIFUL MOMENTS
            <br />
            DESERVES TO BE REMEMBER.
          </h2>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto mt-[22px] flex h-[52px] w-[190px] items-center justify-center gap-[7px] rounded-[6px] border border-ivory bg-transparent font-body text-[15px] font-semibold leading-6 tracking-[0.008em] text-ivory transition-all duration-200 hover:border-champagne-gold hover:bg-champagne-gold hover:text-espresso lg:mt-[25px] lg:text-[16px]"
          >
            <span>Let's Talk</span>

            <ArrowRight
              size={20}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-[55px] text-center font-body text-[12px] font-normal leading-[20px] text-antique-gold sm:text-[13px] lg:absolute lg:bottom-[27px] lg:left-1/2 lg:mt-0 lg:-translate-x-1/2 lg:whitespace-nowrap lg:text-[16px] lg:leading-[26px]">
          © 2026 Gauthami Harsha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}