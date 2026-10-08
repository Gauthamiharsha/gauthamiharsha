import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { requireAdmin } from "@/lib/require-admin";

type BookingDocument = {
  _id: string;
  clientId: string;
};

type ClientDocument = {
  _id: string;
};

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Booking ID is required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("gauthami");

    const bookingsCollection = db.collection<BookingDocument>("bookings");
    const clientsCollection = db.collection<ClientDocument>("clients");

    const booking = await bookingsCollection.findOne({ _id: id });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    await bookingsCollection.deleteOne({ _id: id });

    const remainingBookings = await bookingsCollection.countDocuments({
      clientId: booking.clientId,
    });

    let clientDeleted = false;

    if (remainingBookings === 0) {
      const result = await clientsCollection.deleteOne({
        _id: booking.clientId,
      });

      clientDeleted = result.deletedCount > 0;
    }

    return NextResponse.json({
      success: true,
      bookingDeleted: true,
      clientDeleted,
    });
  } catch (error) {
    console.error("Delete booking error:", error);

    if (error instanceof Response) {
      return error;
    }

    return NextResponse.json(
      { error: "Failed to delete booking." },
      { status: 500 }
    );
  }
}