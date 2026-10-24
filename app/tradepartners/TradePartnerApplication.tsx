"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ClipboardCheck, ShieldCheck } from "lucide-react"

const tradeTypes = [
  "Painting & coatings",
  "Drywall repair",
  "Carpentry",
  "Wall coverings",
  "Deck staining",
  "Pressure washing",
  "Restoration",
  "Other",
]

const heroImage =
  "https://ik.imagekit.io/j98e6hcfnkn/featured/featured-home/f2_ElysbPaNW.jpg?updatedAt=1704333595263"

export default function TradePartnerApplication() {
  const formRef = useRef<HTMLFormElement>(null)
  const idempotencyKey = useRef<{ fingerprint: string; key: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [applicationId, setApplicationId] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setFieldErrors({})

    const formData = new FormData(event.currentTarget)
    const payload = {
      contactName: String(formData.get("contactName") ?? ""),
      companyName: String(formData.get("companyName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      tradeTypes: formData.getAll("tradeTypes").map(String),
      serviceAreas: String(formData.get("serviceAreas") ?? "")
        .split(",")
        .map((area) => area.trim())
        .filter(Boolean),
      websiteUrl: String(formData.get("websiteUrl") ?? ""),
      experienceSummary: String(formData.get("experienceSummary") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
    }

    if (payload.tradeTypes.length === 0) {
      setFieldErrors({ tradeTypes: ["Select at least one trade you provide."] })
      return
    }

    setSubmitting(true)
    const fingerprint = JSON.stringify(payload)
    if (idempotencyKey.current?.fingerprint !== fingerprint) {
      idempotencyKey.current = { fingerprint, key: crypto.randomUUID() }
    }
    const key = idempotencyKey.current.key

    try {
      const response = await fetch("/api/tradepartners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": key,
        },
        body: JSON.stringify(payload),
      })
      const result = (await response.json()) as {
        applicationId?: string
        error?: string
        fields?: Record<string, string[]>
      }

      if (!response.ok) {
        setFieldErrors(result.fields ?? {})
        throw new Error(result.error || "We could not submit your application.")
      }

      setApplicationId(result.applicationId ?? "")
      idempotencyKey.current = null
      formRef.current?.reset()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not submit your application. Please try again.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="bg-[#f2f3f7] text-[#141629]">
      <section
        className="relative isolate overflow-hidden bg-[#070a2c] text-white"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(5, 8, 36, .92) 0%, rgba(5, 8, 36, .78) 44%, rgba(5, 8, 36, .53) 100%), url("${heroImage}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto grid min-h-[760px] max-w-[1440px] items-center gap-12 px-5 py-14 sm:px-8 lg:min-h-[780px] lg:grid-cols-[1.05fr_.85fr] lg:gap-16 lg:px-12 lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.2em] text-white/80">
              <span className="h-px w-8 bg-[#c0c0c0]" aria-hidden="true" />
              NXG trade partners
            </p>
            <h1 className="max-w-xl text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[5.25rem]">
              Good work starts with the right team.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              Tell us about your trade business and where you work. NXG reviews every application before any partner
              profile is activated.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/30 pt-6 text-sm text-white/90">
              <span className="inline-flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-[#c0c0c0]" aria-hidden="true" />
                Application reviewed by NXG
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#c0c0c0]" aria-hidden="true" />
                No automatic approval
              </span>
            </div>
          </div>

          <div className="bg-white p-5 text-[#141629] shadow-[0_24px_70px_rgba(0,0,0,.32)] sm:p-8 lg:p-9">
            {applicationId ? (
              <div className="py-8" role="status" aria-live="polite">
                <CheckCircle2 className="h-11 w-11 text-[#214bb6]" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[#070a2c]">
                  Application received
                </h2>
                <p className="mt-3 max-w-md leading-6 text-slate-600">
                  Your profile is pending NXG review. Submission does not create an active partner account or guarantee
                  project work.
                </p>
                <p className="mt-6 border-t border-[#c0c0c0] pt-4 text-sm text-slate-600">
                  Application ID <span className="font-semibold text-[#070a2c]">{applicationId}</span>
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-[#070a2c]">Build your trade profile</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Share the essentials. Required fields are marked with an asterisk.
                  </p>
                </div>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  onChange={() => {
                    setError("")
                    setFieldErrors({})
                  }}
                  className="space-y-4"
                >
                  <fieldset disabled={submitting} className="m-0 min-w-0 space-y-4 border-0 p-0">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-[#10132b]">
                      Contact name *
                      <input
                        name="contactName"
                        type="text"
                        autoComplete="name"
                        required
                        minLength={2}
                        maxLength={120}
                        className="mt-1.5 h-12 w-full rounded border border-slate-300 px-3 text-base outline-none transition focus:border-[#214bb6] focus:ring-2 focus:ring-[#214bb6]/20"
                      />
                    </label>
                    <label className="block text-sm font-medium text-[#10132b]">
                      Business name *
                      <input
                        name="companyName"
                        type="text"
                        autoComplete="organization"
                        required
                        minLength={2}
                        maxLength={160}
                        className="mt-1.5 h-12 w-full rounded border border-slate-300 px-3 text-base outline-none transition focus:border-[#214bb6] focus:ring-2 focus:ring-[#214bb6]/20"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-[#10132b]">
                      Email *
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        className="mt-1.5 h-12 w-full rounded border border-slate-300 px-3 text-base outline-none transition focus:border-[#214bb6] focus:ring-2 focus:ring-[#214bb6]/20"
                      />
                    </label>
                    <label className="block text-sm font-medium text-[#10132b]">
                      Phone
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        maxLength={40}
                        className="mt-1.5 h-12 w-full rounded border border-slate-300 px-3 text-base outline-none transition focus:border-[#214bb6] focus:ring-2 focus:ring-[#214bb6]/20"
                      />
                    </label>
                  </div>

                  <fieldset
                    aria-describedby={fieldErrors.tradeTypes ? "trade-types-error" : undefined}
                    aria-invalid={fieldErrors.tradeTypes ? true : undefined}
                  >
                    <legend className="text-sm font-medium text-[#10132b]">Trades you provide *</legend>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                      {tradeTypes.map((trade) => (
                        <label key={trade} className="flex min-h-9 items-center gap-2 text-sm text-slate-700">
                          <input
                            type="checkbox"
                            name="tradeTypes"
                            value={trade}
                            aria-invalid={fieldErrors.tradeTypes ? true : undefined}
                            aria-describedby={fieldErrors.tradeTypes ? "trade-types-error" : undefined}
                            className="h-4 w-4 accent-[#214bb6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214bb6]"
                          />
                          {trade}
                        </label>
                      ))}
                    </div>
                    {fieldErrors.tradeTypes?.map((message) => (
                      <p key={message} id="trade-types-error" className="mt-2 text-sm text-red-800">
                        {message}
                      </p>
                    ))}
                  </fieldset>

                  <label className="block text-sm font-medium text-[#10132b]">
                    Service areas (city or county, separated by commas) *
                    <input
                      name="serviceAreas"
                      type="text"
                      required
                      maxLength={800}
                      placeholder="Edina, Hennepin County"
                      className="mt-1.5 h-12 w-full rounded border border-slate-300 px-3 text-base outline-none transition placeholder:text-slate-500 focus:border-[#214bb6] focus:ring-2 focus:ring-[#214bb6]/20"
                    />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-[#10132b]">
                      Website (optional)
                      <input
                        name="websiteUrl"
                        type="url"
                        maxLength={2048}
                        placeholder="https://"
                        className="mt-1.5 h-12 w-full rounded border border-slate-300 px-3 text-base outline-none transition placeholder:text-slate-500 focus:border-[#214bb6] focus:ring-2 focus:ring-[#214bb6]/20"
                      />
                    </label>
                    <label className="block text-sm font-medium text-[#10132b]">
                      Relevant experience (optional)
                      <input
                        name="experienceSummary"
                        type="text"
                        maxLength={2000}
                        className="mt-1.5 h-12 w-full rounded border border-slate-300 px-3 text-base outline-none transition focus:border-[#214bb6] focus:ring-2 focus:ring-[#214bb6]/20"
                      />
                    </label>
                  </div>

                  <label className="sr-only" aria-hidden="true">
                    Leave this field blank
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>

                  <label className="flex items-start gap-3 pt-1 text-sm leading-5 text-slate-700">
                    <input
                      name="consent"
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#214bb6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214bb6]"
                    />
                    <span>
                      I agree that NXG may review this application and contact me about it. Read our{" "}
                      <Link href="/privacy" className="font-semibold text-[#173d9c] underline underline-offset-2">
                        privacy notice
                      </Link>
                      .
                    </span>
                  </label>

                  {(error || Object.keys(fieldErrors).length > 0) && (
                    <div className="rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-900" role="alert">
                      {error && <p>{error}</p>}
                      {Object.entries(fieldErrors)
                        .filter(([field]) => field !== "tradeTypes")
                        .map(([field, messages]) => (
                          <p key={field}>
                            <span className="font-semibold">
                              {field.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase())}:
                            </span>{" "}
                            {messages.join(" ")}
                          </p>
                        ))}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded bg-[#214bb6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#173d9c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#070a2c] disabled:cursor-not-allowed disabled:bg-slate-500"
                  >
                    {submitting ? "Submitting application…" : "Submit for review"}
                    {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  </button>
                  <p className="text-xs leading-5 text-slate-500">
                    Do not include payment details, tax identifiers, or sensitive documents in this form.
                  </p>
                  </fieldset>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 sm:px-8 md:grid-cols-[.7fr_1.3fr] lg:px-12 lg:py-20">
        <h2 className="max-w-sm text-3xl font-semibold leading-tight tracking-[-.04em] text-[#070a2c]">
          A clear application. A human decision.
        </h2>
        <p className="max-w-2xl text-base leading-7 text-slate-700">
          NXG reviews the details you provide before changing an application status. Approval does not create a contract,
          promise work, or authorize public use of your business information.
        </p>
      </section>
    </main>
  )
}
