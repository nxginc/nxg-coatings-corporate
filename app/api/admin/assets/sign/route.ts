import { createHash, randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { z } from "zod"
import { getAdminEmail } from "@/lib/admin-auth"
import { CLOUDINARY_UPLOAD_TYPES, getCloudinaryStagingFolder } from "@/lib/cloudinary-assets"
import { isIntegrationEnabled } from "@/lib/integration-state"

export const runtime = "nodejs"

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const channelSchema = z.enum(["facebook", "instagram", "linkedin", "google"])
const uploadSchema = z.object({
    type: z.enum(CLOUDINARY_UPLOAD_TYPES),
    campaignSlug: z.string().regex(slugPattern).max(100).optional(),
    channel: channelSchema.optional(),
}).superRefine((value, context) => {
    const campaignUpload = value.type === "campaign-social" || value.type === "meta-ad" || value.type === "google-ad"
    if (campaignUpload && (!value.campaignSlug || !value.channel)) {
        context.addIssue({ code: "custom", message: "Campaign uploads need a campaign slug and channel." })
    }
    if (value.type === "meta-ad" && value.channel !== "facebook" && value.channel !== "instagram") {
        context.addIssue({ code: "custom", message: "Meta ad uploads must target Facebook or Instagram." })
    }
    if (value.type === "google-ad" && value.channel !== "google") {
        context.addIssue({ code: "custom", message: "Google ad uploads must target Google." })
    }
})

export async function POST(request: Request) {
    if (!(await getAdminEmail())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const input = uploadSchema.safeParse(await request.json().catch(() => null))
    if (!input.success) return NextResponse.json({ error: "Invalid Cloudinary upload request." }, { status: 400 })
    if (!(await isIntegrationEnabled("cloudinary"))) {
        return NextResponse.json({ error: "Cloudinary is not enabled for this company." }, { status: 409 })
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET
    if (!cloudName || !apiKey || !apiSecret) {
        return NextResponse.json({ error: "Cloudinary credentials are not configured." }, { status: 503 })
    }

    const { type, campaignSlug, channel } = input.data
    const folder = getCloudinaryStagingFolder(type, campaignSlug, channel)
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const publicId = `asset_${randomUUID()}`
    const signedParams = {
        folder,
        overwrite: "false",
        public_id: publicId,
        timestamp,
    }
    const toSign = Object.keys(signedParams)
        .sort()
        .map((key) => `${key}=${signedParams[key as keyof typeof signedParams]}`)
        .join("&")
    const signature = createHash("sha1").update(`${toSign}${apiSecret}`).digest("hex")

    return NextResponse.json(
        {
            cloudName,
            apiKey,
            timestamp: Number(timestamp),
            folder,
            publicId,
            overwrite: false,
            signature,
            assetType: type,
        },
        { headers: { "Cache-Control": "no-store" } },
    )
}