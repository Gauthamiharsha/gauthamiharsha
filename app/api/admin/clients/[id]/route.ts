import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { requireAdmin } from "@/lib/require-admin";

type ClientDocument = {
  _id: string;
  packageAmount?: number;
  advancePaid?: number;
};

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await requireAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Client ID is required." },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (
      body.packageAmount === undefined ||
      body.advancePaid === undefined ||
      body.packageAmount === "" ||
      body.advancePaid === ""
    ) {
      return NextResponse.json(
        { error: "Enter both package amount and advance paid." },
        { status: 400 }
      );
    }

    const packageAmount = Number(body.packageAmount);
    const advancePaid = Number(body.advancePaid);

    if (
      !Number.isFinite(packageAmount) ||
      !Number.isFinite(advancePaid) ||
      packageAmount < 0 ||
      advancePaid < 0
    ) {
      return NextResponse.json(
        { error: "Enter valid payment amounts." },
        { status: 400 }
      );
    }

    if (advancePaid > packageAmount) {
      return NextResponse.json(
        { error: "Advance paid cannot exceed the package amount." },
        { status: 400 }
      );
    }

    const mongoClient = await clientPromise;
    const db = mongoClient.db("gauthami");

    const clients = db.collection<ClientDocument>("clients");

    const result = await clients.updateOne(
      { _id: id },
      {
        $set: {
          packageAmount,
          advancePaid,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Client not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      packageAmount,
      advancePaid,
      balanceDue: Math.max(packageAmount - advancePaid, 0),
    });
  } catch (error) {
    console.error("Update client payment error:", error);

    if (error instanceof Response) return error;

    return NextResponse.json(
      { error: "Failed to save package payment." },
      { status: 500 }
    );
  }
}