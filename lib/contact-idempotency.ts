type StoredContactKey = {
  fingerprint: string
  key: string
}

const memoryKeys = new Map<string, StoredContactKey>()

async function fingerprint(body: string): Promise<string> {
  if (globalThis.crypto?.subtle) {
    const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(body))
    return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("")
  }
  return body
}

export async function getContactIdempotencyKey(scope: string, payload: unknown): Promise<string> {
  const requestFingerprint = await fingerprint(JSON.stringify(payload))
  const cached = memoryKeys.get(scope)
  if (cached?.fingerprint === requestFingerprint) return cached.key

  try {
    const stored = sessionStorage.getItem(`nxg-contact:${scope}`)
    if (stored) {
      const parsed = JSON.parse(stored) as StoredContactKey
      if (
        parsed.fingerprint === requestFingerprint &&
        typeof parsed.key === "string" &&
        /^[0-9a-f-]{36}$/i.test(parsed.key)
      ) {
        memoryKeys.set(scope, parsed)
        return parsed.key
      }
    }
  } catch {}

  const key = crypto.randomUUID()
  const next = { fingerprint: requestFingerprint, key }
  memoryKeys.set(scope, next)
  try {
    sessionStorage.setItem(`nxg-contact:${scope}`, JSON.stringify(next))
  } catch {}
  return key
}

export function clearContactIdempotencyKey(scope: string, key: string): void {
  if (memoryKeys.get(scope)?.key === key) memoryKeys.delete(scope)
  try {
    const storageKey = `nxg-contact:${scope}`
    const stored = sessionStorage.getItem(storageKey)
    if (stored && (JSON.parse(stored) as StoredContactKey).key === key) {
      sessionStorage.removeItem(storageKey)
    }
  } catch {}
}
