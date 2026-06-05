import { NextResponse } from "next/server";

const bookings = [
  {
    id: "B-2026-005",
    userName: "Aditya Pratama",
    beachName: "Pantai Klara",
    amount: 50000,
    status: "Success",
  },
  {
    id: "B-2026-004",
    userName: "Siti Rahma",
    beachName: "Pantai Sari Ringgung",
    amount: 75000,
    status: "Pending",
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: bookings });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    const booking = bookings.find((b) => b.id === id);
    
    if (booking) {
      booking.status = status;
      return NextResponse.json({ success: true, data: booking });
    }
    
    return NextResponse.json({ success: false, message: "Pemesanan tidak ditemukan" }, { status: 444 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
