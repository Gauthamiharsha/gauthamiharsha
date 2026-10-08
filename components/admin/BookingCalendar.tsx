"use client";

import { addDays, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from "date-fns";
import type { Booking, CalendarView, Client } from "@/types/booking";
import { formatIndianTime } from "@/lib/booking-utils";

type Props = {
  view: CalendarView;
  currentDate: Date;
  bookings: Booking[];
  clients: Client[];
  onAdd: (date: string) => void;
  onSelect: (booking: Booking) => void;
};

type CalendarChildProps = {
  currentDate: Date;
  bookings: Booking[];
  clients: Client[];
  onAdd: (date: string) => void;
  onSelect: (booking: Booking) => void;
  getClientName: (clientId: string) => string;
  getDateString: (date: Date) => string;
};

export default function BookingCalendar({ view, currentDate, bookings, clients, onAdd, onSelect }: Props) {
  const getClientName = (clientId: string) => clients.find((client) => client.id === clientId)?.name || "Unknown client";
  const getDateString = (date: Date) => format(date, "yyyy-MM-dd");

  if (view === "month") return <MonthCalendar currentDate={currentDate} bookings={bookings} clients={clients} onAdd={onAdd} onSelect={onSelect} getClientName={getClientName} getDateString={getDateString} />;
  if (view === "week") return <WeekCalendar currentDate={currentDate} bookings={bookings} clients={clients} onAdd={onAdd} onSelect={onSelect} getClientName={getClientName} getDateString={getDateString} />;
  return <DayCalendar currentDate={currentDate} bookings={bookings} clients={clients} onAdd={onAdd} onSelect={onSelect} getClientName={getClientName} getDateString={getDateString} />;
}

function statusStyle(status: string) {
  if (status === "Confirmed") return "border-[#4D8A54] bg-[#EEF7EE]";
  if (status === "Tentative") return "border-[#C58A24] bg-[#FFF7E6]";
  if (status === "Completed") return "border-[#5C82A8] bg-[#EEF4FA]";
  return "border-[#999999] bg-[#F2F2F2]";
}

function MonthCalendar({ currentDate, bookings, onAdd, onSelect, getClientName, getDateString }: CalendarChildProps) {
  const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="overflow-hidden rounded-[12px] border border-[#D6AF32]/15 bg-white">
      <div className="grid grid-cols-7 border-b border-[#D6AF32]/15 bg-[#EFE5D0]/45">
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
          <div key={day} className="border-r border-[#D6AF32]/10 px-[4px] py-[11px] text-center font-body text-[8px] font-bold tracking-[0.08em] text-[#6B5130] sm:px-[8px] sm:text-[10px]">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.slice(0, 3)}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day) => {
          const date = getDateString(day);
          const dayBookings = bookings.filter((booking) => booking.date === date).sort((a, b) => a.startTime.localeCompare(b.startTime));
          const currentMonth = isSameMonth(day, currentDate);
          const today = isSameDay(day, new Date());

          return (
            <div key={date} onClick={() => onAdd(date)} className={`group min-h-[145px] cursor-pointer border-b border-r border-[#D6AF32]/10 p-[5px] transition-all duration-200 hover:bg-[#FFFCF7] sm:min-h-[175px] sm:p-[8px] ${currentMonth ? "bg-white" : "bg-[#F8F4EA]/55"}`}>
              <div className="flex items-center justify-between">
                <span className={`flex h-[28px] w-[28px] items-center justify-center rounded-full font-body text-[10px] font-bold transition-all ${today ? "bg-[#2A1A08] text-[#F8F4EA] shadow-sm" : currentMonth ? "text-[#2A1A08] group-hover:bg-[#EFE5D0]" : "text-[#6B5130]/30"}`}>
                  {format(day, "d")}
                </span>

                {dayBookings.length > 0 && (
                  <span className="rounded-full bg-[#EFE5D0] px-[6px] py-[3px] font-body text-[7px] font-bold text-[#A67417]">
                    {dayBookings.length}
                  </span>
                )}
              </div>

              <div className="mt-[7px] space-y-[5px]">
                {dayBookings.slice(0, 3).map((booking) => (
                  <button key={booking.id} type="button" onClick={(event) => { event.stopPropagation(); onSelect(booking); }} className={`group/card block w-full cursor-pointer rounded-[7px] border border-transparent border-l-[3px] px-[6px] py-[6px] text-left shadow-[0_2px_7px_rgba(42,26,8,0.035)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#D6AF32]/40 hover:shadow-[0_5px_14px_rgba(42,26,8,0.10)] ${statusStyle(booking.status)}`}>
                    <div className="flex items-center justify-between gap-[4px]">
                      <p className="truncate font-body text-[8px] font-bold text-[#2A1A08] sm:text-[9px]">{getClientName(booking.clientId)}</p>
                      <span className="shrink-0 font-body text-[7px] font-semibold text-[#A67417] sm:text-[8px]">{formatIndianTime(booking.startTime)}</span>
                    </div>
                    <p className="mt-[2px] truncate font-body text-[7px] font-semibold text-[#6B5130] sm:text-[8px]">{booking.eventType}</p>
                    <p className="mt-[2px] truncate font-body text-[7px] text-[#8B7359] sm:text-[8px]">{booking.location || "Location not added"}</p>
                  </button>
                ))}

                {dayBookings.length > 3 && (
                  <button type="button" onClick={(event) => { event.stopPropagation(); onSelect(dayBookings[3]); }} className="cursor-pointer px-[4px] pt-[1px] font-body text-[8px] font-bold text-[#A67417] hover:text-[#2A1A08]">
                    +{dayBookings.length - 3} more
                  </button>
                )}
              </div>

              {dayBookings.length === 0 && (
                <div className="mt-[28px] text-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="font-body text-[8px] font-semibold text-[#A67417]">+ Add booking</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekCalendar({ currentDate, bookings, onAdd, onSelect, getClientName, getDateString }: CalendarChildProps) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const hours = Array.from({ length: 16 }, (_, index) => index + 6);
  const hourHeight = 78;

  return (
    <div className="overflow-x-auto rounded-[12px] border border-[#D6AF32]/15 bg-white">
      <div className="min-w-[950px]">
        <div className="grid grid-cols-[78px_repeat(7,minmax(125px,1fr))] border-b border-[#D6AF32]/15 bg-[#F8F4EA]">
          <div />
          {days.map((day) => {
            const today = isSameDay(day, new Date());

            return (
              <button key={day.toISOString()} type="button" onClick={() => onAdd(getDateString(day))} className={`cursor-pointer border-l border-[#D6AF32]/10 px-[8px] py-[12px] text-center transition-colors hover:bg-[#EFE5D0]/45 ${today ? "bg-[#EFE5D0]/50" : ""}`}>
                <p className="font-body text-[8px] font-bold tracking-[0.1em] text-[#A67417]">{format(day, "EEE").toUpperCase()}</p>
                <p className={`mx-auto mt-[3px] flex h-[31px] w-[31px] items-center justify-center rounded-full font-heading text-[18px] font-semibold ${today ? "bg-[#2A1A08] text-[#F8F4EA]" : "text-[#2A1A08]"}`}>{format(day, "d")}</p>
              </button>
            );
          })}
        </div>

        <div className="relative">
          {hours.map((hour) => {
            const time = `${String(hour).padStart(2, "0")}:00`;

            return (
              <div key={hour} className="grid h-[78px] grid-cols-[78px_repeat(7,minmax(125px,1fr))]">
                <div className="border-b border-[#D6AF32]/10 px-[7px] pt-[6px] text-right font-body text-[8px] font-medium text-[#6B5130]">{formatIndianTime(time)}</div>
                {days.map((day) => (
                  <button key={`${day.toISOString()}-${hour}`} type="button" onClick={() => onAdd(getDateString(day))} className="cursor-pointer border-b border-l border-[#D6AF32]/10 bg-white text-left transition-colors hover:bg-[#FFFCF7]" />
                ))}
              </div>
            );
          })}

          {bookings.filter((booking) => days.some((day) => isSameDay(day, new Date(`${booking.date}T00:00:00`)))).map((booking) => {
            const bookingDate = new Date(`${booking.date}T00:00:00`);
            const dayIndex = days.findIndex((day) => isSameDay(day, bookingDate));
            if (dayIndex === -1) return null;

            const [startHour, startMinute] = booking.startTime.split(":").map(Number);
            const [endHour, endMinute] = booking.endTime.split(":").map(Number);
            const startMinutes = startHour * 60 + startMinute;
            const endMinutes = endHour * 60 + endMinute;
            const duration = Math.max(30, endMinutes - startMinutes);
            const top = ((startMinutes - 6 * 60) / 60) * hourHeight;
            const height = Math.max(48, (duration / 60) * hourHeight);

            return (
              <button key={booking.id} type="button" onClick={() => onSelect(booking)} className={`absolute cursor-pointer overflow-hidden rounded-[8px] border border-transparent border-l-[4px] px-[8px] py-[7px] text-left shadow-[0_3px_10px_rgba(42,26,8,0.06)] transition-all duration-200 hover:z-20 hover:-translate-y-[1px] hover:border-[#D6AF32]/50 hover:shadow-[0_8px_18px_rgba(42,26,8,0.14)] ${statusStyle(booking.status)}`} style={{ top, height, left: `calc(78px + ${dayIndex} * ((100% - 78px) / 7) + 4px)`, width: `calc((100% - 78px) / 7 - 8px)` }}>
                <p className="truncate font-body text-[9px] font-bold text-[#2A1A08]">{getClientName(booking.clientId)}</p>
                <p className="mt-[2px] truncate font-body text-[8px] font-semibold text-[#6B5130]">{booking.eventType}</p>
                <p className="mt-[2px] truncate font-body text-[7px] text-[#A67417]">{formatIndianTime(booking.startTime)} – {formatIndianTime(booking.endTime)}</p>
                {height >= 75 && <p className="mt-[2px] truncate font-body text-[7px] text-[#8B7359]">{booking.location || "Location not added"}</p>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DayCalendar({ currentDate, bookings, onAdd, onSelect, getClientName, getDateString }: CalendarChildProps) {
  const hours = Array.from({ length: 16 }, (_, index) => index + 6);
  const date = getDateString(currentDate);
  const dayBookings = bookings.filter((booking) => booking.date === date).sort((a, b) => a.startTime.localeCompare(b.startTime));
  const hourHeight = 82;

  return (
    <div className="overflow-hidden rounded-[12px] border border-[#D6AF32]/15 bg-white">
      <div className="border-b border-[#D6AF32]/15 bg-[#EFE5D0]/40 px-[18px] py-[16px]">
        <p className="font-body text-[9px] font-bold tracking-[0.16em] text-[#A67417]">{format(currentDate, "EEEE").toUpperCase()}</p>
        <h3 className="mt-[2px] font-heading text-[29px] font-semibold text-[#2A1A08]">{format(currentDate, "d MMMM yyyy")}</h3>
      </div>

      {dayBookings.length > 0 && (
        <div className="border-b border-[#D6AF32]/10 bg-[#F8F4EA] px-[18px] py-[9px]">
          <p className="font-body text-[9px] font-semibold text-[#6B5130]">{dayBookings.length} booking{dayBookings.length !== 1 ? "s" : ""} scheduled</p>
        </div>
      )}

      <div className="relative max-h-[900px] overflow-y-auto">
        {hours.map((hour) => {
          const time = `${String(hour).padStart(2, "0")}:00`;

          return (
            <button key={hour} type="button" onClick={() => onAdd(date)} className="flex h-[82px] w-full cursor-pointer border-b border-[#D6AF32]/10 text-left transition-colors hover:bg-[#FFFCF7]">
              <span className="w-[90px] shrink-0 px-[12px] pt-[8px] text-right font-body text-[9px] font-medium text-[#6B5130]">{formatIndianTime(time)}</span>
              <span className="flex-1 border-l border-[#D6AF32]/10" />
            </button>
          );
        })}

        {dayBookings.map((booking) => {
          const [startHour, startMinute] = booking.startTime.split(":").map(Number);
          const [endHour, endMinute] = booking.endTime.split(":").map(Number);
          const start = startHour * 60 + startMinute;
          const end = endHour * 60 + endMinute;
          const top = ((start - 6 * 60) / 60) * hourHeight;
          const height = Math.max(58, ((end - start) / 60) * hourHeight);

          return (
            <button key={booking.id} type="button" onClick={() => onSelect(booking)} className={`absolute left-[105px] right-[15px] cursor-pointer overflow-hidden rounded-[9px] border border-transparent border-l-[4px] px-[13px] py-[10px] text-left shadow-[0_4px_14px_rgba(42,26,8,0.07)] transition-all duration-200 hover:z-20 hover:-translate-y-[2px] hover:border-[#D6AF32]/50 hover:shadow-[0_10px_24px_rgba(42,26,8,0.14)] ${statusStyle(booking.status)}`} style={{ top, height }}>
              <div className="flex flex-wrap items-center justify-between gap-[5px]">
                <p className="font-body text-[9px] font-bold tracking-[0.05em] text-[#A67417]">{formatIndianTime(booking.startTime)} – {formatIndianTime(booking.endTime)}</p>
                <span className="rounded-full border border-black/5 bg-white/45 px-[6px] py-[3px] font-body text-[7px] font-bold text-[#6B5130]">{booking.status}</span>
              </div>
              <p className="mt-[3px] font-heading text-[21px] font-semibold leading-[24px] text-[#2A1A08]">{getClientName(booking.clientId)}</p>
              <p className="mt-[1px] font-body text-[10px] font-semibold text-[#6B5130]">{booking.eventType}</p>
              {height >= 80 && <p className="mt-[3px] truncate font-body text-[8px] text-[#8B7359]">{booking.location || "Location not added"}</p>}
            </button>
          );
        })}

        {dayBookings.length === 0 && (
          <div className="pointer-events-none absolute inset-x-0 top-[260px] text-center">
            <p className="font-heading text-[23px] font-semibold text-[#2A1A08]/25">No bookings</p>
            <p className="mt-[2px] font-body text-[9px] text-[#6B5130]/45">Click any time slot to add one</p>
          </div>
        )}
      </div>
    </div>
  );
}