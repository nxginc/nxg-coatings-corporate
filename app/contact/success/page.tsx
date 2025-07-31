import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, ArrowLeft, Mail, Phone } from "lucide-react"
import { FancyButton } from "@/components/ui/fancy-button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Thank You | NXG Coatings",
  description: "Thank you for contacting NXG Coatings. We'll be in touch soon!",
}

export default function ContactSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardContent className="p-12 text-center">
              {/* Success Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                  <div className="absolute -inset-2 bg-green-200 rounded-full opacity-20 animate-ping"></div>
                </div>
              </div>

              {/* Thank You Message */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Thank You!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your message has been received successfully.
              </p>

              {/* Confirmation Details */}
              <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
                <h2 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  What happens next?
                </h2>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>You'll receive an email confirmation shortly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Our team will review your request within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>We'll contact you to schedule a free consultation</span>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-8 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Need immediate assistance?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>info@nxgcoatings.com</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <FancyButton variant="default" className="w-full sm:w-auto">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </FancyButton>
                </Link>
                <Link href="/services">
                  <FancyButton variant="outline" className="w-full sm:w-auto">
                    View Our Services
                  </FancyButton>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
