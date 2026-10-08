import { ArrowLeft } from "lucide-react";

interface ComingSoonProps {
  title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <main className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-ivory px-[24px] py-[80px]">
      <div className="flex w-full max-w-[700px] flex-col items-center text-center">

        {/* Small Label */}
        <p className="font-body text-[12px] font-semibold leading-[20px] tracking-[0.2em] text-bronze-gold sm:text-[14px]">
          CURRENTLY DEVELOPING
        </p>

        {/* Heading */}
        <h1 className="mt-[18px] font-heading text-[52px] font-bold leading-[56px] tracking-[-0.015em] text-espresso sm:text-[68px] sm:leading-[72px] lg:text-[80px] lg:leading-[84px]">
          {title}
          <br />
          <span className="text-bronze-gold">Coming Soon.</span>
        </h1>

        {/* Description */}
        <p className="mt-[22px] max-w-[560px] font-body text-[16px] font-normal leading-[27px] text-espresso/75 sm:text-[17px] sm:leading-[28px]">
          This page is currently being crafted. Please check back soon to
          explore more of Gauthami Harsha&apos;s work and services.
        </p>

        {/* Home Button */}
        <a
          href="/"
          className="group mt-[30px] flex h-[53px] w-[180px] items-center justify-center gap-[7px] rounded-[6px] bg-bronze-gold font-body text-[16px] font-semibold leading-[24px] tracking-[0.004em] text-ivory transition-all duration-200 hover:bg-warm-brown hover:shadow-[0_5px_14px_rgba(42,26,8,0.18)]"
        >
          <ArrowLeft
            size={20}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />

          <span>Back to Home</span>
        </a>
      </div>
    </main>
  );
}