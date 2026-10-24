export const SMTP_TIMEOUTS = Object.freeze({
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 30_000,
})

export const DATABASE_STATEMENT_TIMEOUT_MS = 15_000

export function isDatabaseQueryTimeout(error) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "57014"
}
