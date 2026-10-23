import designTokens from "@/data/design-tokens.json"
import { ASSETS } from "@/lib/assets"
import { NXG_SITE } from "@/lib/site-metadata"

export type BrandTheme = {
  navy: string
  red: string
  platinum: string
  charcoal: string
  paper: string
  line: string
  muted: string
  contentWidth: string
}

export type CorporateProfile = {
  legalName: string
  displayName: string
  tagline: string
  addressLines: string[]
  phone: string
  email: string
  website: string
  logoUrl: string
  theme: BrandTheme
}

const colors = designTokens.tokens.color
const layout = designTokens.tokens.layout

export const NXG_BRAND_THEME: BrandTheme = {
  navy: colors["brand.navy"].value,
  red: colors["brand.red"].value,
  platinum: colors["brand.platinum"].value,
  charcoal: colors["brand.charcoal"].value,
  paper: colors["surface.paper"].value,
  line: colors["border.default"].value,
  muted: colors["text.muted"].value,
  contentWidth: layout["content.maxWidth"].value,
}

export const NXG_CORPORATE_PROFILE: CorporateProfile = {
  legalName: "NXG Coatings Inc.",
  displayName: "NXG Coatings Inc.",
  tagline: "Professional painting and coating services",
  addressLines: ["5200 Willson Blvd, Suite 150", "Edina, MN 55424"],
  phone: NXG_SITE.phoneDisplay,
  email: NXG_SITE.email,
  website: "nxgcoatingsinc.com",
  logoUrl: ASSETS.logo.primary,
  theme: NXG_BRAND_THEME,
}
