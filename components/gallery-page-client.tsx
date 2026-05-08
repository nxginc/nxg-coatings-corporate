"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryCategories = [
  { id: "all", name: "All Projects", count: 24 },
  { id: "interior", name: "Interior Painting", count: 12 },
  { id: "exterior", name: "Exterior Painting", count: 8 },
  { id: "commercial", name: "Commercial", count: 4 }
]

const galleryImages = [
  {
    id: 1,
    src: "/images/gallery/interior-1.jpg",
    alt: "Modern living room interior painting",
    category: "interior",
    title: "Modern Living Room",
    description: "Complete interior painting with premium finishes"
  },
  {
    id: 2,
    src: "/images/gallery/exterior-1.jpg",
    alt: "House exterior painting",
    category: "exterior",
    title: "Residential Exterior",
    description: "Full house exterior with weather-resistant coating"
  },
  {
    id: 3,
    src: "/images/gallery/commercial-1.jpg",
    alt: "Commercial office painting",
    category: "commercial",
    title: "Corporate Office",
    description: "Professional office space renovation"
  },
  // Add more images as needed
]

export default function GalleryPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages = selectedCategory === "all"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return

    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
    let newIndex

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1
    }

    setSelectedImage(filteredImages[newIndex].id)
  }

  const selectedImageData = selectedImage
    ? filteredImages.find(img => img.id === selectedImage)
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Project Gallery
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our portfolio of completed painting and coating projects.
              See the quality craftsmanship and attention to detail we bring to every job.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            {galleryCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div
                  className="relative aspect-square overflow-hidden"
                  onClick={() => openLightbox(image.id)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-2 left-2">
                    <Badge className="capitalize">
                      {image.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-600">{image.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl w-full h-full max-h-[90vh] p-0">
          {selectedImageData && (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="relative w-full h-full max-w-3xl max-h-full">
                <Image
                  src={selectedImageData.src}
                  alt={selectedImageData.alt}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <h3 className="text-xl font-semibold mb-1">{selectedImageData.title}</h3>
                <p className="text-sm opacity-90">{selectedImageData.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <div className="bg-brand-blue text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Contact us today for a free consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-blue">
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}