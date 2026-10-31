import { createCipheriv, createDecipheriv, randomBytes, scryptSync, timingSafeEqual } from "node:crypto"
import { NXG_COMPANY_ID } from "@/lib/company"
import { getDatabase } from "@/lib/db"

export type MarketingProvider = "meta-pages" | "google-business-profile"
export type MetaPage = { id: string; name: string; accessToken: string }
export type MetaTokenBundle = { pages: MetaPage[] }
export type GoogleTokenBundle = { accessToken: string; refreshToken: string; expiresAt: number }
export type ProviderMetadata = {
    selectedPageId?: string
    selectedGoogleAccount?: string
    selectedGoogleAccountName?: string
    selectedGoogleLocation?: string
    selectedGoogleLocationTitle?: string
}

export type ProviderConnection = {
    provider: MarketingProvider
    tokenBundle: MetaTokenBundle | GoogleTokenBundle
    providerAccountId: string | null
    providerAccountName: string | null
    metadata: ProviderMetadata
    scopes: string[]
}

function encryptionKey() {
    const secret = process.env.AUTH_SECRET
    if (!secret) throw new Error("AUTH_SECRET must be configured to encrypt provider tokens.")
    return scryptSync(secret, "nxg-provider-token-v1", 32)
}

export function encryptTokenBundle(value: MetaTokenBundle | GoogleTokenBundle) {
    const iv = randomBytes(12)
    const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv)
    const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()])
    return ["v1", iv.toString("base64url"), cipher.getAuthTag().toString("base64url"), encrypted.toString("base64url")].join(".")
}

export function decryptTokenBundle(value: string, provider: MarketingProvider): MetaTokenBundle | GoogleTokenBundle {
    const [version, ivText, tagText, encryptedText] = value.split(".")
    if (version !== "v1" || !ivText || !tagText || !encryptedText) throw new Error("Stored provider credentials have an unsupported format.")
    const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(ivText, "base64url"))
    decipher.setAuthTag(Buffer.from(tagText, "base64url"))
    const json = Buffer.concat([decipher.update(Buffer.from(encryptedText, "base64url")), decipher.final()]).toString("utf8")
    const bundle = JSON.parse(json) as MetaTokenBundle | GoogleTokenBundle
    if (provider === "meta-pages" && !Array.isArray((bundle as MetaTokenBundle).pages)) throw new Error("Stored Meta credentials are invalid.")
    if (provider === "google-business-profile" && !("refreshToken" in bundle)) throw new Error("Stored Google credentials are invalid.")
    return bundle
}

export function getOAuthRedirectUri(provider: MarketingProvider) {
    const base = process.env.NEXTAUTH_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim()
    if (!base) throw new Error("Set NEXTAUTH_URL or NEXT_PUBLIC_SITE_URL before connecting providers.")
    const url = new URL(base)
    if (process.env.NODE_ENV === "production" && url.protocol !== "https:") throw new Error("Provider OAuth requires an HTTPS site URL in production.")
    return new URL(`/api/admin/oauth/${provider}/callback`, url).toString()
}

export function safeEqual(first: string, second: string) {
    const left = Buffer.from(first)
    const right = Buffer.from(second)
    return left.length === right.length && timingSafeEqual(left, right)
}

export async function getProviderConnection(provider: MarketingProvider): Promise<ProviderConnection | null> {
    const database = getDatabase()
    if (!database) return null
    const { rows } = await database.query(
        `select token_bundle_encrypted as "tokenBundleEncrypted", provider_account_id as "providerAccountId",
                provider_account_name as "providerAccountName", metadata, scopes
         from nxg_provider_connections where company_id = $1 and provider = $2`,
        [NXG_COMPANY_ID, provider],
    )
    const row = rows[0]
    if (!row) return null
    return {
        provider,
        tokenBundle: decryptTokenBundle(row.tokenBundleEncrypted, provider),
        providerAccountId: row.providerAccountId,
        providerAccountName: row.providerAccountName,
        metadata: row.metadata || {},
        scopes: row.scopes || [],
    }
}

export async function saveProviderConnection(input: {
    provider: MarketingProvider
    tokenBundle: MetaTokenBundle | GoogleTokenBundle
    providerAccountId?: string | null
    providerAccountName?: string | null
    metadata?: ProviderMetadata
    scopes: string[]
    actor: string
}) {
    const database = getDatabase()
    if (!database) throw new Error("Provider connections database is not configured.")
    await database.query(
        `insert into nxg_provider_connections
            (company_id, provider, token_bundle_encrypted, provider_account_id, provider_account_name, metadata, scopes, connected_by)
         values ($1, $2, $3, $4, $5, $6::jsonb, $7, $8)
         on conflict (company_id, provider) do update set
            token_bundle_encrypted = excluded.token_bundle_encrypted,
            provider_account_id = excluded.provider_account_id,
            provider_account_name = excluded.provider_account_name,
            metadata = excluded.metadata,
            scopes = excluded.scopes,
            connected_by = case when excluded.connected_by like 'system:%'
                then nxg_provider_connections.connected_by else excluded.connected_by end,
            updated_at = now()`,
        [
            NXG_COMPANY_ID,
            input.provider,
            encryptTokenBundle(input.tokenBundle),
            input.providerAccountId || null,
            input.providerAccountName || null,
            JSON.stringify(input.metadata || {}),
            input.scopes,
            input.actor,
        ],
    )
}

export async function refreshGoogleAccessToken(connection: ProviderConnection): Promise<GoogleTokenBundle> {
    if (connection.provider !== "google-business-profile") throw new Error("Google credentials are required.")
    const bundle = connection.tokenBundle as GoogleTokenBundle
    if (bundle.expiresAt > Date.now() + 60_000) return bundle
    const clientId = process.env.GOOGLE_CLIENT_ID?.trim()
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim()
    if (!clientId || !clientSecret) throw new Error("Google OAuth client credentials are not configured.")
    const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: bundle.refreshToken,
            grant_type: "refresh_token",
        }),
        cache: "no-store",
    })
    const result = await response.json().catch(() => null) as { access_token?: string; expires_in?: number; error?: string } | null
    if (!response.ok || !result?.access_token) throw new Error(result?.error || "Google access token refresh failed; reconnect the account.")
    const refreshed: GoogleTokenBundle = {
        ...bundle,
        accessToken: result.access_token,
        expiresAt: Date.now() + (result.expires_in || 3600) * 1000,
    }
    await saveProviderConnection({
        provider: "google-business-profile",
        tokenBundle: refreshed,
        providerAccountId: connection.providerAccountId,
        providerAccountName: connection.providerAccountName,
        metadata: connection.metadata,
        scopes: connection.scopes,
        actor: "system:google-token-refresh",
    })
    return refreshed
}
