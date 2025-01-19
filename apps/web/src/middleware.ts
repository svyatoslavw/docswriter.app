import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request
  const refreshToken = cookies.get("refreshToken")?.value

  const isAuthPage = nextUrl.pathname === "/auth"
  const isConfirmPage = nextUrl.pathname === "/auth/confirm"

  if (refreshToken) {
    if (isAuthPage || isConfirmPage) {
      return NextResponse.redirect(new URL("/", nextUrl.origin))
    }
    return NextResponse.next()
  }

  if (!isConfirmPage) {
    return NextResponse.redirect(new URL("/auth", nextUrl.origin))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/auth/:path"]
}
