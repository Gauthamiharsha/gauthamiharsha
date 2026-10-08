export function formatIndianDate(
  date: string
) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(
    new Date(`${date}T00:00:00`)
  );
}

export function formatShortIndianDate(
  date: string
) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(
    new Date(`${date}T00:00:00`)
  );
}

export function formatIndianTime(
  time: string
) {
  const [hours, minutes] =
    time.split(":").map(Number);

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function timeToMinutes(
  time: string
) {
  const [hours, minutes] =
    time.split(":").map(Number);

  return hours * 60 + minutes;
}

export function timesOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string
) {
  return (
    timeToMinutes(startA) <
      timeToMinutes(endB) &&
    timeToMinutes(endA) >
      timeToMinutes(startB)
  );
}

export function getBalance(
  amount: number,
  advance: number
) {
  return Math.max(
    Number(amount || 0) -
      Number(advance || 0),
    0
  );
}

export function getTodayString() {
  const today = new Date();

  const year =
    today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getBookingStatusClass(status: string) {
  switch (status) {
    case "Confirmed":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "Tentative":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "Completed":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "Cancelled":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}