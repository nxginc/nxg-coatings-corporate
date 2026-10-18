import type { CSSProperties, ReactNode } from "react"
import Image from "next/image"
import { NXG_CORPORATE_PROFILE, type CorporateProfile } from "@/data/corporate-profile"

export type BrandLetterTemplateProps = {
  date: string
  recipientName: string
  salutation: string
  paragraphs: string[]
  signatureName: string
  recipientTitle?: string
  recipientOrganization?: string
  recipientAddress?: string[]
  subject?: string
  closing?: string
  signatureTitle?: string
  companyName?: string
  companyAddress?: string[]
  phone?: string
  email?: string
  website?: string
  logo?: ReactNode
  companyProfile?: CorporateProfile
  children?: ReactNode
}

export default function BrandLetterTemplate({
  date,
  recipientName,
  salutation,
  paragraphs,
  signatureName,
  companyProfile = NXG_CORPORATE_PROFILE,
  recipientTitle,
  recipientOrganization,
  recipientAddress = [],
  subject,
  closing = "Sincerely,",
  signatureTitle,
  companyName = companyProfile.displayName,
  companyAddress = companyProfile.addressLines,
  phone = companyProfile.phone,
  email = companyProfile.email,
  website = companyProfile.website,
  logo,
  children,
}: BrandLetterTemplateProps) {
  const themeStyle: CSSProperties & Record<`--nxg-${string}`, string> = {
    "--nxg-navy": companyProfile.theme.navy,
    "--nxg-red": companyProfile.theme.red,
    "--nxg-platinum": companyProfile.theme.platinum,
    "--nxg-charcoal": companyProfile.theme.charcoal,
    "--nxg-paper": companyProfile.theme.paper,
    "--nxg-line": companyProfile.theme.line,
    "--nxg-muted": companyProfile.theme.muted,
  }

  return (
    <article className="brand-letter" aria-label={`${companyName} letter`} style={themeStyle}>
      <header className="brand-letter__header">
        <div className="brand-letter__identity">
          {logo ?? (
            <Image
              src={companyProfile.logoUrl}
              alt={`${companyName} logo`}
              width={160}
              height={56}
              className="brand-letter__logo"
            />
          )}
          <p className="brand-letter__company">{companyName}</p>
          {companyProfile.tagline && <p className="brand-letter__tagline">{companyProfile.tagline}</p>}
        </div>
        <address className="brand-letter__contact">
          {companyAddress.map((line) => <span key={line}>{line}</span>)}
          <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <span>{website}</span>
        </address>
      </header>

      <div className="brand-letter__rule" aria-hidden="true" />
      <p className="brand-letter__date">{date}</p>

      <address className="brand-letter__recipient">
        <strong>{recipientName}</strong>
        {recipientTitle && <span>{recipientTitle}</span>}
        {recipientOrganization && <span>{recipientOrganization}</span>}
        {recipientAddress.map((line) => <span key={line}>{line}</span>)}
      </address>

      {subject && <p className="brand-letter__subject">Re: {subject}</p>}
      <p>{salutation}</p>
      <div className="brand-letter__body">
        {children ?? paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
      </div>

      <div className="brand-letter__signature">
        <p>{closing}</p>
        <p className="brand-letter__signature-name">{signatureName}</p>
        {signatureTitle && <p>{signatureTitle}</p>}
      </div>

      <footer className="brand-letter__footer">
        {companyProfile.tagline}
      </footer>
    </article>
  )
}
