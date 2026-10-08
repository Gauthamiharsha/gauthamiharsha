"use client";

import {
  CalendarDays,
  MapPin,
  Pencil,
  Phone,
  Trash2,
  X,
} from "lucide-react";

import {
  Booking,
  Client,
} from "@/types/booking";

import {
  formatIndianDate,
  formatIndianTime,
  getBalance,
} from "@/lib/booking-utils";

type Props = {
  booking: Booking;
  client: Client | null;
  allBookings: Booking[];
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function BookingDetails({
  booking,
  client,
  allBookings,
  onClose,
  onEdit,
  onDelete,
}: Props) {

  const clientEvents =
    allBookings.filter(
      (item) =>
        item.clientId ===
        booking.clientId
    );

  function handleDelete() {
    const confirmed =
      window.confirm(
        "Delete this booking? This cannot be undone."
      );

    if (confirmed) {
      onDelete();
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-[#2A1A08]/40 backdrop-blur-[2px]">

      <aside className="h-full w-full max-w-[480px] overflow-y-auto bg-[#F8F4EA] shadow-[-20px_0_60px_rgba(42,26,8,0.15)]">

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#D6AF32]/15 bg-[#F8F4EA]/95 px-[22px] py-[17px] backdrop-blur-md">

          <div>

            <p className="font-body text-[9px] font-semibold tracking-[0.18em] text-[#A67417]">
              BOOKING DETAILS
            </p>

            <p className="mt-[2px] font-heading text-[25px] font-semibold text-[#2A1A08]">
              {client?.name ||
                "Client"}
            </p>

          </div>

          <button
            onClick={onClose}
            className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full border border-[#D6AF32]/20 hover:border-[#D6AF32]"
          >
            <X size={17} />
          </button>

        </div>

        <div className="space-y-[22px] px-[22px] py-[24px]">

          <div className="rounded-[12px] border border-[#D6AF32]/15 bg-white p-[18px]">

            <div className="flex items-start justify-between gap-[12px]">

              <div>

                <p className="font-body text-[9px] font-semibold tracking-[0.15em] text-[#A67417]">
                  EVENT
                </p>

                <h2 className="mt-[4px] font-heading text-[31px] font-semibold text-[#2A1A08]">
                  {booking.eventType}
                </h2>

              </div>

              <Status
                status={
                  booking.status
                }
              />

            </div>

            <div className="mt-[18px] space-y-[12px]">

              <Detail
                icon={
                  <CalendarDays
                    size={16}
                  />
                }
                label="DATE & TIME"
              >
                {formatIndianDate(
                  booking.date
                )}
                <br />
                {formatIndianTime(
                  booking.startTime
                )}{" "}
                –{" "}
                {formatIndianTime(
                  booking.endTime
                )}
              </Detail>

              {booking.location && (
                <Detail
                  icon={
                    <MapPin
                      size={16}
                    />
                  }
                  label="LOCATION"
                >
                  {booking.location}
                </Detail>
              )}

              {client?.phone && (
                <Detail
                  icon={
                    <Phone
                      size={16}
                    />
                  }
                  label="CLIENT"
                >
                  {client.phone}
                </Detail>
              )}

            </div>

          </div>

          <div className="rounded-[12px] border border-[#D6AF32]/15 bg-white p-[18px]">

            <p className="font-body text-[9px] font-semibold tracking-[0.15em] text-[#A67417]">
              PAYMENT
            </p>

            <div className="mt-[15px] grid grid-cols-3 gap-[10px]">

              <Money
                label="TOTAL"
                value={
                  booking.amount
                }
              />

              <Money
                label="ADVANCE"
                value={
                  booking.advance
                }
              />

              <Money
                label="BALANCE"
                value={getBalance(
                  booking.amount,
                  booking.advance
                )}
                accent
              />

            </div>

          </div>

          {booking.notes && (
            <div className="rounded-[12px] border border-[#D6AF32]/15 bg-[#EFE5D0]/30 p-[18px]">

              <p className="font-body text-[9px] font-semibold tracking-[0.15em] text-[#A67417]">
                EVENT NOTES
              </p>

              <p className="mt-[9px] whitespace-pre-wrap font-body text-[12px] leading-[21px] text-[#6B5130]">
                {booking.notes}
              </p>

            </div>
          )}

          <div>

            <div className="flex items-end justify-between">

              <div>

                <p className="font-body text-[9px] font-semibold tracking-[0.15em] text-[#A67417]">
                  CLIENT EVENTS
                </p>

                <p className="mt-[3px] font-heading text-[24px] font-semibold text-[#2A1A08]">
                  {clientEvents.length}{" "}
                  events
                </p>

              </div>

            </div>

            <div className="mt-[10px] space-y-[7px]">

              {clientEvents.map(
                (event) => (
                  <div
                    key={event.id}
                    className={`rounded-[8px] border p-[11px] ${
                      event.id ===
                      booking.id
                        ? "border-[#A67417]/40 bg-[#EFE5D0]/35"
                        : "border-[#D6AF32]/10 bg-white"
                    }`}
                  >

                    <div className="flex items-center justify-between gap-[10px]">

                      <div>

                        <p className="font-body text-[11px] font-semibold text-[#2A1A08]">
                          {
                            event.eventType
                          }
                        </p>

                        <p className="mt-[2px] font-body text-[9px] text-[#6B5130]">
                          {formatIndianDate(
                            event.date
                          )}{" "}
                          ·{" "}
                          {formatIndianTime(
                            event.startTime
                          )}
                        </p>

                      </div>

                      <Status
                        status={
                          event.status
                        }
                      />

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          <div className="grid grid-cols-2 gap-[9px]">

            <button
              onClick={onEdit}
              className="flex h-[47px] cursor-pointer items-center justify-center gap-[7px] rounded-[7px] bg-[#2A1A08] font-body text-[12px] font-semibold text-[#F8F4EA] hover:bg-[#6B5130]"
            >
              <Pencil
                size={15}
              />
              Edit Booking
            </button>

            <button
              onClick={
                handleDelete
              }
              className="flex h-[47px] cursor-pointer items-center justify-center gap-[7px] rounded-[7px] border border-red-200 bg-red-50 font-body text-[12px] font-semibold text-red-700 hover:bg-red-100"
            >
              <Trash2
                size={15}
              />
              Delete
            </button>

          </div>

        </div>

      </aside>

    </div>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-[11px]">

      <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[6px] bg-[#EFE5D0] text-[#A67417]">
        {icon}
      </div>

      <div>

        <p className="font-body text-[8px] font-semibold tracking-[0.12em] text-[#6B5130]">
          {label}
        </p>

        <p className="mt-[2px] font-body text-[11px] leading-[18px] text-[#2A1A08]">
          {children}
        </p>

      </div>

    </div>
  );
}

function Money({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div>

      <p className="font-body text-[8px] font-semibold tracking-[0.1em] text-[#6B5130]">
        {label}
      </p>

      <p
        className={`mt-[4px] font-body text-[12px] font-semibold ${
          accent
            ? "text-[#A67417]"
            : "text-[#2A1A08]"
        }`}
      >
        ₹
        {value.toLocaleString(
          "en-IN"
        )}
      </p>

    </div>
  );
}

function Status({
  status,
}: {
  status:
    | "Confirmed"
    | "Tentative"
    | "Completed"
    | "Cancelled";
}) {
  const styles = {
    Confirmed:
      "bg-emerald-50 text-emerald-700",
    Tentative:
      "bg-amber-50 text-amber-700",
    Completed:
      "bg-blue-50 text-blue-700",
    Cancelled:
      "bg-gray-100 text-gray-500",
  };

  return (
    <span
      className={`shrink-0 rounded-full px-[8px] py-[4px] font-body text-[8px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}