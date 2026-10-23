"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { FancyButton } from "@/components/ui/fancy-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ASSETS } from "@/lib/assets"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", { email, password, redirect: false })
      if (!result || result.error) {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
        return
      }

      toast({ title: "Login successful", description: "You are signed in." })
      router.replace("/dashboard")
      router.refresh()
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--nxg-paper)] px-4 py-12 text-[var(--nxg-charcoal)] sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 border border-[var(--nxg-line)] bg-white p-8 sm:p-10">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src={ASSETS.logo.primary}
              alt="NXG Coatings Logo"
              width={180}
              height={45}
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-3xl font-medium text-[var(--nxg-navy)]">Sign in to your account</h1>
          <p className="mt-2 text-sm text-[var(--nxg-muted)]">Enter your credentials to access your dashboard.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="mailto:info@nxgcoatingsinc.com?subject=Dashboard%20access%20help" className="text-sm font-medium text-[var(--nxg-navy)] underline decoration-[var(--nxg-red)] underline-offset-4">
                  Need login help?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <FancyButton type="submit" variant="shine" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </FancyButton>
          </div>
        </form>
      </div>
    </main>
  )
}
