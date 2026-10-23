"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import type { FormEvent } from "react"

export default function BlogNewsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [consent, setConsent] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    const form = e.currentTarget
    const websiteTrap = String(new FormData(form).get("websiteTrap") || "")
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, websiteTrap }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) throw new Error(result?.error || "Signup could not be saved.")
      setIsSubmitted(true)
      setEmail("")
      setConsent(false)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Signup could not be saved.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-brand-blue text-white rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Mail className="w-6 h-6 mr-2" />
        <h3 className="text-lg font-semibold">Stay Updated</h3>
      </div>

      <p className="text-blue-100 mb-4">
        Get the latest painting tips, industry news, and exclusive offers delivered to your inbox.
      </p>

      {isSubmitted ? (
        <div className="text-center">
          <p className="text-green-300 font-medium">Signup request recorded.</p>
          <p className="text-blue-100 text-sm mt-1">Email delivery remains pending until the newsletter connection is enabled.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="sr-only" aria-hidden="true">Leave this field empty<input name="websiteTrap" tabIndex={-1} autoComplete="off" /></label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white text-gray-900 placeholder:text-gray-500"
          />
          <label className="flex items-start gap-2 text-xs leading-5 text-blue-100"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-1" /><span>I agree to receive occasional NXG email updates. I can unsubscribe later.</span></label>
          <Button
            type="submit"
            disabled={isSubmitting || !consent}
            className="w-full bg-white text-brand-blue hover:bg-gray-100"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}

      {error && <p role="alert" className="mt-3 text-sm text-red-200">{error}</p>}

      <p className="text-blue-200 text-xs mt-3">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  )
}