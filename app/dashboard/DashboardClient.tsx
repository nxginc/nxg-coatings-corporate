"use client"

import Link from "next/link"
import { ArrowRight, FileText, ShieldCheck, Users } from "lucide-react"

const workspaces = [
  {
    href: "/dashboard/tradepartners",
    title: "Trade partner applications",
    description: "Review new partner applications and record an approval decision.",
    icon: Users,
    status: "Available",
  },
  {
    href: "/dashboard/letters",
    title: "Letterhead composer",
    description: "Prefill company details and prepare a printable letter draft.",
    icon: FileText,
    status: "Draft only",
  },
]

export default function DashboardClient() {
  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-2 text-3xl font-bold text-[#000035]">Admin workspace</h1>
            <p className="mt-2 text-slate-600">Company-scoped operations and review queues.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
            <ShieldCheck className="h-4 w-4 text-green-700" aria-hidden="true" />
            Administrator session
          </div>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
          {workspaces.map(({ href, title, description, icon: Icon, status }) => (
            <Link key={title} href={href} className="group flex flex-col gap-4 p-5 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-600 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-start gap-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                <span>
                  <span className="block font-semibold text-[#000035]">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">{description}</span>
                </span>
              </span>
              <span className="flex items-center justify-between gap-6 pl-9 sm:justify-end sm:pl-0">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{status}</span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#000035]">
                  Open
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-6 text-slate-500">
          External publishing, government submissions, commitments, and outbound messages are not automated from this
          workspace. They require a configured provider and an authorized review step.
        </p>
      </div>
    </main>
  )
}
