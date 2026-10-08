"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const portfolioLooks = [
  {
    src: "/images/portfolio1.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
  {
    src: "/images/portfolio2.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "short",
  },
  {
    src: "/images/portfolio3.jpg",
    alt: "Engagement makeup",
    category: "ENGAGEMENT",
    type: "short",
  },
  {
    src: "/images/portfolio4.jpg",
    alt: "Reception makeup",
    category: "RECEPTION",
    type: "tall",
  },
  {
    src: "/images/portfolio5.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
  {
    src: "/images/portfolio6.jpg",
    alt: "Engagement makeup",
    category: "ENGAGEMENT",
    type: "short",
  },
  {
    src: "/images/portfolio7.jpg",
    alt: "Reception makeup",
    category: "RECEPTION",
    type: "short",
  },
  {
    src: "/images/portfolio8.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
  {
    src: "/images/portfolio9.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
  {
    src: "/images/portfolio10.jpg",
    alt: "Engagement makeup",
    category: "ENGAGEMENT",
    type: "short",
  },
  {
    src: "/images/portfolio11.jpg",
    alt: "Reception makeup",
    category: "RECEPTION",
    type: "short",
  },
  {
    src: "/images/portfolio12.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
  {
    src: "/images/portfolio13.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
  {
    src: "/images/portfolio14.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "short",
  },
  {
    src: "/images/portfolio15.jpg",
    alt: "Engagement makeup",
    category: "ENGAGEMENT",
    type: "short",
  },
  {
    src: "/images/portfolio16.jpg",
    alt: "Reception makeup",
    category: "RECEPTION",
    type: "tall",
  },
  {
    src: "/images/portfolio17.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
  {
    src: "/images/portfolio18.jpg",
    alt: "Engagement makeup",
    category: "ENGAGEMENT",
    type: "short",
  },
  {
    src: "/images/portfolio19.jpg",
    alt: "Reception makeup",
    category: "RECEPTION",
    type: "short",
  },
  {
    src: "/images/portfolio20.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
  {
    src: "/images/portfolio21.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
  {
    src: "/images/portfolio22.jpg",
    alt: "Engagement makeup",
    category: "ENGAGEMENT",
    type: "short",
  },
  {
    src: "/images/portfolio23.jpg",
    alt: "Reception makeup",
    category: "RECEPTION",
    type: "short",
  },
  {
    src: "/images/portfolio24.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
  {
    src: "/images/portfolio25.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
  {
    src: "/images/portfolio26.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "short",
  },
  {
    src: "/images/portfolio27.jpg",
    alt: "Engagement makeup",
    category: "ENGAGEMENT",
    type: "short",
  },
  {
    src: "/images/portfolio28.jpg",
    alt: "Reception makeup",
    category: "RECEPTION",
    type: "tall",
  },
  {
    src: "/images/portfolio29.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
  {
    src: "/images/portfolio30.jpg",
    alt: "Engagement makeup",
    category: "ENGAGEMENT",
    type: "short",
  },
  {
    src: "/images/portfolio31.jpg",
    alt: "Reception makeup",
    category: "RECEPTION",
    type: "short",
  },
  {
    src: "/images/portfolio32.jpg",
    alt: "Bridal makeup",
    category: "BRIDAL",
    type: "tall",
  },
];

export default function PortfolioPage() {
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
        threshold: 0.08,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-ivory">
        <section
          ref={sectionRef}
          className="w-full px-[24px] pb-[100px] pt-[45px] sm:px-[40px] sm:pb-[120px] sm:pt-[55px] lg:px-[50px] lg:pb-[140px] lg:pt-[60px]"
        >
          <div className="mx-auto max-w-[1400px]">
            {/* ================================================== */}
            {/* PAGE INTRO */}
            {/* ================================================== */}

            <div
              className={`text-center transition-all duration-700 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <h1 className="font-body text-[13px] font-semibold leading-[20px] tracking-[0.2em] text-bronze-gold sm:text-[14px]">
                PORTFOLIO
              </h1>

              <p className="mx-auto mt-[8px] max-w-[600px] font-body text-[14px] font-normal leading-[23px] text-warm-brown sm:mt-[10px] sm:text-[15px] sm:leading-[25px]">
                Explore a collection of bridal, engagement, reception, and
                special occasion makeup looks.
              </p>
            </div>

            {/* ================================================== */}
            {/* PORTFOLIO GALLERY */}
            {/* ================================================== */}

            <div className="mt-[35px] grid grid-cols-2 items-start gap-[12px] sm:mt-[45px] sm:gap-[16px] lg:mt-[55px] lg:grid-cols-4 lg:gap-[18px]">
              {portfolioLooks.map((look, index) => (
                <div
                  key={`${look.src}-${index}`}
                  className={`
                    group relative overflow-hidden rounded-[12px]
                    transition-all duration-1000 ease-out
                    sm:rounded-[14px]
                    lg:rounded-[16px]

                    ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }

                    ${
                      index % 4 === 1 || index % 4 === 2
                        ? "mt-[35px] sm:mt-[50px] lg:mt-[65px]"
                        : ""
                    }

                    ${
                      look.type === "tall"
                        ? "h-[360px] sm:h-[440px] lg:h-[520px]"
                        : "h-[300px] sm:h-[350px] lg:h-[390px]"
                    }
                  `}
                  style={{
                    transitionDelay: `${120 + index * 100}ms`,
                  }}
                >
       {/* Image */}
               <img
  src={look.src}
  alt={look.alt}
  loading={index < 4 ? "eager" : "lazy"}
  decoding="async"
  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
/>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black/65 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Category */}
                  <div className="absolute bottom-[14px] left-[14px] translate-y-[10px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-[18px] sm:left-[18px] lg:bottom-[20px] lg:left-[20px]">
                    <p className="font-body text-[9px] font-semibold leading-[16px] tracking-[0.2em] text-ivory sm:text-[10px] lg:text-[11px]">
                      {look.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}