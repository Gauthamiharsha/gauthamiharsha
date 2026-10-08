import { ArrowRight, Heart } from "lucide-react";

const whatsappMessage =
  "Hi Gauthami, I came across your website and I'm interested in your makeup services. I'd love to know more about availability and booking.";

const whatsappUrl = `https://wa.me/919100399380?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export default function Hero() {
  return (
    <section className="w-full overflow-hidden">
      <div className="flex w-full flex-col items-center justify-between gap-[70px] px-[24px] pt-[50px] lg:flex-row lg:items-center lg:gap-0 lg:px-[50px] lg:pt-[30px]">
        {/* Left Hero Content */}
        <div className="hero-content ml-0 flex w-full max-w-[620px] flex-col lg:ml-[50px] lg:w-[620px] lg:max-w-none">
          <h1 className="font-heading text-[56px] font-bold leading-[60px] tracking-[-0.015em] text-espresso max-[390px]:text-[51px] max-[390px]:leading-[55px] sm:text-[68px] sm:leading-[72px] lg:text-[80px] lg:leading-[84px]">
  Made For Your
  <br />
  <span className="text-bronze-gold">Moment</span>
</h1>

          <p className="mt-[20px] max-w-[590px] font-body text-[17px] font-normal leading-[28px] text-espresso sm:text-[18px] sm:leading-[30px] lg:text-[18px] lg:leading-[30px]">
            Every bride has her own idea of what beautiful feels like. I bring
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            that vision to life with a look that feels natural, confident, and
            completely yours.
          </p>

          <div className="mt-[20px] flex flex-col items-stretch gap-[12px] sm:flex-row sm:items-center sm:gap-[15px]">
            {/* Enquire Now */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-[53px] w-full items-center justify-center gap-[7px] rounded-[6px] bg-bronze-gold font-body text-[16px] font-semibold leading-[24px] tracking-[0.004em] text-ivory transition-all duration-200 hover:bg-warm-brown hover:shadow-[0_5px_14px_rgba(42,26,8,0.18)] sm:w-[189px]"
            >
              <span>Enquire Now</span>

              <ArrowRight
                size={20}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>

            {/* View My Work */}
            <a
              href="/portfolio"
              className="flex h-[53px] w-full items-center justify-center rounded-[6px] border border-bronze-gold font-body text-[16px] font-semibold leading-[24px] tracking-[0.004em] text-bronze-gold transition-all duration-200 hover:bg-bronze-gold hover:text-ivory hover:shadow-[0_5px_14px_rgba(42,26,8,0.12)] sm:w-[189px]"
            >
              View My Work
            </a>
          </div>
        </div>

        {/* Right Hero Visual */}
        <div className="hero-visual flex h-auto w-full shrink-0 flex-col items-center justify-center lg:h-[587px] lg:w-auto lg:flex-row lg:items-start lg:justify-start">
          {/* Mobile Top Decorative Text */}
          <div className="flex shrink-0 items-center justify-center pb-[22px] lg:hidden">
            <div className="flex flex-col items-center text-center text-bronze-gold">
              <span className="font-script text-[30px] font-normal leading-[28px]">
                Making
              </span>

              <span className="font-script text-[30px] font-normal leading-[28px]">
                every moment
              </span>

              <span className="font-script text-[30px] font-normal leading-[28px]">
                unforgettable
              </span>

              <div className="mt-[8px] flex items-center">
                <Heart size={20} strokeWidth={2} fill="none" />

                <Heart
                  size={20}
                  strokeWidth={2}
                  fill="currentColor"
                  className="ml-[1px]"
                />
              </div>
            </div>
          </div>

          {/* Desktop Left Decorative Text */}
          <div className="hero-decorative-left hidden shrink-0 pr-[18px] pt-[25px] lg:block">
            <div className="flex rotate-[-10deg] flex-col items-center text-center text-bronze-gold">
              <span className="font-script text-[35px] font-normal leading-[32px]">
                Making
              </span>

              <span className="font-script text-[35px] font-normal leading-[32px]">
                every
              </span>

              <span className="font-script text-[35px] font-normal leading-[32px]">
                moment
              </span>

              <span className="font-script text-[35px] font-normal leading-[32px]">
                unforgettable
              </span>

              <div className="mt-[8px] flex items-center">
                <Heart size={22} strokeWidth={2} fill="none" />

                <Heart
                  size={22}
                  strokeWidth={2}
                  fill="currentColor"
                  className="ml-[1px]"
                />
              </div>
            </div>
          </div>

          {/* Main Image */}
          <div className="hero-image h-[500px] w-full max-w-[440px] shrink-0 overflow-hidden rounded-[20px] sm:h-[560px] lg:h-[587px] lg:w-[440px]">
            <img
              src="/images/hero-bride.jpg"
              alt="Gauthami Harsha bridal makeup"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>

          {/* Desktop Right Decorative Text */}
          <div className="hero-decorative-right hidden h-full shrink-0 items-end pl-[20px] pb-[25px] lg:flex">
            <div className="flex rotate-[-10deg] flex-col items-center text-center text-bronze-gold">
              <span className="font-script text-[35px] font-normal leading-[32px]">
                Timeless
              </span>

              <span className="font-script text-[35px] font-normal leading-[32px]">
                beauty,
              </span>

              <span className="font-script text-[35px] font-normal leading-[32px]">
                uniquely
              </span>

              <span className="font-script text-[35px] font-normal leading-[32px]">
                yours
              </span>

              <div className="mt-[8px] flex items-center">
                <Heart size={22} strokeWidth={2} fill="none" />

                <Heart
                  size={22}
                  strokeWidth={2}
                  fill="currentColor"
                  className="ml-[1px]"
                />
              </div>
            </div>
          </div>

          {/* Mobile Bottom Decorative Text */}
          <div className="flex shrink-0 items-center justify-center pt-[22px] lg:hidden">
            <div className="flex flex-col items-center text-center text-bronze-gold">
              <span className="font-script text-[30px] font-normal leading-[28px]">
                Timeless beauty,
              </span>

              <span className="font-script text-[30px] font-normal leading-[28px]">
                uniquely yours
              </span>

              <div className="mt-[8px] flex items-center">
                <Heart size={20} strokeWidth={2} fill="none" />

                <Heart
                  size={20}
                  strokeWidth={2}
                  fill="currentColor"
                  className="ml-[1px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
