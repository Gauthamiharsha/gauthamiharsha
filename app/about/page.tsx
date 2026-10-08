"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Reveal({
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
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const whatsappMessage =
  "Hi Gauthami, I came across your website and I'm interested in your makeup services. I'd love to know more about availability and booking.";

const whatsappUrl = `https://wa.me/919100399380?text=${encodeURIComponent(
  whatsappMessage
)}`;

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-ivory">
        {/* ================================================== */}
        {/* PAGE INTRO */}
        {/* ================================================== */}

        <section className="w-full px-[24px] pb-[45px] pt-[45px] sm:px-[40px] sm:pb-[50px] sm:pt-[55px] lg:px-[50px] lg:pb-[55px] lg:pt-[60px]">
          <Reveal>
            <div className="mx-auto max-w-[800px] text-center">
              <h1 className="font-body text-[13px] font-semibold leading-[20px] tracking-[0.2em] text-bronze-gold sm:text-[14px]">
                MEET GAUTHAMI
              </h1>

              <p className="mx-auto mt-[8px] max-w-[650px] font-body text-[14px] font-normal leading-[23px] text-warm-brown sm:mt-[10px] sm:text-[15px] sm:leading-[25px]">
                A journey from software engineering to creating personalised
                bridal looks in Hyderabad.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ================================================== */}
        {/* HER STORY */}
        {/* ================================================== */}

        <section className="w-full px-[24px] pb-[100px] sm:px-[40px] sm:pb-[120px] lg:px-[50px] lg:pb-[150px]">
          <div className="mx-auto grid max-w-[1200px] items-center gap-[45px] lg:grid-cols-[0.85fr_1.15fr] lg:gap-[85px]">
            {/* Image */}
            <Reveal>
              <div className="relative mx-auto w-full max-w-[500px]">
                <div className="h-[520px] w-full overflow-hidden rounded-[20px] sm:h-[620px] lg:h-[650px]">
                  <img
                    src="/images/Gauthami2.jpg"
                    alt="Gauthami Harsha"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>

                {/* Decorative Initial */}
                <span className="pointer-events-none absolute -bottom-[35px] -right-[5px] font-heading text-[100px] font-bold leading-none text-antique-gold/20 sm:-bottom-[45px] sm:right-[5px] sm:text-[125px] lg:-right-[20px] lg:text-[150px]">
                  GH
                </span>
              </div>
            </Reveal>

            {/* Story */}
            <Reveal delay={120}>
              <div>
                <p className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.18em] text-bronze-gold">
                  MY STORY
                </p>

                <h2 className="mt-[8px] font-heading text-[42px] font-bold leading-[46px] tracking-[-0.015em] text-espresso sm:text-[52px] sm:leading-[56px]">
                  From software engineering
                  <br />
                  <span className="text-bronze-gold">
                    to makeup artistry.
                  </span>
                </h2>

                <div className="mt-[25px] space-y-[16px]">
                  <p className="font-body text-[16px] leading-[27px] text-espresso/80 sm:text-[17px] sm:leading-[29px]">
                    My name is Gauthami Harsha, and I am a Luxury Bridal Makeup
                    Artist based in Hyderabad. My journey into makeup artistry
                    began from a completely different professional background.
                  </p>

                  <p className="font-body text-[16px] leading-[27px] text-espresso/80 sm:text-[17px] sm:leading-[29px]">
                    For around eight years, I worked as a Software Engineer in
                    top MNCs. At the same time, art and creativity had always
                    been close to my heart. I have always been passionate about
                    art and painting, and over time, that creative side of me
                    naturally led me towards makeup artistry.
                  </p>

                  <p className="font-body text-[16px] leading-[27px] text-espresso/80 sm:text-[17px] sm:leading-[29px]">
                    After becoming a mother of two, I decided to take a leap of
                    faith and turn that passion into my profession. I began my
                    makeup journey in 2023.
                  </p>

                  <p className="font-body text-[16px] leading-[27px] text-espresso/80 sm:text-[17px] sm:leading-[29px]">
                    What started as a passion gradually grew into my own makeup
                    brand, and today I specialise in bridal makeovers.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================================================== */}
        {/* APPROACH */}
        {/* ================================================== */}

        <section className="w-full bg-near-black px-[24px] py-[90px] sm:px-[40px] sm:py-[110px] lg:px-[50px] lg:py-[125px]">
          <div className="mx-auto grid max-w-[1200px] items-center gap-[45px] lg:grid-cols-[1fr_0.8fr] lg:gap-[100px]">
            <Reveal>
              <div>
                <p className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.2em] text-champagne-gold">
                  MY APPROACH
                </p>

                <h2 className="mt-[10px] max-w-[700px] font-heading text-[42px] font-semibold leading-[46px] tracking-[-0.015em] text-ivory sm:text-[54px] sm:leading-[58px] lg:text-[60px] lg:leading-[64px]">
                  Makeup should enhance
                  <br />
                  <span className="text-champagne-gold">
                    who you already are.
                  </span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="border-l border-champagne-gold/30 pl-[24px] sm:pl-[32px]">
                <p className="font-body text-[16px] leading-[28px] text-ivory/75 sm:text-[17px] sm:leading-[30px]">
                  My approach to makeup is to enhance a bride&apos;s natural
                  beauty rather than completely change her look. I believe
                  makeup should make you feel like the most beautiful version
                  of yourself while still feeling like you.
                </p>

                <p className="mt-[20px] font-body text-[16px] leading-[28px] text-ivory/75 sm:text-[17px] sm:leading-[30px]">
                  Every look is customised according to the bride&apos;s
                  features, skin, outfit, jewellery, and overall personality.
                  I focus on creating elegant, flawless, and long
                  <span className="flat-hyphen">-</span>lasting looks that feel
                  personal to each bride.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================================================== */}
        {/* BEYOND BRIDAL */}
        {/* ================================================== */}

        <section className="w-full px-[24px] py-[90px] sm:px-[40px] sm:py-[110px] lg:px-[50px] lg:py-[125px]">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <div className="max-w-[700px]">
                <p className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.2em] text-bronze-gold">
                  BEYOND BRIDAL
                </p>

                <h2 className="mt-[8px] font-heading text-[42px] font-semibold leading-[46px] text-espresso sm:text-[52px] sm:leading-[56px]">
                  More than just
                  <br />
                  <span className="text-bronze-gold">makeovers.</span>
                </h2>

                <p className="mt-[18px] max-w-[650px] font-body text-[15px] leading-[25px] text-warm-brown sm:text-[16px] sm:leading-[27px]">
                  Alongside bridal makeovers, I also share my knowledge and
                  techniques through private classes, one
                  <span className="flat-hyphen">-</span>on
                  <span className="flat-hyphen">-</span>one training, and
                  saree pre
                  <span className="flat-hyphen">-</span>pleating workshops.
                </p>
              </div>
            </Reveal>

            <div className="mt-[45px] grid gap-[18px] sm:grid-cols-3 sm:gap-[20px]">
              {[
                {
                  number: "01",
                  title: "Private Classes",
                  text: "Personalised makeup learning in a focused one-on-one setting.",
                },
                {
                  number: "02",
                  title: "One-on-One Training",
                  text: "Individual guidance to learn techniques and build confidence.",
                },
                {
                  number: "03",
                  title: "Saree Pre-pleating",
                  text: "Practical workshops focused on saree pre-pleating and preparation.",
                },
              ].map((item, index) => (
                <Reveal key={item.number} delay={index * 100}>
                  <div className="h-full rounded-[14px] border border-bronze-gold/20 bg-champagne/35 px-[24px] py-[28px] sm:px-[28px] sm:py-[32px]">
                    <span className="font-body text-[11px] font-semibold tracking-[0.15em] text-bronze-gold">
                      {item.number}
                    </span>

                    <h3 className="mt-[15px] font-heading text-[28px] font-semibold leading-[32px] text-espresso sm:text-[30px]">
                      {item.title === "One-on-One Training" ? (
                        <>
                          One
                          <span className="flat-hyphen">-</span>
                          on
                          <span className="flat-hyphen">-</span>
                          One Training
                        </>
                      ) : item.title === "Saree Pre-pleating" ? (
                        <>
                          Saree Pre
                          <span className="flat-hyphen">-</span>
                          pleating
                        </>
                      ) : (
                        item.title
                      )}
                    </h3>

                    <p className="mt-[14px] font-body text-[14px] leading-[23px] text-espresso/70 sm:text-[15px] sm:leading-[25px]">
                      {item.number === "02"
                        ? "Individual guidance to learn techniques and build confidence."
                        : item.number === "03"
                        ? "Practical workshops focused on saree pre-pleating and preparation."
                        : item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* STUDIO + BOOKINGS */}
        {/* ================================================== */}

        <section className="w-full px-[24px] pb-[100px] sm:px-[40px] sm:pb-[120px] lg:px-[50px] lg:pb-[140px]">
          <Reveal>
            <div className="mx-auto flex max-w-[1200px] flex-col items-center rounded-[16px] bg-champagne-gold px-[25px] py-[50px] text-center sm:px-[50px] sm:py-[60px] lg:px-[80px] lg:py-[65px]">
              <div className="flex items-center gap-[7px] font-body text-[11px] font-semibold tracking-[0.18em] text-espresso">
                <MapPin size={15} strokeWidth={2} />
                <span>AS RAO NAGAR · HYDERABAD</span>
              </div>

              <h2 className="mt-[12px] font-heading text-[40px] font-semibold leading-[44px] text-espresso sm:text-[48px] sm:leading-[52px]">
                Based in Hyderabad,
                <br />
                creating looks made for you.
              </h2>

              <p className="mt-[16px] max-w-[620px] font-body text-[15px] leading-[25px] text-espresso/75 sm:text-[16px] sm:leading-[27px]">
                My studio is based in A S Rao Nagar, Hyderabad, and I currently
                take bookings within Hyderabad. For availability and booking
                enquiries, feel free to get in touch.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-[25px] flex h-[52px] w-[190px] items-center justify-center gap-[7px] rounded-[6px] bg-espresso font-body text-[15px] font-semibold leading-[24px] text-ivory transition-all duration-200 hover:bg-warm-brown hover:shadow-[0_5px_14px_rgba(42,26,8,0.18)] sm:text-[16px]"
              >
                <span>Enquire Now</span>

                <ArrowRight
                  size={20}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}