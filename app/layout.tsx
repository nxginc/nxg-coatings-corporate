import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { seo } from "@/lib/seo"
import { NXG_SERVICE_KNOWLEDGE, NXG_SITE } from "@/lib/site-metadata"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...seo("home", "/"),
  title: { default: "NXG Coatings Inc. | Professional Painting & Coating Services", template: "%s | NXG Coatings" },
  metadataBase: new URL(NXG_SITE.url),
  applicationName: NXG_SITE.shortName,
  authors: [{ name: NXG_SITE.name }],
  creator: NXG_SITE.name,
  publisher: NXG_SITE.name,
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  icons: [{ rel: "icon", url: "/favicon.ico", sizes: "any" }],
  appleWebApp: { title: NXG_SITE.shortName, statusBarStyle: "black-translucent" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: NXG_SITE.themeColor,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: NXG_SITE.name,
              url: NXG_SITE.url,
              telephone: NXG_SITE.phoneE164,
              email: NXG_SITE.email,
              description: NXG_SITE.description,
              areaServed: NXG_SITE.serviceAreas,
              knowsAbout: NXG_SERVICE_KNOWLEDGE,
            }),
          }}
        />
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
