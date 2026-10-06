import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

const protectedPages = ['/cart', '/wishlist']
const authPages = ['/login', '/register']

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const myToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  const accessToken = myToken?.token

  if (!accessToken && protectedPages.some((p) => pathname.startsWith(p))) {
    const loginUrl = new URL('/login', req.nextUrl)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (accessToken && authPages.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cart/:path*', '/wishlist/:path*', '/login/:path*', '/register/:path*'],
}