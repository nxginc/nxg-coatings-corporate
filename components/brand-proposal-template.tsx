import BrandLetterTemplate from "@/components/brand-letter-template"
import type { CorporateProfile } from "@/data/corporate-profile"
import type { ReactNode } from "react"

export type ProposalLineItem = {
  description: string
  amount: number
}

export type BrandProposalTemplateProps = {
  date: string
  recipientName: string
  recipientOrganization?: string
  recipientAddress?: string[]
  projectTitle: string
  proposalNumber?: string
  validUntil?: string
  overview: string
  scope: string[]
  lineItems: ProposalLineItem[]
  exclusions?: string[]
  timeline?: string
  terms?: string[]
  signatureName: string
  signatureTitle?: string
  companyProfile?: CorporateProfile
  logo?: ReactNode
  currency?: string
}

export default function BrandProposalTemplate({
  date,
  recipientName,
  recipientOrganization,
  recipientAddress,
  projectTitle,
  proposalNumber,
  validUntil,
  overview,
  scope,
  lineItems,
  exclusions = [],
  timeline,
  terms = [],
  signatureName,
  signatureTitle,
  companyProfile,
  logo,
  currency = "USD",
}: BrandProposalTemplateProps) {
  const formatAmount = (amount: number) => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
  const total = lineItems.reduce((sum, item) => sum + item.amount, 0)

  return (
    <BrandLetterTemplate
      date={date}
      recipientName={recipientName}
      recipientOrganization={recipientOrganization}
      recipientAddress={recipientAddress}
      salutation={`Project proposal: ${projectTitle}`}
      paragraphs={[]}
      signatureName={signatureName}
      signatureTitle={signatureTitle}
      closing="Prepared for your review,"
      subject={projectTitle}
      companyProfile={companyProfile}
      logo={logo}
    >
      <div className="brand-proposal">
        {(proposalNumber || validUntil) && (
          <dl className="brand-proposal__meta">
            {proposalNumber && <div><dt>Proposal</dt><dd>{proposalNumber}</dd></div>}
            {validUntil && <div><dt>Valid through</dt><dd>{validUntil}</dd></div>}
          </dl>
        )}

        <section>
          <h2>Project overview</h2>
          <p>{overview}</p>
        </section>

        <section>
          <h2>Proposed scope</h2>
          <ul>{scope.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        {timeline && <section><h2>Proposed timeline</h2><p>{timeline}</p></section>}

        <section>
          <h2>Investment</h2>
          <table className="brand-proposal__table">
            <thead><tr><th scope="col">Description</th><th scope="col">Amount</th></tr></thead>
            <tbody>
              {lineItems.map((item, index) => (
                <tr key={`${index}-${item.description}`}>
                  <td>{item.description}</td>
                  <td>{formatAmount(item.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td>{formatAmount(total)}</td></tr></tfoot>
          </table>
        </section>

        {exclusions.length > 0 && (
          <section><h2>Not included</h2><ul>{exclusions.map((item) => <li key={item}>{item}</li>)}</ul></section>
        )}

        {terms.length > 0 && (
          <section><h2>Terms and assumptions</h2><ul>{terms.map((item) => <li key={item}>{item}</li>)}</ul></section>
        )}
      </div>
    </BrandLetterTemplate>
  )
}
