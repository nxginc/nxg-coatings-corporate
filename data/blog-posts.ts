import { ASSETS } from "@/lib/assets"

export type BlogArticleSection = {
  heading: string
  paragraphs: string[]
}

export type BlogPostMeta = {
  slug: string
  title: string
  excerpt: string
  publishDate: string
  readTime: string
  coverImage: string
  category: string
  featured?: boolean
  published?: boolean
  article?: {
    introduction: string
    sections: BlogArticleSection[]
    conclusion: string
  }
  author: {
    name: string
    avatar: string
  }
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "repair-peeling-exterior-paint",
    title: "How to Repair Peeling Exterior House Paint: Step-by-Step Restoration Guide",
    excerpt:
      "Learn how to fix peeling exterior paint and protect your home from further damage with our comprehensive guide.",
    publishDate: "March 5, 2025",
    readTime: "8 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog1_o0PS2vfo9K.jpeg?updatedAt=1741212349688",
    category: "Exterior",
    featured: true,
    published: true,
    author: {
      name: "NXG Coatings Team",
      avatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    },
  },
  {
    slug: "benefits-of-professional-exterior-coating",
    title: "5 Benefits of Professional Exterior Coating",
    excerpt:
      "Discover how professional exterior coating can protect your home, increase its value, and reduce maintenance costs over time.",
    publishDate: "February 28, 2025",
    readTime: "6 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog2_shlL_xb-0.jpeg?updatedAt=1741212349719",
    category: "Exterior",
    published: true,
    author: {
      name: "NXG Coatings Team",
      avatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    },
  },
  {
    slug: "choosing-the-right-paint-color",
    title: "How to Choose the Perfect Paint Color for Your Home",
    excerpt:
      "Selecting the right paint color can be overwhelming. Follow our expert tips to find the perfect shade for every room.",
    publishDate: "February 20, 2025",
    readTime: "5 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog2_R6bm4rz7wm.jpeg?updatedAt=1741212349705",
    category: "Interior",
    published: true,
    author: {
      name: "NXG Coatings Team",
      avatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    },
  },
  {
    slug: "eco-friendly-paint-options",
    title: "Eco-Friendly Paint Options for Environmentally Conscious Homeowners",
    excerpt: "Explore sustainable and non-toxic paint alternatives that are better for your family and the planet.",
    publishDate: "February 15, 2025",
    readTime: "7 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog3_JB8rNnw-ky.jpeg?updatedAt=1741212349698",
    category: "Products",
    author: {
      name: "NXG Coatings Team",
      avatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    },
  },
  {
    slug: "commercial-painting-best-practices",
    title: "Commercial Painting Best Practices: Minimizing Business Disruption",
    excerpt:
      "Learn how to plan and execute a commercial painting project with minimal impact on your business operations.",
    publishDate: "February 8, 2025",
    readTime: "9 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog4_OLlU6QI7z.jpeg?updatedAt=1741212349693",
    category: "Commercial",
    author: {
      name: "NXG Coatings Team",
      avatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    },
  },
  {
    slug: "preparing-walls-for-painting",
    title: "The Complete Guide to Preparing Walls for Painting",
    excerpt:
      "Proper wall preparation is crucial for a flawless paint job. Follow our step-by-step guide for professional results.",
    publishDate: "January 30, 2025",
    readTime: "10 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog5_7C36Q7Z1m.jpeg?updatedAt=1741212349696",
    category: "Tips",
    author: {
      name: "NXG Coatings Team",
      avatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    },
  },
  {
    slug: "paint-finish-guide",
    title: "Understanding Paint Finishes: From Matte to High Gloss",
    excerpt: "Learn about different paint finishes and where to use them for the best results in your home.",
    publishDate: "January 22, 2025",
    readTime: "6 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog6_rqKhiI6Tp.jpeg?updatedAt=1741212349694",
    category: "Tips",
    author: {
      name: "NXG Coatings Team",
      avatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    },
  },
  {
    slug: "seasonal-painting-guide",
    title: "Seasonal Painting Guide: The Best Times to Paint Your Home",
    excerpt: "Discover the optimal seasons and weather conditions for interior and exterior painting projects.",
    publishDate: "January 15, 2025",
    readTime: "7 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/nxg-blog/blog7_XY7nFsqNK.jpeg?updatedAt=1741212349694",
    category: "Tips",
    author: {
      name: "NXG Coatings Team",
      avatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    },
  },
  {
    slug: "commercial-color-psychology",
    title: "Color Psychology for Commercial Spaces: Boost Productivity and Sales",
    excerpt:
      "Learn how strategic color choices can influence customer behavior and employee performance in business environments.",
    publishDate: "January 8, 2025",
    readTime: "8 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/Industries/commercial_iCqXeYgW_Z.jpeg?updatedAt=1699016621793",
    category: "Commercial",
    author: {
      name: "NXG Coatings Team",
      avatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    },
  },
  {
    slug: "deck-staining-tips",
    title: "Deck Staining Tips for a Long-Lasting Finish",
    excerpt: "Get the most out of your deck with these professional staining tips and maintenance advice.",
    publishDate: "August 10, 2025",
    readTime: "7 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/Services/DeckStaining_MN_a3mceDUkH.png?updatedAt=1666951996630",
    category: "Exterior",
    featured: true,
    published: true,
    author: {
      name: "NXG Coatings Team",
      avatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    },
  },
  {
    slug: "cabinet-refinishing-guide",
    title: "The Ultimate Guide to Cabinet Refinishing",
    excerpt: "Transform your kitchen or bathroom with our expert cabinet refinishing guide.",
    publishDate: "August 12, 2025",
    readTime: "8 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/Services/CabinetRefinishing_MN_8XLSgP4b9.jpg?updatedAt=1666953740495",
    category: "Interior",
    featured: true,
    published: true,
    author: {
      name: "NXG Coatings Team",
      avatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    },
  },
  {
    slug: "color-consultation-benefits",
    title: "Why a Professional Color Consultation Matters",
    excerpt: "Discover how expert color advice can elevate your next painting project.",
    publishDate: "August 14, 2025",
    readTime: "5 min read",
    coverImage: "https://ik.imagekit.io/j98e6hcfnkn/color%20consulation_kGyXZz_4-.jpg?updatedAt=1748001132674",
    category: "Tips",
    featured: true,
    author: {
      name: "NXG Coatings Team",
      avatar: "https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501",
    },
  },
  {
    slug: "preparing-a-room-for-interior-painting",
    title: "How to Prepare a Room for Interior Painting",
    excerpt: "A practical checklist for discussing furniture, access, surface repairs, and room use before interior painting begins.",
    publishDate: "October 23, 2026",
    readTime: "5 min read",
    coverImage: ASSETS.services.interior,
    category: "Interior",
    published: true,
    author: { name: "NXG Coatings Team", avatar: ASSETS.blog.authorAvatar },
    article: {
      introduction: "A little planning makes it easier to define the work area and protect the things that matter. Use this checklist to prepare for a walkthrough or estimate; the project team can confirm what should be moved or handled by the crew.",
      sections: [
        { heading: "Decide which surfaces are in scope", paragraphs: ["List the rooms and surfaces you want considered, including walls, ceilings, trim, doors, and built-ins. Note areas with peeling paint, stains, cracks, or previous repairs so they can be reviewed rather than assumed to be routine painting."] },
        { heading: "Plan access and room use", paragraphs: ["Think about furniture, wall decor, pets, children, and how the room is used during the day. Ask which items should be moved before work and which can stay protected in place. Clear access helps the crew assess the space accurately."] },
        { heading: "Bring the details that affect finish selection", paragraphs: ["Share known paint colors, sheen preferences, and any cleaning or durability needs. If you have leftover paint or product labels, keep them available; matching an existing finish may require testing and may not be exact."] },
        { heading: "Confirm repairs and expectations", paragraphs: ["Identify damage or moisture concerns before choosing a finish. A painting estimate should distinguish included preparation from repairs that need separate evaluation, so the scope is clear before work begins."] },
      ],
      conclusion: "Use the walkthrough to confirm scope, access, preparation, and finish choices. Room-specific conditions determine the final plan, so treat a checklist as a conversation starter rather than a fixed specification.",
    },
  },
  {
    slug: "pressure-washing-before-exterior-painting",
    title: "When Pressure Washing Fits into an Exterior Paint Project",
    excerpt: "Learn what exterior cleaning can address, why pressure must suit the surface, and what needs to happen before coatings are applied.",
    publishDate: "October 23, 2026",
    readTime: "5 min read",
    coverImage: ASSETS.services.pressureCleaning,
    category: "Exterior",
    published: true,
    author: { name: "NXG Coatings Team", avatar: ASSETS.blog.authorAvatar },
    article: {
      introduction: "Cleaning can be one part of exterior preparation, but it is not a substitute for diagnosing failed paint or repairing a damaged surface. The right method depends on the material, its condition, and the coating system being considered.",
      sections: [
        { heading: "Start with a surface assessment", paragraphs: ["Look for dirt, biological growth, chalking, loose paint, open joints, and signs of moisture. These conditions have different causes and may require different preparation; washing alone does not resolve every issue."] },
        { heading: "Match the cleaning method to the material", paragraphs: ["Pressure that is suitable for one substrate can damage another by forcing water behind siding, etching softer materials, or harming trim. A qualified crew should choose the method and pressure after reviewing the surface and nearby openings."] },
        { heading: "Allow for drying and follow-up preparation", paragraphs: ["Surfaces need to dry before coating, and cleaning may expose areas that need scraping, sanding, repairs, or primer. Weather and the substrate affect drying time, so avoid relying on a universal waiting period."] },
        { heading: "Protect the surrounding site", paragraphs: ["Before work, discuss landscaping, electrical fixtures, windows, doors, and water-sensitive areas. Confirm how runoff and nearby surfaces will be protected as part of the work plan."] },
      ],
      conclusion: "Pressure washing can support a well-planned exterior project when it is appropriate for the substrate. A site review should determine the cleaning method, any additional preparation, and when the surface is ready for the next step.",
    },
  },
  {
    slug: "diagnosing-peeling-paint-before-repainting",
    title: "What to Check Before Repainting a Peeling Surface",
    excerpt: "Peeling paint is a symptom, not a diagnosis. Review moisture, adhesion, and substrate condition before planning a new finish.",
    publishDate: "October 23, 2026",
    readTime: "6 min read",
    coverImage: ASSETS.services.restoration,
    category: "Preparation",
    published: true,
    author: { name: "NXG Coatings Team", avatar: ASSETS.blog.authorAvatar },
    article: {
      introduction: "A new coat may not last if the reason paint is failing is still present. Before repainting, identify where the failure occurs and whether the surface has an underlying moisture, adhesion, or material issue.",
      sections: [
        { heading: "Look for patterns and nearby conditions", paragraphs: ["Note whether peeling is isolated or widespread and whether it appears near joints, rooflines, plumbing, bathrooms, or other areas exposed to water. These observations can help a professional decide whether further investigation is needed."] },
        { heading: "Check what is beneath the loose coating", paragraphs: ["Failure between paint layers can point to a different preparation or compatibility issue than failure down to bare material. Do not assume that covering or spot-priming loose paint will correct the cause."] },
        { heading: "Address safety before disturbing old paint", paragraphs: ["Older buildings may contain lead-based paint. Before sanding, scraping, or otherwise disturbing suspect coatings, verify the building's age and applicable safety requirements and use appropriately qualified professionals."] },
        { heading: "Define preparation and repairs separately", paragraphs: ["A repainting scope should identify what loose coating will be removed, what repairs are included, and which substrate conditions need separate work. Resolve active water intrusion or other underlying issues before applying a new finish."] },
      ],
      conclusion: "A durable repaint begins with understanding why the previous coating failed. Have the affected surface reviewed and agree on the preparation and repair scope before selecting a new coating.",
    },
  },
  {
    slug: "planning-commercial-painting-around-building-use",
    title: "Planning Commercial Painting Around Building Operations",
    excerpt: "Coordinate access, work phases, communication, and finish decisions to make a commercial painting scope easier to manage.",
    publishDate: "October 23, 2026",
    readTime: "6 min read",
    coverImage: ASSETS.industries.commercial,
    category: "Commercial",
    published: true,
    author: { name: "NXG Coatings Team", avatar: ASSETS.blog.authorAvatar },
    article: {
      introduction: "Commercial painting involves more than selecting a color. Property teams can use an early walkthrough to identify access constraints, building use, surface conditions, and the decisions needed before a scope is finalized.",
      sections: [
        { heading: "Map the spaces and operating constraints", paragraphs: ["Identify occupied areas, access hours, loading zones, security procedures, and any spaces that cannot be closed at the same time. Note who coordinates access and how schedule changes should be communicated."] },
        { heading: "Break the scope into reviewable areas", paragraphs: ["Organize work by building, floor, room, or surface type. A clear sequence helps stakeholders understand where work is planned and gives the project team a basis for discussing access and phasing."] },
        { heading: "Review surface condition and preparation", paragraphs: ["Record visible damage, peeling, staining, and prior repairs during the walkthrough. Agree on which preparation is included and which conditions require further investigation or a separate repair scope."] },
        { heading: "Confirm finish and communication responsibilities", paragraphs: ["Collect approved colors and product requirements before ordering or scheduling. Decide how occupants will be notified about access, protection, and work areas, and identify the person who can approve changes."] },
      ],
      conclusion: "A useful commercial painting plan starts with a documented scope and a shared understanding of access, sequence, finish selection, and communication. The building's actual conditions determine the final schedule and work plan.",
    },
  },
  {
    slug: "choosing-interior-paint-sheen",
    title: "How to Choose an Interior Paint Sheen",
    excerpt: "Compare common interior sheen levels and the practical questions to discuss before selecting a finish for each room.",
    publishDate: "October 30, 2026",
    readTime: "5 min read",
    coverImage: ASSETS.services.interior,
    category: "Interior",
    published: true,
    author: { name: "NXG Coatings Team", avatar: ASSETS.blog.authorAvatar },
    article: {
      introduction: "Color is only one part of an interior paint decision. Sheen affects how a surface reflects light and how visible small surface variations may be, so it is worth considering the room, substrate, and care expectations together.",
      sections: [
        { heading: "Know what sheen describes", paragraphs: ["Sheen is the amount of light a dried coating reflects. Product names and exact sheen levels vary by manufacturer, so compare the specific products being considered rather than assuming every label means the same thing."] },
        { heading: "Consider the room and surface", paragraphs: ["A busy room, a quiet ceiling, trim, and a wall with visible repairs may each call for a different conversation about appearance and cleaning. Higher reflection can make surface variation more noticeable under some lighting; a sample on the actual surface helps evaluate the effect."] },
        { heading: "Review cleaning and durability needs", paragraphs: ["Ask how the finished surface will be used and cleaned, and follow the coating manufacturer's care guidance. A sheen choice alone does not determine durability; product formulation and preparation also matter."] },
        { heading: "Test before committing", paragraphs: ["View sample colors and finishes in the room at different times of day. Lighting, surrounding materials, and the condition of the surface can change how a finish appears after application."] },
      ],
      conclusion: "Choose sheen by balancing the desired look with room use, surface condition, and product guidance. Reviewing samples in place is more reliable than selecting a finish from a small screen image.",
    },
  },
  {
    slug: "what-to-prepare-before-a-painting-estimate",
    title: "What to Prepare Before a Painting Estimate",
    excerpt: "A clear scope, access plan, and list of surface concerns can make a painting walkthrough more useful for everyone.",
    publishDate: "October 30, 2026",
    readTime: "5 min read",
    coverImage: ASSETS.services.exterior,
    category: "Planning",
    published: true,
    author: { name: "NXG Coatings Team", avatar: ASSETS.blog.authorAvatar },
    article: {
      introduction: "An estimate starts with understanding the project. A short preparation checklist can help focus a walkthrough on the spaces, surfaces, and decisions that affect a scope; it does not replace an on-site review.",
      sections: [
        { heading: "List spaces and surfaces", paragraphs: ["Write down the rooms, elevations, or building areas to discuss. Note whether walls, ceilings, trim, doors, cabinets, decks, or other surfaces are included so the estimate can address the work you actually have in mind."] },
        { heading: "Point out visible conditions", paragraphs: ["Identify peeling, cracks, stains, prior repairs, moisture concerns, and areas with unusual access. These observations help the project team determine whether additional investigation or repair scope needs to be discussed."] },
        { heading: "Gather access and timing details", paragraphs: ["For occupied homes or commercial spaces, share access hours, building rules, parking or loading details, and any areas that need to remain available. A requested schedule is not confirmed until the team has reviewed it with you."] },
        { heading: "Bring product and color information", paragraphs: ["If you have a color schedule, product specification, finish preference, or existing coating label, make it available for review. The final recommendation depends on the substrate and project requirements."] },
      ],
      conclusion: "A helpful estimate conversation is specific about scope and honest about unknowns. The walkthrough is the time to confirm assumptions, surface conditions, preparation, and any items that should be priced or planned separately.",
    },
  },
  {
    slug: "planning-protective-coatings-for-facilities",
    title: "Planning Protective Coatings for a Facility",
    excerpt: "Use a facility walkthrough to document substrate, exposure, operating constraints, and specification questions before selecting a coating system.",
    publishDate: "October 30, 2026",
    readTime: "6 min read",
    coverImage: ASSETS.services.protectiveCoatings,
    category: "Commercial",
    published: true,
    author: { name: "NXG Coatings Team", avatar: ASSETS.blog.authorAvatar },
    article: {
      introduction: "A protective coating project should begin with the service conditions and substrate, not with a product name. Facility teams can gather useful context before a qualified project review without making assumptions about compatibility or performance.",
      sections: [
        { heading: "Document the substrate and existing coating", paragraphs: ["Record the material, known coating history, visible corrosion or wear, and any areas where adhesion has failed. If the coating system is unknown, mark it as unknown rather than guessing."] },
        { heading: "Describe exposure and operating conditions", paragraphs: ["Note indoor or outdoor exposure, cleaning routines, chemical contact, temperature range if known, moisture, and traffic. These conditions help a technical reviewer identify the questions that a specification must answer."] },
        { heading: "Plan access, containment, and downtime", paragraphs: ["Identify equipment, active work areas, ventilation, nearby occupants, and restricted access. Discuss site safety and containment requirements with the responsible facility and coating professionals before work is planned."] },
        { heading: "Review the specification and acceptance criteria", paragraphs: ["Collect project specifications, product data, inspection requirements, and owner acceptance criteria. Confirm who can approve substitutions or scope changes and what records are required at closeout."] },
      ],
      conclusion: "The coating system and preparation requirements should be confirmed for the actual substrate and exposure. A documented walkthrough helps establish the information needed for a responsible scope and product review.",
    },
  }
]

export const publishedBlogPosts = blogPosts.filter((post) => post.published === true)
