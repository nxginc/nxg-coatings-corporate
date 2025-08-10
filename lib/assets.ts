// Centralized asset URL definitions for NXG Coatings site.
// Modify here to swap CDN paths or update branding without searching codebase.
export const ASSETS = {
  logo: {
    primary: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    alt: "https://ik.imagekit.io/j98e6hcfnkn/logo/nxg-professional_8SkCG5O3z.jpeg?updatedAt=1747919123959",
    login: "https://ik.imagekit.io/j98e6hcfnkn/logo_m2ODAWFyf.png?updatedAt=1741216795011",
  },
  hero: {
    fallback: "https://ik.imagekit.io/j98e6hcfnkn/featured/featured-home/f2_ElysbPaNW.jpg?updatedAt=1704333595263",
    services: "https://ik.imagekit.io/j98e6hcfnkn/services/banner_4xUQ8Hf5X.jpeg?updatedAt=1747919188438",
    process: "https://ik.imagekit.io/j98e6hcfnkn/Banners/f4_aYaWf2GGw.jpg?updatedAt=1679013239596",
    blog: "https://ik.imagekit.io/j98e6hcfnkn/Banners/blog-banner_Yx9Ue-Zzr.jpg?updatedAt=1679013242072",
    gallery: "https://cdn.nxgcoatings.com/banners/gallery-hero.jpg",
  },
  services: {
    fineFinish: "https://ik.imagekit.io/j98e6hcfnkn/Banners/finefinishes_BOJLvbsTP.jpg?updatedAt=1666774120425",
    interior: "https://ik.imagekit.io/j98e6hcfnkn/services/interior-painting/banner_b2Y8UyWyV.jpeg?updatedAt=1747919188435",
    exterior: "https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/banner_BWS_dLAhw.jpeg?updatedAt=1747919188436",
    cabinet: "https://ik.imagekit.io/j98e6hcfnkn/services/cabinet-refinishing/banner_pYH44QwJ1.jpeg?updatedAt=1747919188437",
    deck: "https://ik.imagekit.io/j98e6hcfnkn/services/deck-staining/banner_dAJqKYo2H.jpeg?updatedAt=1747919188435",
    colorConsultation: "https://ik.imagekit.io/j98e6hcfnkn/Banners/f3_ER1drZAJS.jpg?updatedAt=1679013242072",
    // Exterior painting service images
    siding: "https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/siding.jpg?updatedAt=1741960872540",
    trim: "https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/trim.jpg?updatedAt=1741960872540",
    doors: "https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/doors.jpg?updatedAt=1741960872540",
    garage: "https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/garage.jpg?updatedAt=1741960872540",
    stucco: "https://ik.imagekit.io/j98e6hcfnkn/services/exterior-painting/stucco.jpg?updatedAt=1741960872540",
    // Deck is already present as 'deck'
    // Interior painting service images
    livingAreas: "https://cdn.nxgcoatings.com/services/interior-painting/living-areas.jpg",
    kitchenBathroom: "https://cdn.nxgcoatings.com/services/interior-painting/kitchen-bathroom.jpg",
    bedroom: "https://cdn.nxgcoatings.com/services/interior-painting/bedroom.jpg",
    trimCeiling: "https://cdn.nxgcoatings.com/services/interior-painting/trim-ceiling.jpg",
    accentWall: "https://cdn.nxgcoatings.com/services/interior-painting/accent-wall.jpg",
    specialtyFinish: "https://cdn.nxgcoatings.com/services/interior-painting/specialty-finish.jpg",
  },
  industries: {
    residential: "https://ik.imagekit.io/j98e6hcfnkn/Industries/residential_FqQDni9Oa.jpg?updatedAt=1665175459020",
    commercial: "https://ik.imagekit.io/j98e6hcfnkn/industries/commercial/banner_dWRiH2Tw5.jpeg?updatedAt=1747919188438",
    industrial: "https://ik.imagekit.io/j98e6hcfnkn/industries/industrial/banner_Y0T8jEiH8.jpeg?updatedAt=1747919188439",
    hoa: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/hoa/64377d87f8cf768523c106d0_hoa-painting-hero-02_WTec4soEPA.webp?updatedAt=1747490345547",
  },
  placeholders: {
    image: "/placeholder.svg",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  blog: {
    coverFallback: "https://ik.imagekit.io/j98e6hcfnkn/services/banner_4xUQ8Hf5X.jpeg?updatedAt=1747919188438",
    authorAvatar: "https://ik.imagekit.io/j98e6hcfnkn/logo/nxg-professional_8SkCG5O3z.jpeg?updatedAt=1747919123959",
  },
} as const

export type AssetCatalog = typeof ASSETS
