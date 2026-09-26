export type BeforeAfterProject = {
  id: string
  title: string
  service: string
  beforeImage: string
  afterImage: string
  beforeCloudinaryPublicId: string | null
  afterCloudinaryPublicId: string | null
  beforeAlt: string
  afterAlt: string
  status: "pending-visual-approval" | "approved" | "rejected"
  sourceNote: string
}

export const beforeAfterProjects: BeforeAfterProject[] = [
  {
    id: "colonial-home-exterior-01",
    title: "Colonial Home Exterior",
    service: "Exterior painting",
    beforeImage: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/before1_YhGsD2Kl9.jpg?updatedAt=1741312450328",
    afterImage: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/after1_YhGsD2Kl9.jpg?updatedAt=1741312450328",
    beforeCloudinaryPublicId: null,
    afterCloudinaryPublicId: null,
    beforeAlt: "Colonial home exterior before the painting project",
    afterAlt: "Colonial home exterior after the painting project",
    status: "pending-visual-approval",
    sourceNote: "Matched pair and labels retained from the legacy GalleryPageClient backup; verify visual match and usage rights before publishing.",
  },
  {
    id: "modern-office-interior-01",
    title: "Modern Office Interior",
    service: "Commercial interior painting",
    beforeImage: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/before2_YhGsD2Kl9.jpg?updatedAt=1741312450328",
    afterImage: "https://ik.imagekit.io/j98e6hcfnkn/Gallery/after2_YhGsD2Kl9.jpg?updatedAt=1741312450328",
    beforeCloudinaryPublicId: null,
    afterCloudinaryPublicId: null,
    beforeAlt: "Modern office interior before the painting project",
    afterAlt: "Modern office interior after the painting project",
    status: "pending-visual-approval",
    sourceNote: "Matched pair and labels retained from the legacy GalleryPageClient backup; verify visual match and usage rights before publishing.",
  },
]

export const approvedBeforeAfterProjects = beforeAfterProjects.filter((project) => project.status === "approved")