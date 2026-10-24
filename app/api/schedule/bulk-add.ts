import { NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Expecting: [{ date, time, name, email, phone, service }, ...]
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }
    const results = []
    for (const item of body) {
      const res = await pool.query(
        `INSERT INTO schedule (date, time, name, email, phone, service) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [item.date, item.time, item.name, item.email, item.phone, item.service]
      )
      results.push(res.rows[0])
    }
    return NextResponse.json({ success: true, results })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
