"use client";

import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";


const testimonials = [
  {
    id: 1,
    text: `Hey Gauthami !!!! Thank you soooo much for making my day special!!! Everyone loved the makeup. All the very very best to you and definitely you will go a longgggg way in this field.`,
  },
  {
    id: 2,
    text: `Hello akka I lovvvvved how I was looking for my wedding. You made me look soo good on my special day. People complimented me in soo many ways. Some said I was looking like a doll on the stage. Someone said akka I just could not take my eyes off you. Some said I looked very elegant. Some said the makeup looks very very natural. Big credit goes to you. I was very sceptical about the makeup because that can make or break a bride's look. But you did an amazing job. Thanks`,
  },
  {
    id: 3,
    text: `Gauthamiii... You are THE BEST. I received huge number of compliments for my Wedding look. You know I saved few makeup reels and pictures to show you how i wanted to look on my big day and between all the chaos I forgot to show you those but you made me look exactly how i wanted to be and may be even better. That eye work is amazing. If you ask me to rate I'd give you 10/10. Thank you for making me look more Beautiful`,
  },
  {
    id: 4,
    text: `The pictures have turned out to be so pretty, all thanks to you for making me look this good on my special day. Can't think of anyone else who can do this magic now on. Thanks again!!`,
  },
  {
    id: 5,
    text: `Hi Gauthami.. Everyone loved the makeup I'm glad I had the pleasure of having makeup done by you for my sister's wedding, and I couldn't be more impressed with your work. perfectly captured the elegance and natural beauty we were looking for, You making my us look absolutely stunning on the special day. Gautami, I really loved your attention to detail, professionalism, and calm demeanor which made the entire process stress-free and enjoyable. The makeup held up beautifully throughout the day and night, despite all the dancing and emotions! I highly recommend you, Gautami. Thank you for making the day even more magical`,
  },
  {
    id: 6,
    text: `Really loved your work akka, got many compliments.. even my grandmom who normally doesn't like makeup loved it...she said you were looking very beautiful, makeup was very subtle. I loved how the makeup pulled attention to my eyes..it looked very beautiful Thank you soo much..looking forward to a new look on my wedding...`,
  },
];

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
      { threshold: 0.12 }
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

function TestimonialCard({
  testimonial,
  large = false,
}: {
  testimonial: (typeof testimonials)[number];
  large?: boolean;
}) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-[16px] border border-bronze-gold/20 bg-champagne/30 transition-all duration-300 ${
        large
          ? "px-[28px] py-[32px] sm:px-[38px] sm:py-[40px]"
          : "px-[24px] py-[28px] sm:px-[30px] sm:py-[32px]"
      } hover:-translate-y-[2px] hover:border-bronze-gold/35 hover:shadow-[0_12px_30px_rgba(42,26,8,0.08)]`}
    >
      {/* Decorative Quote */}
      <div className="absolute right-[22px] top-[8px] font-heading text-[90px] font-semibold leading-none text-antique-gold/10 transition-transform duration-500 group-hover:scale-105">
        “
      </div>

      <div className="relative z-10">
        <Quote
          size={22}
          strokeWidth={1.6}
          className="text-bronze-gold"
        />

        <p
          className={`mt-[20px] font-heading font-medium text-espresso ${
            large
              ? "text-[22px] leading-[31px] sm:text-[25px] sm:leading-[34px]"
              : "text-[19px] leading-[27px] sm:text-[20px] sm:leading-[29px]"
          }`}
        >
          {testimonial.text}
        </p>

        <div className="mt-[25px] h-[1px] w-[45px] bg-bronze-gold/35" />

        <p className="mt-[12px] font-body text-[9px] font-semibold leading-[16px] tracking-[0.18em] text-bronze-gold">
          BRIDE&apos;S REVIEW
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full px-[24px] py-[100px] sm:px-[40px] sm:py-[120px] lg:px-[50px] lg:py-[150px]">
      <div className="mx-auto max-w-[1400px]">
        {/* ================================================== */}
        {/* SECTION INTRO */}
        {/* ================================================== */}

        <Reveal>
          <div className="mx-auto max-w-[750px] text-center">
            <p className="font-body text-[12px] font-semibold leading-[18px] tracking-[0.2em] text-bronze-gold sm:text-[13px]">
              TESTIMONIALS
            </p>

            <h2 className="mt-[8px] font-heading text-[45px] font-semibold leading-[52px] tracking-[-0.015em] text-espresso sm:text-[58px] sm:leading-[62px] lg:text-[64px] lg:leading-[68px]">
              A few words from
              <br />
              <span className="text-bronze-gold">
                my beautiful brides.
              </span>
            </h2>

            <p className="mx-auto mt-[16px] max-w-[600px] font-body text-[15px] leading-[26px] text-warm-brown sm:text-[16px] sm:leading-[28px]">
              A few words from brides and families who trusted me with their
              special occasions.
            </p>
          </div>
        </Reveal>

        {/* ================================================== */}
        {/* DESKTOP / TABLET GRID */}
        {/* ================================================== */}

        <div className="mt-[55px] hidden gap-[18px] lg:grid lg:grid-cols-12">
          {/* LEFT COLUMN */}
          <div className="col-span-5 flex flex-col gap-[18px]">
            <Reveal delay={100} className="h-full">
              <TestimonialCard
                testimonial={testimonials[1]}
                large
              />
            </Reveal>

            <Reveal delay={250} className="h-full">
              <TestimonialCard testimonial={testimonials[3]} />
            </Reveal>
          </div>

          {/* CENTER */}
          <div className="col-span-4">
            <Reveal delay={150} className="h-full">
              <TestimonialCard
                testimonial={testimonials[2]}
                large
              />
            </Reveal>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-3 flex flex-col gap-[18px]">
            <Reveal delay={200} className="h-full">
              <TestimonialCard testimonial={testimonials[0]} />
            </Reveal>

            <Reveal delay={300} className="h-full">
              <TestimonialCard testimonial={testimonials[5]} />
            </Reveal>
          </div>

          {/* BOTTOM */}
          <div className="col-span-12">
            <Reveal delay={350}>
              <TestimonialCard
                testimonial={testimonials[4]}
                large
              />
            </Reveal>
          </div>
        </div>

        {/* ================================================== */}
        {/* MOBILE */}
        {/* ================================================== */}

        <div className="mt-[40px] flex flex-col gap-[16px] lg:hidden">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 90}>
              <TestimonialCard
                testimonial={testimonial}
                large={
                  testimonial.id === 2 ||
                  testimonial.id === 3 ||
                  testimonial.id === 5
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}