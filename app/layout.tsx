import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { seo } from "@/lib/seo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...seo("home", "/"),
  manifest: "/manifest.json",
  icons: [{ rel: "icon", url: "/favicon.ico", sizes: "any" }],
  appleWebApp: { title: "NXG Coatings", statusBarStyle: "default" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C1D34",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
