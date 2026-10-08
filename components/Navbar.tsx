"use client";

import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const whatsappMessage =
  "Hi Gauthami, I came across your website and I'm interested in your makeup services. I'd love to know more about availability and booking.";

const whatsappUrl = `https://wa.me/919100399380?text=${encodeURIComponent(
  whatsappMessage
)}`;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Meet Gauthami", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 h-[80px] w-full bg-champagne-gold shadow-[0_4px_4px_rgba(42,26,8,0.25)]">
      <nav className="flex h-full w-full items-center px-[24px] lg:px-[64px]">

        {/* Logo */}
        <a
          href="/"
          onClick={() => setMenuOpen(false)}
          className="shrink-0 font-logo text-[32px] font-semibold leading-[44px] tracking-[-0.015em] text-espresso transition-transform duration-200 hover:scale-[1.01] lg:text-[40px] lg:leading-[55px]"
        >
          Gauthami Harsha
        </a>

        {/* Desktop Navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[30px] lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-body text-[16px] font-medium leading-[24px] text-espresso transition-opacity duration-200 hover:opacity-65"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="ml-auto hidden lg:block">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-[52px] w-[200px] items-center justify-center gap-[7px] rounded-[6px] bg-espresso font-body text-[16px] font-semibold leading-[24px] tracking-[0.004em] text-ivory transition-all duration-200 hover:bg-warm-brown hover:shadow-[0_3px_8px_rgba(42,26,8,0.18)]"
          >
            <span>Enquire Now</span>

            <ArrowRight
              size={20}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto flex h-[44px] w-[44px] items-center justify-center rounded-[6px] text-espresso transition-colors duration-200 hover:bg-black/5 lg:hidden"
        >
          {menuOpen ? (
            <X size={26} strokeWidth={2} />
          ) : (
            <Menu size={26} strokeWidth={2} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 top-[80px] w-full overflow-hidden bg-champagne-gold shadow-[0_6px_12px_rgba(42,26,8,0.15)] transition-all duration-300 ease-out lg:hidden ${
          menuOpen
            ? "max-h-[430px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="px-[24px] pb-[28px] pt-[10px]">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-espresso/10 py-[15px] font-body text-[16px] font-medium leading-[24px] text-espresso transition-opacity duration-200 hover:opacity-65"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="group mt-[22px] flex h-[52px] w-full items-center justify-center gap-[7px] rounded-[6px] bg-espresso font-body text-[16px] font-semibold leading-[24px] tracking-[0.004em] text-ivory transition-all duration-200 hover:bg-warm-brown"
          >
            <span>Enquire Now</span>

            <ArrowRight
              size={20}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </header>
  );
}