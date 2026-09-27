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
}