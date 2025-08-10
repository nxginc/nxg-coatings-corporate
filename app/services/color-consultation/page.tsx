import EnhancedHero from "@/components/enhanced-hero"
import ColorConsultationClient from "@/components/color-consultation-client"

export const metadata = {
  title: "Color Consultation Services - NXG Coatings",
  description: "Expert color consultation services for interior and exterior painting projects.",
  openGraph: {
    title: "Color Consultation Services - NXG Coatings",
    description: "Expert color consultation services for interior and exterior painting projects.",
    images: [
      {
        url: "https://ik.imagekit.io/j98e6hcfnkn/Banners/f3_ER1drZAJS.jpg?updatedAt=1679013242072",
        width: 1200,
        height: 630,
        alt: "Color consultation hero image",
      },
    ],
  },
}

const consultationServices = [
  {
    title: "Interior Color Consultation",
    description: "Expert guidance for selecting interior paint colors that create the perfect atmosphere for each room.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Banners/f3_ER1drZAJS.jpg?updatedAt=1679013242072",
  },
  {
    title: "Exterior Color Consultation",
    description: "Professional advice on exterior color schemes that enhance curb appeal and complement architectural features.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/exterior/exterior-paint-colors-ideas_1VOJ1dmAh.jpg?updatedAt=1746877971031",
  },
  {
    title: "Whole Home Color Planning",
    description: "Comprehensive color strategies that create a cohesive flow throughout your entire home, inside and out.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/Banners/f1_8khZANtVn.jpg?updatedAt=1679013241962",
  },
]

export default function ColorConsultationPage() {
  return (
    <main className="min-h-screen">
      <EnhancedHero
        title="Professional Color Consultation"
        subtitle="Transform your space with expert color guidance tailored to your style, lighting, and architectural features."
        backgroundImage="https://ik.imagekit.io/j98e6hcfnkn/Banners/f3_ER1drZAJS.jpg?updatedAt=1679013242072"
        height="large"
      >
        <ColorConsultationClient />
      </EnhancedHero>
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {consultationServices.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
