"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const looks = [
  {
    src: "/images/gauthami-about6.jpg",
    alt: "Bridal makeup by Gauthami Harsha",
    category: "BRIDAL",
    className: "h-[520px]",
  },
  {
    src: "/images/gauthami-about9.jpg",
    alt: "Bridal makeup by Gauthami Harsha",
    category: "ENGAGEMENT",
    className: "h-[390px]",
  },
  {
    src: "/images/gauthami-about1.jpg",
    alt: "Bridal makeup by Gauthami Harsha",
    category: "RECEPTION",
    className: "h-[390px]",
  },
  {
    src: "/images/gauthami-about8.jpg",
    alt: "Bridal makeup by Gauthami Harsha",
    category: "BRIDE",
    className: "h-[520px]",
  },
];

export default function SelectedLooks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-[24px] py-[90px] sm:px-[40px] sm:py-[100px] lg:px-[50px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Section Heading */}
        <div
          className={`text-center transition-all duration-1000 ease-out ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <p className="font-body text-[12px] font-semibold leading-[20px] tracking-[0.18em] text-bronze-gold sm:text-[14px]">
            SELECTED LOOKS
          </p>

          <h2 className="mt-[10px] font-heading text-[44px] font-bold leading-[48px] tracking-[-0.015em] text-espresso sm:mt-[12px] sm:text-[54px] sm:leading-[58px] lg:text-[64px] lg:leading-[68px]">
            Beauty, captured in
            <br />
            <span className="text-bronze-gold">every detail.</span>
          </h2>

          <p className="mx-auto mt-[16px] max-w-[600px] font-body text-[16px] font-normal leading-[26px] text-espresso/80 sm:mt-[18px] sm:text-[17px] sm:leading-[28px]">
            A collection of bridal looks created with intention, from timeless
            elegance to modern sophistication.
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-[45px] grid grid-cols-2 items-start gap-[12px] sm:mt-[55px] sm:gap-[16px] lg:mt-[65px] lg:grid-cols-4 lg:gap-[18px]">
          {looks.map((look, index) => (
            <div
              key={look.src}
              className={`
                group relative overflow-hidden rounded-[12px]
                transition-all duration-1000 ease-out
                sm:rounded-[14px]
                lg:rounded-[16px]
                ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                ${look.className}
                ${
                  index === 1 || index === 2
                    ? "mt-[35px] sm:mt-[50px] lg:mt-[65px]"
                    : ""
                }
                ${
                  index === 0 || index === 3
                    ? "h-[360px] sm:h-[440px] lg:h-[520px]"
                    : "h-[300px] sm:h-[350px] lg:h-[390px]"
                }
              `}
              style={{
                transitionDelay: `${150 + index * 120}ms`,
              }}
            >
              <img
                src={look.src}
                alt={look.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Category */}
              <div className="absolute bottom-[14px] left-[14px] translate-y-[10px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-[18px] sm:left-[18px] lg:bottom-[20px] lg:left-[20px]">
                <p className="font-body text-[9px] font-semibold leading-[16px] tracking-[0.2em] text-ivory sm:text-[10px] lg:text-[11px]">
                  {look.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-[45px] flex justify-center transition-all delay-[650ms] duration-800 ease-out sm:mt-[50px] lg:mt-[55px] ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <a
            href="/portfolio"
            className="group flex h-[53px] w-full max-w-[189px] items-center justify-center gap-[7px] rounded-[6px] border border-bronze-gold font-body text-[15px] font-semibold leading-[24px] tracking-[0.004em] text-bronze-gold transition-all duration-200 hover:bg-bronze-gold hover:text-ivory sm:text-[16px]"
          >
            <span>View Full Portfolio</span>

            <ArrowRight
              size={20}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>

      </div>
    </section>
  );
}