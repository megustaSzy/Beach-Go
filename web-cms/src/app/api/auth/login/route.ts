import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (email === "admin@beachgo.com" && password === "password123") {
      return NextResponse.json({
        success: true,
        user: {
          id: 1,
          name: "Muhammad Fajar Azriel",
          email: "admin@beachgo.com",
          role: "SUPER_ADMIN",
        },
        token: "jwt-token-sample-12345",
      });
    }

    return NextResponse.json(
      { success: false, message: "Kredensial salah" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Kesalahan server internal" },
      { status: 500 }
    );
  }
}
