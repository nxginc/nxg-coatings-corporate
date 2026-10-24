"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface CTAModalProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  children?: React.ReactNode
}

export function CTAModal({ trigger, title = "Get Your Free Estimate", description, children }: CTAModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center p-6">
          <h2 className="text-2xl font-bold text-brand-blue mb-4">{title}</h2>
          {description && (
            <p className="text-gray-600 mb-6">{description}</p>
          )}
          {children || (
            <div className="space-y-4 w-full">
              <p className="text-sm text-gray-500">
                Ready to transform your space? Let's discuss your project!
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => window.open("tel:+15551234567", "_blank")}
                  className="flex-1"
                >
                  Call Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open("https://cal.com/nxgcoatings/virtual-consultation", "_blank")}
                  className="flex-1"
                >
                  Book Online
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}