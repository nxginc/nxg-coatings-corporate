"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, DollarSign, Star, ArrowRight, Phone, Mail } from "lucide-react"

interface ServiceDetailProps {
  service: {
    id: string
    title: string
    description: string
    longDescription: string
    image: string
    features: string[]
    benefits: string[]
    process: {
      step: number
      title: string
      description: string
    }[]
    pricing: {
      type: string
      range: string
      description: string
    }[]
    testimonials: {
      name: string
      rating: number
      text: string
      date: string
    }[]
    faq: {
      question: string
      answer: string
    }[]
  }
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-brand-blue to-blue-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl mb-6">{service.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                Get Free Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-blue">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="testimonials">Reviews</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">{service.longDescription}</p>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 mt-6">
                      <h3 className="text-lg font-semibold">Benefits</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Starting Price
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-brand-blue mb-2">
                      Contact for Quote
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Pricing depends on project size and complexity
                    </p>
                    <Button className="w-full">Get Free Estimate</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Typical Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Consultation</span>
                        <span className="text-sm font-medium">1-2 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Preparation</span>
                        <span className="text-sm font-medium">2-3 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Project Completion</span>
                        <span className="text-sm font-medium">3-7 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" />
                      (555) 123-4567
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-2" />
                      info@nxgcoatings.com
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="process" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Our Process</CardTitle>
                <CardDescription>
                  How we ensure quality results for your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.pricing.map((plan, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <CardTitle>{plan.type}</CardTitle>
                    <CardDescription>{plan.range}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    <Button className="w-full">Get Quote</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{testimonial.name}</span>
                      <span className="text-sm text-gray-500">{testimonial.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {service.faq.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="text-lg font-medium mb-2">{item.question}</h3>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}