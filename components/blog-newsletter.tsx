"use client"

import type React from "react"

import { useState } from "react"
import { FancyButton } from "@/components/ui/fancy-button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Mail, CheckCircle } from "lucide-react"

export default function BlogNewsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubscribed(true)
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      })
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-r from-brand-blue/10 to-brand-lightBlue/5 rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="h-6 w-6 text-brand-blue" />
        <h3 className="text-xl font-bold">Subscribe to Our Newsletter</h3>
      </div>

      <p className="text-gray-600 mb-6">
        Get the latest painting tips, trends, and special offers delivered straight to your inbox.
      </p>

      {isSubscribed ? (
        <div className="flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded-lg">
          <CheckCircle className="h-5 w-5" />
          <p className="font-medium">Thank you for subscribing!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white"
            />
          </div>

          <FancyButton type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </FancyButton>

          <p className="text-xs text-gray-500 text-center">We respect your privacy. Unsubscribe at any time.</p>
        </form>
      )}
    </div>
  )
}
