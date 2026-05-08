"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function BlogNewsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail("")
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
          <p className="text-green-300 font-medium">Thank you for subscribing!</p>
          <p className="text-blue-100 text-sm mt-1">Check your email for confirmation.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white text-gray-900 placeholder:text-gray-500"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-brand-blue hover:bg-gray-100"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}

      <p className="text-blue-200 text-xs mt-3">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  )
}