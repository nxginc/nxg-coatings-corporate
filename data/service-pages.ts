import { ASSETS } from "@/lib/assets"

export type ServicePageData = {
  name: string
  title: string
  summary: string
  heroImage: string
  heroAlt: string
  introTitle: string
  intro: string
  supportingText: string
  detailImage: string
  detailAlt: string
  highlights: string[]
  scopes: { title: string; description: string; image: string; alt: string }[]
  steps: { title: string; description: string }[]
  related: { title: string; href: string }[]
}

export const servicePages: Record<string, ServicePageData> = {
  exterior: {
    name: "Exterior painting",
    title: "A considered finish, built for the outdoors.",
    summary: "Exterior painting for Minnesota homes, with the preparation and material choices each surface calls for.",
    heroImage: ASSETS.services.exterior,
    heroAlt: "Exterior painting project photographed by NXG Coatings",
    introTitle: "The finish starts with the surface.",
    intro: "An exterior project is more than a new color. We assess the existing finish, address the preparation the home needs, and plan the work around siding, trim, doors, and other exposed surfaces.",
    supportingText: "From the first walkthrough through cleanup, NXG coordinates the details that help a repaint look intentional and protect the materials beneath it.",
    detailImage: "https://ik.imagekit.io/j98e6hcfnkn/Banners/f4_aYaWf2GGw.jpg?updatedAt=1679013239596",
    detailAlt: "Finished exterior home painting",
    highlights: ["Surface assessment and preparation", "Finish selection suited to the material", "Careful masking and property protection", "Clear project scope and final walkthrough"],
    scopes: [
      { title: "Siding and masonry", description: "Preparation and coating plans matched to wood, fiber cement, stucco, brick, or other existing surfaces.", image: ASSETS.services.siding, alt: "Exterior siding prepared for painting" },
      { title: "Trim, fascia, and details", description: "Crisp transitions on fascia, soffits, trim, and architectural details that frame the home.", image: ASSETS.services.trim, alt: "Exterior trim and fascia detail" },
      { title: "Doors, windows, and shutters", description: "Focused refinishing for the high-visibility details that complete an exterior color scheme.", image: ASSETS.services.doors, alt: "Painted entry door detail" },
    ],
    steps: [
      { title: "Walkthrough", description: "Review surfaces, access, priorities, and the desired finish." },
      { title: "Prepare", description: "Clean, scrape, repair, mask, and prime where the surface requires it." },
      { title: "Apply", description: "Complete the agreed coating work with attention to coverage and detail." },
      { title: "Review", description: "Walk the completed scope together and leave the work area orderly." },
    ],
    related: [{ title: "Deck staining", href: "/services/deck-staining" }, { title: "Interior painting", href: "/services/interior-painting" }, { title: "Color consultation", href: "/services/color-consultation" }],
  },
  interior: {
    name: "Interior painting",
    title: "A room can feel entirely different.",
    summary: "Interior painting with practical planning, careful protection, and a refined finish from room to room.",
    heroImage: ASSETS.services.interior,
    heroAlt: "Interior painting project by NXG Coatings",
    introTitle: "A good result respects the room.",
    intro: "Every interior has its own light, use, and details. We plan the work with the space in mind, protect the areas around it, and keep the agreed scope clear from preparation to final walkthrough.",
    supportingText: "Whether you are refreshing one room or coordinating several areas, our team helps make the project easier to plan and live through.",
    detailImage: ASSETS.services.kitchenBathroom,
    detailAlt: "Interior kitchen and cabinet finish",
    highlights: ["Furniture and floor protection", "Wall and trim preparation", "Color and sheen coordination", "Detailed cleanup and walkthrough"],
    scopes: [
      { title: "Living spaces", description: "Walls, ceilings, and trim planned together for a cohesive living and gathering space.", image: ASSETS.services.livingAreas, alt: "Freshly painted living area" },
      { title: "Kitchens and baths", description: "Thoughtful finish choices and precise detailing in rooms with daily use and changing light.", image: ASSETS.services.kitchenBathroom, alt: "Kitchen and bathroom interior finish" },
      { title: "Bedrooms and details", description: "A considered palette for bedrooms, accent walls, ceilings, and architectural millwork.", image: ASSETS.services.bedroom, alt: "Painted bedroom interior" },
    ],
    steps: [
      { title: "Plan", description: "Confirm rooms, colors, access, and how the space is used." },
      { title: "Protect", description: "Cover floors and furnishings, then prepare surfaces for the selected finish." },
      { title: "Paint", description: "Apply the agreed system with clean edges and attention to detail." },
      { title: "Walk through", description: "Review the work and complete the final cleanup together." },
    ],
    related: [{ title: "Cabinet refinishing", href: "/services/cabinet-refinishing" }, { title: "Fine finish and millwork", href: "/services" }, { title: "Color consultation", href: "/services/color-consultation" }],
  },
  deck: {
    name: "Deck staining and refinishing",
    title: "Bring the outdoors back into focus.",
    summary: "Deck cleaning, staining, and refinishing planned around the wood, current coating, and exposure.",
    heroImage: ASSETS.services.deck,
    heroAlt: "Restored wood deck with a finished stain",
    introTitle: "Outdoor wood needs a finish that fits.",
    intro: "Sun, moisture, and everyday use all affect a deck differently. We review the existing surface, discuss the look you want, and shape the preparation and stain plan around the condition of the wood.",
    supportingText: "From cleaning and surface preparation to stain and sealer selection, each step is considered before application begins.",
    detailImage: ASSETS.services.deckSolid,
    detailAlt: "Deck finished with a solid color stain",
    highlights: ["Existing finish and wood condition reviewed", "Cleaning and preparation scoped to the surface", "Transparent, semi-transparent, or solid stain options", "Sealing and care guidance discussed"],
    scopes: [
      { title: "Clean and prepare", description: "Remove surface buildup and prepare the deck for the selected finish.", image: ASSETS.services.deckCleaning, alt: "Deck surface cleaned before staining" },
      { title: "Choose a stain", description: "Compare transparent, semi-transparent, and solid color options for the look and coverage you prefer.", image: ASSETS.services.deckSemiTransparent, alt: "Semi-transparent deck stain finish" },
      { title: "Protect the surface", description: "Discuss sealing, water management, and maintenance needs for the finished deck.", image: ASSETS.services.deckWaterproofing, alt: "Waterproofing and sealing detail on a deck" },
    ],
    steps: [
      { title: "Assess", description: "Review the wood, current coating, wear, and drainage." },
      { title: "Prepare", description: "Clean and prepare the surface, allowing appropriate dry time." },
      { title: "Finish", description: "Apply the agreed stain or sealer system to the prepared surface." },
      { title: "Care", description: "Review the final result and discuss practical maintenance." },
    ],
    related: [{ title: "Exterior painting", href: "/services/exterior-painting" }, { title: "Cabinet refinishing", href: "/services/cabinet-refinishing" }, { title: "Request an estimate", href: "/quote" }],
  },
  cabinets: {
    name: "Cabinet refinishing",
    title: "Refresh the room. Keep what works.",
    summary: "Cabinet refinishing that gives sound cabinetry a new finish without planning a full replacement.",
    heroImage: ASSETS.cabinets.hero,
    heroAlt: "Refinished bathroom cabinetry",
    introTitle: "A new cabinet finish can change the whole room.",
    intro: "If the cabinet layout still works for you, refinishing can be a focused way to update the room's color and feel. We review the existing material and finish, discuss the desired result, and define the preparation and coating scope.",
    supportingText: "Kitchen cabinetry, bathroom vanities, and built-ins each call for careful cleaning, preparation, and finish selection. We plan the work around those details.",
    detailImage: ASSETS.cabinets.kitchen,
    detailAlt: "Kitchen cabinetry prepared for refinishing",
    highlights: ["Existing cabinet condition reviewed", "Color and finish options discussed", "Doors, drawers, and hardware scoped clearly", "Careful preparation and clean work areas"],
    scopes: [
      { title: "Kitchen cabinets", description: "Refresh the visible finish while retaining the cabinet boxes and layout that suit the room.", image: ASSETS.cabinets.kitchen, alt: "Kitchen cabinets with a renewed finish" },
      { title: "Bathroom vanities", description: "Coordinate vanity color and finish with tile, counters, lighting, and the rest of the space.", image: ASSETS.cabinets.bathroom, alt: "Refinished bathroom vanity cabinets" },
      { title: "Built-ins and details", description: "Bring built-ins, shelves, and hardware into the larger finish plan.", image: ASSETS.cabinets.hardware, alt: "Cabinet hardware and finish detail" },
    ],
    steps: [
      { title: "Review", description: "Inspect materials, existing finish, hardware, and project priorities." },
      { title: "Prepare", description: "Clean, mask, and prepare cabinet surfaces for the selected system." },
      { title: "Refinish", description: "Apply the agreed finish to the scoped cabinet surfaces and components." },
      { title: "Reassemble", description: "Review the finish, reinstall agreed hardware, and complete cleanup." },
    ],
    related: [{ title: "Interior painting", href: "/services/interior-painting" }, { title: "Color consultation", href: "/services/color-consultation" }, { title: "View project gallery", href: "/gallery" }],
  },
  fineFinishes: {
    name: "Fine finish and millwork painting",
    title: "Precision for the details that define a room.",
    summary: "Fine finish painting for trim, doors, windows, built-ins, and architectural millwork.",
    heroImage: ASSETS.services.fineFinish,
    heroAlt: "Fine finish and millwork painting project",
    introTitle: "The details deserve their own plan.",
    intro: "Trim, doors, windows, and built-ins bring definition to a space. We review the existing surfaces, confirm the finish and sheen, and plan careful preparation around the surrounding room.",
    supportingText: "Whether the scope is a focused millwork refresh or part of a broader interior project, we coordinate the details with the overall finish.",
    detailImage: ASSETS.services.trimCeiling,
    detailAlt: "Painted interior trim and ceiling detail",
    highlights: ["Surface condition and existing coatings reviewed", "Color and sheen coordinated with surrounding finishes", "Protection and preparation planned for adjacent surfaces", "Scope confirmed before detail work begins"],
    scopes: [
      { title: "Trim and architectural details", description: "Refresh baseboards, casings, crown molding, and other painted millwork.", image: ASSETS.services.trim, alt: "Architectural trim prepared for a new finish" },
      { title: "Doors and windows", description: "Coordinate the finish of doors, frames, and window trim with the surrounding room.", image: ASSETS.services.doors, alt: "Door prepared for a detailed paint finish" },
      { title: "Built-ins and cabinetry", description: "Plan a consistent finish for built-ins and other detailed interior woodwork.", image: ASSETS.cabinets.built, alt: "Built-in cabinetry and millwork" },
    ],
    steps: [
      { title: "Review details", description: "Identify the surfaces, existing finish, condition, and desired result." },
      { title: "Protect and prepare", description: "Protect nearby surfaces and prepare the scoped millwork for coating." },
      { title: "Apply the finish", description: "Complete the agreed detail work with attention to clean edges and coverage." },
      { title: "Walk through", description: "Review the finished scope and complete cleanup." },
    ],
    related: [{ title: "Interior painting", href: "/services/interior-painting" }, { title: "Cabinet refinishing", href: "/services/cabinet-refinishing" }, { title: "Color consultation", href: "/services/color-consultation" }],
  },
  pressureCleaning: {
    name: "Pressure cleaning",
    title: "A clean surface is the start of a lasting finish.",
    summary: "Exterior and outdoor surface cleaning scoped to the material, condition, and next step for your project.",
    heroImage: ASSETS.services.pressureCleaning,
    heroAlt: "Exterior surface cleaning before a coating project",
    introTitle: "Preparation starts with understanding the surface.",
    intro: "Cleaning can help remove dirt and buildup before painting or staining, but the right approach depends on the material and its condition. We review the surface and discuss the preparation needed for the project.",
    supportingText: "Pressure and cleaning methods are selected with care to avoid treating every surface the same way.",
    detailImage: ASSETS.services.deckCleaning,
    detailAlt: "Deck surface cleaned before refinishing",
    highlights: ["Surface and condition reviewed first", "Cleaning method matched to the material", "Nearby landscaping and property considered", "Dry time and next steps included in the project plan"],
    scopes: [
      { title: "Exterior surfaces", description: "Discuss cleaning needs for siding, masonry, and other exposed surfaces before finishing.", image: ASSETS.services.pressureCleaning, alt: "Exterior surface cleaning" },
      { title: "Decks and outdoor wood", description: "Remove surface buildup as part of a scoped deck preparation and refinishing plan.", image: ASSETS.services.deckCleaning, alt: "Deck cleaning and preparation" },
      { title: "Preparation for painting", description: "Coordinate cleaning with repairs, drying time, and the planned coating system.", image: ASSETS.services.exterior, alt: "Exterior painting project after preparation" },
    ],
    steps: [
      { title: "Assess", description: "Review the material, existing finish, buildup, and surrounding conditions." },
      { title: "Plan", description: "Agree on an appropriate cleaning and protection approach for the scoped surface." },
      { title: "Clean", description: "Complete the planned cleaning while protecting adjacent areas." },
      { title: "Prepare next", description: "Allow suitable dry time and confirm any remaining preparation before coating." },
    ],
    related: [{ title: "Exterior painting", href: "/services/exterior-painting" }, { title: "Deck staining", href: "/services/deck-staining" }, { title: "Request an estimate", href: "/quote?service=pressure-cleaning" }],
  },
  restoration: {
    name: "Paint restoration",
    title: "Renew worn finishes with a plan for the surface.",
    summary: "Repair and repainting scopes for painted surfaces that need more than a simple refresh.",
    heroImage: ASSETS.services.restoration,
    heroAlt: "Paint restoration project by NXG Coatings",
    introTitle: "Understand what is beneath the failing finish.",
    intro: "Peeling, chalking, cracking, and worn coatings can have different causes. We review the affected surface and discuss the preparation and repair work that may be needed before a new finish is applied.",
    supportingText: "The project scope is based on the observed condition and agreed repairs; a new coating alone cannot correct every underlying issue.",
    detailImage: ASSETS.services.deckRestoration,
    detailAlt: "Wood surface prepared for restoration and refinishing",
    highlights: ["Existing coating and surface condition assessed", "Visible repair and preparation needs discussed", "Coating choices matched to the scoped surface", "Final scope reviewed before work begins"],
    scopes: [
      { title: "Peeling and worn paint", description: "Review loose or deteriorated coating and plan appropriate preparation before repainting.", image: ASSETS.services.restoration, alt: "Paint restoration work on a worn surface" },
      { title: "Exterior restoration", description: "Coordinate cleaning, scraping, repairs, and repainting for exposed exterior surfaces.", image: ASSETS.services.exterior, alt: "Restored exterior painting project" },
      { title: "Deck and wood finishes", description: "Assess worn deck coatings and discuss cleaning, refinishing, and ongoing care.", image: ASSETS.services.deckRestoration, alt: "Restored wood deck finish" },
    ],
    steps: [
      { title: "Inspect", description: "Review the surface, existing coating, and visible areas of concern." },
      { title: "Define repairs", description: "Discuss preparation and repair work appropriate to the agreed scope." },
      { title: "Restore", description: "Prepare and refinish the surfaces included in the project plan." },
      { title: "Review", description: "Walk through the completed work and clarify care considerations." },
    ],
    related: [{ title: "Exterior painting", href: "/services/exterior-painting" }, { title: "Deck staining", href: "/services/deck-staining" }, { title: "Request an estimate", href: "/quote?service=paint-restoration" }],
  },
  protectiveCoatings: {
    name: "Protective coatings",
    title: "Coating plans built around demanding surfaces.",
    summary: "Protective coating scopes for commercial and industrial properties, planned around surface use and project conditions.",
    heroImage: ASSETS.services.protectiveCoatings,
    heroAlt: "Industrial structure prepared for protective coating",
    introTitle: "Start with the surface and how it is used.",
    intro: "Protective coating work depends on the substrate, exposure, operating conditions, and the required finish. We review the project conditions and define the surfaces and preparation included in the scope.",
    supportingText: "Product and performance requirements should be confirmed for each project; this overview is not a specification or performance guarantee.",
    detailImage: ASSETS.industries.industrial,
    detailAlt: "Industrial facility coating project",
    highlights: ["Substrate and operating conditions reviewed", "Preparation and access requirements scoped", "Coating system discussed for intended use", "Project schedule coordinated around site operations"],
    scopes: [
      { title: "Facility surfaces", description: "Plan coating work for selected interior or exterior building surfaces.", image: ASSETS.industries.industrial, alt: "Industrial facility surfaces" },
      { title: "High-use areas", description: "Discuss coating needs for surfaces subject to frequent use, cleaning, or exposure.", image: ASSETS.services.restoration, alt: "Surface prepared for a protective coating" },
      { title: "Commercial properties", description: "Coordinate a defined coating scope with property access and operations.", image: ASSETS.industries.commercial, alt: "Commercial property coating project" },
    ],
    steps: [
      { title: "Review conditions", description: "Discuss substrates, exposure, access, operations, and project requirements." },
      { title: "Define scope", description: "Confirm preparation, selected surfaces, coating system, and schedule." },
      { title: "Prepare and apply", description: "Complete the agreed work following the project-specific plan." },
      { title: "Document and review", description: "Review completed surfaces and any project-specific care information." },
    ],
    related: [{ title: "Industrial coatings", href: "/industries/industrial" }, { title: "Commercial painting", href: "/industries/commercial" }, { title: "Request an estimate", href: "/quote?service=protective-coatings" }],
  },
}