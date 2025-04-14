"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { MultiStepForm } from "@/components/multi-step-form"
import { cn } from "@/lib/utils"

interface CTAModalProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  className?: string
}

export function CTAModal({
  trigger,
  title = "Get Your Free Estimate",
  description = "Fill out this quick form and we'll get back to you with a detailed quote.",
  className,
}: CTAModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-end">
          <div
            className={cn(
              "bg-white dark:bg-gray-900 h-full w-full md:w-1/2 lg:w-2/5 p-6 shadow-lg overflow-y-auto animate-in slide-in-from-right duration-300",
              className,
            )}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold uppercase">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-brand-red"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            <div className="mt-4">
              <MultiStepForm onClose={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
