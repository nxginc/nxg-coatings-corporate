export type LeadVettingInput = {
  name: string
  email: string
  phone?: string | null
  service?: string | null
  projectType?: string | null
  address?: string | null
  message?: string | null
  preferredDate?: string | null
}

export type LeadVettingResult = {
  score: number
  status: "needs_information" | "review" | "priority"
  flags: string[]
}

export function vetLead(input: LeadVettingInput): LeadVettingResult {
  let score = 0
  const flags: string[] = []

  if (input.name.trim().length >= 2) score += 10
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) score += 15
  if (input.phone?.trim()) score += 15
  else flags.push("missing_phone")
  if (input.service?.trim()) score += 10
  else flags.push("missing_service")
  if (input.projectType?.trim()) score += 10
  if (input.address?.trim()) score += 15
  else flags.push("missing_address")
  if ((input.message || "").trim().length >= 40) score += 15
  else flags.push("short_project_description")
  if (input.preferredDate?.trim()) score += 10

  const boundedScore = Math.min(score, 100)
  const status = boundedScore >= 75 ? "priority" : flags.length >= 2 ? "needs_information" : "review"
  return { score: boundedScore, status, flags }
}
