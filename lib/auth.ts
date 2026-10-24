import type { NextAuthOptions, Session } from "next-auth"
import { getServerSession } from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyAdminPassword } from "@/lib/admin-password.mjs"
import { allowRequest } from "@/lib/request-protection"

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "NXG administrator",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        try {
          if (!(await allowRequest("admin-login", request.headers, 5, 900))) return null
        } catch {
          return null
        }

        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
        const passwordHash = process.env.ADMIN_PASSWORD_HASH
        const email = credentials?.email?.trim().toLowerCase()
        const password = credentials?.password

        if (!adminEmail || !passwordHash || !email || !password || email !== adminEmail) {
          return null
        }

        if (!(await verifyAdminPassword(password, passwordHash))) return null

        return {
          id: "nxg-admin",
          name: "NXG Administrator",
          email: adminEmail,
        }
      },
    }),
  ],
}

export async function getAdminSession(): Promise<Session | null> {
  if (!process.env.AUTH_SECRET || !process.env.ADMIN_EMAIL) return null

  const session = await getServerSession(authOptions)
  if (session?.user?.email?.toLowerCase() !== process.env.ADMIN_EMAIL.trim().toLowerCase()) {
    return null
  }

  return session
}
