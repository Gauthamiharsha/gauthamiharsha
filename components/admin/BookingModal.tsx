"use client";

import {
  FormEvent,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { X, UserPlus } from "lucide-react";

import type {
  Booking,
  BookingStatus,
  Client,
} from "@/types/booking";

import { getBalance } from "@/lib/booking-utils";

type Props = {
  clients: Client[];
  bookings: Booking[];
  editingBooking: Booking | null;
  prefilledDate: string;
  onClose: () => void;
  onSave: (
    booking: Booking,
    client: Client
  ) =>
    | { success: true }
    | { success: false; message: string }
    | Promise<
        | { success: true }
        | { success: false; message: string }
      >;
};

export default function BookingModal({
  clients,
  bookings,
  editingBooking,
  prefilledDate,
  onClose,
  onSave,
}: Props) {
  const [existingClientId, setExistingClientId] = useState(editingBooking?.clientId || "");

  const [isNewClient, setIsNewClient] = useState(clients.length === 0 && !editingBooking);

  const existingClient = clients.find((client) => client.id === existingClientId);

  const [clientName, setClientName] = useState(existingClient?.name || "");
  const [phone, setPhone] = useState(existingClient?.phone || "");
  const [email, setEmail] = useState(existingClient?.email || "");
  const [clientNotes, setClientNotes] = useState(existingClient?.notes || "");

  const [eventType, setEventType] = useState(editingBooking?.eventType || "");
  const [date, setDate] = useState(editingBooking?.date || prefilledDate);
  const [startTime, setStartTime] = useState(editingBooking?.startTime || "");
  const [endTime, setEndTime] = useState(editingBooking?.endTime || "");
  const [location, setLocation] = useState(editingBooking?.location || "");

  const [amount, setAmount] = useState(String(editingBooking?.amount || ""));
  const [advance, setAdvance] = useState(String(editingBooking?.advance || ""));

  const [status, setStatus] = useState<BookingStatus>(editingBooking?.status || "Tentative");

  const [notes, setNotes] = useState(editingBooking?.notes || "");
  const [error, setError] = useState("");

  const balance = getBalance(Number(amount), Number(advance));

  const clientBookings = useMemo(() => {
    if (!existingClientId) {
      return [];
    }

    return bookings
      .filter((booking) => booking.clientId === existingClientId && booking.id !== editingBooking?.id)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [bookings, existingClientId, editingBooking]);

  function handleClientChange(clientId: string) {
    setExistingClientId(clientId);

    const client = clients.find((item) => item.id === clientId);

    if (client) {
      setClientName(client.name);
      setPhone(client.phone);
      setEmail(client.email);
      setClientNotes(client.notes);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError("");

    if (!clientName.trim() || !eventType || !date || !startTime || !endTime) {
      setError("Please fill in all required fields.");
      return;
    }

    if (startTime >= endTime) {
      setError("End time must be after the start time.");
      return;
    }

    const clientId = isNewClient || !existingClientId ? crypto.randomUUID() : existingClientId;

    const client: Client = {
      id: clientId,
      name: clientName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      notes: clientNotes.trim(),
      createdAt: existingClient?.createdAt || new Date().toISOString(),
    };

    const booking: Booking = {
      id: editingBooking?.id || crypto.randomUUID(),
      clientId,
      eventType,
      date,
      startTime,
      endTime,
      location: location.trim(),
      amount: Number(amount) || 0,
      advance: Number(advance) || 0,
      status,
      notes: notes.trim(),
      createdAt: editingBooking?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await onSave(booking, client);

    if (!result.success) {
      setError(result.message);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2A1A08]/55 px-[12px] py-[12px] backdrop-blur-[5px] sm:px-[20px] sm:py-[20px]">
      <div className="flex max-h-[calc(100vh-24px)] w-full max-w-[760px] flex-col overflow-hidden rounded-[18px] bg-[#F8F4EA] shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:max-h-[calc(100vh-40px)]">
        <div className="flex shrink-0 items-start justify-between border-b border-[#D6AF32]/15 bg-[#F8F4EA] px-[20px] py-[17px] sm:px-[32px] sm:py-[20px]">
          <div>
            <p className="font-body text-[9px] font-semibold tracking-[0.2em] text-[#A67417]">
              {editingBooking ? "EDIT BOOKING" : "NEW BOOKING"}
            </p>

            <h2 className="mt-[3px] font-heading text-[30px] font-semibold leading-[34px] text-[#2A1A08] sm:text-[34px] sm:leading-[37px]">
              {editingBooking ? "Update event" : "Add an event"}
            </h2>
          </div>

          <button type="button" onClick={onClose} aria-label="Close booking modal" className="flex h-[36px] w-[36px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#D6AF32]/20 text-[#2A1A08] transition-all hover:border-[#D6AF32] hover:bg-[#EFE5D0]">
            <X size={17} />
          </button>
        </div>

        <form id="booking-form" onSubmit={handleSubmit} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[20px] py-[22px] sm:px-[32px] sm:py-[27px]">
          <div className="space-y-[25px]">
            <section>
              <SectionTitle>Client</SectionTitle>

              {!isNewClient && clients.length > 0 && (
                <select value={existingClientId} onChange={(e) => handleClientChange(e.target.value)} className="mt-[9px] h-[48px] w-full rounded-[7px] border border-[#D6AF32]/20 bg-white px-[13px] font-body text-[13px] text-[#2A1A08] outline-none focus:border-[#A67417]">
                  <option value="">Select existing client</option>

                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                      {client.phone ? ` · ${client.phone}` : ""}
                    </option>
                  ))}
                </select>
              )}

              <button type="button" onClick={() => {
                setIsNewClient(!isNewClient);

                if (!isNewClient) {
                  setExistingClientId("");
                  setClientName("");
                  setPhone("");
                  setEmail("");
                  setClientNotes("");
                }
              }} className="mt-[10px] flex cursor-pointer items-center gap-[6px] font-body text-[10px] font-semibold tracking-[0.05em] text-[#A67417] transition-colors hover:text-[#2A1A08]">
                <UserPlus size={14} />
                {isNewClient ? "Choose an existing client" : "Create a new client"}
              </button>

              {(isNewClient || !existingClientId) && (
                <div className="mt-[13px] grid gap-[13px] sm:grid-cols-2">
                  <Input label="CLIENT NAME *" value={clientName} onChange={setClientName} placeholder="Bride / client name" />
                  <Input label="PHONE" value={phone} onChange={setPhone} placeholder="+91..." />
                  <Input label="EMAIL" value={email} onChange={setEmail} placeholder="Email address" />
                  <Input label="CLIENT NOTES" value={clientNotes} onChange={setClientNotes} placeholder="Optional" />
                </div>
              )}

              {existingClientId && !isNewClient && (
                <div className="mt-[12px] rounded-[8px] border border-[#D6AF32]/15 bg-[#EFE5D0]/30 p-[12px]">
                  <p className="font-heading text-[21px] font-semibold text-[#2A1A08]">
                    {existingClient?.name}
                  </p>

                  <p className="mt-[2px] font-body text-[10px] text-[#6B5130]">
                    {existingClient?.phone || "No phone"}{" "}
                    {existingClient?.email ? ` · ${existingClient.email}` : ""}
                  </p>

                  {clientBookings.length > 0 && (
                    <p className="mt-[8px] font-body text-[9px] text-[#A67417]">
                      {clientBookings.length} existing event{clientBookings.length > 1 ? "s" : ""} for this client
                    </p>
                  )}
                </div>
              )}
            </section>

            <section>
              <SectionTitle>Event details</SectionTitle>

              <div className="mt-[10px] grid gap-[13px] sm:grid-cols-2">
                <Select label="EVENT *" value={eventType} onChange={setEventType} options={["Engagement", "Wedding", "Reception", "Haldi", "Sangeet", "Pellikuthuru", "Cocktail", "Birthday Party", "Bridesmaid", "Guest Makeup", "Groom Makeup", "Other"]} placeholder="Select event" />

                <Input label="DATE *" type="date" value={date} onChange={setDate} />

                <Input label="START TIME *" type="time" value={startTime} onChange={setStartTime} />

                <Input label="END TIME *" type="time" value={endTime} onChange={setEndTime} />
              </div>

              <Input label="LOCATION" value={location} onChange={setLocation} placeholder="Venue / location" className="mt-[13px]" />
            </section>

            <section>
              <SectionTitle>Payment</SectionTitle>

              <div className="mt-[10px] grid gap-[13px] sm:grid-cols-3">
                <Input label="TOTAL AMOUNT" type="number" value={amount} onChange={setAmount} placeholder="₹ 0" />

                <Input label="ADVANCE PAID" type="number" value={advance} onChange={setAdvance} placeholder="₹ 0" />

                <div>
                  <p className="font-body text-[9px] font-semibold tracking-[0.12em] text-[#2A1A08]">
                    BALANCE
                  </p>

                  <div className="mt-[8px] flex h-[48px] items-center rounded-[7px] border border-[#D6AF32]/20 bg-[#EFE5D0]/40 px-[13px] font-body text-[13px] font-semibold text-[#A67417]">
                    ₹{balance.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <SectionTitle>Booking status</SectionTitle>

              <div className="mt-[10px] grid grid-cols-2 gap-[8px] sm:grid-cols-4">
                {(["Confirmed", "Tentative", "Completed", "Cancelled"] as BookingStatus[]).map((item) => (
                  <button key={item} type="button" onClick={() => setStatus(item)} className={`cursor-pointer rounded-[7px] border px-[10px] py-[10px] font-body text-[10px] font-semibold transition-all ${status === item ? "border-[#2A1A08] bg-[#2A1A08] text-[#F8F4EA]" : "border-[#D6AF32]/20 bg-white text-[#6B5130] hover:border-[#D6AF32]"}`}>
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle>Event notes</SectionTitle>

              <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything important about this event..." className="mt-[10px] w-full resize-none rounded-[7px] border border-[#D6AF32]/20 bg-white px-[13px] py-[11px] font-body text-[12px] leading-[20px] text-[#2A1A08] outline-none placeholder:text-[#6B5130]/45 focus:border-[#A67417]" />
            </section>

            {error && (
              <div className="rounded-[8px] border border-amber-300 bg-amber-50 px-[13px] py-[11px] font-body text-[11px] leading-[19px] text-amber-800">
                ⚠️ {error}
              </div>
            )}
          </div>
        </form>

        <div className="shrink-0 border-t border-[#D6AF32]/15 bg-[#F8F4EA] px-[20px] py-[13px] sm:px-[32px] sm:py-[15px]">
          <div className="flex flex-col-reverse gap-[9px] sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="h-[48px] w-full cursor-pointer rounded-[7px] border border-[#D6AF32]/25 bg-white px-[22px] font-body text-[12px] font-semibold text-[#6B5130] transition-all hover:border-[#D6AF32] hover:bg-[#EFE5D0]/40 sm:w-auto sm:min-w-[110px]">
              Cancel
            </button>

            <button type="submit" form="booking-form" className="h-[48px] w-full cursor-pointer rounded-[7px] bg-[#2A1A08] px-[24px] font-body text-[12px] font-semibold text-[#F8F4EA] transition-colors hover:bg-[#6B5130] sm:w-auto sm:min-w-[155px]">
              {editingBooking ? "Save Changes" : "Create Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <p className="font-body text-[10px] font-semibold tracking-[0.16em] text-[#A67417]">
      {children}
    </p>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="font-body text-[9px] font-semibold tracking-[0.12em] text-[#2A1A08]">
        {label}
      </label>

      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-[7px] h-[48px] w-full rounded-[7px] border border-[#D6AF32]/20 bg-white px-[13px] font-body text-[12px] text-[#2A1A08] outline-none placeholder:text-[#6B5130]/45 focus:border-[#A67417]" />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="font-body text-[9px] font-semibold tracking-[0.12em] text-[#2A1A08]">
        {label}
      </label>

      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-[7px] h-[48px] w-full rounded-[7px] border border-[#D6AF32]/20 bg-white px-[13px] font-body text-[12px] text-[#2A1A08] outline-none focus:border-[#A67417]">
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}