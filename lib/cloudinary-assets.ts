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

export type CloudinaryCredentials = {
    cloudName: string
    apiKey: string
    apiSecret: string
}

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

export function getCloudinaryCredentials(env: NodeJS.ProcessEnv = process.env): CloudinaryCredentials | null {
    const cloudName = env.CLOUDINARY_CLOUD_NAME?.trim()
    const apiKey = env.CLOUDINARY_API_KEY?.trim() || env.CLOUDINARY_CLIENT_ID?.trim()
    const apiSecret = env.CLOUDINARY_API_SECRET?.trim() || env.CLOUDINARY_CLIENT_SECRET?.trim()
    if (cloudName && apiKey && apiSecret) return { cloudName, apiKey, apiSecret }

    const rawUrl = env.CLOUDINARY_URL?.trim()
    if (!rawUrl) return null

    let parsed: URL
    try {
        parsed = new URL(rawUrl)
    } catch {
        throw new Error("CLOUDINARY_URL is not a valid Cloudinary URL.")
    }

    if (parsed.protocol !== "cloudinary:" || !parsed.hostname || !parsed.username || !parsed.password) {
        throw new Error("CLOUDINARY_URL must include Cloudinary API credentials and a cloud name.")
    }

    let urlApiKey: string
    let urlApiSecret: string
    try {
        urlApiKey = decodeURIComponent(parsed.username)
        urlApiSecret = decodeURIComponent(parsed.password)
    } catch {
        throw new Error("CLOUDINARY_URL contains invalid encoded credentials.")
    }

    return { cloudName: parsed.hostname, apiKey: urlApiKey, apiSecret: urlApiSecret }
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