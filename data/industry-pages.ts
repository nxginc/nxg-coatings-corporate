import { ASSETS } from "@/lib/assets"

export type IndustryPageData = {
  name: string
  title: string
  summary: string
  heroImage: string
  heroAlt: string
  introTitle: string
  intro: string
  considerations: string[]
  scopes: { title: string; description: string; image: string; alt: string }[]
  related: { title: string; href: string }[]
}

export const industryPages: Record<string, IndustryPageData> = {
  residential: {
    name: "Residential",
    title: "A more considered finish for home.",
    summary: "Interior, exterior, cabinet, and deck work planned around the home and the people who live in it.",
    heroImage: ASSETS.industries_featured.residential_featured,
    heroAlt: "Residential painting and coating project",
    introTitle: "Keep the home in view at every step.",
    intro: "Residential work often spans different surfaces and priorities. We start by listening, reviewing the property, and establishing a clear scope for the rooms and materials involved.",
    considerations: ["Occupied-home access and protection", "Surface and finish condition", "Color and sheen coordination", "Clear sequence and cleanup plan"],
    scopes: [
      { title: "Interior spaces", description: "Room-by-room painting with practical protection, preparation, and finish choices.", image: ASSETS.services.interior, alt: "Residential interior painting project" },
      { title: "Exterior surfaces", description: "Exterior preparation and coating scopes for siding, trim, doors, and other details.", image: ASSETS.services.exterior, alt: "Residential exterior painting project" },
      { title: "Cabinets and decks", description: "Specialty refinishing plans for cabinetry and outdoor wood surfaces.", image: ASSETS.services.deck, alt: "Residential deck staining project" },
    ],
    related: [{ title: "Interior painting", href: "/services/interior-painting" }, { title: "Exterior painting", href: "/services/exterior-painting" }, { title: "Request an estimate", href: "/quote" }],
  },
  commercial: {
    name: "Commercial",
    title: "Spaces that keep business moving.",
    summary: "Painting and coating plans for offices, retail, and commercial properties with operations in mind.",
    heroImage: ASSETS.industries_featured.commercial_featured,
    heroAlt: "Commercial painting and coating project",
    introTitle: "Plan the work around the people using the space.",
    intro: "Commercial scopes benefit from clear phasing, access planning, and finish choices suited to the property's use. We coordinate priorities and discuss scheduling constraints before work begins.",
    considerations: ["Operating hours and access windows", "Phased scopes and occupant communication", "Surface durability and maintenance needs", "Site safety and protection requirements"],
    scopes: [
      { title: "Office environments", description: "Refresh offices, corridors, and shared spaces with a defined work sequence.", image: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/commercial/office-painting_4E4EaH-7y.JPG?updatedAt=1747490385376&tr=n-ik_ml_thumbnail", alt: "Commercial office painting project" },
      { title: "Retail and customer areas", description: "Coordinate finish, access, and staging for customer-facing commercial spaces.", image: ASSETS.industries.commercial, alt: "Commercial property coating project" },
      { title: "Facility surfaces", description: "Include walls, overhead structures, and other agreed facility surfaces in a clear scope.", image: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/commercial/overhead-structures-and-pipe-painting_AkpOx8NnB.jpg?updatedAt=1746877877926&tr=n-ik_ml_thumbnail", alt: "Commercial overhead structure and pipe painting" },
    ],
    related: [{ title: "Commercial painting", href: "/quote?service=commercial-painting" }, { title: "Industrial coatings", href: "/industries/industrial" }, { title: "Request a walkthrough", href: "/quote" }],
  },
  industrial: {
    name: "Industrial",
    title: "Coating scopes for demanding facilities.",
    summary: "Facility and equipment coating planning focused on substrate, exposure, access, and operational requirements.",
    heroImage: ASSETS.industries_featured.industrial_featured,
    heroAlt: "Industrial facility coating project",
    introTitle: "Start with the conditions the coating must meet.",
    intro: "Industrial projects require a clear understanding of substrate condition, exposure, access, and the work environment. NXG scopes the agreed surfaces and coordinates preparation and application planning with the site team.",
    considerations: ["Substrate and existing coating condition", "Chemical, moisture, temperature, or traffic exposure", "Access, shutdown, and safety coordination", "System selection and maintenance expectations"],
    scopes: [
      { title: "Floor coating systems", description: "Review traffic, substrate condition, and intended use when planning floor coatings.", image: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/industrial/industrial-structure-painting-services_7VncZWEPH.jpg", alt: "Industrial facility surface coating" },
      { title: "Corrosion and exposure protection", description: "Plan coating scope around the facility's environment and surface requirements.", image: ASSETS.industries_featured.industrial_featured, alt: "Industrial structure prepared for coating" },
      { title: "Markings and equipment", description: "Include safety markings, equipment, or other surfaces in the agreed project plan.", image: ASSETS.industries.industrial, alt: "Industrial equipment and structural coating" },
    ],
    related: [{ title: "Commercial projects", href: "/industries/commercial" }, { title: "Discuss facility requirements", href: "/quote?service=industrial-coatings" }, { title: "Project process", href: "/process" }],
  },
  hoa: {
    name: "HOA and multi-family",
    title: "Coordinated work across a community.",
    summary: "Exterior, common-area, and turnover painting plans for associations and multi-family properties.",
    heroImage: ASSETS.industries_featured.hoa_featured,
    heroAlt: "HOA and multi-family exterior painting project",
    introTitle: "Consistency and communication matter.",
    intro: "Community projects involve multiple buildings, shared spaces, and resident schedules. We help define phases, access, finish standards, and communication needs with the property team.",
    considerations: ["Building or unit phasing", "Resident notice and access coordination", "Color consistency across shared assets", "Board and property-team review points"],
    scopes: [
      { title: "Building exteriors", description: "Coordinate exterior scopes across buildings, trim, and shared architectural details.", image: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/hoa/hoa-exterior_gQCOAvl8Q.JPG?updatedAt=1747490345040", alt: "HOA exterior painting project" },
      { title: "Common areas", description: "Plan halls and shared interiors with access and resident communication in mind.", image: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/hoa/hallway_qBTUh00Xz.jpeg?updatedAt=1747490345579", alt: "Multi-family common-area hallway finish" },
      { title: "Decks and shared outdoor spaces", description: "Review deck and fence surfaces, finish choices, and phased access needs.", image: "https://ik.imagekit.io/j98e6hcfnkn/service-pages/hoa/4CB662A8-7DB8-43B7-BE85-6329C3C19063_4k7OHF_iI6.jpeg?updatedAt=1746446597753", alt: "Shared deck and fence refinishing" },
    ],
    related: [{ title: "Exterior painting", href: "/services/exterior-painting" }, { title: "Deck staining", href: "/services/deck-staining" }, { title: "Request a property walkthrough", href: "/quote?service=hoa-multifamily" }],
  },
}