import { randomBytes } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { getAdminEmail } from "@/lib/admin-auth"
import { getOAuthRedirectUri, type MarketingProvider } from "@/lib/marketing-oauth"

export const runtime = "nodejs"

const providers: MarketingProvider[] = ["meta-pages", "google-business-profile"]

function isProvider(value: string): value is MarketingProvider {
    return providers.includes(value as MarketingProvider)
}

export async function GET(request: NextRequest, context: { params: { provider: string } }) {
    if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const provider = context.params.provider
    if (!isProvider(provider)) return NextResponse.json({ error: "Unsupported provider." }, { status: 404 })

    const state = randomBytes(32).toString("base64url")
    let authorizationUrl: URL
    try {
        const redirectUri = getOAuthRedirectUri(provider)
        if (provider === "meta-pages") {
            const appId = process.env.META_APP_ID?.trim()
            const version = process.env.META_GRAPH_API_VERSION?.trim() || "v26.0"
            if (!appId) return NextResponse.json({ error: "META_APP_ID is not configured in the server environment." }, { status: 503 })
            authorizationUrl = new URL(`https://www.facebook.com/${version}/dialog/oauth`)
            authorizationUrl.search = new URLSearchParams({
                client_id: appId,
                redirect_uri: redirectUri,
                response_type: "code",
                state,
                scope: "pages_show_list,pages_read_engagement,pages_manage_posts",
            }).toString()
        } else {
            const clientId = process.env.GOOGLE_CLIENT_ID?.trim()
            if (!clientId) return NextResponse.json({ error: "GOOGLE_CLIENT_ID is not configured in the server environment." }, { status: 503 })
            authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
            authorizationUrl.search = new URLSearchParams({
                client_id: clientId,
                redirect_uri: redirectUri,
                response_type: "code",
                access_type: "offline",
                prompt: "consent",
                include_granted_scopes: "true",
                scope: "openid email https://www.googleapis.com/auth/business.manage",
                state,
            }).toString()
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "OAuth configuration is incomplete."
        return NextResponse.json({ error: message }, { status: 503 })
    }

    const response = NextResponse.redirect(authorizationUrl)
    response.cookies.set(`nxg_oauth_${provider}_state`, state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: `/api/admin/oauth/${provider}/callback`,
        maxAge: 600,
    })
    return response
}
