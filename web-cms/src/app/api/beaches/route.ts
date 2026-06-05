import { NextResponse } from "next/server";

// Dynamic beach mock database
const beaches = [
  {
    id: 1,
    name: "Pantai Klara",
    location: "Pesawaran, Lampung",
    ticketPrice: 25000,
  },
  {
    id: 2,
    name: "Pantai Sari Ringgung",
    location: "Pesawaran, Lampung",
    ticketPrice: 25000,
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: beaches });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBeach = {
      id: beaches.length + 1,
      name: body.name,
      location: body.location,
      ticketPrice: body.ticketPrice,
    };
    beaches.push(newBeach);
    return NextResponse.json({ success: true, data: newBeach }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Bad Request" }, { status: 450 });
  }
}
