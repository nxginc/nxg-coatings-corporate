"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { NXG_SITE } from "@/lib/site-metadata"

type EstimateValues = {
  name: string
  email: string
  phone: string
  service: string
}

const initialValues: EstimateValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
}

const inputClass =
  "min-h-12 w-full border border-[var(--nxg-line)] bg-white px-3 text-sm text-[var(--nxg-charcoal)] placeholder:text-[var(--nxg-muted)] focus:border-[var(--nxg-navy)] focus:outline-none focus:ring-2 focus:ring-[var(--nxg-navy)]/15"

export default function HomeEstimateForm() {
  const [values, setValues] = useState(initialValues)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [website, setWebsite] = useState("")

  function update<K extends keyof EstimateValues>(key: K, value: EstimateValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website,
          type: "estimate",
          projectType: values.service,
          message: `Homepage estimate request for ${values.service}.`,
        }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) throw new Error(result?.error || "Your request could not be submitted.")
      setSubmitted(true)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Your request could not be submitted.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div role="status" className="border border-[var(--nxg-line)] bg-white p-6 sm:p-8">
        <p className="section-kicker">Request received</p>
        <h2 className="mt-3 text-2xl font-semibold text-[var(--nxg-navy)]">We’ll be in touch.</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--nxg-muted)]">
          Your estimate request is with our team. We’ll follow up using the contact details you provided.
        </p>
        <Link href="/services" className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] underline-offset-4">
          Explore our services
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="home-estimate-website">Leave this field empty</label>
        <input
          id="home-estimate-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="home-estimate-name" className="mb-1.5 block text-xs font-medium text-[var(--nxg-charcoal)]">Name</label>
        <input
          id="home-estimate-name"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={120}
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          className={inputClass}
          placeholder="Your full name"
        />
      </div>
      <div>
        <label htmlFor="home-estimate-email" className="mb-1.5 block text-xs font-medium text-[var(--nxg-charcoal)]">Email</label>
        <input
          id="home-estimate-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="home-estimate-phone" className="mb-1.5 block text-xs font-medium text-[var(--nxg-charcoal)]">Phone</label>
        <input
          id="home-estimate-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          minLength={7}
          maxLength={50}
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          className={inputClass}
          placeholder="Your phone number"
        />
      </div>
      <div>
        <label htmlFor="home-estimate-service" className="mb-1.5 block text-xs font-medium text-[var(--nxg-charcoal)]">What can we help with?</label>
        <select
          id="home-estimate-service"
          name="service"
          required
          value={values.service}
          onChange={(event) => update("service", event.target.value)}
          className={inputClass}
        >
          <option value="" disabled>Select a service</option>
          <option>Exterior painting</option>
          <option>Interior painting</option>
          <option>Cabinet refinishing</option>
          <option>Deck staining</option>
          <option>Fine finish and millwork</option>
          <option>Color consultation</option>
          <option>Pressure cleaning</option>
          <option>Paint restoration</option>
          <option>Protective coatings</option>
          <option>Commercial coatings</option>
          <option>Industrial coatings</option>
          <option>Other</option>
        </select>
      </div>
      {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="flex min-h-12 w-full items-center justify-center gap-3 bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--nxg-navy)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending request..." : "Request an estimate"}
        <span aria-hidden="true">↗</span>
      </button>
      <p className="text-center text-[11px] leading-5 text-[var(--nxg-muted)]">
        No obligation. We’ll follow up to learn more about your project.
      </p>
    </form>
  )
}
