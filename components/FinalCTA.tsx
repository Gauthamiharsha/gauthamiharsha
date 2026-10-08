"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const whatsappMessage =
  "Hi Gauthami, I came across your website and I'm interested in your makeup services. I'd love to know more about availability and booking.";

const whatsappUrl = `https://wa.me/919100399380?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export default function FinalCTA() {
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
        threshold: 0.15,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-[24px] pt-[80px] pb-[120px] sm:px-[40px] sm:pt-[90px] sm:pb-[150px] lg:px-[50px] lg:pt-[110px] lg:pb-[200px]"
    >
      <div
        className={`mx-auto flex w-full max-w-[1250px] flex-col overflow-hidden rounded-[16px] bg-champagne-gold transition-all duration-1000 ease-out sm:rounded-[20px] lg:h-[566px] lg:flex-row ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Image */}
        <div className="h-[400px] w-full shrink-0 sm:h-[500px] lg:h-[566px] lg:w-[566px]">
          <img
            src="/images/cta-bride.jpg"
            alt="Bridal makeup by Gauthami Harsha"
            className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
          />
        </div>

        {/* Right Content */}
        <div
          className={`flex w-full flex-1 flex-col items-center justify-center px-[28px] py-[55px] text-center transition-all delay-150 duration-1000 ease-out sm:px-[50px] sm:py-[65px] lg:h-full lg:px-[70px] lg:py-0 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="font-heading text-[42px] font-semibold leading-[46px] tracking-[-0.005em] text-espresso sm:text-[48px] sm:leading-[52px] lg:text-[52px] lg:leading-[56px]">
            READY FOR YOUR
            <br />
            MOMENT?
          </h2>

          <p className="mt-[20px] max-w-[550px] font-body text-[15px] font-normal leading-[25px] text-espresso sm:mt-[25px] sm:text-[16px] sm:leading-[26px]">
            Tell me what you have in mind, what you're looking for, and how you
            want to feel. I'll take it from there and create a look that's truly
            yours.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-[22px] flex h-[53px] w-[170px] items-center justify-center gap-[7px] rounded-[6px] bg-espresso font-body text-[16px] font-semibold leading-[24px] tracking-[0.004em] text-ivory transition-all duration-200 hover:bg-warm-brown hover:shadow-[0_5px_14px_rgba(42,26,8,0.18)] sm:mt-[25px]"
          >
            <span>Let's Talk</span>

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
