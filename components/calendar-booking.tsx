"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Phone } from "lucide-react"
import { corporateProfile } from "@/data/corporate-profile"

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
]

export default function CalendarBooking() {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [isBooking, setIsBooking] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !name || !email) return

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
          service: "Consultation request",
          message: `Requested date: ${selectedDate}\nPreferred time: ${selectedTime}\nThis is a preferred time, not a confirmed appointment.`,
        }),
      })
      const result = (await response.json()) as { error?: string }
      if (!response.ok) throw new Error(result.error || "Your request could not be sent.")
      setIsBooked(true)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Your request could not be sent.")
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultation request sent</h3>
            <p className="text-gray-600 mb-4">
              Your preferred time is {selectedDate} at {selectedTime}. NXG must confirm it before the appointment is booked.
            </p>
            <div className="text-sm text-gray-500">
              <p className="flex items-center justify-center mb-1">
                <MapPin className="w-4 h-4 mr-1" />
                {corporateProfile.contact.city}, {corporateProfile.contact.state}
              </p>
              <p className="flex items-center justify-center">
                <Phone className="w-4 h-4 mr-1" />
                {corporateProfile.contact.phone}
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
          Choose a preferred date and time. Your request is not a confirmed appointment until NXG replies.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-gray-700">
            Name
            <input
              required
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base"
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base"
            />
          </label>
        </div>
        <label className="block text-sm font-medium text-gray-700">
          Phone (optional)
          <input
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base"
          />
        </label>

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                    selectedTime === time
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
        {selectedDate && selectedTime && (
          <Button
            onClick={handleBooking}
            disabled={isBooking}
            className="w-full"
          >
            {isBooking ? "Sending request..." : "Request this time"}
          </Button>
        )}
        {error && <p className="text-sm text-red-700" role="alert">{error}</p>}

        {/* Contact Info */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Need help booking?</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Call us: {corporateProfile.contact.phone}
            </p>
            <p className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {corporateProfile.contact.city}, {corporateProfile.contact.state}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}