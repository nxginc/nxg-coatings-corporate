import { ASSETS } from "@/lib/assets"

export const serviceGalleryImages = [
  { id: "exterior", src: ASSETS.services.exterior, alt: "Exterior painting service imagery", category: "Exterior", title: "Exterior painting" },
  { id: "interior", src: ASSETS.services.interior, alt: "Interior painting service imagery", category: "Interior", title: "Interior painting" },
  { id: "cabinets", src: ASSETS.services.cabinet, alt: "Cabinet refinishing service imagery", category: "Cabinets", title: "Cabinet refinishing" },
  { id: "decks", src: ASSETS.services.deck, alt: "Deck staining service imagery", category: "Decks", title: "Deck staining" },
  { id: "fine-finishes", src: ASSETS.services.fineFinish, alt: "Fine finish and millwork service imagery", category: "Specialty finishes", title: "Fine finishes and millwork" },
  { id: "commercial", src: ASSETS.industries.commercial, alt: "Commercial painting service imagery", category: "Commercial", title: "Commercial painting" },
  { id: "industrial", src: ASSETS.services.protectiveCoatings, alt: "Protective coating service imagery", category: "Protective coatings", title: "Protective coatings" },
  { id: "hoa", src: ASSETS.industries.hoa, alt: "Multi-family painting service imagery", category: "HOA and multi-family", title: "Multi-family painting" },
  { id: "pressure-washing", src: ASSETS.services.pressureCleaning, alt: "Pressure cleaning service imagery", category: "Pressure washing", title: "Pressure washing" },
  { id: "restoration", src: ASSETS.services.restoration, alt: "Paint restoration service imagery", category: "Restoration", title: "Paint restoration" },
] as const
