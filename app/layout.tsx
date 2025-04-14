import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NXG Coatings - Professional Painting & Coating Services",
  description: "Transform and protect your property with expert coating solutions from NXG Coatings.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <Header />
          <div className="pt-16">{children}</div>
          <Footer />
          <Toaster />
        </>
      </body>
    </html>
  )
}


import './globals.css'