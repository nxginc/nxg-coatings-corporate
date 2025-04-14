"use client"

import type React from "react"

export function SessionProvider({ children, session }: { children: React.ReactNode; session?: any }) {
  // For demo purposes, we'll render children directly without the actual provider
  // This avoids unnecessary API calls to the NextAuth endpoints
  return <>{children}</>
}
