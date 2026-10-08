"use client";

import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaInstagram } from "react-icons/fa";

const whatsappNumber = "919100399380";

const whatsappMessage =
  "Hi Gauthami, I came across your website and I'm interested in your makeup services. I'd love to know more about availability and booking.";

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

const instagramUrl =
  "https://www.instagram.com/gauthamiharsha_makeupartistry?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==";

export default function ContactPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const eventDate = String(formData.get("eventDate") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const formattedDate = eventDate
      ? new Date(`${eventDate}T00:00:00`).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "Not provided";

    const enquiryMessage = `Hi Gauthami,

I came across your website and would like to enquire about your makeup services.

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email || "Not provided"}
*Service:* ${service}
*Event Date:* ${formattedDate}

*Message:*
${message}

Thank you.`;

    const enquiryUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      enquiryMessage,
    )}`;

    window.open(enquiryUrl, "_blank");
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-ivory">
        {/* ================================================== */}
        {/* PAGE INTRO */}
        {/* ================================================== */}

        <section className="w-full px-[24px] pb-[45px] pt-[45px] sm:px-[40px] sm:pb-[50px] sm:pt-[55px] lg:px-[50px] lg:pb-[55px] lg:pt-[60px]">
          <div className="mx-auto max-w-[800px] text-center">
            <h1 className="font-body text-[13px] font-semibold leading-[20px] tracking-[0.2em] text-bronze-gold sm:text-[14px]">
              CONTACT US
            </h1>

            <p className="mx-auto mt-[8px] max-w-[620px] font-body text-[14px] font-normal leading-[23px] text-warm-brown sm:mt-[10px] sm:text-[15px] sm:leading-[25px]">
              Have a question about makeup services, availability, or bookings?
              Get in touch and let&apos;s discuss your requirements.
            </p>
          </div>
        </section>

        {/* ================================================== */}
        {/* CONTACT + FORM */}
        {/* ================================================== */}

        <section className="w-full px-[24px] pb-[90px] sm:px-[40px] sm:pb-[110px] lg:px-[50px] lg:pb-[125px]">
          <div className="mx-auto grid max-w-[1200px] gap-[25px] lg:grid-cols-[0.8fr_1.2fr] lg:gap-[35px]">
            {/* LEFT - CONTACT DETAILS */}

            <div className="flex flex-col rounded-[16px] bg-near-black px-[28px] py-[35px] sm:px-[40px] sm:py-[45px] lg:min-h-[650px] lg:px-[45px] lg:py-[50px]">
              <div>
                <p className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.2em] text-champagne-gold">
                  GET IN TOUCH
                </p>
<h2 className="mt-[10px] max-w-[430px] font-heading text-[42px] font-semibold leading-[46px] tracking-[-0.015em] text-ivory max-[380px]:text-[37px] max-[380px]:leading-[41px] sm:text-[50px] sm:leading-[54px]">
  Let&apos;s talk about
  <br />
  <span className="text-champagne-gold">
    your special day.
  </span>
</h2>

                <p className="mt-[20px] max-w-[430px] font-body text-[15px] leading-[26px] text-ivory/70 sm:text-[16px] sm:leading-[28px]">
                  Whether you are planning your wedding, an engagement,
                  reception, or another special occasion, feel free to reach out
                  with your requirements.
                </p>
              </div>

              {/* CONTACT ITEMS */}

              <div className="mt-[40px] space-y-[25px]">
                {/* Location */}

                <div className="flex items-start gap-[16px]">
                  <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[6px] border border-champagne-gold/25">
                    <MapPin
                      size={19}
                      strokeWidth={1.8}
                      className="text-champagne-gold"
                    />
                  </div>

                  <div>
                    <p className="font-body text-[10px] font-semibold leading-[16px] tracking-[0.18em] text-champagne-gold">
                      LOCATION
                    </p>

                    <p className="mt-[4px] font-body text-[15px] leading-[24px] text-ivory">
                      A S Rao Nagar
                      <br />
                      Hyderabad, Telangana
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}

                <div className="flex items-start gap-[16px]">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Message Gauthami on WhatsApp"
                    className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[6px] border border-champagne-gold/25 transition-all duration-200 hover:border-champagne-gold hover:bg-champagne-gold/10"
                  >
                    <MessageCircle
                      size={19}
                      strokeWidth={1.8}
                      className="text-champagne-gold"
                    />
                  </a>

                  <div>
                    <p className="font-body text-[10px] font-semibold leading-[16px] tracking-[0.18em] text-champagne-gold">
                      WHATSAPP
                    </p>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-[4px] inline-block font-body text-[15px] leading-[24px] text-ivory transition-colors duration-200 hover:text-champagne-gold"
                    >
                      +91 9100399380
                    </a>
                  </div>
                </div>

                {/* Instagram */}

                <div className="flex items-start gap-[16px]">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Gauthami on Instagram"
                    className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[6px] border border-champagne-gold/25 transition-all duration-200 hover:border-champagne-gold hover:bg-champagne-gold/10"
                  >
                    <FaInstagram
                      size={19}
                      className="text-champagne-gold"
                    />
                  </a>

                  <div>
                    <p className="font-body text-[10px] font-semibold leading-[16px] tracking-[0.18em] text-champagne-gold">
                      INSTAGRAM
                    </p>

                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-[4px] inline-block font-body text-[15px] leading-[24px] text-ivory transition-colors duration-200 hover:text-champagne-gold"
                    >
                      Follow on Instagram
                    </a>
                  </div>
                </div>
              </div>

              {/* WHATSAPP CTA */}

              <div className="mt-auto pt-[40px]">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-[52px] w-full items-center justify-center gap-[7px] rounded-[6px] bg-champagne-gold font-body text-[15px] font-semibold leading-[24px] text-espresso transition-all duration-200 hover:bg-soft-gold hover:shadow-[0_5px_14px_rgba(242,200,75,0.15)] sm:text-[16px]"
                >
                  <span>Message on WhatsApp</span>

                  <ArrowRight
                    size={20}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>

            {/* RIGHT - ENQUIRY FORM */}

            <div className="rounded-[16px] border border-bronze-gold/20 bg-champagne/30 px-[25px] py-[35px] sm:px-[40px] sm:py-[45px] lg:px-[50px] lg:py-[50px]">
              <div>
                <p className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.2em] text-bronze-gold">
                  ENQUIRY
                </p>

                <h2 className="mt-[8px] font-heading text-[40px] font-semibold leading-[44px] text-espresso sm:text-[48px] sm:leading-[52px]">
                  Tell me about your booking.
                </h2>

                <p className="mt-[12px] max-w-[600px] font-body text-[14px] leading-[24px] text-warm-brown sm:text-[15px] sm:leading-[25px]">
                  Share a few details below and I&apos;ll get back to you with
                  the next steps.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-[32px] space-y-[22px]"
              >
                {/* Name + Phone */}

                <div className="grid gap-[22px] sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.12em] text-espresso"
                    >
                      YOUR NAME
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                      className="mt-[8px] h-[50px] w-full rounded-[6px] border border-bronze-gold/25 bg-ivory px-[15px] font-body text-[14px] text-espresso outline-none placeholder:text-warm-brown/55 transition-all duration-200 focus:border-bronze-gold focus:ring-2 focus:ring-bronze-gold/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.12em] text-espresso"
                    >
                      PHONE NUMBER
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your number"
                      required
                      className="mt-[8px] h-[50px] w-full rounded-[6px] border border-bronze-gold/25 bg-ivory px-[15px] font-body text-[14px] text-espresso outline-none placeholder:text-warm-brown/55 transition-all duration-200 focus:border-bronze-gold focus:ring-2 focus:ring-bronze-gold/10"
                    />
                  </div>
                </div>

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.12em] text-espresso"
                  >
                    EMAIL ADDRESS
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-[8px] h-[50px] w-full rounded-[6px] border border-bronze-gold/25 bg-ivory px-[15px] font-body text-[14px] text-espresso outline-none placeholder:text-warm-brown/55 transition-all duration-200 focus:border-bronze-gold focus:ring-2 focus:ring-bronze-gold/10"
                  />
                </div>

                {/* Service */}

                <div>
                  <label
                    htmlFor="service"
                    className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.12em] text-espresso"
                  >
                    SERVICE
                  </label>

                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="mt-[8px] h-[50px] w-full rounded-[6px] border border-bronze-gold/25 bg-ivory px-[15px] font-body text-[14px] text-espresso outline-none transition-all duration-200 focus:border-bronze-gold focus:ring-2 focus:ring-bronze-gold/10"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="Bridal Makeup">Bridal Makeup</option>
                    <option value="Engagement Makeup">
                      Engagement Makeup
                    </option>
                    <option value="Reception Makeup">
                      Reception Makeup
                    </option>
                    <option value="Bridesmaid / Non-Bridal Makeup">
                      Bridesmaid / Non-Bridal Makeup
                    </option>
                    <option value="Groom Makeover">Groom Makeover</option>
                    <option value="Other / Special Occasion">
                      Other / Special Occasion
                    </option>
                    <option value="Private Makeup Classes">
                      Private Makeup Classes
                    </option>
                  </select>
                </div>

                {/* Event Date */}

                <div>
                  <label
                    htmlFor="eventDate"
                    className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.12em] text-espresso"
                  >
                    EVENT DATE
                  </label>

                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    className="mt-[8px] h-[50px] w-full rounded-[6px] border border-bronze-gold/25 bg-ivory px-[15px] font-body text-[14px] text-espresso outline-none transition-all duration-200 focus:border-bronze-gold focus:ring-2 focus:ring-bronze-gold/10"
                  />
                </div>

                {/* Message */}

                <div>
                  <label
                    htmlFor="message"
                    className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.12em] text-espresso"
                  >
                    MESSAGE
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your event, location, requirements, or anything else you'd like me to know."
                    required
                    className="mt-[8px] w-full resize-none rounded-[6px] border border-bronze-gold/25 bg-ivory px-[15px] py-[13px] font-body text-[14px] leading-[23px] text-espresso outline-none placeholder:text-warm-brown/55 transition-all duration-200 focus:border-bronze-gold focus:ring-2 focus:ring-bronze-gold/10"
                  />
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  className="group flex h-[53px] w-full cursor-pointer items-center justify-center gap-[7px] rounded-[6px] bg-espresso font-body text-[15px] font-semibold leading-[24px] text-ivory transition-all duration-200 hover:bg-warm-brown hover:shadow-[0_5px_14px_rgba(42,26,8,0.18)] sm:text-[16px]"
                >
                  <span>Send Enquiry</span>

                  <ArrowRight
                    size={20}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* LOCATION / BOOKING NOTE */}
        {/* ================================================== */}

        <section className="w-full px-[24px] pb-[100px] sm:px-[40px] sm:pb-[120px] lg:px-[50px] lg:pb-[140px]">
          <div className="mx-auto max-w-[1200px] border-t border-bronze-gold/20 pt-[45px] sm:pt-[55px]">
            <div className="flex flex-col gap-[25px] sm:flex-row sm:items-start sm:justify-between sm:gap-[50px]">
              <div>
                <p className="font-body text-[11px] font-semibold leading-[18px] tracking-[0.2em] text-bronze-gold">
                  BOOKING INFORMATION
                </p>

                <h2 className="mt-[8px] font-heading text-[36px] font-semibold leading-[40px] text-espresso sm:text-[42px] sm:leading-[46px]">
                  Based in A S Rao Nagar,
                  <br className="hidden sm:block" /> Hyderabad.
                </h2>
              </div>

              <p className="max-w-[500px] font-body text-[15px] leading-[26px] text-warm-brown sm:pt-[5px] sm:text-[16px] sm:leading-[28px]">
                Gauthami currently takes bookings within Hyderabad. For
                availability, service details, or any questions about your
                event, please send an enquiry or message directly on WhatsApp.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}