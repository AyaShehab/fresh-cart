import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getTokenFun() {
  const cookieStore = await cookies()

  const sessionToken =
    cookieStore.get('__Secure-next-auth.session-token')?.value ??
    cookieStore.get('next-auth.session-token')?.value

  if (!sessionToken) return null

  const decoded = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: sessionToken,
  })

  return (decoded?.token as string) ?? null
}