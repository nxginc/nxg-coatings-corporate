import type { Metadata } from "next"
import Link from "next/link"
import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"

export const metadata: Metadata = {
  title: "Privacy Policy | NXG Coatings",
  description: "Learn about how NXG Coatings collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <EnhancedHero
        title="Privacy Policy"
        subtitle="Learn about how NXG Coatings collects, uses, and protects your personal information and privacy rights."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/services/banner_4xUQ8Hf5X.jpeg?updatedAt=1747919188438"
        height="medium"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-gray-500 mb-8">Last Updated: March 14, 2025</p>

            <h2>Introduction</h2>
            <p>
              NXG Coatings Inc. ("we," "our," or "us") respects your privacy and is committed to protecting your
              personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
              please do not access the site or use our services.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect information about you in a variety of ways, including:</p>
            <h3>Personal Data</h3>
            <p>
              When you interact with our website or services, we may collect personal information that identifies you,
              such as your:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Mailing address</li>
              <li>Payment information</li>
            </ul>

            <h3>Usage Data</h3>
            <p>We may also collect information about how you access and use our website, including:</p>
            <ul>
              <li>Your IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Pages you visit</li>
              <li>Time and date of your visit</li>
              <li>Time spent on those pages</li>
              <li>Other statistics</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect about you for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve your experience</li>
            </ul>

            <h2>Disclosure of Your Information</h2>
            <p>We may share information we have collected about you in certain situations, including:</p>
            <h3>Business Transfers</h3>
            <p>
              If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information
              may be transferred as part of that transaction.
            </p>
            <h3>Third-Party Service Providers</h3>
            <p>
              We may share your information with third-party vendors, service providers, contractors, or agents who
              perform services for us or on our behalf.
            </p>
            <h3>Legal Requirements</h3>
            <p>
              We may disclose your information where required to do so by law or in response to valid requests by public
              authorities.
            </p>

            <h2>Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information
              from unauthorized access, use, or disclosure. However, no website or internet transmission is completely
              secure.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
            <ul>
              <li>The right to access personal information we hold about you</li>
              <li>The right to request correction of inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to object to processing of your information</li>
              <li>The right to data portability</li>
            </ul>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
            <p>
              NXG Coatings Inc.
              <br />
              5200 Willson Blvd STE 150
              <br />
              Edina, MN 55424
              <br />
              Email: privacy@nxgcoatingsinc.com
              <br />
              Phone: (952) 900-4222
            </p>
          </div>

          <div className="max-w-4xl mx-auto mt-12 text-center">
            <Link href="/contact">
              <FancyButton variant="gradient" size="lg" rounded="full">
                Contact Us With Questions
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
