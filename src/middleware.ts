import { NextResponse } from "next/server"
import { auth } from "@/lib/auth.edge"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const token = req.auth?.user as any

  // ── Security headers on all responses ──────────
  const response = NextResponse.next()
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // ── Route protection ────────────────────────────
  const protectedRoutes = ["/dashboard", "/checkout"]
  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r))
  if (isProtected && !token) {
    const url = new URL("/auth/signin", req.url)
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // Admin only
  if (pathname.startsWith("/dashboard/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Instructor only
  if (
    pathname.startsWith("/dashboard/instructor") &&
    token?.role !== "INSTRUCTOR" &&
    token?.role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Redirect logged-in users away from auth pages
  if (pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup")) {
    if (token) {
      const role = token.role as string
      if (role === "ADMIN")      return NextResponse.redirect(new URL("/dashboard/admin", req.url))
      if (role === "INSTRUCTOR") return NextResponse.redirect(new URL("/dashboard/instructor", req.url))
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return response
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/checkout/:path*",
    "/auth/:path*",
  ],
}
