"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const portfolioLooks = [
  { src: "/images/Portfolio1.jpg", alt: "Bridal makeup", type: "tall" },
  { src: "/images/Portfolio2.jpg", alt: "Bridal makeup", type: "short" },
  { src: "/images/Portfolio3.jpg", alt: "Engagement makeup", type: "short" },
  { src: "/images/Portfolio4.jpg", alt: "Reception makeup", type: "tall" },
  { src: "/images/Portfolio5.jpg", alt: "Bridal makeup", type: "tall" },
  { src: "/images/Portfolio6.jpg", alt: "Engagement makeup", type: "short" },
  { src: "/images/Portfolio7.jpg", alt: "Reception makeup", type: "short" },
  { src: "/images/Portfolio8.jpg", alt: "Bridal makeup", type: "tall" },
  { src: "/images/Portfolio9.jpg", alt: "Bridal makeup", type: "tall" },
  { src: "/images/Portfolio10.jpg", alt: "Engagement makeup", type: "short" },
  { src: "/images/Portfolio11.jpg", alt: "Reception makeup", type: "short" },
  { src: "/images/Portfolio12.jpg", alt: "Bridal makeup", type: "tall" },
  { src: "/images/Portfolio13.jpg", alt: "Bridal makeup", type: "tall" },
  { src: "/images/Portfolio14.jpg", alt: "Bridal makeup", type: "short" },
  { src: "/images/Portfolio15.jpg", alt: "Engagement makeup", type: "short" },
  { src: "/images/Portfolio16.jpg", alt: "Reception makeup", type: "tall" },
  { src: "/images/Portfolio17.jpg", alt: "Bridal makeup", type: "tall" },
  { src: "/images/Portfolio18.jpg", alt: "Engagement makeup", type: "short" },
  { src: "/images/Portfolio19.jpg", alt: "Reception makeup", type: "short" },
  { src: "/images/Portfolio20.jpg", alt: "Bridal makeup", type: "tall" },
  { src: "/images/Portfolio21.jpg", alt: "Bridal makeup", type: "tall" },
  { src: "/images/Portfolio22.jpg", alt: "Engagement makeup", type: "short" },
  { src: "/images/Portfolio23.jpg", alt: "Reception makeup", type: "short" },
  { src: "/images/Portfolio24.jpg", alt: "Bridal makeup", type: "tall" },
  { src: "/images/Portfolio25.jpg", alt: "Bridal makeup", type: "tall" },
  { src: "/images/Portfolio26.jpg", alt: "Bridal makeup", type: "short" },
  { src: "/images/Portfolio27.jpg", alt: "Engagement makeup", type: "short" },
  { src: "/images/Portfolio28.jpg", alt: "Reception makeup", type: "tall" },
  { src: "/images/Portfolio29.jpg", alt: "Bridal makeup", type: "tall" },
  { src: "/images/Portfolio30.jpg", alt: "Engagement makeup", type: "short" },
  { src: "/images/Portfolio31.jpg", alt: "Reception makeup", type: "short" },
  { src: "/images/Portfolio32.jpg", alt: "Bridal makeup", type: "tall" },
];

export default function PortfolioPage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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
      { threshold: 0.08 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const closeGallery = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return (current - 1 + portfolioLooks.length) % portfolioLooks.length;
    });
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return (current + 1) % portfolioLooks.length;
    });
  }, []);

  
  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, closeGallery, showPrevious, showNext]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const difference =
      event.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(difference) > 50) {
      if (difference < 0) {
        showNext();
      } else {
        showPrevious();
      }
    }

    touchStartX.current = null;
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-ivory">
        <section
          ref={sectionRef}
          className="w-full px-[24px] pb-[100px] pt-[45px] sm:px-[40px] sm:pb-[120px] sm:pt-[55px] lg:px-[50px] lg:pb-[140px] lg:pt-[60px]"
        >
          <div className="mx-auto max-w-[1400px]">
            <div
              className={`text-center transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
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

            <div className="mt-[35px] grid grid-cols-2 items-start gap-[12px] sm:mt-[45px] sm:gap-[16px] lg:mt-[55px] lg:grid-cols-4 lg:gap-[18px]">
              {portfolioLooks.map((look, index) => (
                <button
                  key={look.src}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`View image ${index + 1}: ${look.alt}`}
                  className={`group relative block w-full cursor-pointer overflow-hidden rounded-[12px] bg-soft-champagne text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-gold focus-visible:ring-offset-2 sm:rounded-[14px] lg:rounded-[16px] ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[8px] opacity-0"
                  } ${
                    index % 4 === 1 || index % 4 === 2
                      ? "mt-[35px] sm:mt-[50px] lg:mt-[65px]"
                      : ""
                  } ${
                    look.type === "tall"
                      ? "h-[360px] sm:h-[440px] lg:h-[520px]"
                      : "h-[300px] sm:h-[350px] lg:h-[390px]"
                  }`}
                  style={{
                    contentVisibility: "auto",
                    containIntrinsicSize:
                      look.type === "tall" ? "520px" : "390px",
                    transition:
                      "opacity 500ms ease-out, transform 500ms ease-out",
                  }}
                >
                  <Image
                    src={look.src}
                    alt={look.alt}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
                    quality={95}
                    priority={index < 2}
                    loading={index < 2 ? undefined : "lazy"}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-active:scale-[0.98]"
                  />

                 
                  <div className="pointer-events-none absolute inset-0 bg-near-black/0 transition-colors duration-300 group-hover:bg-near-black/10" />

                
                  <div className="pointer-events-none absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-near-black/55 text-ivory opacity-100 transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                    <ArrowUpRight size={18} strokeWidth={1.5} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio image viewer"
          className="fixed inset-0 z-[100] flex flex-col bg-near-black/95 px-4 py-5 backdrop-blur-sm animate-in fade-in duration-200 sm:px-8 sm:py-6"
          onClick={closeGallery}
        >
          
         <div className="relative z-20 flex w-full items-center justify-between">
  <p className="font-body text-[11px] tracking-[0.18em] text-ivory/70 sm:text-[12px]">
    GAUTHAMI HARSHA
  </p>

  {/* Centered image counter */}
  <p className="absolute left-1/2 -translate-x-1/2 font-body text-[12px] tracking-[0.12em] text-ivory/70">
    {String(selectedIndex + 1).padStart(2, "0")}
    <span className="px-1 text-bronze-gold">/</span>
    {String(portfolioLooks.length).padStart(2, "0")}
  </p>

  <button
    type="button"
    onClick={closeGallery}
    aria-label="Close image viewer"
    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors duration-200 hover:border-bronze-gold hover:bg-ivory/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-gold"
  >
    <X size={21} strokeWidth={1.5} />
  </button>
</div>

        
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center py-5"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous image"
              className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-ivory/20 bg-near-black/40 text-ivory transition-all duration-200 hover:border-bronze-gold hover:bg-ivory/10 sm:left-2 sm:h-12 sm:w-12"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>

            <div className="relative h-full w-full max-w-[1100px]">
              <Image
                key={portfolioLooks[selectedIndex].src}
                src={portfolioLooks[selectedIndex].src}
                alt={portfolioLooks[selectedIndex].alt}
                fill
                priority
                quality={95}
                sizes="100vw"
                className="object-contain animate-in fade-in duration-200"
              />
            </div>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next image"
              className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-ivory/20 bg-near-black/40 text-ivory transition-all duration-200 hover:border-bronze-gold hover:bg-ivory/10 sm:right-2 sm:h-12 sm:w-12"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>

       
        </div>
      )}
    </>
  );
}