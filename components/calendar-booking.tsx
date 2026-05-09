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
  const [isBooking, setIsBooking] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return

    setIsBooking(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsBooking(false)
    setIsBooked(true)
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Appointment Booked!</h3>
            <p className="text-gray-600 mb-4">
              Your consultation is scheduled for {selectedDate} at {selectedTime}.
            </p>
            <div className="text-sm text-gray-500">
              <p className="flex items-center justify-center mb-1">
                <MapPin className="w-4 h-4 mr-1" />
                123 Main St, Anytown, USA
              </p>
              <p className="flex items-center justify-center">
                <Phone className="w-4 h-4 mr-1" />
                (555) 123-4567
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
          Choose a convenient date and time for your in-home consultation.
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
            {isBooking ? "Booking..." : "Book Appointment"}
          </Button>
        )}

        {/* Contact Info */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Need help booking?</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Call us: (555) 123-4567
            </p>
            <p className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              123 Main St, Anytown, USA
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { CalendarBooking }