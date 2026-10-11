
"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Phone, X } from "lucide-react";
import type { Booking, Client } from "@/types/booking";
import { formatIndianDate, formatIndianTime } from "@/lib/booking-utils";

type Props = {
  client: Client;
  bookings: Booking[];
  onClose: () => void;
  onSave: (
    client: Client
  ) => Promise<{ success: boolean; message?: string }>;
};

export default function ClientDetails({
  client,
  bookings,
  onClose,
  onSave,
}: Props) {
  const [packageAmount, setPackageAmount] = useState(
    String(client.packageAmount ?? 0)
  );
  const [advancePaid, setAdvancePaid] = useState(
    String(client.advancePaid ?? 0)
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setPackageAmount(String(client.packageAmount ?? 0));
    setAdvancePaid(String(client.advancePaid ?? 0));
    setMessage("");
  }, [client]);

  const clientBookings = bookings
    .filter((booking) => booking.clientId === client.id)
    .sort((a, b) =>
      `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)
    );

  const total = Math.max(0, Number(packageAmount) || 0);
  const paid = Math.max(0, Number(advancePaid) || 0);
  const balance = Math.max(total - paid, 0);

  async function handleSave() {
    if (total < 0 || paid < 0) {
      setMessage("Payment amounts cannot be negative.");
      return;
    }

    if (paid > total) {
      setMessage("Advance paid cannot exceed the package amount.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const result = await onSave({
        ...client,
        packageAmount: total,
        advancePaid: paid,
      });

     
if (result.success) {
  onClose();
} else {
  setMessage(result.message || "Could not save payment details.");
}
    } catch {
      setMessage("Could not save payment details. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-[#2A1A08]/50 backdrop-blur-[3px]">
      <aside className="h-full w-full max-w-[520px] overflow-y-auto bg-[#F8F4EA] shadow-[-20px_0_60px_rgba(42,26,8,0.15)]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#D6AF32]/15 bg-[#F8F4EA]/95 px-[22px] py-[18px] backdrop-blur-md">
          <div>
            <p className="font-body text-[9px] font-semibold tracking-[0.18em] text-[#A67417]">
              CLIENT DETAILS
            </p>
            <h2 className="mt-[4px] font-heading text-[27px] font-semibold text-[#2A1A08]">
              {client.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close client details"
            className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full border border-[#D6AF32]/20 hover:border-[#D6AF32]"
          >
            <X size={17} />
          </button>
        </div>

        <div className="space-y-[22px] px-[22px] py-[24px]">
          <section className="rounded-[12px] border border-[#D6AF32]/15 bg-white p-[17px]">
            <p className="font-body text-[9px] font-semibold tracking-[0.15em] text-[#A67417]">
              CONTACT
            </p>

            {client.phone && (
              <p className="mt-[12px] flex items-center gap-[9px] font-body text-[12px] text-[#2A1A08]">
                <Phone size={15} className="text-[#A67417]" />
                {client.phone}
              </p>
            )}

            {client.email && (
              <p className="mt-[8px] font-body text-[11px] text-[#6B5130]">
                {client.email}
              </p>
            )}

            {client.notes && (
              <p className="mt-[10px] whitespace-pre-wrap font-body text-[11px] leading-[19px] text-[#6B5130]">
                {client.notes}
              </p>
            )}
          </section>

          <section className="rounded-[12px] border border-[#D6AF32]/15 bg-white p-[17px]">
            <div className="flex items-center justify-between">
              <p className="font-body text-[9px] font-semibold tracking-[0.15em] text-[#A67417]">
                PACKAGE PAYMENT
              </p>
              <span className="rounded-full bg-[#F2C84B]/20 px-[9px] py-[5px] font-body text-[9px] font-semibold text-[#6B5130]">
                {clientBookings.length} event
                {clientBookings.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="mt-[16px] grid gap-[13px] sm:grid-cols-2">
              <label className="font-body text-[9px] font-semibold tracking-[0.1em] text-[#2A1A08]">
                TOTAL PACKAGE AMOUNT (₹)
                <input
                  type="number"
                  min="0"
                  value={packageAmount}
                  onChange={(e) => setPackageAmount(e.target.value)}
                  placeholder="e.g. 40000"
                  className="mt-[7px] h-[46px] w-full rounded-[7px] border border-[#D6AF32]/20 bg-white px-[12px] font-body text-[12px] font-normal tracking-normal outline-none focus:border-[#A67417]"
                />
              </label>

              <label className="font-body text-[9px] font-semibold tracking-[0.1em] text-[#2A1A08]">
                TOTAL ADVANCE PAID (₹)
                <input
                  type="number"
                  min="0"
                  value={advancePaid}
                  onChange={(e) => setAdvancePaid(e.target.value)}
                  placeholder="e.g. 15000"
                  className="mt-[7px] h-[46px] w-full rounded-[7px] border border-[#D6AF32]/20 bg-white px-[12px] font-body text-[12px] font-normal tracking-normal outline-none focus:border-[#A67417]"
                />
              </label>
            </div>

            <div className="mt-[16px] grid grid-cols-2 gap-[10px]">
              <div className="rounded-[8px] bg-[#EFE5D0]/50 p-[12px]">
                <p className="font-body text-[8px] font-semibold tracking-[0.1em] text-[#6B5130]">
                  ADVANCE PAID
                </p>
                <p className="mt-[5px] font-body text-[16px] font-bold text-[#2A1A08]">
                  ₹{paid.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-[8px] bg-[#EFE5D0]/50 p-[12px]">
                <p className="font-body text-[8px] font-semibold tracking-[0.1em] text-[#6B5130]">
                  BALANCE DUE
                </p>
                <p className="mt-[5px] font-body text-[16px] font-bold text-[#A67417]">
                  ₹{balance.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="mt-[15px] h-[46px] w-full cursor-pointer rounded-[7px] bg-[#2A1A08] font-body text-[11px] font-semibold text-[#F8F4EA] transition-colors hover:bg-[#6B5130] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Package Payment"}
            </button>

            {message && (
              <p className="mt-[10px] font-body text-[11px] leading-[18px] text-[#6B5130]">
                {message}
              </p>
            )}
          </section>

          <section>
            <p className="font-body text-[9px] font-semibold tracking-[0.15em] text-[#A67417]">
              ALL EVENTS
            </p>

            {clientBookings.length === 0 ? (
              <p className="mt-[10px] rounded-[10px] border border-dashed border-[#D6AF32]/25 p-[18px] font-body text-[11px] text-[#6B5130]">
                No events have been added for this client yet.
              </p>
            ) : (
              <div className="mt-[11px] space-y-[9px]">
                {clientBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-[10px] border border-[#D6AF32]/15 bg-white p-[14px]"
                  >
                    <div className="flex items-start justify-between gap-[12px]">
                      <div>
                        <p className="font-heading text-[20px] font-semibold text-[#2A1A08]">
                          {booking.eventType}
                        </p>
                        <p className="mt-[5px] flex items-center gap-[6px] font-body text-[10px] text-[#6B5130]">
                          <CalendarDays size={13} />
                          {formatIndianDate(booking.date)}
                        </p>
                        <p className="mt-[4px] font-body text-[10px] text-[#6B5130]">
                          {formatIndianTime(booking.startTime)} –{" "}
                          {formatIndianTime(booking.endTime)}
                        </p>
                        {booking.location && (
                          <p className="mt-[5px] flex items-center gap-[6px] font-body text-[10px] text-[#6B5130]">
                            <MapPin size={13} />
                            {booking.location}
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 rounded-full bg-[#EFE5D0] px-[8px] py-[5px] font-body text-[8px] font-semibold text-[#6B5130]">
                        {booking.status}
                      </span>
                    </div>

                    {booking.notes && (
                      <p className="mt-[10px] whitespace-pre-wrap border-t border-[#D6AF32]/10 pt-[9px] font-body text-[10px] leading-[17px] text-[#6B5130]">
                        {booking.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </aside>
    </div>
  );
}
