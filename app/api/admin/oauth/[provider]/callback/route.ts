import { NextRequest, NextResponse } from "next/server"
import { getAdminEmail } from "@/lib/admin-auth"
import { getDatabase } from "@/lib/db"
import { NXG_COMPANY_ID } from "@/lib/company"
import {
    getOAuthRedirectUri,
    safeEqual,
    saveProviderConnection,
    type GoogleTokenBundle,
    type MarketingProvider,
    type MetaPage,
} from "@/lib/marketing-oauth"

export const runtime = "nodejs"

function callbackRedirect(request: NextRequest, provider: string, status: string) {
    const base = process.env.NEXTAUTH_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim() || request.nextUrl.origin
    const destination = new URL("/dashboard/connections", base)
    destination.searchParams.set("oauth", provider)
    destination.searchParams.set("status", status)
    const response = NextResponse.redirect(destination)
    response.cookies.set(`nxg_oauth_${provider}_state`, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: `/api/admin/oauth/${provider}/callback`,
        maxAge: 0,
    })
    return response
}

async function readJson<T>(response: Response) {
    const result = await response.json().catch(() => null) as T | null
    if (!response.ok || !result) throw new Error("Provider authorization could not be completed.")
    return result
}

export async function GET(request: NextRequest, context: { params: { provider: string } }) {
    const provider = context.params.provider as MarketingProvider
    if (provider !== "meta-pages" && provider !== "google-business-profile") return NextResponse.json({ error: "Unsupported provider." }, { status: 404 })
    const actor = await getAdminEmail()
    if (!actor) return callbackRedirect(request, provider, "admin-session-required")

    const code = request.nextUrl.searchParams.get("code")
    const state = request.nextUrl.searchParams.get("state")
    const cookieState = request.cookies.get(`nxg_oauth_${provider}_state`)?.value
    if (request.nextUrl.searchParams.has("error")) return callbackRedirect(request, provider, "provider-denied")
    if (!code || !state || !cookieState || !safeEqual(state, cookieState)) return callbackRedirect(request, provider, "invalid-state")

    const database = getDatabase()
    if (!database) return callbackRedirect(request, provider, "database-unavailable")

    try {
        const redirectUri = getOAuthRedirectUri(provider)
        let scopes: string[]
        if (provider === "meta-pages") {
            const appId = process.env.META_APP_ID?.trim()
            const appSecret = process.env.META_APP_SECRET?.trim()
            const version = process.env.META_GRAPH_API_VERSION?.trim() || "v26.0"
            if (!appId || !appSecret) throw new Error("Meta OAuth app credentials are not configured.")
            const shortTokenUrl = new URL(`https://graph.facebook.com/${version}/oauth/access_token`)
            shortTokenUrl.search = new URLSearchParams({
                client_id: appId,
                client_secret: appSecret,
                redirect_uri: redirectUri,
                code,
            }).toString()
            const shortToken = await readJson<{ access_token: string }>(await fetch(shortTokenUrl, { cache: "no-store" }))
            const longTokenUrl = new URL(`https://graph.facebook.com/${version}/oauth/access_token`)
            longTokenUrl.search = new URLSearchParams({
                grant_type: "fb_exchange_token",
                client_id: appId,
                client_secret: appSecret,
                fb_exchange_token: shortToken.access_token,
            }).toString()
            const longToken = await readJson<{ access_token: string }>(await fetch(longTokenUrl, { cache: "no-store" }))
            const permissionResponse = await fetch(`https://graph.facebook.com/${version}/me/permissions`, {
                headers: { Authorization: `Bearer ${longToken.access_token}` },
                cache: "no-store",
            })
            const permissionResult = await readJson<{ data?: Array<{ permission: string; status: string }> }>(permissionResponse)
            scopes = (permissionResult.data || [])
                .filter((permission) => permission.status === "granted")
                .map((permission) => permission.permission)
            const requiredScopes = ["pages_show_list", "pages_read_engagement", "pages_manage_posts"]
            const missingScopes = requiredScopes.filter((scope) => !scopes.includes(scope))
            if (missingScopes.length) throw new Error(`Grant the requested Meta Page permissions: ${missingScopes.join(", ")}.`)
            const pagesResponse = await fetch(
                `https://graph.facebook.com/${version}/me/accounts?fields=id,name,access_token,tasks`,
                { headers: { Authorization: `Bearer ${longToken.access_token}` }, cache: "no-store" },
            )
            const pagesResult = await readJson<{ data?: Array<{ id: string; name: string; access_token: string; tasks?: string[] }> }>(pagesResponse)
            const pages: MetaPage[] = (pagesResult.data || [])
                .filter((page) => page.id && page.name && page.access_token && (page.tasks || []).some((task) => task === "CREATE_CONTENT" || task === "MANAGE"))
                .map((page) => ({ id: page.id, name: page.name, accessToken: page.access_token }))
            await saveProviderConnection({
                provider,
                tokenBundle: { pages },
                metadata: {},
                scopes,
                actor,
            })
        } else {
            const clientId = process.env.GOOGLE_CLIENT_ID?.trim()
            const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim()
            if (!clientId || !clientSecret) throw new Error("Google OAuth client credentials are not configured.")
            const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri, grant_type: "authorization_code" }),
                cache: "no-store",
            })
            const token = await readJson<{ access_token: string; refresh_token?: string; expires_in?: number; scope?: string }>(tokenResponse)
            if (!token.refresh_token) throw new Error("Google did not return a refresh token. Reconnect and approve offline access.")
            scopes = (token.scope || "").split(" ").filter(Boolean)
            if (!scopes.includes("https://www.googleapis.com/auth/business.manage")) throw new Error("Google Business Profile management access was not granted.")
            const bundle: GoogleTokenBundle = {
                accessToken: token.access_token,
                refreshToken: token.refresh_token,
                expiresAt: Date.now() + (token.expires_in || 3600) * 1000,
            }
            await saveProviderConnection({ provider, tokenBundle: bundle, metadata: {}, scopes, actor })
        }

        await database.query(
            `insert into nxg_admin_audit_events (company_id, actor, action, entity_type, entity_id)
             values ($1, $2, 'provider.oauth.connected', 'integration', $3)`,
            [NXG_COMPANY_ID, actor, provider],
        )
        return callbackRedirect(request, provider, "connected")
    } catch {
        console.error("OAuth provider callback failed", { provider })
        return callbackRedirect(request, provider, "connection-failed")
    }
}
