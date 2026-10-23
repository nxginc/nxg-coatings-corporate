import { Pool, type PoolClient, type QueryResultRow } from "pg"

const globalForDatabase = globalThis as typeof globalThis & { nxgPool?: Pool }

export function getDatabasePool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.")
  }

  if (!globalForDatabase.nxgPool) {
    globalForDatabase.nxgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    })
  }

  return globalForDatabase.nxgPool
}

export function getCompanyId(): string {
  const companyId = process.env.NXG_COMPANY_ID
  if (!companyId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(companyId)) {
    throw new Error("NXG_COMPANY_ID must be set to the authorized company's UUID.")
  }

  return companyId
}

export async function withTransaction<T>(work: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getDatabasePool().connect()
  try {
    await client.query("BEGIN")
    const result = await work(client)
    await client.query("COMMIT")
    return result
  } catch (error) {
    try {
      await client.query("ROLLBACK")
    } catch (rollbackError) {
      console.error("Database transaction rollback failed.", rollbackError)
    }
    throw error
  } finally {
    client.release()
  }
}

export async function queryRows<T extends QueryResultRow>(
  sql: string,
  values: unknown[] = [],
): Promise<T[]> {
  const result = await getDatabasePool().query<T>(sql, values)
  return result.rows
}
