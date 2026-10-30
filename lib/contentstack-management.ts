import { z } from "zod"

const regionHosts: Record<string, string> = {
  us: "https://api.contentstack.io/v3",
  eu: "https://eu-api.contentstack.com/v3",
  au: "https://au-api.contentstack.com/v3",
}

const fieldMapSchema = z.object({
  title: z.string().regex(/^[a-zA-Z0-9_-]+$/),
  slug: z.string().regex(/^[a-zA-Z0-9_-]+$/),
  excerpt: z.string().regex(/^[a-zA-Z0-9_-]+$/),
  bodyMarkdown: z.string().regex(/^[a-zA-Z0-9_-]+$/),
  category: z.string().regex(/^[a-zA-Z0-9_-]+$/),
}).strict()

const defaultFieldMap = {
  title: "title",
  slug: "url",
  excerpt: "excerpt",
  bodyMarkdown: "body_markdown",
  category: "category",
}

type ManagementConfig = {
  apiKey: string
  managementToken: string
  contentType: string
  locale: string
  apiBaseUrl: string
  fieldMap: z.infer<typeof fieldMapSchema>
}

export type ApprovedBlogDraft = {
  id: string
  slug: string
  title: string
  excerpt: string
  bodyMarkdown: string
  category: string
  contentstackEntryUid: string | null
}

export class ContentstackManagementError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
    this.name = "ContentstackManagementError"
  }
}

function getManagementConfig(): ManagementConfig {
  const apiKey = process.env.CONTENTSTACK_API_KEY?.trim()
  const managementToken = process.env.CONTENTSTACK_MANAGEMENT_TOKEN?.trim()
  const contentType = process.env.CONTENTSTACK_BLOG_CONTENT_TYPE_UID?.trim()
  const region = process.env.CONTENTSTACK_REGION?.trim().toLocaleLowerCase() || "us"
  const apiBaseUrl = regionHosts[region]
  if (!apiKey || !managementToken || !contentType || !apiBaseUrl) {
    throw new ContentstackManagementError(
      !apiBaseUrl
        ? "Unsupported Contentstack region. Use us, eu, or au."
        : "Contentstack draft sync needs CONTENTSTACK_API_KEY, CONTENTSTACK_MANAGEMENT_TOKEN, CONTENTSTACK_BLOG_CONTENT_TYPE_UID, and a supported CONTENTSTACK_REGION.",
      503,
    )
  }

  let fieldMap: ManagementConfig["fieldMap"] = defaultFieldMap
  const rawFieldMap = process.env.CONTENTSTACK_BLOG_FIELD_MAP?.trim()
  if (rawFieldMap) {
    let parsed: unknown
    try {
      parsed = JSON.parse(rawFieldMap)
    } catch {
      throw new ContentstackManagementError("CONTENTSTACK_BLOG_FIELD_MAP must be valid JSON.", 503)
    }
    const result = fieldMapSchema.safeParse(parsed)
    if (!result.success) {
      throw new ContentstackManagementError(
        "CONTENTSTACK_BLOG_FIELD_MAP must define valid title, slug, excerpt, bodyMarkdown, and category field UIDs.",
        503,
      )
    }
    fieldMap = result.data
  }

  return {
    apiKey,
    managementToken,
    contentType,
    locale: process.env.CONTENTSTACK_LOCALE?.trim() || "en-us",
    apiBaseUrl,
    fieldMap,
  }
}

async function requestManagementApi(
  config: ManagementConfig,
  url: URL,
  method: "GET" | "POST" | "PUT",
  body?: Record<string, unknown>,
) {
  let response: Response
  try {
    response = await fetch(url, {
      method,
      headers: {
        api_key: config.apiKey,
        authorization: config.managementToken,
        "Content-Type": "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    })
  } catch {
    throw new ContentstackManagementError("Contentstack Management API could not be reached.", 502)
  }

  if (!response.ok) {
    throw new ContentstackManagementError(
      `Contentstack Management API returned HTTP ${response.status}. Verify stack region, content type, field mapping, and token permissions.`,
      response.status >= 400 && response.status < 500 ? 400 : 502,
    )
  }
  try {
    return await response.json() as Record<string, unknown>
  } catch {
    throw new ContentstackManagementError("Contentstack Management API returned an invalid response.", 502)
  }
}

export async function syncApprovedBlogDraft(post: ApprovedBlogDraft) {
  const config = getManagementConfig()
  const entryFields = {
    [config.fieldMap.title]: post.title,
    [config.fieldMap.slug]: `/blog/${post.slug}`,
    [config.fieldMap.excerpt]: post.excerpt,
    [config.fieldMap.bodyMarkdown]: post.bodyMarkdown,
    [config.fieldMap.category]: post.category,
  }
  const entriesPath = `${config.apiBaseUrl}/content_types/${encodeURIComponent(config.contentType)}/entries`
  const entriesUrl = new URL(entriesPath)
  entriesUrl.searchParams.set("locale", config.locale)
  const entryUrl = (uid: string) => {
    const url = new URL(`${entriesPath}/${encodeURIComponent(uid)}`)
    url.searchParams.set("locale", config.locale)
    return url
  }

  let entryUid = post.contentstackEntryUid
  let version: number | undefined
  if (entryUid) {
    const findUrl = new URL(entriesUrl)
    findUrl.searchParams.set("limit", "2")
    findUrl.searchParams.set("apply_draft", "true")
    findUrl.searchParams.set("query", JSON.stringify({ uid: entryUid }))
    const existing = await requestManagementApi(config, findUrl, "GET")
    const matches = Array.isArray(existing.entries) ? existing.entries : []
    const currentEntry = matches[0]
    if (matches.length !== 1 || !currentEntry || typeof currentEntry !== "object" || typeof (currentEntry as Record<string, unknown>)._version !== "number") {
      throw new ContentstackManagementError("Contentstack did not return the current draft version for the linked entry.", 409)
    }
    version = (currentEntry as Record<string, unknown>)._version as number
  } else {
    const findUrl = new URL(entriesUrl)
    findUrl.searchParams.set("limit", "2")
    findUrl.searchParams.set("apply_draft", "true")
    findUrl.searchParams.set("query", JSON.stringify({ [config.fieldMap.slug]: `/blog/${post.slug}` }))
    const existing = await requestManagementApi(config, findUrl, "GET")
    const matches = Array.isArray(existing.entries) ? existing.entries : []
    if (matches.length > 1) {
      throw new ContentstackManagementError("Multiple Contentstack entries use this blog URL; resolve the duplicates in Contentstack before syncing.", 409)
    }
    const matchedEntry = matches[0]
    if (matchedEntry && typeof matchedEntry === "object" && typeof (matchedEntry as Record<string, unknown>).uid === "string") {
      entryUid = (matchedEntry as Record<string, unknown>).uid as string
      const currentVersion = (matchedEntry as Record<string, unknown>)._version
      if (typeof currentVersion !== "number") {
        throw new ContentstackManagementError("Contentstack did not return the existing entry version.", 502)
      }
      version = currentVersion
    }
  }

  const body = { entry: { ...entryFields, ...(entryUid ? { uid: entryUid, _version: version } : {}) } }
  const result = entryUid
    ? await requestManagementApi(config, entryUrl(entryUid), "PUT", body)
    : await requestManagementApi(config, entriesUrl, "POST", body)
  const returnedEntry = result.entry
  const returnedUid = returnedEntry && typeof returnedEntry === "object"
    ? (returnedEntry as Record<string, unknown>).uid
    : undefined
  if (typeof returnedUid !== "string" || !returnedUid) {
    throw new ContentstackManagementError("Contentstack saved the draft but did not return an entry UID.", 502)
  }
  return { entryUid: returnedUid }
}
