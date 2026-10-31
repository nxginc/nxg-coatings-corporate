"use client"

import { CTAModal } from "@/components/cta-modal"
import { FancyButton } from "@/components/ui/fancy-button"

export default function ColorConsultationClient() {
  return (
    <CTAModal
      title="Request a color consultation"
      description="Tell us about the rooms, surfaces, and finishes you are considering."
      service="Color consultation"
      trigger={
        <FancyButton variant="shine" size="lg" hasArrow={true}>
          Schedule Consultation
        </FancyButton>
      }
    />
  )
}
