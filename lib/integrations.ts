export type IntegrationDefinition = {
    id: string
    name: string
    category: "cms" | "crm" | "social" | "media" | "ads" | "communications" | "payments"
    description: string
    requiredEnv: string[]
    connection: "server_token" | "oauth_account" | "upload_credentials" | "manual_only"
}

export const integrationCatalog: IntegrationDefinition[] = [
    { id: "contentstack", name: "Contentstack", category: "cms", description: "Editorial content, landing pages, workflows, and delivery API.", requiredEnv: ["CONTENTSTACK_API_KEY", "CONTENTSTACK_DELIVERY_TOKEN", "CONTENTSTACK_ENVIRONMENT", "CONTENTSTACK_REGION", "CONTENTSTACK_WEBHOOK_SECRET"], connection: "server_token" },
    { id: "hubspot", name: "HubSpot", category: "crm", description: "Contact synchronization and CRM lifecycle workflows.", requiredEnv: ["HUBSPOT_PRIVATE_APP_TOKEN"], connection: "server_token" },
    { id: "vista-social", name: "Vista Social", category: "social", description: "Approved social post scheduling, inbox, and analytics.", requiredEnv: ["VISTA_SOCIAL_API_TOKEN", "VISTA_SOCIAL_WORKSPACE_ID"], connection: "server_token" },
    { id: "cloudinary", name: "Cloudinary", category: "media", description: "Signed media uploads, campaign renditions, and asset delivery.", requiredEnv: ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"], connection: "upload_credentials" },
    { id: "imagekit-upload", name: "ImageKit uploads", category: "media", description: "Keep ImageKit as the current source CDN and enable signed uploads when configured.", requiredEnv: ["IMAGEKIT_URL_ENDPOINT", "IMAGEKIT_PUBLIC_KEY", "IMAGEKIT_PRIVATE_KEY"], connection: "upload_credentials" },
    { id: "meta-pages", name: "Meta Pages and Instagram", category: "social", description: "OAuth connection for eligible Facebook Page and Instagram publishing features.", requiredEnv: ["META_APP_ID", "META_APP_SECRET", "META_PAGE_ACCESS_TOKEN"], connection: "oauth_account" },
    { id: "facebook-marketplace", name: "Facebook Marketplace", category: "social", description: "Prepare reviewed copy and assets for manual posting; general service-listing auto-publish is not enabled.", requiredEnv: [], connection: "manual_only" },
    { id: "google-business-profile", name: "Google Business Profile", category: "ads", description: "Local business profile, location posts, and discovery workflows.", requiredEnv: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN", "GOOGLE_BUSINESS_LOCATION_ID"], connection: "oauth_account" },
    { id: "google-ads", name: "Google Ads", category: "ads", description: "Campaign attribution and paid-search operations.", requiredEnv: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN", "GOOGLE_ADS_DEVELOPER_TOKEN", "GOOGLE_ADS_CUSTOMER_ID"], connection: "oauth_account" },
    { id: "stripe", name: "Stripe", category: "payments", description: "Optional estimate deposits and customer payments.", requiredEnv: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"], connection: "server_token" },
    { id: "telnyx", name: "Telnyx", category: "communications", description: "Optional SMS, voice, and call attribution workflows.", requiredEnv: ["TELNYX_API_KEY"], connection: "server_token" },
    { id: "email", name: "Transactional email", category: "communications", description: "Contact notifications and customer follow-up email.", requiredEnv: ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "CONTACT_TO_EMAIL"], connection: "server_token" },
]

export function getIntegrationReadiness(definition: IntegrationDefinition) {
    const missingEnv = definition.requiredEnv.filter((name) => !process.env[name]?.trim())
    return {
        ...definition,
        configured: definition.connection !== "manual_only" && missingEnv.length === 0,
        missingEnv,
        readiness: definition.connection === "manual_only" ? "manual_only" : missingEnv.length ? "needs_configuration" : definition.connection === "oauth_account" ? "credentials_ready" : "credentials_ready",
    }
}