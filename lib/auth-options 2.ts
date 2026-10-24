import { scryptSync, timingSafeEqual } from "node:crypto"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
    pages: { signIn: "/login" },
    providers: [
        CredentialsProvider({
            name: "NXG Admin",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
                const submittedEmail = credentials?.email?.trim().toLowerCase()
                const password = credentials?.password
                const [salt, expectedHex] = process.env.ADMIN_PASSWORD_HASH?.split(":") ?? []

                if (!configuredEmail || submittedEmail !== configuredEmail || !password || !salt || !expectedHex || !/^[a-f0-9]{128}$/i.test(expectedHex)) {
                    return null
                }

                const expected = Buffer.from(expectedHex, "hex")
                const actual = scryptSync(password, salt, expected.length)
                if (!timingSafeEqual(actual, expected)) return null

                return { id: "nxg-admin", name: "NXG Admin", email: configuredEmail }
            },
        }),
    ],
}