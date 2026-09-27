export const CLOUDINARY_UPLOAD_TYPES = [
    "site",
    "service",
    "industry",
    "gallery",
    "blog",
    "campaign-social",
    "meta-ad",
    "google-ad",
] as const

export type CloudinaryUploadType = (typeof CLOUDINARY_UPLOAD_TYPES)[number]

const typeFolders: Record<CloudinaryUploadType, string> = {
    site: "site",
    service: "services",
    industry: "industries",
    gallery: "gallery",
    blog: "blog",
    "campaign-social": "campaigns",
    "meta-ad": "ads/meta",
    "google-ad": "ads/google",
}

export function getCloudinaryStagingFolder(
    type: CloudinaryUploadType,
    campaignSlug?: string,
    channel?: string,
) {
    const base = `nxgcoatings/staging/intake/${typeFolders[type]}`
    if (type === "campaign-social" || type === "meta-ad" || type === "google-ad") {
        if (!campaignSlug || !channel) throw new Error("Campaign uploads need a campaign slug and channel.")
        return `${base}/${campaignSlug}/${channel}`
    }
    return base
}