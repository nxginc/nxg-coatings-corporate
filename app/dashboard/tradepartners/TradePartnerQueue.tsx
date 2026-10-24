"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"

type ApplicationStatus = "pending" | "under_review" | "approved" | "declined"
type Application = {
  id: string
  nxg_id: string
  contact_name: string
  company_name: string
  email: string
  phone: string | null
  trade_types: string[]
  service_areas: string[]
  website_url: string | null
  experience_summary: string | null
  status: ApplicationStatus
  created_at: string
}

type Pagination = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

const statusLabels: Record<ApplicationStatus, string> = {
  pending: "Pending review",
  under_review: "Under review",
  approved: "Approved",
  declined: "Declined",
}

export default function TradePartnerQueue() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [updatingId, setUpdatingId] = useState("")
  const [requestedPage, setRequestedPage] = useState(1)
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 25,
    total: 0,
    totalPages: 1,
  })

  const loadApplications = useCallback(async (page: number, signal?: AbortSignal) => {
    setRequestedPage(page)
    setLoading(true)
    setError("")
    try {
      const response = await fetch(`/api/admin/tradepartners?page=${page}`, { signal, cache: "no-store" })
      const result = (await response.json()) as {
        applications?: Application[]
        pagination?: Pagination
        error?: string
      }
      if (response.status === 401) {
        window.location.assign("/login")
        return
      }
      if (!response.ok) throw new Error(result.error || "Partner applications could not be loaded.")
      setApplications(result.applications ?? [])
      if (result.pagination) {
        setPagination(result.pagination)
        setRequestedPage(result.pagination.page)
      }
    } catch (loadError) {
      if (loadError instanceof DOMException && loadError.name === "AbortError") return
      setError(loadError instanceof Error ? loadError.message : "Partner applications could not be loaded.")
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void loadApplications(1, controller.signal)
    return () => controller.abort()
  }, [loadApplications])

  async function updateStatus(application: Application, status: Exclude<ApplicationStatus, "pending">) {
    setUpdatingId(application.id)
    setError("")
    try {
      const response = await fetch(`/api/admin/tradepartners/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const result = (await response.json()) as { error?: string }
      if (response.status === 401) {
        window.location.assign("/login")
        return
      }
      if (!response.ok) throw new Error(result.error || "The application status could not be updated.")
      await loadApplications(pagination.page)
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "The application status could not be updated.")
    } finally {
      setUpdatingId("")
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-[#141629] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/dashboard" className="text-sm font-semibold text-[#173d9c] underline underline-offset-4">
          Back to admin workspace
        </Link>
        <div className="mt-5 flex flex-col gap-3 border-b border-[#c0c0c0] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#070a2c]">Trade partner applications</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Review submitted profiles and record an internal decision. No email or partner account is created by a
              status change.
            </p>
          </div>
          <Link
            href="/tradepartners"
            className="inline-flex min-h-11 items-center justify-center rounded border border-[#070a2c] px-4 text-sm font-semibold text-[#070a2c] hover:bg-[#070a2c] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214bb6]"
          >
            View public application
          </Link>
        </div>

        {error && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => void loadApplications(requestedPage)}
              className="font-semibold underline underline-offset-2"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <p className="py-12 text-sm text-slate-600" role="status">Loading partner applications…</p>
        ) : applications.length === 0 ? (
          <div className="py-14">
            <h2 className="text-xl font-semibold text-[#070a2c]">No applications yet</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              New submissions will appear here after the partner-application migration is installed and storage is
              configured.
            </p>
          </div>
        ) : (
          <>
            <p className="mt-6 text-sm text-slate-600" aria-live="polite">
              Showing {(pagination.page - 1) * pagination.pageSize + 1}–
              {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total} applications
            </p>
            <ul className="divide-y divide-slate-200">
              {applications.map((application) => (
                <li key={application.id} className="grid gap-5 py-7 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h2 className="break-words text-lg font-semibold text-[#070a2c]">{application.company_name}</h2>
                      <span className="rounded-full bg-[#e8ebf5] px-3 py-1 text-xs font-semibold text-[#070a2c]">
                        {statusLabels[application.status]}
                      </span>
                      <span className="text-xs text-slate-500">{application.nxg_id}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-700">
                      {application.contact_name} ·{" "}
                      <a className="underline underline-offset-2" href={`mailto:${application.email}`}>
                        {application.email}
                      </a>
                      {application.phone && <> · {application.phone}</>}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      <span className="font-medium text-slate-800">Trades:</span> {application.trade_types.join(", ")}
                    </p>
                    <p className="text-sm leading-6 text-slate-600">
                      <span className="font-medium text-slate-800">Service areas:</span> {application.service_areas.join(", ")}
                    </p>
                    {application.website_url && (
                      <p className="mt-1 text-sm">
                        <a
                          href={application.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#173d9c] underline underline-offset-2"
                        >
                          Business website
                        </a>
                      </p>
                    )}
                    {application.experience_summary && (
                      <p className="mt-3 max-w-3xl whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                        {application.experience_summary}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-slate-500">
                      Submitted {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(application.created_at))}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {application.status === "pending" && (
                      <>
                        <button
                          type="button"
                          disabled={updatingId === application.id}
                          onClick={() => void updateStatus(application, "under_review")}
                          className="min-h-10 rounded bg-[#214bb6] px-4 text-sm font-semibold text-white hover:bg-[#173d9c] disabled:opacity-60"
                        >
                          Start review
                        </button>
                        <button
                          type="button"
                          disabled={updatingId === application.id}
                          onClick={() => void updateStatus(application, "declined")}
                          className="min-h-10 rounded border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-white disabled:opacity-60"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {application.status === "under_review" && (
                      <>
                        <button
                          type="button"
                          disabled={updatingId === application.id}
                          onClick={() => void updateStatus(application, "approved")}
                          className="min-h-10 rounded bg-[#214bb6] px-4 text-sm font-semibold text-white hover:bg-[#173d9c] disabled:opacity-60"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          disabled={updatingId === application.id}
                          onClick={() => void updateStatus(application, "declined")}
                          className="min-h-10 rounded border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-white disabled:opacity-60"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {application.status === "declined" && (
                      <button
                        type="button"
                        disabled={updatingId === application.id}
                        onClick={() => void updateStatus(application, "under_review")}
                        className="min-h-10 rounded border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-white disabled:opacity-60"
                      >
                        Reopen review
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {pagination.totalPages > 1 && (
              <nav className="flex items-center justify-between border-t border-slate-200 py-5" aria-label="Application pages">
                <button
                  type="button"
                  disabled={loading || pagination.page <= 1}
                  onClick={() => void loadApplications(pagination.page - 1)}
                  className="min-h-10 rounded border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-600" aria-current="page">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={loading || pagination.page >= pagination.totalPages}
                  onClick={() => void loadApplications(pagination.page + 1)}
                  className="min-h-10 rounded border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </main>
  )
}
