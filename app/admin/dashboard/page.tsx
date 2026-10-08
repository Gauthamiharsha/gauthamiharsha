"use client";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, IndianRupee, LogOut, Plus, Search, UserRound } from "lucide-react";
import { addMonths, format, subMonths } from "date-fns";
import type { Booking, BookingStatus, CalendarView, Client } from "@/types/booking";
import BookingCalendar from "@/components/admin/BookingCalendar";
import BookingDetails from "@/components/admin/BookingDetails";
import BookingModal from "@/components/admin/BookingModal";
import { formatIndianTime, getBalance, getBookingStatusClass } from "@/lib/booking-utils";

export default function DashboardPage() {
  const [view, setView] = useState<CalendarView>("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [databaseError, setDatabaseError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "All">("All");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [prefilledDate, setPrefilledDate] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        setIsLoading(true);
        setDatabaseError("");
        const response = await fetch("/api/admin/bookings", { method: "GET", cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to load bookings.");
        setBookings(data.bookings || []);
        setClients(data.clients || []);
      } catch (error) {
        console.error(error);
        setDatabaseError(error instanceof Error ? error.message : "Failed to load bookings.");
      } finally {
        setIsLoading(false);
      }
    }
    loadBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();
    return bookings.filter((booking) => {
      const client = clients.find((item) => item.id === booking.clientId);
      const matchesSearch = !query || client?.name.toLowerCase().includes(query) || booking.eventType.toLowerCase().includes(query) || booking.location.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, clients, search, statusFilter]);

  const upcomingBookings = useMemo(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    return filteredBookings.filter((booking) => booking.date >= today && booking.status !== "Cancelled").sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    });
  }, [filteredBookings]);

  const totalBalance = bookings.reduce((sum, booking) => sum + getBalance(Number(booking.amount || 0), Number(booking.advance || 0)), 0);
  const confirmedCount = bookings.filter((booking) => booking.status === "Confirmed").length;
  const getClientName = (clientId: string) => clients.find((client) => client.id === clientId)?.name || "Unknown client";
  const openNewBooking = (date = "") => { setEditingBooking(null); setPrefilledDate(date); setIsBookingModalOpen(true); };
  const openEditBooking = (booking: Booking) => { setEditingBooking(booking); setPrefilledDate(""); setSelectedBooking(null); setIsBookingModalOpen(true); };

  async function handleSaveBooking(booking: Booking, client: Client): Promise<{ success: true } | { success: false; message: string }> {
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking, client }),
      });
      const data = await response.json();
      if (!response.ok) return { success: false, message: data.error || "Failed to save booking." };

      setBookings((current) => {
        const exists = current.some((item) => item.id === data.booking.id);
        if (exists) return current.map((item) => item.id === data.booking.id ? data.booking : item);
        return [...current, data.booking];
      });

      setClients((current) => {
        const exists = current.some((item) => item.id === data.client.id);
        if (exists) return current.map((item) => item.id === data.client.id ? data.client : item);
        return [...current, data.client];
      });

      setIsBookingModalOpen(false);
      setEditingBooking(null);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Something went wrong while saving the booking." };
    }
  }

  async function deleteBooking(bookingId: string) {
    const confirmed = window.confirm("Delete this booking?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete booking.");
      setBookings((current) => current.filter((booking) => booking.id !== bookingId));
      setSelectedBooking(null);
    } catch (error) {
      console.error(error);
      window.alert(error instanceof Error ? error.message : "Failed to delete booking.");
    }
  }

  function moveCalendar(direction: "previous" | "next") {
    if (view === "month") {
      setCurrentDate((date) => direction === "next" ? addMonths(date, 1) : subMonths(date, 1));
      return;
    }

    setCurrentDate((date) => {
      const next = new Date(date);
      next.setDate(next.getDate() + (direction === "next" ? 7 : -7));
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[#F4EFE5] text-[#2A1A08]">
      <header className="border-b border-[#D6AF32]/15 bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-[22px] py-[18px] lg:px-[34px]">
          <div>
            <p className="font-body text-[9px] font-semibold tracking-[0.24em] text-[#A67417]">GAUTHAMI HARSHA</p>
            <h1 className="mt-[3px] font-heading text-[29px] font-semibold leading-[32px] text-[#2A1A08]">Booking Dashboard</h1>
          </div>
          <button type="button" onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); window.location.href = "/admin/login"; }} className="flex h-[40px] cursor-pointer items-center gap-[7px] rounded-[7px] border border-[#D6AF32]/20 bg-white px-[13px] font-body text-[10px] font-semibold text-[#6B5130] transition-all hover:border-[#D6AF32] hover:bg-[#EFE5D0]">
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-[22px] py-[24px] lg:px-[34px] lg:py-[30px]">
        <div className="grid gap-[13px] sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="TOTAL BOOKINGS" value={bookings.length} icon={<CalendarDays size={17} />} />
          <StatCard label="UPCOMING" value={upcomingBookings.length} icon={<Clock3 size={17} />} />
          <StatCard label="CONFIRMED" value={confirmedCount} icon={<UserRound size={17} />} />
          <StatCard label="BALANCE DUE" value={`₹${totalBalance.toLocaleString("en-IN")}`} icon={<IndianRupee size={17} />} />
        </div>

        <div className="mt-[24px] flex flex-col gap-[12px] rounded-[12px] border border-[#D6AF32]/15 bg-[#F8F4EA] p-[13px] shadow-[0_8px_30px_rgba(42,26,8,0.04)] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-[10px] sm:flex-row">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#6B5130]/55" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search client, event or location..." className="h-[43px] w-full rounded-[7px] border border-[#D6AF32]/15 bg-white pl-[38px] pr-[13px] font-body text-[11px] text-[#2A1A08] outline-none placeholder:text-[#6B5130]/45 focus:border-[#A67417]" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as BookingStatus | "All")} className="h-[43px] rounded-[7px] border border-[#D6AF32]/15 bg-white px-[13px] font-body text-[11px] text-[#2A1A08] outline-none focus:border-[#A67417]">
              <option value="All">All statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Tentative">Tentative</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <button type="button" onClick={() => openNewBooking()} className="flex h-[43px] cursor-pointer items-center justify-center gap-[7px] rounded-[7px] bg-[#2A1A08] px-[18px] font-body text-[11px] font-semibold text-[#F8F4EA] transition-colors hover:bg-[#6B5130]">
            <Plus size={15} />
            Add Booking
          </button>
        </div>

        {databaseError && (
          <div className="mt-[18px] rounded-[9px] border border-red-200 bg-red-50 px-[15px] py-[12px] font-body text-[11px] text-red-700">{databaseError}</div>
        )}

        <section className="mt-[26px]">
          <div className="mb-[13px] flex items-end justify-between">
            <div>
              <p className="font-body text-[9px] font-semibold tracking-[0.18em] text-[#A67417]">YOUR SCHEDULE</p>
              <h2 className="mt-[2px] font-heading text-[27px] font-semibold leading-[31px] text-[#2A1A08]">Calendar</h2>
            </div>
            <div className="flex items-center gap-[5px] rounded-[7px] border border-[#D6AF32]/15 bg-[#F8F4EA] p-[4px]">
              {(["month", "week", "day"] as CalendarView[]).map((item) => (
                <button key={item} type="button" onClick={() => setView(item)} className={`cursor-pointer rounded-[5px] px-[11px] py-[7px] font-body text-[9px] font-semibold capitalize transition-all ${view === item ? "bg-[#2A1A08] text-[#F8F4EA]" : "text-[#6B5130] hover:bg-[#EFE5D0]"}`}>{item}</button>
              ))}
            </div>
          </div>

          <div className="rounded-[13px] border border-[#D6AF32]/15 bg-[#F8F4EA] p-[13px] shadow-[0_8px_30px_rgba(42,26,8,0.04)]">
            <div className="mb-[13px] flex items-center justify-between">
              <button type="button" onClick={() => moveCalendar("previous")} className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[6px] border border-[#D6AF32]/15 bg-white text-[#6B5130] hover:border-[#D6AF32]">
                <ChevronLeft size={15} />
              </button>
              <div className="text-center">
                <p className="font-heading text-[21px] font-semibold text-[#2A1A08]">{view === "month" ? format(currentDate, "MMMM yyyy") : format(currentDate, "dd MMM yyyy")}</p>
              </div>
              <button type="button" onClick={() => moveCalendar("next")} className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[6px] border border-[#D6AF32]/15 bg-white text-[#6B5130] hover:border-[#D6AF32]">
                <ChevronRight size={15} />
              </button>
            </div>
            <BookingCalendar view={view} currentDate={currentDate} bookings={filteredBookings} clients={clients} onAdd={openNewBooking} onSelect={setSelectedBooking} />
          </div>
        </section>

       <section className="mt-[30px]">
  <div className="mb-[14px] flex items-end justify-between">
    <div>
      <p className="font-body text-[9px] font-semibold tracking-[0.18em] text-[#A67417]">UPCOMING</p>
      <h2 className="mt-[2px] font-heading text-[28px] font-semibold leading-[32px] text-[#2A1A08]">Bookings</h2>
    </div>
    <p className="font-body text-[10px] text-[#6B5130]">{upcomingBookings.length} upcoming</p>
  </div>

  {isLoading ? (
    <div className="rounded-[12px] border border-[#D6AF32]/15 bg-[#F8F4EA] px-[20px] py-[35px] text-center font-body text-[11px] text-[#6B5130]">Loading bookings...</div>
  ) : upcomingBookings.length === 0 ? (
    <div className="rounded-[12px] border border-dashed border-[#D6AF32]/25 bg-[#F8F4EA] px-[20px] py-[45px] text-center">
      <CalendarDays size={26} className="mx-auto text-[#A67417]/60" />
      <p className="mt-[10px] font-heading text-[22px] font-semibold text-[#2A1A08]">No upcoming bookings</p>
      <p className="mt-[4px] font-body text-[10px] text-[#6B5130]">Add your first booking to see it here.</p>
    </div>
  ) : (
    <div className="max-h-[620px] overflow-y-auto pr-[4px]">
      <div className="grid gap-[14px] md:grid-cols-2 xl:grid-cols-3">
        {upcomingBookings.map((booking) => {
          const client = clients.find((item) => item.id === booking.clientId);
          const balance = getBalance(Number(booking.amount || 0), Number(booking.advance || 0));

          return (
            <button
              key={booking.id}
              type="button"
              onClick={() => setSelectedBooking(booking)}
              className="group w-full cursor-pointer rounded-[13px] border border-[#D6AF32]/15 bg-[#F8F4EA] p-[16px] text-left shadow-[0_5px_20px_rgba(42,26,8,0.035)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#D6AF32]/60 hover:bg-[#FFFCF7] hover:shadow-[0_12px_30px_rgba(42,26,8,0.10)]"
            >
              <div className="flex items-start justify-between gap-[10px]">
                <div className="flex items-center gap-[10px]">
                  <div className="flex h-[48px] w-[48px] shrink-0 flex-col items-center justify-center rounded-[8px] bg-[#2A1A08] text-[#F8F4EA]">
                    <span className="font-body text-[8px] font-semibold uppercase tracking-[0.08em] text-[#F2C84B]">{format(new Date(`${booking.date}T00:00:00`), "MMM")}</span>
                    <span className="font-heading text-[21px] font-semibold leading-[20px]">{format(new Date(`${booking.date}T00:00:00`), "dd")}</span>
                  </div>
                  <div>
                    <p className="font-body text-[13px] font-bold text-[#2A1A08]">{format(new Date(`${booking.date}T00:00:00`), "EEEE")}</p>
                    <p className="mt-[2px] font-body text-[8px] text-[#8B7359]">{format(new Date(`${booking.date}T00:00:00`), "dd MMMM yyyy")}</p>
                  </div>
                </div>

                <span className={`shrink-0 rounded-full border px-[8px] py-[4px] font-body text-[8px] font-bold ${getBookingStatusClass(booking.status)}`}>{booking.status}</span>
              </div>

              <div className="my-[14px] h-px bg-[#E5DACA]" />

              <div>
                <p className="font-body text-[16px] font-bold leading-[20px] text-[#2A1A08]">{client?.name || "Unknown client"}</p>
                <p className="mt-[3px] font-body text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A67417]">{booking.eventType}</p>
              </div>

              <div className="mt-[13px] grid grid-cols-2 gap-[8px]">
                <div className="rounded-[8px] border border-[#E7DDCC] bg-white px-[10px] py-[9px]">
                  <p className="font-body text-[7px] font-bold tracking-[0.12em] text-[#A67417]">TIME</p>
                  <p className="mt-[3px] font-body text-[10px] font-semibold text-[#2A1A08]">{formatIndianTime(booking.startTime)}</p>
                  <p className="mt-[1px] font-body text-[8px] text-[#8B7359]">to {formatIndianTime(booking.endTime)}</p>
                </div>

                <div className="rounded-[8px] border border-[#E7DDCC] bg-white px-[10px] py-[9px]">
                  <p className="font-body text-[7px] font-bold tracking-[0.12em] text-[#A67417]">LOCATION</p>
                  <p className="mt-[3px] truncate font-body text-[10px] font-semibold text-[#2A1A08]">{booking.location || "Not added"}</p>
                </div>
              </div>

              <div className="mt-[8px] grid grid-cols-3 gap-[7px]">
                <div className="rounded-[7px] bg-[#EFE5D0] px-[8px] py-[8px]">
                  <p className="font-body text-[7px] font-bold text-[#8B7359]">TOTAL</p>
                  <p className="mt-[2px] font-body text-[10px] font-bold text-[#2A1A08]">₹{Number(booking.amount || 0).toLocaleString("en-IN")}</p>
                </div>

                <div className="rounded-[7px] bg-[#EFE5D0] px-[8px] py-[8px]">
                  <p className="font-body text-[7px] font-bold text-[#8B7359]">PAID</p>
                  <p className="mt-[2px] font-body text-[10px] font-bold text-[#2A1A08]">₹{Number(booking.advance || 0).toLocaleString("en-IN")}</p>
                </div>

                <div className="rounded-[7px] bg-[#F2C84B]/20 px-[8px] py-[8px]">
                  <p className="font-body text-[7px] font-bold text-[#A67417]">BALANCE</p>
                  <p className="mt-[2px] font-body text-[10px] font-bold text-[#2A1A08]">₹{balance.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <div className="mt-[12px] flex items-center justify-between border-t border-[#E5DACA] pt-[11px]">
                <span className="font-body text-[8px] text-[#8B7359]">{client?.phone || "No phone number"}</span>
                <span className="font-body text-[9px] font-bold text-[#A67417] opacity-70 transition-all group-hover:translate-x-[2px] group-hover:opacity-100">View Details →</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  )}
</section>

        <section className="mt-[30px]">
          <div className="mb-[14px] flex items-end justify-between">
            <div>
              <p className="font-body text-[9px] font-semibold tracking-[0.18em] text-[#A67417]">CLIENTS</p>
              <h2 className="mt-[2px] font-heading text-[28px] font-semibold leading-[32px] text-[#2A1A08]">Your clients</h2>
            </div>
            <p className="font-body text-[10px] text-[#6B5130]">{clients.length} client{clients.length !== 1 ? "s" : ""}</p>
          </div>

          {clients.length === 0 ? (
            <div className="rounded-[12px] border border-dashed border-[#D6AF32]/25 bg-[#F8F4EA] px-[20px] py-[35px] text-center font-body text-[11px] text-[#6B5130]">No clients yet.</div>
          ) : (
            <div className="max-h-[460px] overflow-y-auto rounded-[13px] border border-[#D6AF32]/15 bg-white p-[14px] shadow-[0_8px_30px_rgba(42,26,8,0.04)]">
              <div className="grid gap-[11px] sm:grid-cols-2 xl:grid-cols-3">
                {clients.map((client) => {
                  const clientBookings = bookings.filter((booking) => booking.clientId === client.id && booking.status !== "Cancelled");
                  const nextBooking = [...clientBookings].filter((booking) => booking.date >= format(new Date(), "yyyy-MM-dd")).sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`))[0];

                  return (
                    <div key={client.id} className="rounded-[11px] border border-[#E7DDCC] bg-[#FFFCF7] p-[14px] transition hover:border-[#D6AF32]/55 hover:shadow-[0_8px_25px_rgba(42,26,8,0.06)]">
                      <div className="flex items-start gap-[11px]">
                        <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#EFE5D0] text-[#A67417]">
                          <UserRound size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-body text-[14px] font-bold text-[#2A1A08]">{client.name}</p>
                          <p className="mt-[3px] truncate font-body text-[10px] text-[#6B5130]">{client.phone || "No phone number"}</p>
                          {client.email && <p className="mt-[2px] truncate font-body text-[9px] text-[#8B7359]">{client.email}</p>}
                        </div>
                        <span className="shrink-0 rounded-full bg-[#F2C84B]/20 px-[7px] py-[4px] font-body text-[8px] font-bold text-[#6B5130]">{clientBookings.length} event{clientBookings.length !== 1 ? "s" : ""}</span>
                      </div>

                      <div className="mt-[13px] grid grid-cols-2 gap-[7px]">
                        <div className="rounded-[7px] bg-white px-[9px] py-[8px]">
                          <p className="font-body text-[7px] font-bold tracking-[0.1em] text-[#A67417]">EVENTS</p>
                          <p className="mt-[2px] font-body text-[12px] font-bold text-[#2A1A08]">{clientBookings.length}</p>
                        </div>
                        <div className="rounded-[7px] bg-white px-[9px] py-[8px]">
                          <p className="font-body text-[7px] font-bold tracking-[0.1em] text-[#A67417]">NEXT</p>
                          <p className="mt-[2px] truncate font-body text-[10px] font-bold text-[#2A1A08]">{nextBooking ? format(new Date(`${nextBooking.date}T00:00:00`), "dd MMM") : "—"}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {isBookingModalOpen && (
          <BookingModal
            clients={clients}
            bookings={bookings}
            editingBooking={editingBooking}
            prefilledDate={prefilledDate}
            onClose={() => { setIsBookingModalOpen(false); setEditingBooking(null); }}
            onSave={handleSaveBooking}
          />
        )}

        {selectedBooking && (
          <BookingDetails
            booking={selectedBooking}
            client={clients.find((client) => client.id === selectedBooking.clientId) || null}
            allBookings={bookings}
            onClose={() => setSelectedBooking(null)}
            onEdit={() => openEditBooking(selectedBooking)}
            onDelete={() => deleteBooking(selectedBooking.id)}
          />
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: ReactNode }) {
  return (
    <div className="rounded-[11px] border border-[#D6AF32]/15 bg-[#F8F4EA] p-[15px] shadow-[0_8px_30px_rgba(42,26,8,0.035)]">
      <div className="flex items-center justify-between">
        <p className="font-body text-[8px] font-semibold tracking-[0.15em] text-[#6B5130]">{label}</p>
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#EFE5D0] text-[#A67417]">{icon}</div>
      </div>
      <p className="mt-[9px] font-heading text-[27px] font-semibold leading-[30px] text-[#2A1A08]">{value}</p>
    </div>
  );
}