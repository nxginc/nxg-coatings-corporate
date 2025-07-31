import type { Metadata } from "next"
import Link from "next/link"
import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"

export const metadata: Metadata = {
  title: "Terms of Service | NXG Coatings",
  description: "Read the terms and conditions governing the use of NXG Coatings services and website.",
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <EnhancedHero
        title="Terms of Service"
        subtitle="Review the terms and conditions governing the use of NXG Coatings services and website access."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/services/banner_4xUQ8Hf5X.jpeg?updatedAt=1747919188438"
        height="medium"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-gray-500 mb-8">Last Updated: March 14, 2025</p>

            <h2>Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you and NXG Coatings Inc.
              ("we," "us," or "our"), concerning your access to and use of our website and services.
            </p>
            <p>
              By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of
              the terms, you may not access our services.
            </p>

            <h2>Services</h2>
            <p>
              NXG Coatings Inc. provides professional painting and coating services for residential, commercial, and
              industrial properties. Our services include, but are not limited to, exterior painting, interior painting,
              deck staining, cabinet refinishing, and color consultation.
            </p>

            <h2>Estimates and Quotes</h2>
            <p>
              Estimates and quotes provided by NXG Coatings are based on the information provided by the client and our
              assessment of the project requirements. Estimates are valid for 30 days from the date of issuance unless
              otherwise specified.
            </p>
            <p>
              Additional work or changes to the scope of work after the initial estimate may result in additional
              charges. We will communicate any changes to the estimate before proceeding with additional work.
            </p>

            <h2>Payment Terms</h2>
            <p>Payment terms are as follows:</p>
            <ul>
              <li>A 25% deposit is required to secure your place in our schedule.</li>
              <li>The remaining balance is due upon completion of the project and your satisfaction with the work.</li>
              <li>We accept checks, credit cards, and electronic payments.</li>
            </ul>
            <p>Late payments may be subject to a 1.5% monthly interest charge on the unpaid balance.</p>

            <h2>Warranties</h2>
            <p>
              NXG Coatings Inc. provides a 2-year warranty on labor. Additionally, the paint and coating products we use
              come with manufacturer warranties ranging from 5-25 years depending on the product.
            </p>
            <p>Our warranty does not cover damage caused by:</p>
            <ul>
              <li>Acts of nature (storms, floods, etc.)</li>
              <li>Structural defects or movement</li>
              <li>Improper maintenance</li>
              <li>Alterations made by others</li>
            </ul>

            <h2>Cancellation Policy</h2>
            <p>
              If you need to cancel a scheduled project, please notify us at least 72 hours in advance. Cancellations
              made less than 72 hours before the scheduled start date may be subject to a cancellation fee of 10% of the
              project estimate.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The content on our website, including text, graphics, logos, images, and software, is the property of NXG
              Coatings Inc. and is protected by copyright and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
              republish, download, store, or transmit any of the material on our website without our prior written
              consent.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              In no event shall NXG Coatings Inc., its officers, directors, employees, or agents, be liable to you for
              any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from
              any:
            </p>
            <ul>
              <li>Errors, mistakes, or inaccuracies of content</li>
              <li>Personal injury or property damage related to your use of our services</li>
              <li>
                Unauthorized access to or use of our secure servers and/or any personal information stored therein
              </li>
              <li>Interruption or cessation of transmission to or from our website</li>
              <li>Bugs, viruses, trojan horses, or the like that may be transmitted to or through our website</li>
            </ul>

            <h2>Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless NXG Coatings Inc. and its officers, directors,
              employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities,
              costs or debt, and expenses arising from your use of and access to our services.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and defined following the laws of the State of Minnesota. NXG Coatings
              Inc. and yourself irrevocably consent to the exclusive jurisdiction of the courts in Hennepin County,
              Minnesota for any legal action arising from these Terms.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the
              new Terms on this page and updating the "Last Updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>If you have questions about these Terms, please contact us at:</p>
            <p>
              NXG Coatings Inc.
              <br />
              5200 Willson Blvd STE 150
              <br />
              Edina, MN 55424
              <br />
              Email: legal@nxgcoatingsinc.com
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
