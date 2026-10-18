export const SOCIAL_PLATFORMS = [
  "facebook",
  "instagram",
  "linkedin",
  "google",
  "marketplace",
] as const

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number]

export const SOCIAL_CHANNELS: {
  value: SocialPlatform
  label: string
  limit: number
  manualOnly?: boolean
}[] = [
  { value: "facebook", label: "Facebook", limit: 5000 },
  { value: "instagram", label: "Instagram", limit: 2200 },
  { value: "linkedin", label: "LinkedIn", limit: 3000 },
  { value: "google", label: "Google Business Profile", limit: 1500 },
  { value: "marketplace", label: "Facebook Marketplace (manual)", limit: 5000, manualOnly: true },
]

export const SOCIAL_CAPTION_STARTERS = [
  {
    label: "Plan a project",
    caption: "Planning a painting project? A clear first step is talking through the space, surfaces, timing, and finish you have in mind. Share a few details with NXG to discuss next steps.",
  },
  {
    label: "Surface preparation",
    caption: "Every property and surface is different. Tell us about the current condition and the work you are considering so NXG can review the project scope with you.",
  },
  {
    label: "Color consultation",
    caption: "Considering a new color for your space? Room photos, natural-light notes, and finish preferences are helpful starting points for a color consultation with NXG.",
  },
  {
    label: "Exterior painting",
    caption: "Thinking about exterior painting? Siding, trim, and current surface condition all help shape the project scope. Share a few details to start a review with NXG.",
  },
  {
    label: "Cabinet refinishing",
    caption: "A cabinet refresh can start with a conversation about the existing finish, hardware, and look you want to explore. Ask NXG about cabinet refinishing for your space.",
  },
] as const

export type CampaignChannelVariant = {
  caption: string
  cta?: string
  hashtags?: string[]
}

export function buildChannelCaption(
  variants: Partial<Record<SocialPlatform, CampaignChannelVariant>> | undefined,
  platform: SocialPlatform,
) {
  const variant = variants?.[platform]
  if (!variant) return ""

  const caption = variant.caption.trim()
  const cta = variant.cta?.trim()
  const hashtags = variant.hashtags?.map((tag) => tag.startsWith("#") ? tag : `#${tag}`).join(" ")

  return [
    caption,
    cta && !caption.toLowerCase().includes(cta.toLowerCase()) ? cta : "",
    hashtags,
  ].filter(Boolean).join("\n\n")
}
