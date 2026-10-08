import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory text-espresso">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-[24px] py-[100px]">
        <section className="text-center">
          <h1 className="font-heading text-[48px] font-medium leading-[1.1] text-espresso sm:text-[58px]">
            Sorry, this page isn&apos;t available.
          </h1>

          <p className="mx-auto mt-[15px] max-w-[500px] font-body text-[14px] leading-[24px] text-espresso/60 sm:text-[15px]">
            The page you are looking for may have been moved or removed.
          </p>

          <Link
            href="/"
            className="mt-[30px] inline-flex h-[50px] items-center justify-center rounded-[6px] bg-espresso px-[30px] font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-ivory transition-colors duration-300 hover:bg-bronze-gold hover:text-espresso"
          >
            Back to Home
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}