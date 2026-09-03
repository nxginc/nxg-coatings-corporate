import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-10 text-sm text-gray-600">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} NXG Coatings. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-blue">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand-blue">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-brand-blue">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
