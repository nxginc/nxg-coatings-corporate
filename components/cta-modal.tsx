"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const services = [
  "Exterior painting",
  "Interior painting",
  "Cabinet refinishing",
  "Deck staining",
  "Fine finish and millwork",
  "Color consultation",
  "Pressure cleaning",
  "Paint restoration",
  "Protective coatings",
  "Commercial coatings",
  "Industrial coatings",
  "Other",
]

interface CTAModalProps {
  trigger: ReactNode
  title?: string
  description?: string
  service?: string
}

const fieldClass = "min-h-12 w-full border border-[var(--nxg-line)] bg-white px-3 text-sm text-[var(--nxg-charcoal)] placeholder:text-[var(--nxg-muted)] focus:border-[var(--nxg-navy)] focus:outline-none focus:ring-2 focus:ring-[var(--nxg-navy)]/15 disabled:opacity-60"

export function CTAModal({
  trigger,
  title = "Request a project estimate",
  description = "Tell us a little about your project. The NXG team will follow up by email.",
  service = "",
}: CTAModalProps) {
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [emailNotificationStatus, setEmailNotificationStatus] = useState<string | null>(null)
  const [error, setError] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return

    const form = event.currentTarget
    const formData = new FormData(form)
    setSending(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          projectType: formData.get("service"),
          message: formData.get("message"),
          website: formData.get("website"),
          type: "estimate",
        }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) throw new Error(result?.error || "Your request could not be submitted. Please try again.")
      setEmailNotificationStatus(result?.emailNotificationStatus || null)
      setSubmitted(true)
      form.reset()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Your request could not be submitted. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => {
      setOpen(nextOpen)
      if (!nextOpen) {
        setSubmitted(false)
        setEmailNotificationStatus(null)
        setError("")
      }
    }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[min(90svh,760px)] overflow-y-auto border-[var(--nxg-line)] bg-white p-0 sm:max-w-xl">
        <div className="border-b border-[var(--nxg-line)] px-6 pb-5 pt-7 sm:px-8">
          <DialogTitle className="max-w-md text-2xl font-semibold leading-tight text-[var(--nxg-navy)] sm:text-3xl">{title}</DialogTitle>
          <DialogDescription className="mt-3 max-w-lg text-sm leading-6 text-[var(--nxg-muted)]">{description}</DialogDescription>
        </div>
        {submitted ? (
          <div role="status" className="px-6 py-8 sm:px-8">
            <h3 className="text-xl font-semibold text-[var(--nxg-navy)]">Request received.</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--nxg-muted)]">Your project details are with the NXG team. We’ll follow up using the email address you provided.</p>
            {emailNotificationStatus && emailNotificationStatus !== "sent" && <p className="mt-3 border-l-2 border-amber-500 bg-amber-50 p-3 text-xs leading-5 text-amber-950">Your request is saved in the NXG lead inbox, but email alerts are currently unavailable. The team can still review it in the dashboard.</p>}
            <button type="button" onClick={() => setOpen(false)} className="mt-6 inline-flex min-h-11 items-center gap-3 bg-[var(--nxg-navy)] px-5 text-xs font-semibold uppercase tracking-[0.1em] text-white hover:bg-[var(--nxg-red)]">
              Close <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <form onSubmit={(event) => void submit(event)} className="space-y-4 px-6 py-6 sm:px-8">
            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="estimate-modal-website">Leave this field empty</label>
              <input id="estimate-modal-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-medium text-[var(--nxg-charcoal)]">
                Name
                <input className={`${fieldClass} mt-2`} name="name" autoComplete="name" minLength={2} maxLength={120} required />
              </label>
              <label className="block text-xs font-medium text-[var(--nxg-charcoal)]">
                Email
                <input className={`${fieldClass} mt-2`} name="email" type="email" autoComplete="email" maxLength={254} required />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-medium text-[var(--nxg-charcoal)]">
                Phone <span className="font-normal text-[var(--nxg-muted)]">(optional)</span>
                <input className={`${fieldClass} mt-2`} name="phone" type="tel" autoComplete="tel" maxLength={50} />
              </label>
              <label className="block text-xs font-medium text-[var(--nxg-charcoal)]">
                Service
                <select className={`${fieldClass} mt-2`} name="service" defaultValue={service}>
                  <option value="">Select a service</option>
                  {services.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            </div>
            <label className="block text-xs font-medium text-[var(--nxg-charcoal)]">
              Project details
              <textarea className={`${fieldClass} mt-2 min-h-28 resize-y py-3`} name="message" minLength={1} maxLength={5000} required placeholder="What are you planning, and where is the project?" />
            </label>
            {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
            <button type="submit" disabled={sending} className="flex min-h-12 w-full items-center justify-center gap-3 bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--nxg-navy)] disabled:cursor-not-allowed disabled:opacity-60">
              {sending ? "Sending request..." : "Send estimate request"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="text-center text-[11px] leading-5 text-[var(--nxg-muted)]">No obligation. Your details are used to respond to this inquiry.</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
