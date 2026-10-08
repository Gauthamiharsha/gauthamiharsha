import {
  Booking,
  Client,
} from "@/types/booking";

export const CLIENTS_STORAGE_KEY =
  "gauthami-clients";

export const BOOKINGS_STORAGE_KEY =
  "gauthami-bookings";

export function getStoredClients(): Client[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(
      CLIENTS_STORAGE_KEY
    );

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getStoredBookings(): Booking[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(
      BOOKINGS_STORAGE_KEY
    );

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveClients(
  clients: Client[]
) {
  localStorage.setItem(
    CLIENTS_STORAGE_KEY,
    JSON.stringify(clients)
  );
}

export function saveBookings(
  bookings: Booking[]
) {
  localStorage.setItem(
    BOOKINGS_STORAGE_KEY,
    JSON.stringify(bookings)
  );
}