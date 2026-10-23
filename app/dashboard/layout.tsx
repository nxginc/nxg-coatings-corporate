import type { ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getAdminEmail } from "@/lib/admin-auth"

const adminLinks = [
  { href: "/dashboard", label: "Lead inbox" },
  { href: "/dashboard/hiring-reputation", label: "Hiring & reputation" },
  { href: "/dashboard/partners", label: "Trade partners" },
  { href: "/dashboard/government", label: "Grant tracker" },
  { href: "/dashboard/content", label: "Campaign workbench" },
  { href: "/dashboard/connections", label: "Connections & automations" },
]

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  if (!(await getAdminEmail())) redirect("/login")

  return (
    <>
      <div className="border-b border-[var(--nxg-line)] bg-white px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <p className="section-kicker">Admin workspace</p>
          <nav aria-label="Admin navigation" className="flex flex-wrap gap-2">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-10 items-center border border-[var(--nxg-line)] px-3 text-xs font-semibold text-[var(--nxg-navy)] transition hover:border-[var(--nxg-navy)] hover:bg-[var(--nxg-paper)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {children}
    </>
  )
}
