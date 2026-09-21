"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MeetGauthami() {
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
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-[24px] pt-[140px] pb-[80px] sm:px-[40px] sm:pt-[160px] sm:pb-[90px] lg:px-[50px] lg:pt-[180px] lg:pb-[100px]"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-[60px] lg:flex-row lg:items-center lg:gap-[90px]">

        {/* Image */}
        <div
          className={`relative w-full max-w-[500px] shrink-0 transition-all duration-1000 ease-out ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-8 opacity-0"
          }`}
        >
          <div className="relative h-[500px] w-full overflow-hidden rounded-[20px] sm:h-[600px] lg:h-[600px] lg:w-[500px]">
            <img
              src="/images/gauthami-about.jpg"
              alt="Gauthami Harsha - Bridal Makeup Artist"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Content */}
        <div
          className={`relative flex w-full flex-1 flex-col transition-all delay-150 duration-1000 ease-out ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-8 opacity-0"
          }`}
        >

          {/* Decorative Initial */}
          <span className="pointer-events-none absolute -top-[55px] right-[10px] font-heading text-[100px] font-bold leading-none text-antique-gold/25 sm:-top-[65px] sm:right-[20px] sm:text-[125px] lg:-top-[75px] lg:right-[20px] lg:text-[150px]">
            GH
          </span>

          <p className="relative z-10 font-body text-[13px] font-semibold leading-[20px] tracking-[0.18em] text-bronze-gold lg:text-[14px]">
            MEET GAUTHAMI
          </p>

          <h2 className="relative z-10 mt-[14px] max-w-[650px] font-heading text-[48px] font-bold leading-[52px] tracking-[-0.015em] text-espresso sm:text-[56px] sm:leading-[60px] lg:text-[64px] lg:leading-[68px]">
            Makeup that feels
            <br />
            <span className="text-bronze-gold">like you.</span>
          </h2>

          <p className="relative z-10 mt-[24px] max-w-[620px] font-body text-[17px] font-normal leading-[28px] text-espresso sm:text-[18px] sm:leading-[30px] lg:text-[18px] lg:leading-[30px]">
            I believe makeup should enhance the person you already are, not
            hide it. My approach is centered around creating looks that feel
            elegant, comfortable, and true to your personality — especially
            on the moments that matter most.
          </p>

          <p className="relative z-10 mt-[16px] max-w-[620px] font-body text-[17px] font-normal leading-[28px] text-espresso sm:text-[18px] sm:leading-[30px] lg:text-[18px] lg:leading-[30px]">
            From the first consultation to the final touch, every detail is
            thoughtfully planned to make you feel confident, beautiful, and
            completely yourself.
          </p>

          {/* Signature + CTA */}
          <div className="relative z-10 mt-[30px] flex flex-col items-start gap-[25px] sm:flex-row sm:items-center sm:gap-0">
            <div>
              <p className="font-logo text-[38px] leading-[40px] text-bronze-gold sm:text-[42px] sm:leading-[42px]">
                Gauthami Harsha
              </p>

              <p className="mt-[5px] font-body text-[10px] font-medium leading-[16px] tracking-[0.2em] text-warm-brown sm:text-[11px]">
                BRIDAL MAKEUP ARTIST
              </p>
            </div>

            <a
              href="/about"
              className="group flex items-center gap-[7px] font-body text-[16px] font-semibold leading-[24px] tracking-[0.004em] text-bronze-gold transition-colors duration-200 hover:text-warm-brown sm:ml-[55px]"
            >
              <span>Know My Story</span>

              <ArrowRight
                size={20}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}