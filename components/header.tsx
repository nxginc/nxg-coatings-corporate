"use client"

import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501"
            alt="NXG Coatings Logo"
            width={140}
            height={36}
            className="h-9 w-auto"
          />
        </Link>
        <nav className="hidden gap-6 md:flex text-sm font-medium">
          <Link href="/services" className="hover:text-brand-blue">
            Services
          </Link>
          <Link href="/industries" className="hover:text-brand-blue">
            Industries
          </Link>
          <Link href="/gallery" className="hover:text-brand-blue">
            Gallery
          </Link>
          <Link href="/contact" className="hover:text-brand-blue">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
