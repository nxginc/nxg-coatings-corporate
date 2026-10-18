"use client"

import { useRef, useState, type FormEvent } from "react"

type QuoteValues = {
    projectType: string
    address: string
    message: string
    assessment: "virtual" | "on-site"
    preferredDate: string
    name: string
    email: string
    phone: string
}

const initialValues: QuoteValues = {
    projectType: "",
    address: "",
    message: "",
    assessment: "virtual",
    preferredDate: "",
    name: "",
    email: "",
    phone: "",
}

const fieldClass = "min-h-12 w-full border border-[var(--nxg-line)] bg-white px-3 text-sm focus:border-[var(--nxg-navy)]"
const labelClass = "mb-2 block text-xs font-semibold text-[var(--nxg-navy)]"

export function MultiStepForm() {
    const [values, setValues] = useState(initialValues)
    const [step, setStep] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [received, setReceived] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    function update<K extends keyof QuoteValues>(key: K, value: QuoteValues[K]) {
        setValues((current) => ({ ...current, [key]: value }))
    }

    function nextStep() {
        const panel = formRef.current?.querySelector<HTMLElement>(`[data-quote-step="${step}"]`)
        const invalid = panel?.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(":invalid")
        if (invalid) {
            invalid.reportValidity()
            return
        }
        setError("")
        setStep((current) => Math.min(current + 1, 2))
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
                    type: values.assessment === "virtual" ? "virtual_quote" : "estimate",
                    service: values.projectType,
                    message: `${values.message}\n\nProject address: ${values.address}\nAssessment preference: ${values.assessment}`,
                }),
            })
            const result = await response.json().catch(() => null)
            if (!response.ok) throw new Error(result?.error || "Your request could not be submitted.")
            setReceived(true)
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "Your request could not be submitted.")
        } finally {
            setSubmitting(false)
        }
    }

    if (received) {
        return <div role="status" className="border border-[var(--nxg-line)] bg-white p-6 sm:p-8">
            <p className="section-kicker">Request received</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--nxg-navy)]">Your project is in review.</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--nxg-muted)]">An NXG team member will follow up using the contact information provided. A virtual request is not a final or binding estimate.</p>
        </div>
    }

    return <form ref={formRef} onSubmit={submit} className="space-y-6">
        <ol className="grid grid-cols-3 border-y border-[var(--nxg-line)] py-4 text-[10px] font-semibold uppercase tracking-[0.1em]">
            {["Project", "Contact", "Review"].map((title, index) => <li key={title} aria-current={step === index ? "step" : undefined} className={step === index ? "text-[var(--nxg-red)]" : "text-[var(--nxg-muted)]"}><span className="mr-2">0{index + 1}</span>{title}</li>)}
        </ol>

        <fieldset data-quote-step="0" disabled={step !== 0} hidden={step !== 0} className="grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2"><span className={labelClass}>What kind of project? *</span><select className={fieldClass} required value={values.projectType} onChange={(event) => update("projectType", event.target.value)}><option value="" disabled>Select a service</option><option>Exterior painting</option><option>Interior painting</option><option>Cabinet refinishing</option><option>Deck staining</option><option>Commercial painting</option><option>Industrial coatings</option><option>Other</option></select></label>
            <label className="sm:col-span-2"><span className={labelClass}>Project address *</span><input className={fieldClass} required maxLength={240} autoComplete="street-address" value={values.address} onChange={(event) => update("address", event.target.value)} /></label>
            <label className="sm:col-span-2"><span className={labelClass}>Project details *</span><textarea className="min-h-28 w-full border border-[var(--nxg-line)] p-3 text-sm focus:border-[var(--nxg-navy)]" required minLength={8} maxLength={5000} value={values.message} onChange={(event) => update("message", event.target.value)} placeholder="Surfaces, approximate scope, timing, or access considerations" /></label>
            <fieldset className="sm:col-span-2"><legend className={labelClass}>How should we review it?</legend><div className="flex flex-wrap gap-5 text-sm"><label className="flex items-center gap-2"><input type="radio" name="assessment" checked={values.assessment === "virtual"} onChange={() => update("assessment", "virtual")} />Virtual review</label><label className="flex items-center gap-2"><input type="radio" name="assessment" checked={values.assessment === "on-site"} onChange={() => update("assessment", "on-site")} />On-site consultation</label></div></fieldset>
        </fieldset>

        <fieldset data-quote-step="1" disabled={step !== 1} hidden={step !== 1} className="grid gap-5 sm:grid-cols-2">
            <label><span className={labelClass}>Full name *</span><input className={fieldClass} required minLength={2} maxLength={120} autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} /></label>
            <label><span className={labelClass}>Email *</span><input className={fieldClass} required type="email" maxLength={254} autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} /></label>
            <label><span className={labelClass}>Phone *</span><input className={fieldClass} required type="tel" minLength={7} maxLength={50} autoComplete="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} /></label>
            <label><span className={labelClass}>Preferred date</span><input className={fieldClass} type="date" value={values.preferredDate} onChange={(event) => update("preferredDate", event.target.value)} /></label>
        </fieldset>

        <fieldset data-quote-step="2" disabled={step !== 2} hidden={step !== 2} className="border border-[var(--nxg-line)] bg-[var(--nxg-paper)] p-5">
            <legend className={labelClass}>Review your request</legend>
            <dl className="grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-[var(--nxg-muted)]">Project</dt><dd className="mt-1 font-semibold">{values.projectType}</dd></div><div><dt className="text-[var(--nxg-muted)]">Review preference</dt><dd className="mt-1 font-semibold">{values.assessment === "virtual" ? "Virtual review" : "On-site consultation"}</dd></div><div><dt className="text-[var(--nxg-muted)]">Contact</dt><dd className="mt-1 font-semibold">{values.name} · {values.email}</dd></div><div><dt className="text-[var(--nxg-muted)]">Address</dt><dd className="mt-1 font-semibold">{values.address}</dd></div></dl>
            <p className="mt-5 text-xs leading-5 text-[var(--nxg-muted)]">Need to share photos? We will coordinate a secure upload after receiving your request.</p>
        </fieldset>

        {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
        <div className="flex flex-wrap justify-between gap-3"><button type="button" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0 || submitting} className="min-h-12 border border-[var(--nxg-line)] px-5 text-xs font-semibold uppercase tracking-[0.1em] disabled:opacity-40">Back</button>{step < 2 ? <button type="button" onClick={nextStep} className="min-h-12 bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.1em] text-white">Continue <span aria-hidden="true">→</span></button> : <button type="submit" disabled={submitting} className="min-h-12 bg-[var(--nxg-red)] px-5 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-60">{submitting ? "Sending..." : "Send estimate request"}</button>}</div>
    </form>
}