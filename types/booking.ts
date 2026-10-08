export type BookingStatus =
  | "Confirmed"
  | "Tentative"
  | "Completed"
  | "Cancelled";

export type CalendarView = "month" | "week" | "day";

export type Client = {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;
};

export type Booking = {
  id: string;
  clientId: string;

  eventType: string;

  date: string;
  startTime: string;
  endTime: string;

  location: string;

  amount: number;
  advance: number;

  status: BookingStatus;

  notes: string;

  createdAt: string;
  updatedAt: string;
};