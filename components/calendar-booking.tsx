"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Phone } from "lucide-react"

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
]

export default function CalendarBooking() {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [projectType, setProjectType] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [error, setError] = useState("")

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !name || !email || !phone || !projectType) return
    setIsBooking(true)
    setError("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          projectType,
          type: "consultation",
          preferredDate: selectedDate,
          preferredTime: selectedTime,
          message: `Consultation request for ${projectType}. Preferred time: ${selectedDate} at ${selectedTime}.`,
        }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) throw new Error(result?.error || "Your request could not be submitted.")
      setIsBooked(true)
    } catch (bookingError) {
      setError(bookingError instanceof Error ? bookingError.message : "Your request could not be submitted.")
    } finally {
      setIsBooking(false)
    }
  }

  if (isBooked) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultation request received</h3>
            <p className="text-gray-600 mb-4">
              Your preferred time is {selectedDate} at {selectedTime}. NXG will contact you to confirm; this request is not a confirmed booking.
            </p>
            <div className="text-sm text-gray-500">
              <p className="flex items-center justify-center mb-1">
                <MapPin className="w-4 h-4 mr-1" />
                5200 Willson Blvd, Suite 150, Edina, MN 55424
              </p>
              <p className="flex items-center justify-center">
                <Phone className="w-4 h-4 mr-1" />
                (952) 900-4222
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-brand-blue" />
          Schedule Your Visit
        </CardTitle>
        <CardDescription>
          Request a preferred date and time. Our team will confirm availability.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div><label htmlFor="booking-name" className="mb-2 block text-sm font-medium">Full name</label><Input id="booking-name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} /></div>
          <div><label htmlFor="booking-email" className="mb-2 block text-sm font-medium">Email</label><Input id="booking-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div>
          <div><label htmlFor="booking-phone" className="mb-2 block text-sm font-medium">Phone</label><Input id="booking-phone" type="tel" autoComplete="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} /></div>
          <div><label htmlFor="booking-project" className="mb-2 block text-sm font-medium">Project type</label><select id="booking-project" required value={projectType} onChange={(event) => setProjectType(event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">Select a service</option><option>Interior painting</option><option>Exterior painting</option><option>Commercial painting</option><option>Deck staining</option><option>Cabinet refinishing</option><option>Other</option></select></div>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          />
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-3 py-2 text-sm border rounded-md transition-colors ${selectedTime === time
                      ? 'bg-brand-blue text-white border-brand-blue'
                      : 'border-gray-300 text-gray-700 hover:border-brand-blue hover:text-brand-blue'
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Booking Button */}
        {selectedDate && selectedTime && name && email && phone && projectType && (
          <Button
            onClick={handleBooking}
            disabled={isBooking}
            className="w-full"
          >
            {isBooking ? "Sending request..." : "Request this time"}
          </Button>
        )}
        {error && <p role="alert" className="text-sm text-red-800">{error}</p>}

        {/* Contact Info */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Need help booking?</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Call us: (952) 900-4222
            </p>
            <p className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Edina, Minnesota
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}