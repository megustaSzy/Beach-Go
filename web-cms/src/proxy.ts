import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const pathname = request.nextUrl.pathname;


  const protectedPages = ["/dashboard", "/batches", "/users", "/ratings"];
  const isProtectedPage = protectedPages.some((page) =>
    pathname.startsWith(page)
  );
}
