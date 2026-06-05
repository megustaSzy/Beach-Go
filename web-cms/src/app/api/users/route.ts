import { NextResponse } from "next/server";

const users = [
  {
    id: 1,
    name: "Muhammad Fajar Azriel",
    email: "admin@beachgo.com",
    role: "SUPER_ADMIN",
  },
  {
    id: 2,
    name: "Deni Himawan",
    email: "deni@beachgo.com",
    role: "ADMIN",
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: users });
}
