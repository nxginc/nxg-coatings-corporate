import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { Pool } from "pg"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const migrationsDirectory = path.join(root, "db", "migrations")
const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL

if (!connectionString) {
  console.error("DATABASE_URL_UNPOOLED or DATABASE_URL must be set.")
  process.exit(1)
}

const pool = new Pool({ connectionString, max: 1 })
const client = await pool.connect()
const lockId = 781_204_610

try {
  await client.query("select pg_advisory_lock($1)", [lockId])
  await client.query(`
    create table if not exists nxg_schema_migrations (
      migration_id text primary key,
      applied_at timestamptz not null default now()
    )
  `)

  const files = (await readdir(migrationsDirectory))
    .filter((file) => /^\d{3}_[a-z0-9_]+\.sql$/.test(file))
    .sort()

  for (const file of files) {
    const { rows } = await client.query(
      "select 1 from nxg_schema_migrations where migration_id = $1",
      [file],
    )
    if (rows.length) {
      console.log(`Skipped ${file}`)
      continue
    }

    await client.query("begin")
    try {
      await client.query(await readFile(path.join(migrationsDirectory, file), "utf8"))
      await client.query(
        "insert into nxg_schema_migrations (migration_id) values ($1)",
        [file],
      )
      await client.query("commit")
      console.log(`Applied ${file}`)
    } catch (error) {
      await client.query("rollback").catch(() => undefined)
      throw new Error(`Migration ${file} failed. No changes from this migration were kept.`, { cause: error })
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : "Database migration failed.")
  if (error instanceof Error && error.cause instanceof Error) {
    console.error(error.cause.message)
  }
  process.exitCode = 1
} finally {
  await client.query("select pg_advisory_unlock($1)", [lockId]).catch(() => undefined)
  client.release()
  await pool.end()
}
