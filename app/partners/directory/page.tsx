import type { Metadata } from "next"
import { getDatabase } from "@/lib/db"
import { NXG_COMPANY_ID } from "@/lib/company"

export const metadata: Metadata = {
    title: "Trade Partner Directory | NXG Coatings",
    description: "Browse approved NXG Coatings trade partners serving the Twin Cities.",
    alternates: { canonical: "https://nxgcoatingsinc.com/partners/directory" },
}

type Partner = { company: string; trade: string; serviceAreas: string; website: string | null }

export default async function PartnerDirectoryPage() {
    let partners: Partner[] = []
    let unavailable = false
    const database = getDatabase()

    if (!database) {
        unavailable = true
    } else {
        try {
            const result = await database.query(
                `select company, trade, service_areas as "serviceAreas", website
         from nxg_partner_applications
         where company_id = $1 and status = 'approved' and directory_consent = true
         order by company asc`,
                [NXG_COMPANY_ID],
            )
            partners = result.rows
        } catch {
            unavailable = true
        }
    }

    return <main className="min-h-screen bg-white px-6 py-16 text-[var(--nxg-charcoal)] lg:px-10 lg:py-24">
        <div className="mx-auto max-w-5xl"><p className="section-kicker">NXG / Trade network</p><h1 className="mt-4 text-4xl font-semibold text-[var(--nxg-navy)] sm:text-6xl">Approved partners</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[var(--nxg-muted)]">Only approved partners who have opted in are listed. Contact information is shared directly by each company on its own website.</p>
            {unavailable ? <p role="status" className="mt-10 border-t border-[var(--nxg-line)] py-6 text-sm text-[var(--nxg-muted)]">The directory is temporarily unavailable.</p> : partners.length === 0 ? <p className="mt-10 border-t border-[var(--nxg-line)] py-6 text-sm text-[var(--nxg-muted)]">There are no public partner profiles yet.</p> : <ul className="mt-10 divide-y divide-[var(--nxg-line)] border-y border-[var(--nxg-line)]">{partners.map((partner) => <li key={`${partner.company}-${partner.trade}`} className="grid gap-3 py-6 sm:grid-cols-[1fr_1fr_auto] sm:items-center"><div><h2 className="font-semibold text-[var(--nxg-navy)]">{partner.company}</h2><p className="mt-1 text-sm text-[var(--nxg-muted)]">{partner.trade}</p></div><p className="text-sm text-[var(--nxg-muted)]">{partner.serviceAreas}</p>{partner.website && <a href={partner.website} target="_blank" rel="noreferrer" className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-red)] underline">Company website ↗</a>}</li>)}</ul>}
        </div>
    </main>
}