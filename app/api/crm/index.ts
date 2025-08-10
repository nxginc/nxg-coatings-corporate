import { NextResponse } from "next/server"
import { Pool } from "pg"
import type { PoolConfig } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET() {
  // Example: fetch all CRM contacts
  const res = await pool.query("SELECT * FROM crm_contacts ORDER BY created_at DESC LIMIT 100")
  return NextResponse.json(res.rows)
}

export async function POST(request: Request) {
  // Example: add a new CRM contact
  const body = await request.json()
  const { name, email, phone, company, notes } = body
  const res = await pool.query(
    `INSERT INTO crm_contacts (name, email, phone, company, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, phone, company, notes]
  )
  return NextResponse.json(res.rows[0])
}
