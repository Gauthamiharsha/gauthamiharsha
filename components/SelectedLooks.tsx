"use client";

import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const looks = [
  {
    src: "/images/gauthami-about1.jpg",
    alt: "Bridal makeup by Gauthami Harsha",
    className: "h-[520px]",
  },
  {
    src: "/images/gauthami-about2.jpg",
    alt: "Bridal makeup by Gauthami Harsha",
    className: "h-[390px]",
  },
  {
    src: "/images/gauthami-about3.jpg",
    alt: "Bridal makeup by Gauthami Harsha",
    className: "h-[390px]",
  },
  {
    src: "/images/gauthami-about4.jpg",
    alt: "Bridal makeup by Gauthami Harsha",
    className: "h-[520px]",
  },
];

export default function SelectedLooks() {
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
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const closeGallery = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? null : (current - 1 + looks.length) % looks.length
    );
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? null : (current + 1) % looks.length
    );
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
      difference < 0 ? showNext() : showPrevious();
    }

    touchStartX.current = null;
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full px-[24px] py-[90px] sm:px-[40px] sm:py-[100px] lg:px-[50px] lg:py-[100px]"
      >
        <div className="mx-auto max-w-[1400px]">
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

            <h2 className="mt-[10px] font-heading text-[44px] font-bold leading-[48px] tracking-[-0.015em] text-espresso max-[390px]:text-[40px] max-[390px]:leading-[44px] sm:mt-[12px] sm:text-[54px] sm:leading-[58px] lg:text-[64px] lg:leading-[68px]">
              Beauty, captured in
              <br />
              <span className="text-bronze-gold">every detail.</span>
            </h2>

            <p className="mx-auto mt-[16px] max-w-[600px] font-body text-[15px] font-normal leading-[26px] text-espresso/80 sm:mt-[18px] sm:text-[16px] sm:leading-[28px]">
              A collection of bridal looks created with intention, from timeless
              elegance to modern sophistication.
            </p>
          </div>

          <div className="mt-[45px] grid grid-cols-2 items-start gap-[12px] sm:mt-[55px] sm:gap-[16px] lg:mt-[65px] lg:grid-cols-4 lg:gap-[18px]">
            {looks.map((look, index) => (
              <button
                key={look.src}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`View image ${index + 1}: ${look.alt}`}
                className={`group relative block w-full cursor-pointer overflow-hidden rounded-[12px] bg-soft-champagne text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-gold focus-visible:ring-offset-2 sm:rounded-[14px] lg:rounded-[16px] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } ${
                  index === 1 || index === 2
                    ? "mt-[35px] sm:mt-[50px] lg:mt-[65px]"
                    : ""
                } ${
                  index === 0 || index === 3
                    ? "h-[360px] sm:h-[440px] lg:h-[520px]"
                    : "h-[300px] sm:h-[350px] lg:h-[390px]"
                }`}
                style={{
                  transitionDelay: `${150 + index * 120}ms`,
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
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-active:scale-[0.98]"
                />

              
                <div className="pointer-events-none absolute inset-0 bg-near-black/0 transition-colors duration-300 group-hover:bg-near-black/10" />
              </button>
            ))}
          </div>

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

      
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Selected looks image viewer"
          className="fixed inset-0 z-[100] flex flex-col bg-near-black/95 px-4 py-5 backdrop-blur-sm sm:px-8 sm:py-6"
          onClick={closeGallery}
        >
          <div className="relative z-20 flex w-full items-center justify-between">
  <p className="font-body text-[11px] tracking-[0.18em] text-ivory/70 sm:text-[12px]">
    GAUTHAMI HARSHA
  </p>

  <p className="absolute left-1/2 -translate-x-1/2 font-body text-[12px] tracking-[0.12em] text-ivory/70">
    {String(selectedIndex + 1).padStart(2, "0")}
    <span className="px-1 text-bronze-gold">/</span>
    {String(looks.length).padStart(2, "0")}
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
                key={looks[selectedIndex].src}
                src={looks[selectedIndex].src}
                alt={looks[selectedIndex].alt}
                fill
                priority
                quality={95}
                sizes="100vw"
                className="object-contain"
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