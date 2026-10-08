import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { requireAdmin } from "@/lib/require-admin";
import { timesOverlap } from "@/lib/booking-utils";

import type {
  Booking,
  Client,
} from "@/types/booking";

type MongoClientDocument = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;
};

type MongoBookingDocument = {
  _id: string;
  clientId: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  amount: number;
  advance: number;
  status: Booking["status"];
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export async function GET() {
  try {
    const isAdmin = await requireAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const mongoClient = await clientPromise;

    const db = mongoClient.db("gauthami");

    const clientsCollection =
      db.collection<MongoClientDocument>(
        "clients"
      );

    const bookingsCollection =
      db.collection<MongoBookingDocument>(
        "bookings"
      );

    const [
      clientDocuments,
      bookingDocuments,
    ] = await Promise.all([
      clientsCollection
        .find({})
        .sort({ name: 1 })
        .toArray(),

      bookingsCollection
        .find({})
        .sort({
          date: 1,
          startTime: 1,
        })
        .toArray(),
    ]);

    const clients: Client[] =
      clientDocuments.map((item) => ({
        id: item._id,
        name: item.name || "",
        phone: item.phone || "",
        email: item.email || "",
        notes: item.notes || "",
        createdAt:
          item.createdAt ||
          new Date().toISOString(),
      }));

    const bookings: Booking[] =
      bookingDocuments.map((item) => ({
        id: item._id,
        clientId: item.clientId,
        eventType: item.eventType,
        date: item.date,
        startTime: item.startTime,
        endTime: item.endTime,
        location: item.location || "",
        amount: Number(
          item.amount || 0
        ),
        advance: Number(
          item.advance || 0
        ),
        status: item.status,
        notes: item.notes || "",
        createdAt:
          item.createdAt ||
          new Date().toISOString(),
        updatedAt:
          item.updatedAt ||
          new Date().toISOString(),
      }));

    return NextResponse.json({
      clients,
      bookings,
    });
  } catch (error) {
    console.error(
      "GET /api/admin/bookings:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to load bookings.",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    const isAdmin = await requireAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body =
      await request.json();

    const booking =
      body.booking as Booking;

    const client =
      body.client as Client;

    if (!booking || !client) {
      return NextResponse.json(
        {
          error:
            "Booking and client are required.",
        },
        { status: 400 }
      );
    }

    if (
      !client.id ||
      !client.name ||
      !booking.date ||
      !booking.startTime ||
      !booking.endTime
    ) {
      return NextResponse.json(
        {
          error:
            "Required booking information is missing.",
        },
        { status: 400 }
      );
    }

    const mongoClient =
      await clientPromise;

    const db =
      mongoClient.db("gauthami");

    const clientsCollection =
      db.collection<MongoClientDocument>(
        "clients"
      );

    const bookingsCollection =
      db.collection<MongoBookingDocument>(
        "bookings"
      );

    const bookingToSave: Booking = {
      ...booking,
      clientId: client.id,
      updatedAt:
        new Date().toISOString(),
    };

    /*
      Check for overlapping bookings.

      Cancelled bookings do not block
      a time slot.
    */

    const existingBookings =
      await bookingsCollection
        .find({
          date: bookingToSave.date,
          status: {
            $ne: "Cancelled",
          },
        })
        .toArray();

    const conflict =
      existingBookings.find(
        (existing) => {
          if (
            existing._id ===
            bookingToSave.id
          ) {
            return false;
          }

          return timesOverlap(
            bookingToSave.startTime,
            bookingToSave.endTime,
            existing.startTime,
            existing.endTime
          );
        }
      );

    if (conflict) {
      const conflictClient =
        await clientsCollection.findOne({
          _id: conflict.clientId,
        });

      return NextResponse.json(
        {
          error: `This time overlaps with ${
            conflictClient?.name ||
            "another booking"
          } — ${
            conflict.eventType
          }, ${
            conflict.startTime
          } to ${
            conflict.endTime
          }.`,
        },
        { status: 409 }
      );
    }

    /*
      Save / update client
    */

    const clientToSave: Omit<
      MongoClientDocument,
      "_id"
    > = {
      name: client.name.trim(),
      phone:
        client.phone?.trim() || "",
      email:
        client.email?.trim() || "",
      notes: client.notes || "",
      createdAt:
        client.createdAt ||
        new Date().toISOString(),
    };

    await clientsCollection.updateOne(
      {
        _id: client.id,
      },
      {
        $set: clientToSave,
      },
      {
        upsert: true,
      }
    );

    /*
      Save / update booking
    */

    const bookingToStore: Omit<
      MongoBookingDocument,
      "_id"
    > = {
      clientId:
        bookingToSave.clientId,

      eventType:
        bookingToSave.eventType,

      date:
        bookingToSave.date,

      startTime:
        bookingToSave.startTime,

      endTime:
        bookingToSave.endTime,

      location:
        bookingToSave.location || "",

      amount: Number(
        bookingToSave.amount || 0
      ),

      advance: Number(
        bookingToSave.advance || 0
      ),

      status:
        bookingToSave.status,

      notes:
        bookingToSave.notes || "",

      createdAt:
        bookingToSave.createdAt ||
        new Date().toISOString(),

      updatedAt:
        bookingToSave.updatedAt ||
        new Date().toISOString(),
    };

    await bookingsCollection.updateOne(
      {
        _id: bookingToSave.id,
      },
      {
        $set: bookingToStore,
      },
      {
        upsert: true,
      }
    );

    return NextResponse.json({
      success: true,
      booking: bookingToSave,
      client: {
        ...client,
        ...clientToSave,
      },
    });
  } catch (error) {
    console.error(
      "POST /api/admin/bookings:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to save booking.",
      },
      { status: 500 }
    );
  }
}