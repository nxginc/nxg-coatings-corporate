"use client"

import { CTAModal } from "@/components/cta-modal"
import { FancyButton } from "@/components/ui/fancy-button"

export default function ColorConsultationClient() {
  return (
    <CTAModal
      trigger={
        <FancyButton variant="gradient" size="lg" hasArrow={true}>
          Schedule Consultation
        </FancyButton>
      }
    />
  )
}
