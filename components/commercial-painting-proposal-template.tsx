import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"
import { NXG_CORPORATE_PROFILE, type CorporateProfile } from "@/data/corporate-profile"

export type CommercialProposalLineItem = {
  name: string
  description: string
  amount: number
}

export type CommercialProposalTerms = {
  payment: string
  scopeChanges: string
  permitsAndFees: string
  siteAccess: string
  existingConditions: string
  materials: string
  cleanup: string
  insurance: string
  indemnification: string
  limitationOfLiability: string
  safetyAndCompliance: string
  ownershipOfMaterials: string
  warrantyExclusions: string
  scheduling: string
  termination: string
  disputeResolution: string
  governingLaw: string
  entireAgreement: string
  severability: string
  acceptance: string
}

export type CommercialPaintingProposalTemplateProps = {
  projectName: string
  shortLocation: string
  location: string
  preparedFor: string
  preparedForTitle?: string
  preparedForCompany?: string
  proposalDate: string
  validityPeriod: string
  proposalNumber: string
  bidDue?: string
  estimatedStart: string
  estimatedDuration: string
  estimatedCompletion: string
  scopeDescription: string
  includedWork: string[]
  exclusions: string[]
  lineItems: CommercialProposalLineItem[]
  paintSpecification: string
  primerSpecification: string
  surfacePreparation: string
  applicationMethod: string
  estimatedMaterialUsage: string
  warrantyPeriod: string
  terms: CommercialProposalTerms
  clientNameAndTitle: string
  clientCompany: string
  representativeNameAndTitle: string
  licenseNumber: string
  county: string
  state: string
  companyProfile?: CorporateProfile
  currency?: string
}

const termLabels: { key: keyof CommercialProposalTerms; title: string }[] = [
  { key: "payment", title: "Payment" },
  { key: "scopeChanges", title: "Scope Changes" },
  { key: "permitsAndFees", title: "Permits & Fees" },
  { key: "siteAccess", title: "Site Access" },
  { key: "existingConditions", title: "Existing Conditions" },
  { key: "materials", title: "Materials" },
  { key: "cleanup", title: "Cleanup" },
  { key: "insurance", title: "Insurance" },
  { key: "indemnification", title: "Indemnification" },
  { key: "limitationOfLiability", title: "Limitation of Liability" },
  { key: "safetyAndCompliance", title: "Safety & Compliance" },
  { key: "ownershipOfMaterials", title: "Ownership of Materials" },
  { key: "warrantyExclusions", title: "Warranty Exclusions" },
  { key: "scheduling", title: "Scheduling" },
  { key: "termination", title: "Termination" },
  { key: "disputeResolution", title: "Dispute Resolution" },
  { key: "governingLaw", title: "Governing Law" },
  { key: "entireAgreement", title: "Entire Agreement" },
  { key: "severability", title: "Severability" },
  { key: "acceptance", title: "Acceptance" },
]

export default function CommercialPaintingProposalTemplate({
  projectName,
  shortLocation,
  location,
  preparedFor,
  preparedForTitle,
  preparedForCompany,
  proposalDate,
  validityPeriod,
  proposalNumber,
  bidDue,
  estimatedStart,
  estimatedDuration,
  estimatedCompletion,
  scopeDescription,
  includedWork,
  exclusions,
  lineItems,
  paintSpecification,
  primerSpecification,
  surfacePreparation,
  applicationMethod,
  estimatedMaterialUsage,
  warrantyPeriod,
  terms,
  clientNameAndTitle,
  clientCompany,
  representativeNameAndTitle,
  licenseNumber,
  county,
  state,
  companyProfile = NXG_CORPORATE_PROFILE,
  currency = "USD",
}: CommercialPaintingProposalTemplateProps) {
  const themeStyle: CSSProperties & Record<`--nxg-${string}`, string> = {
    "--nxg-navy": companyProfile.theme.navy,
    "--nxg-red": companyProfile.theme.red,
    "--nxg-platinum": companyProfile.theme.platinum,
    "--nxg-charcoal": companyProfile.theme.charcoal,
    "--nxg-paper": companyProfile.theme.paper,
    "--nxg-line": companyProfile.theme.line,
    "--nxg-muted": companyProfile.theme.muted,
  }
  const formatAmount = (amount: number) => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
  const total = lineItems.reduce((sum, item) => sum + item.amount, 0)
  const jurisdiction = `${county}, ${state}`

  const interpolatedTerms = {
    ...terms,
    disputeResolution: interpolate(terms.disputeResolution, { COUNTY: county, STATE: state }),
    governingLaw: interpolate(terms.governingLaw, { COUNTY: county, STATE: state }),
    acceptance: interpolate(terms.acceptance, { VALIDITY_PERIOD: validityPeriod }),
  }

  return (
    <article className="commercial-proposal" aria-label={`Commercial painting proposal ${proposalNumber}`} style={themeStyle}>
      <header className="commercial-proposal__header">
        <div className="commercial-proposal__brand">
          <Image src={companyProfile.logoUrl} alt={`${companyProfile.displayName} logo`} width={150} height={54} />
          <div>
            <p className="commercial-proposal__eyebrow">Commercial Painting Proposal</p>
            <h1>{companyProfile.legalName}</h1>
            <p>{projectName} <span aria-hidden="true">·</span> {shortLocation}</p>
          </div>
        </div>
        <div className="commercial-proposal__number">
          <span>Proposal</span>
          <strong>{proposalNumber}</strong>
          <span>Valid for {validityPeriod}</span>
        </div>
      </header>

      <section className="commercial-proposal__cover commercial-proposal__page">
        <div className="commercial-proposal__facts">
          <div><span>Prepared for</span><strong>{preparedFor}</strong>{preparedForTitle && <small>{preparedForTitle}</small>}{preparedForCompany && <small>{preparedForCompany}</small>}</div>
          <div><span>Project location</span><strong>{location}</strong></div>
          <div><span>Proposal date</span><strong>{proposalDate}</strong></div>
          <div><span>Proposal valid</span><strong>{validityPeriod} from date of issue</strong></div>
        </div>

        <ProposalSection number="01" title="Project Overview">
          <dl className="commercial-proposal__overview">
            <Fact label="Project name" value={projectName} />
            <Fact label="Location" value={location} />
            <Fact label="Prepared for" value={preparedFor} />
            <Fact label="Proposal date" value={proposalDate} />
            {bidDue && <Fact label="Bid due" value={bidDue} />}
          </dl>
        </ProposalSection>

        <ProposalSection number="02" title="Project Schedule">
          <dl className="commercial-proposal__schedule">
            <Fact label="Estimated start" value={estimatedStart} />
            <Fact label="Estimated duration" value={estimatedDuration} />
            <Fact label="Estimated completion" value={estimatedCompletion} />
          </dl>
        </ProposalSection>

        <ProposalSection number="03" title="Scope of Work">
          <p className="commercial-proposal__scope-description">{scopeDescription}</p>
          <h3>What's Included in This Proposal</h3>
          <ul className="commercial-proposal__included">
            {includedWork.map((item) => <li key={item}>{item}</li>)}
          </ul>
          {exclusions.length > 0 && (
            <div className="commercial-proposal__exclusions">
              <h3>Exclusions</h3>
              <ul>{exclusions.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          )}
        </ProposalSection>
      </section>

      <section className="commercial-proposal__page">
        <ProposalSection number="04" title="Cost Breakdown">
          <table className="commercial-proposal__costs">
            <thead><tr><th scope="col">Line item</th><th scope="col">Description</th><th scope="col">Amount</th></tr></thead>
            <tbody>
              {lineItems.map((item, index) => (
                <tr key={`${index}-${item.name}`}>
                  <th scope="row">{item.name}</th>
                  <td>{item.description}</td>
                  <td>{formatAmount(item.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot><tr><th scope="row" colSpan={2}>Total proposal</th><td>{formatAmount(total)}</td></tr></tfoot>
          </table>
        </ProposalSection>

        <ProposalSection number="05" title="Materials & Specifications">
          <dl className="commercial-proposal__specifications">
            <Fact label="Paint specification" value={paintSpecification} />
            <Fact label="Primer specification" value={primerSpecification} />
            <Fact label="Surface preparation" value={surfacePreparation} />
            <Fact label="Application method" value={applicationMethod} />
            <Fact label="Estimated material usage" value={estimatedMaterialUsage} />
          </dl>
          <p className="commercial-proposal__warranty"><strong>Workmanship warranty:</strong> Workmanship warranty period: {warrantyPeriod}. Warranty coverage, exclusions, and remedies must be confirmed in the executed agreement.</p>
        </ProposalSection>
      </section>

      <section className="commercial-proposal__page commercial-proposal__terms-page">
        <ProposalSection number="06" title="Terms & Conditions">
          <p className="commercial-proposal__terms-note">
            Draft terms for review. Confirm these provisions with authorized company counsel and the executed contract before sending.
          </p>
          <ol className="commercial-proposal__terms">
            {termLabels.map(({ key, title }) => (
              <li key={key}>
                <strong>{title}:</strong> {interpolatedTerms[key]}
              </li>
            ))}
          </ol>
        </ProposalSection>
      </section>

      <section className="commercial-proposal__page commercial-proposal__authorization-page">
        <ProposalSection number="07" title="Authorization">
          <p className="commercial-proposal__authorization-intro">
            By signing, the parties acknowledge the proposal scope, price, validity period, and terms stated in this document, subject to any required master agreement and addenda.
          </p>
          <div className="commercial-proposal__signatures">
            <SignatureBlock
              heading="Client Acceptance"
              nameLabel="Name & title"
              name={clientNameAndTitle}
              company={clientCompany}
              dateLabel="Date"
            />
            <SignatureBlock
              heading={`${companyProfile.legalName} Representative`}
              nameLabel="Name & title"
              name={representativeNameAndTitle}
              company={companyProfile.legalName}
              dateLabel="Date"
              licenseNumber={licenseNumber}
            />
          </div>
          <p className="commercial-proposal__authorization-validity">Valid for {validityPeriod} from date of issue.</p>
        </ProposalSection>
        <footer className="commercial-proposal__footer">
          <span>{companyProfile.phone}</span>
          <span>{companyProfile.email}</span>
          <span>{companyProfile.website}</span>
          <span>{jurisdiction}</span>
          <span>{companyProfile.legalName} · Professional Commercial Painting & Drywall</span>
        </footer>
      </section>
    </article>
  )
}

function interpolate(value: string, tokens: Record<string, string>) {
  return Object.entries(tokens).reduce(
    (result, [key, replacement]) => result.split(`{{${key}}}`).join(replacement),
    value,
  )
}

function ProposalSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section className="commercial-proposal__section">
      <div className="commercial-proposal__section-heading">
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div><dt>{label}</dt><dd>{value}</dd></div>
}

function SignatureBlock({
  heading,
  nameLabel,
  name,
  company,
  dateLabel,
  licenseNumber,
}: {
  heading: string
  nameLabel: string
  name: string
  company: string
  dateLabel: string
  licenseNumber?: string
}) {
  return (
    <section className="commercial-proposal__signature-block">
      <h3>{heading}</h3>
      <div className="commercial-proposal__signature-line" aria-hidden="true" />
      <dl>
        <Fact label={nameLabel} value={name} />
        <Fact label="Company" value={company} />
        {licenseNumber !== undefined && <Fact label="License number" value={licenseNumber} />}
        <Fact label={dateLabel} value="" />
      </dl>
    </section>
  )
}
