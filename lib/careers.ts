import { getDatabase } from "@/lib/db"
import { NXG_COMPANY_ID } from "@/lib/company"

export type CareerOpening = {
  id: string
  slug: string
  title: string
  location: string
  employmentType: string
  summary: string
  details: string
  publishedAt: string
}

export async function getPublishedCareerOpenings(): Promise<CareerOpening[]> {
  const database = getDatabase()
  if (!database) return []
  const { rows } = await database.query<CareerOpening>(
    `select id, slug, title, location, employment_type as "employmentType",
            summary, details, published_at::text as "publishedAt"
     from nxg_career_openings
     where company_id = $1 and status = 'published'
     order by published_at desc
     limit 100`,
    [NXG_COMPANY_ID],
  )
  return rows
}
