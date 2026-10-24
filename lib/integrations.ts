import { getCloudinaryCredentials } from "@/lib/cloudinary-assets"

export type IntegrationDefinition = {
    id: string
    name: string
    category: "cms" | "crm" | "social" | "media" | "ads" | "communications" | "payments"
    description: string
    requiredEnv: string[]
    connection: "server_token" | "oauth_account" | "upload_credentials" | "manual_only"
    operational: boolean
}

export const integrationCatalog: IntegrationDefinition[] = [
    { id: "contentstack", name: "Contentstack", category: "cms", description: "Webhook-triggered path revalidation only; CMS content delivery and synchronization are not implemented.", requiredEnv: ["CONTENTSTACK_WEBHOOK_SECRET"], connection: "server_token", operational: true },
    { id: "hubspot", name: "HubSpot", category: "crm", description: "Sync contact submissions and retry pending lead syncs.", requiredEnv: ["HUBSPOT_PRIVATE_APP_TOKEN"], connection: "server_token", operational: true },
    { id: "vista-social", name: "Vista Social", category: "social", description: "Provider adapter is not implemented; social drafts remain in the NXG review workflow.", requiredEnv: ["VISTA_SOCIAL_API_TOKEN", "VISTA_SOCIAL_WORKSPACE_ID"], connection: "server_token", operational: false },
    { id: "cloudinary", name: "Cloudinary", category: "media", description: "Sign staging media uploads; the dashboard upload client and asset approval flow are not implemented.", requiredEnv: ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"], connection: "upload_credentials", operational: true },
    { id: "imagekit-upload", name: "ImageKit uploads", category: "media", description: "ImageKit hosts current site imagery; signed upload adapter is not implemented.", requiredEnv: ["IMAGEKIT_URL_ENDPOINT", "IMAGEKIT_PUBLIC_KEY", "IMAGEKIT_PRIVATE_KEY"], connection: "upload_credentials", operational: false },
    { id: "meta-pages", name: "Meta Pages, Instagram & Messenger", category: "social", description: "Meta OAuth, Page publishing, and Messenger conversation adapters are not implemented; no account is connected.", requiredEnv: ["META_APP_ID", "META_APP_SECRET", "META_PAGE_ACCESS_TOKEN"], connection: "oauth_account", operational: false },
    { id: "facebook-marketplace", name: "Facebook Marketplace", category: "social", description: "Prepare reviewed copy and assets for manual posting; general service-listing auto-publish is not enabled.", requiredEnv: [], connection: "manual_only", operational: false },
    { id: "nextdoor", name: "Nextdoor Business", category: "social", description: "Prepare local service updates and lead-response drafts for operator review; no scraping or auto-posting.", requiredEnv: [], connection: "manual_only", operational: false },
    { id: "yelp-business", name: "Yelp for Business", category: "social", description: "Admin can prepare source-linked review response drafts for manual approval and handoff; no Yelp account connection or posting.", requiredEnv: [], connection: "manual_only", operational: false },
    { id: "thumbtack", name: "Thumbtack", category: "social", description: "Prepare lead intake and response drafts for operator review; no automated bidding or account-control bypass.", requiredEnv: [], connection: "manual_only", operational: false },
    { id: "indeed-jobs", name: "Indeed hiring", category: "communications", description: "Admin can prepare job-listing drafts for manual approval and handoff; no Indeed account connection or posting.", requiredEnv: [], connection: "manual_only", operational: false },
    { id: "google-business-profile", name: "Google Business Profile", category: "ads", description: "Google Business Profile API connector is not implemented; business-profile updates remain manual.", requiredEnv: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN", "GOOGLE_BUSINESS_LOCATION_ID"], connection: "oauth_account", operational: false },
    { id: "google-ads", name: "Google Ads", category: "ads", description: "Google Ads API connector and campaign optimization are not implemented; ad changes remain manual.", requiredEnv: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN", "GOOGLE_ADS_DEVELOPER_TOKEN", "GOOGLE_ADS_CUSTOMER_ID"], connection: "oauth_account", operational: false },
    { id: "stripe", name: "Stripe", category: "payments", description: "Payment processing is not implemented.", requiredEnv: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"], connection: "server_token", operational: false },
    { id: "telnyx", name: "Telnyx", category: "communications", description: "SMS and voice workflows are not implemented.", requiredEnv: ["TELNYX_API_KEY"], connection: "server_token", operational: false },
    { id: "email", name: "Transactional email (SMTP / Mailtrap)", category: "communications", description: "Send contact notifications through SMTP. Mailtrap uses its SMTP host and credentials; its API token is not used by this app.", requiredEnv: ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "CONTACT_TO_EMAIL"], connection: "server_token", operational: true },
]

export function getIntegrationReadiness(definition: IntegrationDefinition) {
    let missingEnv = definition.requiredEnv.filter((name) => !process.env[name]?.trim())
    let configurationError: string | undefined
    if (definition.id === "cloudinary") {
        try {
            if (getCloudinaryCredentials()) missingEnv = []
        } catch {
            missingEnv = []
            configurationError = "CLOUDINARY_URL is invalid."
        }
    }
    return {
        ...definition,
        configured: definition.connection !== "manual_only" && missingEnv.length === 0 && !configurationError,
        missingEnv,
        ...(configurationError ? { configurationError } : {}),
        readiness: definition.connection === "manual_only"
            ? "manual_only"
            : !definition.operational
                ? "adapter_unavailable"
                : missingEnv.length || configurationError
                    ? "needs_configuration"
                    : "credentials_ready",
    }
}
