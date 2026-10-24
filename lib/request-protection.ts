import { createHmac } from "node:crypto"
import { getDatabasePool } from "@/lib/db"

export const MAX_PUBLIC_REQUEST_BODY_BYTES = 32 * 1024

export type HeaderSource = Headers | Record<string, string | string[] | undefined>

export type LimitedJsonResult =
  | { ok: true; value: unknown }
  | { ok: false; status: 400 | 413; error: string }

function getHeader(headers: HeaderSource, name: string): string | undefined {
  if (headers instanceof Headers) return headers.get(name) ?? undefined

  const value = headers[name] ?? headers[name.toLowerCase()]
  return Array.isArray(value) ? value[0] : value
}

function getClientAddress(headers: HeaderSource | undefined): string {
  if (!headers) throw new Error("Client address headers are required for request throttling.")

  const realIp = getHeader(headers, "x-real-ip")?.trim()
  const forwardedFor = getHeader(headers, "x-forwarded-for")
  const address = realIp || forwardedFor?.split(",")[0]?.trim()
  if (!address) throw new Error("Client address headers are required for request throttling.")
  return address.slice(0, 128)
}

export async function parseLimitedJson(
  request: Request,
  maxBytes = MAX_PUBLIC_REQUEST_BODY_BYTES,
): Promise<LimitedJsonResult> {
  const contentLength = request.headers.get("content-length")
  if (contentLength && /^\d+$/.test(contentLength) && Number(contentLength) > maxBytes) {
    return { ok: false, status: 413, error: "The submitted form is too large." }
  }

  if (!request.body) {
    return { ok: false, status: 400, error: "The submitted form data is not valid JSON." }
  }

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let totalBytes = 0

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      totalBytes += value.byteLength
      if (totalBytes > maxBytes) {
        await reader.cancel()
        return { ok: false, status: 413, error: "The submitted form is too large." }
      }
      chunks.push(value)
    }
  } catch {
    return { ok: false, status: 400, error: "The submitted form data is not valid JSON." }
  } finally {
    reader.releaseLock()
  }

  const body = new Uint8Array(totalBytes)
  let offset = 0
  for (const chunk of chunks) {
    body.set(chunk, offset)
    offset += chunk.byteLength
  }

  try {
    return { ok: true, value: JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body)) }
  } catch {
    return { ok: false, status: 400, error: "The submitted form data is not valid JSON." }
  }
}

export function fingerprintPayload(payload: unknown): string {
  return createHmac("sha256", process.env.AUTH_SECRET || process.env.DATABASE_URL || "nxg-payload-v1")
    .update(JSON.stringify(payload))
    .digest("hex")
}

export async function allowRequest(
  route: string,
  headers: HeaderSource | undefined,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const secret = process.env.AUTH_SECRET || process.env.DATABASE_URL
  if (!secret) throw new Error("AUTH_SECRET or DATABASE_URL is required for request throttling.")

  const identifierHash = createHmac("sha256", secret).update(getClientAddress(headers)).digest("hex")
  const result = await getDatabasePool().query<{ allowed: boolean }>(
    `INSERT INTO nxg_public_request_rate_limits (
       route, identifier_hash, window_started_at, request_count
     )
     VALUES ($1, $2, now(), 1)
     ON CONFLICT (route, identifier_hash) DO UPDATE
       SET window_started_at = CASE
             WHEN nxg_public_request_rate_limits.window_started_at <=
                  now() - ($4::integer * interval '1 second')
               THEN now()
             ELSE nxg_public_request_rate_limits.window_started_at
           END,
           request_count = CASE
             WHEN nxg_public_request_rate_limits.window_started_at <=
                  now() - ($4::integer * interval '1 second')
               THEN 1
             ELSE LEAST(nxg_public_request_rate_limits.request_count + 1, $3::integer + 1)
           END
     RETURNING request_count <= $3::integer AS allowed`,
    [route, identifierHash, limit, windowSeconds],
  )

  return result.rows[0]?.allowed === true
}
