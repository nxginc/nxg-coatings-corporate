import type { Metadata } from "next"
import Link from "next/link"
import EnhancedHero from "@/components/enhanced-hero"
import { FancyButton } from "@/components/ui/fancy-button"
import { CTAModal } from "@/components/cta-modal"
import {
  MessageCircle,
  FileText,
  Hammer,
  PaintBucket,
  CheckSquare,
  ThumbsUp,
  ArrowRight,
  Clock,
  Shield,
  Award,
} from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Our Process | NXG Coatings",
  description:
    "Learn about our proven 6-step process that ensures exceptional results on every painting and coating project.",
}

export default function ProcessPage() {
  const processSteps = [
    {
      id: 1,
      icon: MessageCircle,
      title: "Initial Consultation",
      description:
        "We begin with a thorough consultation to understand your vision, requirements, and timeline. Our experts will assess your property, discuss your goals, and answer any questions.",
      cta: "Schedule consultation",
      link: "https://cal.com/nxgcoatings/virtual-consultation",
      image: "/images/process/consultation.png",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      id: 2,
      icon: FileText,
      title: "Detailed Proposal",
      description:
        "Based on our consultation, we provide a comprehensive proposal outlining the scope of work, timeline, materials, and pricing. Our transparent approach ensures you know exactly what to expect.",
      cta: "Request proposal",
      link: "/quote",
      image: "/images/process/proposal.png",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      id: 3,
      icon: Hammer,
      title: "Preparation",
      description:
        "Proper preparation is crucial for a lasting finish. Our team will thoroughly clean, repair, and prepare surfaces to ensure optimal adhesion and a flawless final result.",
      cta: "Learn about preparation",
      link: "/blog/importance-of-surface-preparation",
      image: "/images/process/preparation.png",
      bgColor: "from-orange-50 to-amber-50",
    },
    {
      id: 4,
      icon: PaintBucket,
      title: "Application",
      description:
        "Our skilled technicians apply premium coatings using professional techniques and high-quality materials. We follow manufacturer specifications and industry best practices for optimal results.",
      cta: "View our materials",
      link: "/services",
      image: "/images/process/application.png",
      bgColor: "from-purple-50 to-violet-50",
    },
    {
      id: 5,
      icon: CheckSquare,
      title: "Inspection & Cleanup",
      description:
        "After application, we conduct a thorough inspection to ensure every detail meets our high standards. We then clean up completely, removing all equipment and materials from your property.",
      cta: "Our quality standards",
      link: "/about",
      image: "/images/process/inspection.png",
      bgColor: "from-teal-50 to-cyan-50",
    },
    {
      id: 6,
      icon: ThumbsUp,
      title: "Final Walkthrough",
      description:
        "We conduct a final walkthrough with you to ensure your complete satisfaction. We'll address any concerns and provide maintenance recommendations to help you get the most out of your new coating.",
      cta: "Customer testimonials",
      link: "/testimonials",
      image: "/images/process/walkthrough.png",
      bgColor: "from-rose-50 to-pink-50",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EnhancedHero
        title="Our Process"
        description="From initial consultation to final walkthrough, discover our proven approach to delivering exceptional results."
        backgroundImage="/images/banners/process-hero.png"
        height="medium"
      >
        <CTAModal
          trigger={
            <FancyButton variant="shine" size="lg" hasArrow={true} rounded="full">
              Get Free Estimate
            </FancyButton>
          }
        />
      </EnhancedHero>

      {/* Process Overview */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-blue mb-6">Our Proven Process</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              We follow a comprehensive 6-step process to ensure exceptional results on every project. Each step is
              carefully designed to deliver the highest quality workmanship and complete customer satisfaction.
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-brand-blue" />
                <span>Efficient Timeline</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-brand-blue" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-brand-blue" />
                <span>Professional Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000035' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-brand-blue via-brand-lightBlue to-brand-blue hidden md:block opacity-20"></div>

            {processSteps.map((step, index) => (
              <div key={step.id} className="mb-20 last:mb-0">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 mb-8 md:mb-0 ${
                      index % 2 === 0 ? "md:text-right md:pr-16 order-1" : "md:pl-16 md:order-3"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-br ${step.bgColor} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 backdrop-blur-sm ${
                        index % 2 === 0 ? "md:ml-auto" : ""
                      }`}
                    >
                      <div className={`flex items-center mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                        <div className="bg-white p-3 rounded-full shadow-md mr-4">
                          <step.icon className="h-6 w-6 text-brand-blue" />
                        </div>
                        <span className="text-sm font-semibold text-brand-blue bg-white px-3 py-1 rounded-full">
                          Step {step.id}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-brand-blue mb-4">{step.title}</h3>
                      <p className="text-gray-700 mb-6 leading-relaxed">{step.description}</p>
                      <Link
                        href={step.link}
                        className="inline-flex items-center text-brand-blue font-semibold hover:text-brand-lightBlue transition-colors group"
                      >
                        {step.cta}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Central Icon */}
                  <div className="order-2 z-10 mb-8 md:mb-0">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-brand-blue via-blue-600 to-blue-800 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-2xl border-4 border-white">
                        <step.icon className="h-12 w-12" />
                      </div>
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-brand-red to-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg border-3 border-white">
                        <span className="text-sm font-bold">{step.id}</span>
                      </div>
                      {/* Connecting Arrow */}
                      {index < processSteps.length - 1 && (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-brand-blue/30"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Process Image */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pl-16 order-3" : "md:pr-16 md:order-1"}`}>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-transparent rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                      <Image
                        src={step.image || "/placeholder.svg"}
                        alt={`${step.title} process`}
                        width={400}
                        height={300}
                        className="relative rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-brand-blue/5 rounded-full -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full translate-x-48 translate-y-48"></div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-blue mb-6">Why Our Process Works</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our systematic approach delivers numerous advantages that ensure exceptional results and complete customer
              satisfaction on every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group">
              <div className="bg-gradient-to-br from-brand-blue to-blue-600 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckSquare className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-blue">Consistent Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Our structured process ensures consistent, high-quality results on every project, regardless of size or
                complexity. Every step is documented and verified.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-blue">Clear Communication</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain open communication throughout the project, keeping you informed and involved at every stage
                with regular updates and progress reports.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group">
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-blue">Detailed Planning</h3>
              <p className="text-gray-600 leading-relaxed">
                Our thorough planning process anticipates challenges and ensures smooth execution from start to finish,
                minimizing disruptions to your daily routine.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-blue">On-Time Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                We respect your time and schedule. Our process includes realistic timelines and milestone tracking to
                ensure projects are completed when promised.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-blue">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">
                Multiple quality checkpoints throughout our process ensure that every aspect of your project meets our
                rigorous standards before completion.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group">
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-blue">Professional Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team of certified professionals brings years of experience and expertise to every project, ensuring
                results that exceed industry standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-blue via-blue-700 to-brand-lightBlue text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Our Process?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Contact us today to schedule a consultation and see how our proven process can transform your property with
            exceptional results and professional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAModal
              trigger={
                <FancyButton
                  variant="shine"
                  size="xl"
                  hasArrow={true}
                  rounded="full"
                  className="bg-white text-brand-blue hover:bg-gray-100"
                >
                  Get Free Estimate
                </FancyButton>
              }
            />
            <Link href="/contact">
              <FancyButton
                variant="outline"
                size="xl"
                rounded="full"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Contact Us Today
              </FancyButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
