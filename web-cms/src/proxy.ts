import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const pathname = request.nextUrl.pathname;

  const authPages = ["/login", "/forgot-password", "/reset-password"];

  const protectedPages = ["/dashboard", "/batches", "/users", "/ratings"];

  const isAuthPage = authPages.some((page) => pathname.startsWith(page));

  const isProtectedPage = protectedPages.some((page) =>
    pathname.startsWith(page)
  );

  const hasAuthCookie = Boolean(accessToken || refreshToken);

  if (!hasAuthCookie && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasAuthCookie && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/batches/:path*",
    "/users/:path*",
    "/ratings/:path*",
    "/login",
    "/forgot-password",
    "/reset-password/:path*",
  ],
};