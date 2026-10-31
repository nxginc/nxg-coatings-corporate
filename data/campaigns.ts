import { ASSETS } from "@/lib/assets"

export type CampaignDefinition = {
    slug: string
    title: string
    description: string
    service: string
    image: string
    imageAlt: string
    audience: string
    details: string[]
}

const definitions: CampaignDefinition[] = [
    { slug: "quote", title: "Plan your next painting project.", description: "Tell us about the property, the surfaces, and the timing you have in mind. NXG will follow up to review next steps.", service: "Painting and coatings", image: ASSETS.hero.fallback, imageAlt: "NXG Coatings project photography", audience: "Homeowners and property teams", details: ["Project scope review", "Virtual or on-site assessment", "Follow-up from the NXG team"] },
    { slug: "commercial", title: "A dependable finish for working spaces.", description: "Coordinate painting and coating work around your building, occupants, and operating schedule.", service: "Commercial painting", image: ASSETS.industries.commercial, imageAlt: "Commercial property painting project", audience: "Owners and property managers", details: ["Scope aligned to property needs", "Scheduling discussion", "Project-specific estimate"] },
    { slug: "industrial", title: "Coatings for demanding facilities.", description: "Share your facility type, surfaces, and operating requirements so NXG can review the right project approach.", service: "Industrial coatings", image: ASSETS.industries.industrial, imageAlt: "Industrial facility coating project", audience: "Facility and operations teams", details: ["Facility and surface review", "Access and timing discussion", "Project-specific estimate"] },
    { slug: "epoxy", title: "Talk through your floor coating project.", description: "Describe the space, current floor condition, and how the area is used for a project review.", service: "Protective coatings", image: ASSETS.industries.industrial, imageAlt: "Facility surface coating project", audience: "Commercial and facility teams", details: ["Surface condition review", "Use and access discussion", "Recommended next steps"] },
    { slug: "office", title: "Refresh your office with less disruption.", description: "Tell us about your space and schedule. We will discuss a project plan suited to your workplace.", service: "Commercial painting", image: ASSETS.industries.commercial, imageAlt: "Commercial interior project", audience: "Office owners and property teams", details: ["Space and schedule review", "Work-area coordination", "Project-specific estimate"] },
    { slug: "warehouse", title: "Plan a warehouse coating project.", description: "Start with the building, surfaces, access needs, and operating schedule. NXG will follow up on the details.", service: "Industrial coatings", image: ASSETS.industries.industrial, imageAlt: "Industrial coating project", audience: "Warehouse and facility teams", details: ["Facility scope review", "Access planning discussion", "Project-specific estimate"] },
    { slug: "interior", title: "Interior painting, planned around your space.", description: "Share the rooms, surfaces, and timing you are considering. NXG will help define the next step.", service: "Interior painting", image: ASSETS.services.interior, imageAlt: "Interior painting project", audience: "Homeowners and property teams", details: ["Room and surface review", "Preparation discussion", "Color and finish planning"] },
    { slug: "exterior", title: "Protect and refresh your exterior.", description: "Tell us about the siding, trim, and current surface condition for a project review.", service: "Exterior painting", image: ASSETS.services.exterior, imageAlt: "Exterior painting project", audience: "Homeowners and property managers", details: ["Exterior condition review", "Preparation discussion", "Project-specific estimate"] },
    { slug: "deck", title: "Bring your deck back into the conversation.", description: "Share the deck condition and finish you want to explore. NXG will review the project with you.", service: "Deck staining", image: ASSETS.services.deck, imageAlt: "Deck staining project", audience: "Homeowners and property managers", details: ["Surface preparation review", "Stain and finish discussion", "Project-specific estimate"] },
    { slug: "cabinets", title: "Explore cabinet refinishing.", description: "Tell us about your cabinets, current finish, and desired direction for an initial review.", service: "Cabinet refinishing", image: ASSETS.cabinets.hero, imageAlt: "Cabinet refinishing project", audience: "Homeowners and property teams", details: ["Cabinet and surface review", "Color and finish discussion", "Project-specific estimate"] },
    { slug: "multifamily", title: "Coordinate painting for multifamily properties.", description: "Share the property type, common areas, and resident coordination needs for a project review.", service: "Multifamily painting", image: ASSETS.industries.hoa, imageAlt: "Multifamily property painting project", audience: "HOA boards and property managers", details: ["Property scope review", "Resident coordination discussion", "Project-specific estimate"] },
]

export const campaigns = Object.fromEntries(definitions.map((campaign) => [campaign.slug, campaign])) as Record<string, CampaignDefinition>
export const campaignSlugs = definitions.map(({ slug }) => slug)