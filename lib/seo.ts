import type { Metadata } from "next"
import { ASSETS } from "@/lib/assets"

export const SITE_URL = "https://nxgcoatingsinc.com"
export const SITE_NAME = "NXG Coatings"

export const SERVICE_AREAS = [
  "Minneapolis, MN",
  "Plymouth, MN",
  "Minnetonka, MN",
  "Wayzata, MN",
  "Edina, MN",
  "Orono, MN",
  "Golden Valley, MN",
  "Mound, MN",
  "Tonka Bay, MN",
  "Shorewood, MN",
  "Eden Prairie, MN",
  "Bloomington, MN",
  "Chanhassen, MN",
  "Savage, MN",
  "St. Louis Park, MN",
  "St. Paul, MN",
  "Twin Cities metro",
] as const

const pages = {
  home: {
    title: "Minneapolis MN Painting Contractors | NXG Coatings",
    description:
      "Professional painters in Minneapolis, MN serving residential and commercial projects. NXG Coatings also serves Plymouth, Minnetonka, Wayzata, Edina, Orono, Golden Valley, Mound, Tonka Bay, Shorewood, Eden Prairie, Bloomington and Chanhassen.",
    keywords: ["Minneapolis painting contractors", "Minneapolis painters", "MN painting contractors", "residential painting", "commercial painting", "Twin Cities painters"],
  },
  about: {
    title: "About NXG Coatings | Minneapolis Painting Contractors",
    description:
      "Learn about NXG Coatings and our professional painting and finishing services for residential, commercial and specialty projects throughout the Twin Cities metro area.",
    keywords: ["NXG Coatings", "Minneapolis painting contractor", "Twin Cities painting company", "professional painters Minnesota"],
  },
  services: {
    title: "Painting & Coating Services | NXG Coatings",
    description:
      "Explore professional interior, exterior, commercial, industrial, drywall, fine finish, pressure washing, renovation and specialty painting services from NXG Coatings.",
    keywords: ["painting services Minneapolis", "painting contractors Twin Cities", "commercial painting", "industrial painting", "interior painting", "exterior painting"],
  },
  interior: {
    title: "Professional Interior Painting Contractor | NXG Coatings",
    description:
      "NXG Coatings provides professional interior painting services throughout the Twin Cities metro area, including Chanhassen, Minnetonka, Wayzata, Edina, Eden Prairie and surrounding communities.",
    keywords: ["interior painting", "interior painting contractor", "Minneapolis interior painters", "Twin Cities interior painting", "Chanhassen painters", "Minnetonka painters", "Wayzata painters", "Edina painters", "Eden Prairie painters"],
  },
  exterior: {
    title: "Exterior Painting Contractor | Chanhassen, MN | NXG Coatings",
    description:
      "NXG Coatings provides professional exterior painting services throughout Chanhassen, the Twin Cities and surrounding Minnesota communities. Request a free quote today.",
    keywords: ["exterior painting", "exterior painting contractors Chanhassen MN", "Chanhassen painters", "MN painters", "Twin Cities exterior painting"],
  },
  commercial: {
    title: "Commercial Painting Contractors in Minneapolis | NXG Coatings",
    description:
      "NXG Coatings provides commercial painting and drywall services for large-scale properties throughout Minneapolis, St. Paul and Minnesota. Request a project quote today.",
    keywords: ["commercial painting contractors Minneapolis MN", "commercial painting Minnesota", "Minnesota commercial painters", "commercial painting contractors", "commercial drywall and painting"],
  },
  industrial: {
    title: "Industrial Painting Services & Contractors | NXG Coatings MN",
    description:
      "NXG Coatings provides industrial painting and coating services from St. Louis Park, Minnesota, serving industrial and commercial properties throughout the Twin Cities and Minnesota.",
    keywords: ["industrial painters", "industrial painting contractors", "industrial painting Minnesota", "MN painting contractors", "industrial coatings"],
  },
  drywall: {
    title: "Drywall & Painting Contractors in Minneapolis | NXG Coatings",
    description:
      "NXG Coatings provides professional drywall and painting services throughout Minneapolis and the Twin Cities, including drywall repair and commercial drywall projects.",
    keywords: ["drywall contractors MN", "Minneapolis drywall contractors", "drywall service", "drywall repair", "commercial drywall contractors", "Minneapolis painting contractors"],
  },
  fineFinishes: {
    title: "Fine Finishes & Specialty Painting | NXG Coatings",
    description:
      "Achieve a refined, polished look with NXG Coatings fine finishes services. Our skilled painters focus on detailed preparation and high-quality finishing for residential and commercial spaces.",
    keywords: ["fine finishes", "specialty painting", "decorative finishes", "professional painters", "specialty coatings"],
  },
  colorConsultation: {
    title: "Professional Color Consultation | NXG Coatings",
    description:
      "NXG Coatings provides professional color consultation to help select colors that complement your home or commercial property.",
    keywords: ["color consultation", "paint color consultation", "professional color consultant", "interior paint colors", "commercial color consultation"],
  },
  deckStaining: {
    title: "Deck Staining & Refinishing | NXG Coatings",
    description:
      "Protect and refresh outdoor living spaces with professional deck staining and refinishing services from NXG Coatings.",
    keywords: ["deck staining", "deck refinishing", "deck painting", "Twin Cities deck staining"],
  },
  cabinetRefinishing: {
    title: "Cabinet Refinishing | NXG Coatings",
    description:
      "Transform kitchens and bathrooms with professional cabinet refinishing, custom colors and durable finishes from NXG Coatings.",
    keywords: ["cabinet refinishing", "cabinet painting", "kitchen cabinet refinishing", "bathroom cabinet painting"],
  },
  portfolio: {
    title: "Painting Projects & Portfolio | NXG Coatings",
    description:
      "Explore the NXG Coatings portfolio featuring residential and commercial painting, finishing and renovation projects throughout the Twin Cities and surrounding Minnesota communities.",
    keywords: ["painting portfolio", "Minneapolis painting projects", "commercial painting projects", "residential painting projects", "before and after painting"],
  },
  contact: {
    title: "Contact NXG Coatings | Minneapolis Painting Contractor",
    description:
      "Contact NXG Coatings for a free consultation and personalized solutions for residential, commercial and specialty painting projects.",
    keywords: ["contact painting contractor", "Minneapolis painting quote", "Twin Cities painting estimate", "NXG Coatings contact", "free painting quote"],
  },
  quote: {
    title: "Get a Free Quote | NXG Coatings",
    description:
      "Request a free, no-obligation quote for your painting or coating project from NXG Coatings.",
    keywords: ["free painting quote", "painting estimate Minneapolis", "coating estimate Twin Cities"],
  },
  industries: {
    title: "Industries We Serve | NXG Coatings",
    description:
      "Explore painting and coating solutions for residential, commercial, industrial, multifamily and other property types throughout Minnesota.",
    keywords: ["commercial painting", "industrial coatings", "multifamily painting", "residential painters Minnesota"],
  },
  blog: {
    title: "Painting & Coating Resources | NXG Coatings",
    description:
      "Read painting, coating, maintenance and project resources from NXG Coatings.",
    keywords: ["painting resources", "painting guides", "coating resources", "Minnesota painting"],
  },
  faqs: {
    title: "Painting & Coating FAQs | NXG Coatings",
    description:
      "Find answers to common questions about NXG Coatings painting, coating, estimates, preparation and project services.",
    keywords: ["painting FAQ", "painting questions", "coating FAQ", "painting estimates"],
  },
} as const

export type SeoPage = keyof typeof pages

export function seo(page: SeoPage, path = "/"): Metadata {
  const item = pages[page]
  const url = new URL(path, SITE_URL).toString()
  return {
    metadataBase: new URL(SITE_URL),
    title: item.title,
    description: item.description,
    keywords: [...item.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: item.title,
      description: item.description,
      images: [{ url: ASSETS.hero.fallback, alt: "NXG Coatings project photography" }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: [ASSETS.hero.fallback],
    },
  }
}

export function serviceLocationDescription(service: string) {
  return `${service} services from NXG Coatings throughout Minneapolis, the Twin Cities metro and surrounding Minnesota communities including Plymouth, Minnetonka, Wayzata, Edina, Orono, Golden Valley, Mound, Tonka Bay, Shorewood, Eden Prairie, Bloomington, Chanhassen and Savage.`
}
