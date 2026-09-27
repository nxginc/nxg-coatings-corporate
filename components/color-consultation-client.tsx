"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, User, Mail, Phone, Palette } from "lucide-react"

export default function ColorConsultationClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    propertyType: "",
    currentColors: "",
    preferredStyle: "",
    budget: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/color-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Consultation Scheduled!",
          description: "We'll contact you within 24 hours to confirm your appointment.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          preferredDate: "",
          preferredTime: "",
          propertyType: "",
          currentColors: "",
          preferredStyle: "",
          budget: "",
          message: ""
        })
      } else {
        throw new Error('Failed to schedule consultation')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule consultation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Schedule Your Color Consultation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let our color experts help you choose the perfect palette for your home.
            We'll assess your space and provide personalized recommendations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-brand-blue" />
                    Consultation Details
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below to schedule your personalized color consultation.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            Email *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Scheduling */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Preferred Schedule</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="preferredDate" className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Preferred Date *
                          </Label>
                          <Input
                            id="preferredDate"
                            name="preferredDate"
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.preferredDate}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="preferredTime">Preferred Time *</Label>
                          <select
                            id="preferredTime"
                            name="preferredTime"
                            required
                            value={formData.preferredTime}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                          >
                            <option value="">Select time</option>
                            <option value="morning">Morning (9AM - 12PM)</option>
                            <option value="afternoon">Afternoon (12PM - 5PM)</option>
                            <option value="evening">Evening (5PM - 8PM)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="propertyType">Property Type</Label>
                          <select
                            id="propertyType"
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                          >
                            <option value="">Select property type</option>
                            <option value="house">Single Family Home</option>
                            <option value="condo">Condominium</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="apartment">Apartment</option>
                            <option value="commercial">Commercial Space</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="budget">Budget Range</Label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                          >
                            <option value="">Select budget range</option>
                            <option value="under-500">Under $500</option>
                            <option value="500-1000">$500 - $1,000</option>
                            <option value="1000-2500">$1,000 - $2,500</option>
                            <option value="2500-5000">$2,500 - $5,000</option>
                            <option value="over-5000">Over $5,000</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentColors">Current Colors (Optional)</Label>
                        <Input
                          id="currentColors"
                          name="currentColors"
                          type="text"
                          placeholder="Describe your current color scheme"
                          value={formData.currentColors}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferredStyle">Preferred Style</Label>
                        <select
                          id="preferredStyle"
                          name="preferredStyle"
                          value={formData.preferredStyle}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                        >
                          <option value="">Select preferred style</option>
                          <option value="modern">Modern/Contemporary</option>
                          <option value="traditional">Traditional</option>
                          <option value="transitional">Transitional</option>
                          <option value="rustic">Rustic</option>
                          <option value="minimalist">Minimalist</option>
                          <option value="eclectic">Eclectic</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Additional Notes</Label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell us about your vision, any specific rooms, or special considerations..."
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? "Scheduling..." : "Schedule Consultation"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Initial Consultation</h4>
                      <p className="text-sm text-gray-600">We'll discuss your vision and assess your space</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Color Analysis</h4>
                      <p className="text-sm text-gray-600">Lighting assessment and color recommendations</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Custom Palette</h4>
                      <p className="text-sm text-gray-600">Personalized color scheme with samples</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consultation Includes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-brand-blue rounded-full mr-3"></div>
                      In-home color consultation
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-brand-blue rounded-full mr-3"></div>
                      Lighting and space analysis
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-brand-blue rounded-full mr-3"></div>
                      Color swatches and samples
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-brand-blue rounded-full mr-3"></div>
                      Professional recommendations
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-brand-blue rounded-full mr-3"></div>
                      Follow-up support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}