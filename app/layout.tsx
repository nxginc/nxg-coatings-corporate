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
<<<<<<< HEAD
    {
      rel: "apple-touch-icon",
      url: "https://ik.imagekit.io/j98e6hcfnkn/favicon_io/apple-touch-icon_yKAQZFqzxN.png?updatedAt=1741369090862",
    },
    {
      rel: "mask-icon",
      url: "https://ik.imagekit.io/j98e6hcfnkn/favicon_io/android-chrome-512x512_GHPz6HAEF.png?updatedAt=1741369090727",
      color: "#003399",
    },
=======
    // ...existing code...
>>>>>>> production
  ],
  appleWebApp: {
    title: "NXG Coatings",
    statusBarStyle: "default",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#003399",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://ik.imagekit.io/j98e6hcfnkn/favicon_io/favicon.ico" sizes="any" />
      </head>
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
