"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bridalServices = [
  {
    number: "01",
    title: "Airbrush Makeover",
    includes: ["Airbrush Makeup", "Hairstyling", "Saree Draping"],
  },
  {
    number: "02",
    title: "HD Makeover",
    includes: ["HD Makeup", "Hairstyling", "Saree Draping"],
  },
];

const nonBridalServices = [
  {
    number: "01",
    title: "HD Makeover",
    includes: ["Makeup", "Hairstyling", "Saree Draping"],
  },
  {
    number: "02",
    title: "Simple Makeover",
    includes: ["Basic Makeup", "Hairstyling", "Saree Draping"],
  },
  {
    number: "03",
    title: "Family / Guest Makeover",
    includes: ["Basic Makeup", "Hairstyling", "Saree Draping"],
  },
];

const addOnServices = [
  "Extra Hairstyles",
  "Extra Saree Draping",
  "Saree Pre-pleating & Box Folding",
];

const occasions = [
  "Pellikuthuru Makeover",
  "Sangeet Makeover",
  "Haldi Makeover",
  "Reception Makeover",
  "Cocktail Makeover",
  "Birthday Party Makeover",
  "Bridesmaid Makeover",
  "Guest Makeover",
  "Groom Makeover",
];

const whatsappClassesMessage =
  "Hi Gauthami, I came from your website and I'm interested in learning more about your private makeup classes. I'd love to know about the course and details.";

const whatsappClassesUrl = `https://wa.me/919100399380?text=${encodeURIComponent(
  whatsappClassesMessage
)}`;

function ServiceReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-900 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-ivory">
      {/* ================================================== */}
{/* PAGE INTRO */}
{/* ================================================== */}

<section className="w-full px-[24px] pb-[40px] pt-[45px] sm:px-[40px] sm:pb-[45px] sm:pt-[55px] lg:px-[50px] lg:pb-[50px] lg:pt-[60px]">
  <div className="mx-auto max-w-[800px] text-center">
    <h1 className="font-body text-[13px] font-semibold leading-[20px] tracking-[0.2em] text-bronze-gold sm:text-[14px]">
      SERVICES
    </h1>

    <p className="mx-auto mt-[8px] max-w-[620px] font-body text-[14px] font-normal leading-[23px] text-warm-brown sm:mt-[10px] sm:text-[15px] sm:leading-[25px]">
      Explore our bridal and non-bridal makeup packages, hairstyling,
      saree draping, and services for special occasions.
    </p>
  </div>
</section>

        {/* ================================================== */}
        {/* BRIDAL MAKEUP */}
        {/* ================================================== */}

        <section className="w-full px-[24px] pb-[90px] sm:px-[40px] sm:pb-[110px] lg:px-[50px] lg:pb-[125px]">
          <div className="mx-auto max-w-[1200px]">
            <ServiceReveal>
              <div className="mb-[35px] border-b border-bronze-gold/25 pb-[14px] sm:mb-[45px] sm:pb-[16px]">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.18em] text-bronze-gold sm:text-[12px]">
                      01
                    </p>

                    <h2 className="mt-[5px] font-heading text-[38px] font-semibold leading-[42px] text-espresso sm:text-[46px] sm:leading-[48px]">
                      Bridal Makeup
                    </h2>
                  </div>
                </div>
              </div>
            </ServiceReveal>

            <div className="grid gap-[18px] md:grid-cols-2 md:gap-[24px]">
              {bridalServices.map((service, index) => (
                <ServiceReveal key={service.title} delay={index * 120}>
                  <div className="h-full rounded-[14px] border border-bronze-gold/20 bg-champagne/35 px-[24px] py-[28px] sm:px-[30px] sm:py-[32px]">
                    <div className="flex items-start justify-between">
                      <span className="font-body text-[11px] font-semibold tracking-[0.15em] text-bronze-gold">
                        {service.number}
                      </span>

                      <span className="font-heading text-[32px] font-semibold leading-[30px] text-antique-gold/25">
                        GH
                      </span>
                    </div>

                    <h3 className="mt-[15px] font-heading text-[30px] font-semibold leading-[34px] text-espresso sm:text-[34px] sm:leading-[38px]">
                      {service.title}
                    </h3>

                    <div className="mt-[22px] border-t border-bronze-gold/15 pt-[18px]">
                      <p className="font-body text-[10px] font-semibold tracking-[0.18em] text-warm-brown">
                        INCLUDES
                      </p>

                      <ul className="mt-[11px] space-y-[6px]">
                        {service.includes.map((item) => (
                          <li
                            key={item}
                            className="font-body text-[14px] leading-[23px] text-espresso/80 sm:text-[15px]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ServiceReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* BRIDESMAID / NON BRIDAL */}
        {/* ================================================== */}

        <section className="w-full bg-champagne/35 px-[24px] py-[90px] sm:px-[40px] sm:py-[110px] lg:px-[50px] lg:py-[125px]">
          <div className="mx-auto max-w-[1200px]">
            <ServiceReveal>
              <div className="mb-[35px] border-b border-bronze-gold/25 pb-[14px] sm:mb-[45px] sm:pb-[16px]">
                <p className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.18em] text-bronze-gold sm:text-[12px]">
                  02
                </p>

               <h2 className="mt-[5px] font-heading text-[35px] font-semibold leading-[40px] text-espresso sm:text-[44px] sm:leading-[48px]">
  Bridesmaid / Non<span className="flat-hyphen">-</span>Bridal
</h2>
              </div>
            </ServiceReveal>

            <div className="grid gap-[18px] md:grid-cols-3 md:gap-[20px]">
              {nonBridalServices.map((service, index) => (
                <ServiceReveal key={service.title} delay={index * 120}>
                  <div className="h-full rounded-[14px] border border-bronze-gold/20 bg-ivory px-[22px] py-[28px] sm:px-[26px] sm:py-[30px]">
                    <span className="font-body text-[11px] font-semibold tracking-[0.15em] text-bronze-gold">
                      {service.number}
                    </span>

                    <h3 className="mt-[15px] font-heading text-[29px] font-semibold leading-[33px] text-espresso">
                      {service.title}
                    </h3>

                    <div className="mt-[22px] border-t border-bronze-gold/15 pt-[18px]">
                      <p className="font-body text-[10px] font-semibold tracking-[0.18em] text-warm-brown">
                        INCLUDES
                      </p>

                      <ul className="mt-[11px] space-y-[6px]">
                        {service.includes.map((item) => (
                          <li
                            key={item}
                            className="font-body text-[14px] leading-[23px] text-espresso/80"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ServiceReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* GROOM + ADD ONS */}
        {/* ================================================== */}

        <section className="w-full px-[24px] py-[90px] sm:px-[40px] sm:py-[110px] lg:px-[50px] lg:py-[125px]">
          <div className="mx-auto grid max-w-[1200px] gap-[45px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-[80px]">
            {/* Groom */}

            <ServiceReveal>
              <div>
                <div className="border-b border-bronze-gold/25 pb-[14px]">
                  <p className="font-body text-[11px] font-semibold tracking-[0.18em] text-bronze-gold">
                    03
                  </p>

                  <h2 className="mt-[5px] font-heading text-[40px] font-semibold leading-[44px] text-espresso sm:text-[46px]">
                    Groom Makeover
                  </h2>
                </div>

                <div className="mt-[25px] rounded-[14px] border border-bronze-gold/20 bg-near-black px-[25px] py-[28px] sm:px-[30px] sm:py-[32px]">
                  <p className="font-body text-[10px] font-semibold tracking-[0.18em] text-champagne-gold">
                    INCLUDES
                  </p>

                  <ul className="mt-[14px] space-y-[7px]">
                    <li className="font-body text-[15px] leading-[24px] text-ivory">
                      Basic Makeup
                    </li>

                    <li className="font-body text-[15px] leading-[24px] text-ivory">
                      Hair Setting
                    </li>
                  </ul>
                </div>
              </div>
            </ServiceReveal>

            {/* Add Ons */}

            <ServiceReveal delay={120}>
              <div>
                <div className="border-b border-bronze-gold/25 pb-[14px]">
                  <p className="font-body text-[11px] font-semibold tracking-[0.18em] text-bronze-gold">
                    04
                  </p>

                  <h2 className="mt-[5px] font-heading text-[40px] font-semibold leading-[44px] text-espresso sm:text-[46px]">
                    Add<span className="flat-hyphen">-</span>On Services
                  </h2>
                </div>

                <div className="mt-[25px] divide-y divide-bronze-gold/15 border-y border-bronze-gold/15">
                  {addOnServices.map((service, index) => (
                    <div
                      key={service}
                      className="flex items-center gap-[20px] py-[17px]"
                    >
                      <span className="flex h-[26px] w-[24px] shrink-0 items-center font-body text-[10px] font-semibold leading-[26px] tracking-[0.12em] text-bronze-gold">
                        0{index + 1}
                      </span>

                      <p className="font-body text-[15px] font-medium leading-[23px] text-espresso sm:text-[16px]">
                        {service}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ServiceReveal>
          </div>
        </section>

        {/* ================================================== */}
        {/* OCCASIONS */}
        {/* ================================================== */}

        <section className="w-full bg-near-black px-[24px] py-[90px] sm:px-[40px] sm:py-[110px] lg:px-[50px] lg:py-[125px]">
          <div className="mx-auto max-w-[1200px]">
            <ServiceReveal>
              <div className="text-center">
                <h2 className="font-heading text-[42px] font-semibold leading-[46px] tracking-[-0.015em] text-ivory sm:text-[52px] sm:leading-[56px]">
                  Makeup for every
                  <br />
                  <span className="text-champagne-gold">occasion.</span>
                </h2>

                <p className="mx-auto mt-[16px] max-w-[560px] font-body text-[14px] leading-[24px] text-ivory/70 sm:text-[15px] sm:leading-[25px]">
                  From traditional ceremonies to special celebrations, explore
                  the occasions we offer makeup services for.
                </p>
              </div>
            </ServiceReveal>

            <div className="mt-[40px] grid grid-cols-1 border-t border-ivory/15 sm:grid-cols-2 lg:grid-cols-3">
              {occasions.map((occasion, index) => (
                <ServiceReveal key={occasion} delay={index * 70}>
                  <div className="flex min-h-[64px] items-center gap-[18px] border-b border-ivory/15 sm:px-[18px]">
                    <span className="flex h-[28px] w-[25px] shrink-0 items-center font-body text-[10px] font-semibold leading-[28px] tracking-[0.12em] text-champagne-gold/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="flex min-h-[28px] items-center font-heading text-[21px] font-medium leading-[28px] text-ivory sm:text-[22px]">
                      {occasion}
                    </p>
                  </div>
                </ServiceReveal>
              ))}
            </div>
          </div>
        </section>

{/* ================================================== */}
{/* LUXURY PRODUCTS */}
{/* ================================================== */}

<section className="w-full px-[24px] py-[90px] sm:px-[40px] sm:py-[110px] lg:px-[50px] lg:py-[125px]">
  <div className="mx-auto max-w-[1200px]">
    <ServiceReveal>
      <div className="grid overflow-hidden rounded-[16px] border border-bronze-gold/25 bg-champagne/30 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="min-h-[380px] bg-near-black sm:min-h-[480px] lg:min-h-[560px]">
          <img
            src="/images/luxury-products.jpg"
            alt="Luxury beauty products used by Gauthami Harsha"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-[28px] py-[45px] sm:px-[50px] sm:py-[60px] lg:px-[70px] lg:py-[75px]">
          <p className="font-body text-[10px] font-semibold leading-[18px] tracking-[0.2em] text-bronze-gold sm:text-[11px]">
            LUXURY PRODUCTS
          </p>

          <h2 className="mt-[10px] font-heading text-[42px] font-semibold leading-[44px] tracking-[-0.015em] text-espresso sm:text-[52px] sm:leading-[54px]">
            Luxury products.
            <br />
            <span className="text-bronze-gold">Premium experience.</span>
          </h2>

          <div className="mt-[25px] h-[1px] w-[55px] bg-bronze-gold/50" />

          <p className="mt-[25px] font-heading text-[23px] font-medium leading-[30px] text-espresso sm:text-[26px] sm:leading-[33px]">
            Your skin deserves nothing but the best.
          </p>

          <p className="mt-[18px] max-w-[560px] font-body text-[14px] leading-[25px] text-espresso/70 sm:text-[15px] sm:leading-[27px]">
            For every makeover, I carefully select premium beauty products
            from globally trusted brands. From thoughtful skin preparation
            to the final setting, every product is chosen for its quality,
            performance, and finish.
          </p>

          <p className="mt-[20px] max-w-[560px] font-body text-[14px] font-medium leading-[25px] text-warm-brown sm:text-[15px] sm:leading-[27px]">
            Because your special day deserves a luxury makeup experience from start to finish.
          </p>
        </div>
      </div>
    </ServiceReveal>
  </div>
</section>

        {/* ================================================== */}
        {/* PRIVATE CLASSES */}
        {/* ================================================== */}

        <section className="w-full px-[24px] py-[90px] sm:px-[40px] sm:py-[110px] lg:px-[50px] lg:py-[125px]">
          <ServiceReveal>
            <div className="mx-auto flex max-w-[900px] flex-col items-center rounded-[16px] border border-bronze-gold/20 bg-champagne/45 px-[25px] py-[45px] text-center sm:px-[50px] sm:py-[55px] lg:px-[80px] lg:py-[65px]">
              <p className="font-body text-[11px] font-semibold tracking-[0.2em] text-bronze-gold">
                PRIVATE CLASSES
              </p>

              <h2 className="mt-[10px] font-heading text-[40px] font-semibold leading-[44px] text-espresso sm:text-[48px] sm:leading-[50px]">
                Learn the art of makeup.
              </h2>

              <p className="mt-[15px] max-w-[600px] font-body text-[15px] leading-[25px] text-espresso/70 sm:text-[16px] sm:leading-[27px]">
                Private makeup classes for those who want to learn, practice,
                and build confidence in creating beautiful looks.
              </p>

              <a
                href={whatsappClassesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[25px] flex h-[52px] w-[210px] items-center justify-center rounded-[6px] bg-espresso font-body text-[15px] font-semibold leading-[24px] text-ivory transition-all duration-200 hover:bg-warm-brown hover:shadow-[0_5px_14px_rgba(42,26,8,0.18)] sm:text-[16px]"
              >
                Enquire About Classes
              </a>
            </div>
          </ServiceReveal>
        </section>
      </main>

      <Footer />
    </>
  );
}