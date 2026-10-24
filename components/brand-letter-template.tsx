import { corporateProfile } from "@/data/corporate-profile"

export type BrandLetterDocument = {
  recipientName: string
  recipientOrganization: string
  recipientAddress: string
  date: string
  reference: string
  subject: string
  body: string
}

export function BrandLetterTemplate({ document }: { document: BrandLetterDocument }) {
  const paragraphs = document.body.split(/\n{2,}/).filter((paragraph) => paragraph.trim())

  return (
    <article className="letter-print-sheet mx-auto min-h-[10.5in] w-full max-w-[8.5in] bg-white px-8 py-10 text-[#171717] shadow-lg sm:px-14 sm:py-14">
      <header className="flex flex-col justify-between gap-8 border-b-4 border-[#e31e24] pb-7 sm:flex-row sm:items-start">
        <div>
          <div className="text-xl font-black tracking-[.16em] text-[#121212]">{corporateProfile.displayName}</div>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#a9151b]">
            {corporateProfile.tagline}
          </p>
        </div>
        <address className="not-italic text-sm leading-6 text-slate-700 sm:text-right">
          <span className="font-bold text-[#121212]">{corporateProfile.representative.name}</span>
          <br />
          {corporateProfile.representative.title}
          <br />
          {corporateProfile.contact.phone}
          <br />
          {corporateProfile.contact.email}
          <br />
          {corporateProfile.contact.city}, {corporateProfile.contact.state}
        </address>
      </header>

      <div className="mt-8 flex flex-col justify-between gap-6 border-b border-[#c0c0c0] pb-6 sm:flex-row">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-500">Recipient</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-800">
            {[document.recipientName, document.recipientOrganization, document.recipientAddress]
              .filter(Boolean)
              .join("\n")}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-500">Date</p>
          <p className="mt-2 text-sm text-slate-800">{document.date}</p>
          {document.reference && (
            <p className="mt-1 break-all text-xs font-semibold text-[#a9151b]">Reference: {document.reference}</p>
          )}
        </div>
      </div>

      <section className="mt-8 min-h-[5.5in] text-[11pt] leading-[1.8]">
        {document.subject && (
          <p className="mb-7 font-bold text-[#121212]">Subject: {document.subject}</p>
        )}
        <p className="mb-5">Dear {document.recipientName || "[Recipient]"},</p>
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 16)}`} className="mb-5 whitespace-pre-wrap">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="mb-5 text-slate-400">Your letter text will appear here.</p>
        )}
        <p className="mt-10">Sincerely,</p>
        <p className="mt-8 text-lg font-black tracking-tight">{corporateProfile.representative.name}</p>
        <p className="text-xs font-bold uppercase tracking-[.12em] text-[#a9151b]">
          {corporateProfile.representative.title} | {corporateProfile.legalName}
        </p>
      </section>

      <footer className="mt-8 border-t-4 border-[#070a2c] pt-4 text-xs leading-5 text-slate-600">
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <span>{corporateProfile.contact.phone} · {corporateProfile.contact.email}</span>
          <span>{corporateProfile.website.replace(/^https?:\/\//, "")}</span>
        </div>
      </footer>
    </article>
  )
}
