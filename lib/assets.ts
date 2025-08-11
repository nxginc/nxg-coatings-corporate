// Centralized asset URL definitions for NXG Coatings site.

import IndustriesLayout from "@/app/industries/layout"
import { blogPosts } from "@/data/blog-posts"

// Modify here to swap CDN paths or update branding without searching codebase.
export const ASSETS = {
  logo: {
    primary: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    alt: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    login: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
  },
  consultation: {
    inPerson: "https://ik.imagekit.io/j98e6hcfnkn/inperson_HXeOinL7n.jpeg?updatedAt=1747996866887",
    virtual: "https://ik.imagekit.io/j98e6hcfnkn/virtual_kBkeeo49T.webp?updatedAt=1747996861245",
    color: "https://ik.imagekit.io/j98e6hcfnkn/color%20consulation_kGyXZz_4-.jpg?updatedAt=1748001132674",
  },
  hero: {
    fallback: "",
    services: "https://ik.imagekit.io/j98e6hcfnkn/Services/decks_05lTy4nPk.jpg?updatedAt=1666774074251",
    process: "https://ik.imagekit.io/j98e6hcfnkn/Services/WindowStaining_MN_EFqt22s-6.jpg?updatedAt=1666951484146",
    blog: "",
    gallery: "",
  },
  services: {
    fineFinish: "https://ik.imagekit.io/j98e6hcfnkn/Banners/finefinishes_BOJLvbsTP.jpg",
    interior: "https://ik.imagekit.io/j98e6hcfnkn/Services/InteriorPainting_MN_zrSP9lrUz.png",
    exterior: "https://ik.imagekit.io/j98e6hcfnkn/service-pages/exterior/2B4F5211-53AA-4898-9318-E70FD6AE6811_3vhLxTnmN.jpeg",
    cabinet: "https://ik.imagekit.io/j98e6hcfnkn/Services/CabinetRefinishing_MN_8XLSgP4b9.jpg?updatedAt=1666953740495",
    deck: "https://ik.imagekit.io/j98e6hcfnkn/Services/DeckStaining_MN_a3mceDUkH.png",
    colorConsultation: "https://ik.imagekit.io/j98e6hcfnkn/Banners/f3_ER1drZAJS.jpg?updatedAt=1679013242072",
    // Exterior painting service images
    siding: "",
    trim: "",
    doors: "",
    garage: "",
    stucco: "",
    // Deck is already present as 'deck'
    // Interior painting service images
    livingAreas: "https://ik.imagekit.io/j98e6hcfnkn/page-assets/living%20area_KNQhLDoDK-.PNG",
    kitchenBathroom: "https://ik.imagekit.io/j98e6hcfnkn/service-pages/interior/7264EB3A-C9B6-4A23-84FF-4D110018851D_zpgnpqtb8.jpeg?updatedAt=1746446572210",
    bedroom: "https://ik.imagekit.io/j98e6hcfnkn/featured/interior-painting/interior8_itIcVGmT1.jpg?updatedAt=1699015715638",
    trimCeiling: "https://ik.imagekit.io/j98e6hcfnkn/trim-ceiling_zZ7QQ34l0.png?updatedAt=1754856790818",
    accentWall: "https://ik.imagekit.io/j98e6hcfnkn/page-assets/living_A1_Jw6aZbm.PNG?updatedAt=1746533518542",
    specialtyFinish: "https://ik.imagekit.io/j98e6hcfnkn/Services/WindowStaining_MN_EFqt22s-6.jpg?updatedAt=1666951484146",
  },
  industries: {
    residential: "https://ik.imagekit.io/j98e6hcfnkn/Industries/residential_FqQDni9Oa.jpg",
    commercial: "https://ik.imagekit.io/j98e6hcfnkn/Services/commercial_0p23O988Ix.heic",
    industrial: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/industrial/industrial-structure-painting-services_7VncZWEPH.jpg",
    hoa: "https://ik.imagekit.io/j98e6hcfnkn/Industries/hoa_4XZCTP8X4.jpeg",
  },
  industries_featured: {
    residential_featured: "https://ik.imagekit.io/j98e6hcfnkn/Banners/Interiorpainting_MN_5EW8oTEyHx?updatedAt=1666951441694",
    commercial_featured: "",
    industrial_featured: "https://ik.imagekit.io/j98e6hcfnkn/page-assets/industrial_0tFoQ7mwD_.JPG?updatedAt=1746533518632",
    hoa_featured: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/hoa/64377d87f8cf768523c106d0_hoa-painting-hero-02_WTec4soEPA.webp?updatedAt=1747490345547"
  },
  cabinets: {
    hero: "https://ik.imagekit.io/j98e6hcfnkn/Services/CabinetRefinishing_MN_8XLSgP4b9.jpg",
    kitchen: "https://ik.imagekit.io/j98e6hcfnkn/page-assets/cabinets2_gudIC6M4Z.JPG",
    bathroom: "https://ik.imagekit.io/j98e6hcfnkn/WebAssets/cabinets/cabinet-bathroom_eCKG4guCX.JPG",
    built: "https://ik.imagekit.io/j98e6hcfnkn/page-assets/cab-basmentr_nwrnFbc9Ss.JPG",
    colorchange: "https://ik.imagekit.io/j98e6hcfnkn/page-assets/cab_bA-gdseS7.JPG",
    staining: "https://ik.imagekit.io/j98e6hcfnkn/page-assets/cabinet-stain_9w9t8rJOR.JPG",
    hardware: "https://ik.imagekit.io/j98e6hcfnkn/page-assets/cabinet-hardware_EzSYHNksXZ.JPG"

  },
  blogPosts: {
    one: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog-6_47xxAjqVC.jpg",
    two: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog-4_WhGK1g1BA.jpg?",
    three: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog-3_M4piDalkB9.jpeg",
    four: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog-5_QPOc05Oaz.jpeg",
    five: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog1_o0PS2vfo9K.jpeg"
  },
  placeholders: {
    image: "/placeholder.svg",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  blog: {
    coverFallback: "https://ik.imagekit.io/j98e6hcfnkn/color%20consulation_kGyXZz_4-.jpg",
    authorAvatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png",
  },
} as const

export type AssetCatalog = typeof ASSETS
