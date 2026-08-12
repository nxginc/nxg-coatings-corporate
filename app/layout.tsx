import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Fraunces } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://nxgcoatings.com"),
  title: {
    default: "NXG Coatings — Premium Painting & Protective Coatings",
    template: "%s · NXG Coatings",
  },
  description:
    "Architect-grade painting and protective coatings for homes, HOAs, commercial, and industrial properties. Precision surface preparation, durable finishes, and a guaranteed result.",
  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      url: "https://ik.imagekit.io/j98e6hcfnkn/favicon_io/favicon-16x16_f57qqfaSC.png?updatedAt=1741369090544",
      sizes: "16x16",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "https://ik.imagekit.io/j98e6hcfnkn/favicon_io/favicon-32x32_uPDW_R2Cd.png?updatedAt=1741369090476",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      url: "https://ik.imagekit.io/j98e6hcfnkn/favicon_io/apple-touch-icon_yKAQZFqzxN.png?updatedAt=1741369090862",
    },
    {
      rel: "mask-icon",
      url: "https://ik.imagekit.io/j98e6hcfnkn/favicon_io/android-chrome-512x512_GHPz6HAEF.png?updatedAt=1741369090727",
      color: "#003399",
    },
  ],
  appleWebApp: {
    title: "NXG Coatings",
    statusBarStyle: "default",
  },
  // Moved viewport + themeColor to dedicated viewport export per Next.js guidance
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nxgcoatings.com",
    title: "NXG Coatings - Professional Painting & Coating Services",
    description: "Transform and protect your property with expert coating solutions from NXG Coatings.",
    siteName: "NXG Coatings",
  },
  twitter: {
    card: "summary_large_image",
    title: "NXG Coatings - Professional Painting & Coating Services",
    description: "Transform and protect your property with expert coating solutions from NXG Coatings.",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#003399'
}

const calComUrl = process.env.NEXT_PUBLIC_CAL_COM_URL
const bookingPhone = process.env.NEXT_PUBLIC_BOOKING_PHONE
const bookingEmail = process.env.NEXT_PUBLIC_BOOKING_EMAIL

// Use these variables in your CTAs, scheduling, and marketing scripts

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} bg-background`}>
      <head>
        <link rel="icon" href="https://ik.imagekit.io/j98e6hcfnkn/favicon_io/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
