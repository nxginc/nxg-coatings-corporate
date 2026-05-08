"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, CheckCircle, Star } from "lucide-react"

const colorSchemes = [
  {
    name: "Modern Neutral",
    colors: ["#F5F5F5", "#E8E8E8", "#D3D3D3", "#A9A9A9"],
    description: "Clean and contemporary with subtle variations"
  },
  {
    name: "Warm & Inviting",
    colors: ["#F4E4BC", "#D4B996", "#A0522D", "#8B4513"],
    description: "Cozy and welcoming with earth tones"
  },
  {
    name: "Cool & Calming",
    colors: ["#E6F3FF", "#B3D9FF", "#4A90E2", "#2E5C8A"],
    description: "Peaceful and serene with blue undertones"
  },
  {
    name: "Bold & Dramatic",
    colors: ["#2C3E50", "#34495E", "#E74C3C", "#F39C12"],
    description: "Strong contrast with vibrant accents"
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "The color consultation completely transformed our home. The colors they suggested were perfect!",
    rating: 5
  },
  {
    name: "Mike Chen",
    text: "Professional service and great attention to detail. Highly recommend their color expertise.",
    rating: 5
  }
]

export default function ColorConsultation() {
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null)

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Color Consultation Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let our color experts help you choose the perfect palette for your home or business.
            We provide personalized consultations and professional recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Color Schemes */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Palette className="w-6 h-6 mr-2 text-brand-blue" />
              Popular Color Schemes
            </h3>

            <div className="space-y-4">
              {colorSchemes.map((scheme, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all ${
                    selectedScheme === scheme.name ? 'ring-2 ring-brand-blue' : ''
                  }`}
                  onClick={() => setSelectedScheme(scheme.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-1">
                        {scheme.colors.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-8 h-8 rounded border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{scheme.name}</h4>
                        <p className="text-sm text-gray-600">{scheme.description}</p>
                      </div>
                      {selectedScheme === scheme.name && (
                        <CheckCircle className="w-5 h-5 text-brand-blue" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              What We Offer
            </h3>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">In-Home Consultation</CardTitle>
                  <CardDescription>
                    Visit your space and provide personalized color recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Lighting analysis
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Space assessment
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Color swatches and samples
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Virtual Consultation</CardTitle>
                  <CardDescription>
                    Online consultation with photos and video chat
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Photo analysis
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Digital color visualization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Follow-up support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Button className="w-full" size="lg">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            What Our Clients Say
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-2">"{testimonial.text}"</p>
                <p className="text-sm font-medium text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}