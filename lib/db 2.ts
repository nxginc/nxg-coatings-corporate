import { Pool } from "pg"

let pool: Pool | undefined

export function getDatabase() {
  if (!process.env.DATABASE_URL) return null

  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
  })

  return pool
}