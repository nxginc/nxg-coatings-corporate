"use client"

import ConsultationBooking from "@/components/consultation-booking"
import ParallaxFeatures from "@/components/parallax-features"
import ServicesSlider from "@/components/services-slider"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import EnhancedHero from "@/components/enhanced-hero"
import IndustrySection from "@/components/industry-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Professional Coating Solutions for Your Home"
        description="Transform and protect your property with our expert coating services. Schedule a consultation today."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/featured/featured-home/f2_ElysbPaNW.jpg?updatedAt=1704333595263"
        height="large"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <CTAModal
            trigger={
              <FancyButton variant="shine" size="xl" hasArrow={true} rounded="full">
                Get Free Estimate
              </FancyButton>
            }
          />
          <FancyButton
            variant="outline"
            size="xl"
            rounded="full"
            className="bg-transparent border-white text-white hover:bg-white/10"
            onClick={() => window.open("https://cal.com/nxgcoatings/virtual-consultation", "_blank")}
          >
            Book Consultation
          </FancyButton>
        </div>
      </EnhancedHero>

      {/* Services Slider Section */}
      <ServicesSlider />

      {/* Parallax Features Section */}
      <ParallaxFeatures />

      {/* Brands Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-brand-blue">Brands We Trust</h2>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {[
              "https://ik.imagekit.io/j98e6hcfnkn/brands/sherwin_x0balia5r.png?updatedAt=1704482056350&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/twp_mofKht_Yti.png?updatedAt=1704482056038&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/865-8653104_an-overview-of-ppg-industries-ppg-paint-logo_uOGzYhyVWm.png?updatedAt=1704482054644&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/ppg_72GtAY2fS.png?updatedAt=1704482054463&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/farrow&ball_AtEwe40la.webp?updatedAt=1704482054465&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/magnolia-logo-black_FVFQThcfSg.png?updatedAt=1704482054395&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/cabot-logo_gCTy1X9Oy.png?updatedAt=1704482054348&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/renner_d5BI9PU7hG.png?updatedAt=1704482054333&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/farrowball_wkBZIHRTY.png?updatedAt=1704482054314&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/rust-olem_axvMGYW5l.png?updatedAt=1704482054295&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/gliden_S0_soZxas.jpeg?updatedAt=1704482054246&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/BenjaminMoore-logo_WWKOQ2irq.webp?updatedAt=1704482054279&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/ICS_iPZssAka4.png?updatedAt=1704482015375&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/ppg_proluxe_MW-ZtyG1Y.jpg?updatedAt=1704482015138&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/axalta_yjszcOl2V.jpeg?updatedAt=1704482015100&tr=n-ik_ml_thumbnail",
              "https://ik.imagekit.io/j98e6hcfnkn/brands/ppg_US1whj-sz.png?updatedAt=1704482015058&tr=n-ik_ml_thumbnail"
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Brand logo"
                className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Industry Section */}
      <IndustrySection />

      {/* Consultation Booking Section */}
      <ConsultationBooking />

      {/* Blog Preview Section */}
      {/* <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest From Our Blog</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/blog-6_LmokjCe1Xb.jpg?updatedAt=1741213087003"
                  alt="Peeling exterior paint on house siding"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-white text-xl font-bold p-6">How to Repair Peeling Exterior House Paint</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Peeling paint is one of the most common issues homeowners face. Learn how to restore your home's
                  exterior with our step-by-step guide.
                </p>
                <Link href="/blog/repair-peeling-exterior-paint">
                  <FancyButton variant="link" hasArrow={true} className="p-0">
                    Read Full Article
                  </FancyButton>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-blue-200 relative">
                <Image
                  src="https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog1_o0PS2vfo9K.jpeg?updatedAt=1741212349688"
                  alt="Professional exterior coating application"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-white text-xl font-bold p-6">5 Benefits of Professional Exterior Coating</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Discover how professional exterior coating can protect your home, increase its value, and reduce
                  maintenance costs over time.
                </p>
                <Link href="/blog/benefits-of-professional-exterior-coating">
                  <FancyButton variant="link" hasArrow={true} className="p-0">
                    Read Full Article
                  </FancyButton>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <FancyButton variant="outline" size="lg" rounded="full">
                View All Blog Posts
              </FancyButton>
            </Link>
          </div>
        </div>
      </section> */}
    </main>
  )
}
