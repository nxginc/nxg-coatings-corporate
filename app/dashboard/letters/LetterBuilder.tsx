"use client"

import { useState } from "react"
import Link from "next/link"
import { BrandLetterTemplate } from "@/components/brand-letter-template"
import { corporateProfile } from "@/data/corporate-profile"

function today() {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date())
}

export default function LetterBuilder() {
  const [recipientName, setRecipientName] = useState("")
  const [recipientOrganization, setRecipientOrganization] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [date, setDate] = useState(today)
  const [reference, setReference] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-[#141629] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/dashboard" className="text-sm font-semibold text-[#173d9c] underline underline-offset-4 print:hidden">
          Back to admin workspace
        </Link>
        <div className="mt-5 flex flex-col gap-4 border-b border-[#c0c0c0] pb-6 sm:flex-row sm:items-end sm:justify-between print:hidden">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#070a2c]">Letterhead composer</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Company contact fields are prefilled from the supplied letterhead. Review the recipient and copy before
              printing or saving as PDF.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded bg-[#214bb6] px-5 text-sm font-semibold text-white hover:bg-[#173d9c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#070a2c]"
          >
            Print or save PDF
          </button>
        </div>

        <div className="mt-7 grid items-start gap-8 lg:grid-cols-[.75fr_1.25fr] print:block">
          <form className="space-y-4 rounded border border-slate-200 bg-white p-5 print:hidden">
            <h2 className="text-lg font-semibold text-[#070a2c]">Letter details</h2>
            <label className="block text-sm font-medium">
              Recipient name
              <input
                value={recipientName}
                onChange={(event) => setRecipientName(event.target.value)}
                maxLength={160}
                className="mt-1.5 h-11 w-full rounded border border-slate-300 px-3 text-base"
              />
            </label>
            <label className="block text-sm font-medium">
              Organization
              <input
                value={recipientOrganization}
                onChange={(event) => setRecipientOrganization(event.target.value)}
                maxLength={180}
                className="mt-1.5 h-11 w-full rounded border border-slate-300 px-3 text-base"
              />
            </label>
            <label className="block text-sm font-medium">
              Address
              <textarea
                value={recipientAddress}
                onChange={(event) => setRecipientAddress(event.target.value)}
                rows={3}
                maxLength={500}
                className="mt-1.5 w-full rounded border border-slate-300 px-3 py-2 text-base"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-medium">
                Date
                <input
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  maxLength={80}
                  className="mt-1.5 h-11 w-full rounded border border-slate-300 px-3 text-base"
                />
              </label>
              <label className="block text-sm font-medium">
                Reference (optional)
                <input
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  maxLength={80}
                  className="mt-1.5 h-11 w-full rounded border border-slate-300 px-3 text-base"
                />
              </label>
            </div>
            <label className="block text-sm font-medium">
              Subject
              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                maxLength={180}
                className="mt-1.5 h-11 w-full rounded border border-slate-300 px-3 text-base"
              />
            </label>
            <label className="block text-sm font-medium">
              Letter text
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={12}
                maxLength={12000}
                className="mt-1.5 w-full rounded border border-slate-300 px-3 py-2 text-base leading-6"
              />
            </label>
            <p className="text-xs leading-5 text-slate-600">
              This tool creates a local preview only. It does not send mail or make legal, pricing, or project
              commitments.
            </p>
            <p className="text-xs text-slate-500">
              Prefilled sender: {corporateProfile.legalName} · {corporateProfile.contact.email}
            </p>
          </form>

          <BrandLetterTemplate
            document={{
              recipientName,
              recipientOrganization,
              recipientAddress,
              date,
              reference,
              subject,
              body,
            }}
          />
        </div>
      </div>
    </main>
  )
}
