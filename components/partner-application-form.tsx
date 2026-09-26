"use client"

import { useState, type FormEvent } from "react"

export default function PartnerApplicationForm() {
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState("")
    const [submitted, setSubmitted] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setSubmitting(true)
        setMessage("")

        const form = event.currentTarget
        const values = Object.fromEntries(new FormData(form))
        const payload = {
            ...values,
            acceptTerms: values.acceptTerms === "on",
            directoryConsent: values.directoryConsent === "on",
        }

        try {
            const response = await fetch("/api/partners", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                const result = await response.json().catch(() => null)
                throw new Error(result?.error || "We could not submit your application.")
            }

            form.reset()
            setSubmitted(true)
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "We could not submit your application.")
        } finally {
            setSubmitting(false)
        }
    }

    if (submitted) {
        return <div role="status" className="border border-[var(--nxg-line)] bg-white p-6 sm:p-8">
            <p className="section-kicker">Application received</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--nxg-navy)]">Thank you for your interest.</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--nxg-muted)]">Our team will review your information. This submission is not approval to represent or work on behalf of NXG Coatings.</p>
        </div>
    }

    const inputClass = "min-h-12 w-full border border-[var(--nxg-line)] bg-white px-3 text-sm text-[var(--nxg-charcoal)] placeholder:text-[var(--nxg-muted)] focus:border-[var(--nxg-navy)]"
    const labelClass = "mb-2 block text-xs font-semibold text-[var(--nxg-navy)]"

    return <form onSubmit={handleSubmit} className="border border-[var(--nxg-line)] bg-white p-5 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
            <label><span className={labelClass}>Company name *</span><input className={inputClass} name="company" autoComplete="organization" required minLength={2} maxLength={160} /></label>
            <label><span className={labelClass}>Primary contact *</span><input className={inputClass} name="contactName" autoComplete="name" required minLength={2} maxLength={120} /></label>
            <label><span className={labelClass}>Email *</span><input className={inputClass} name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            <label><span className={labelClass}>Phone *</span><input className={inputClass} name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={50} /></label>
            <label><span className={labelClass}>Trade *</span><select className={inputClass} name="trade" required defaultValue=""><option value="" disabled>Select a trade</option><option>Painting</option><option>Drywall</option><option>Carpentry and millwork</option><option>Flooring</option><option>Pressure washing</option><option>Other specialty trade</option></select></label>
            <label><span className={labelClass}>Service areas *</span><input className={inputClass} name="serviceAreas" required maxLength={500} placeholder="Cities or counties served" /></label>
            <label><span className={labelClass}>Website or portfolio</span><input className={inputClass} name="website" type="url" maxLength={200} placeholder="https://" /></label>
            <label><span className={labelClass}>Years in business</span><input className={inputClass} name="yearsInBusiness" maxLength={20} inputMode="numeric" /></label>
            <label><span className={labelClass}>License number</span><input className={inputClass} name="licenseNumber" maxLength={100} /></label>
            <label><span className={labelClass}>Insurance provider</span><input className={inputClass} name="insuranceProvider" maxLength={160} /></label>
        </div>
        <label className="mt-5 block"><span className={labelClass}>Tell us about your team</span><textarea className="min-h-28 w-full border border-[var(--nxg-line)] bg-white p-3 text-sm focus:border-[var(--nxg-navy)]" name="message" maxLength={3000} /></label>
        <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-[var(--nxg-muted)]"><input className="mt-1 accent-[var(--nxg-red)]" name="acceptTerms" type="checkbox" required /><span>I confirm that the information is accurate and agree that NXG Coatings may contact me about this application.</span></label>
        <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-[var(--nxg-muted)]"><input className="mt-1 accent-[var(--nxg-red)]" name="directoryConsent" type="checkbox" /><span>If approved, I agree that my company name, trade, service areas, and website may appear in the public partner directory. Contact details will not be listed.</span></label>
        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label>Leave this field empty<input name="websiteTrap" tabIndex={-1} autoComplete="off" /></label></div>
        {message && <p role="alert" className="mt-4 text-sm text-red-800">{message}</p>}
        <button className="mt-6 inline-flex min-h-12 items-center gap-6 bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--nxg-navy)] disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting}>{submitting ? "Submitting..." : "Submit application"}<span aria-hidden="true" className="text-xl">↗</span></button>
    </form>
}