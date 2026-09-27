import Image from "next/image"

const galleryItems = [
  {
    title: "Exterior House Refresh",
    description: "Modern color and protective finish for a polished exterior.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/gallery/exterior-refresh_4Rm5x.jpg?updatedAt=1747919186999"
  },
  {
    title: "Commercial Building Coating",
    description: "Durable coating solutions designed for commercial spaces.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/gallery/commercial-building_C9l5x.jpg?updatedAt=1747919186999"
  },
  {
    title: "Industrial Protection",
    description: "Heavy-duty coatings engineered to withstand wear and weather.",
    image: "https://ik.imagekit.io/j98e6hcfnkn/gallery/industrial-protection_E7u6x.jpg?updatedAt=1747919186999"
  }
]

export default function PaintingGallery() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-blue font-semibold mb-2">Project Gallery</p>
          <h2 className="text-3xl font-bold text-gray-900">Featured Work</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Explore recent coating projects showcasing our attention to detail and high-quality finishes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <div key={item.title} className="group relative overflow-hidden rounded-3xl shadow-lg">
              <div className="relative h-72 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
