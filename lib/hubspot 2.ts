type HubSpotLead = {
    name: string
    email: string
    phone?: string
    leadType: string
    service?: string
}

type HubSpotSyncResult = { status: "synced"; contactId: string } | { status: "not_configured" }

const hubspotApi = "https://api.hubapi.com/crm/v3/objects/contacts"

export async function syncLeadToHubSpot(lead: HubSpotLead): Promise<HubSpotSyncResult> {
    const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN
    if (!token) return { status: "not_configured" }

    const [firstName, ...remainingName] = lead.name.trim().split(/\s+/)
    const properties: Record<string, string> = {
        email: lead.email,
        firstname: firstName,
        lifecyclestage: "lead",
    }
    if (remainingName.length) properties.lastname = remainingName.join(" ")
    if (lead.phone) properties.phone = lead.phone

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    }
    const signal = AbortSignal.timeout(8_000)
    const searchResponse = await fetch(`${hubspotApi}/search`, {
        method: "POST",
        headers,
        signal,
        body: JSON.stringify({
            filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: lead.email }] }],
            properties: ["email"],
            limit: 1,
        }),
    })
    if (!searchResponse.ok) throw new Error(`HubSpot contact lookup failed (${searchResponse.status})`)

    const search = await searchResponse.json()
    const existingId = search.results?.[0]?.id as string | undefined
    const writeResponse = existingId
        ? await fetch(`${hubspotApi}/${encodeURIComponent(existingId)}`, { method: "PATCH", headers, signal, body: JSON.stringify({ properties }) })
        : await fetch(hubspotApi, { method: "POST", headers, signal, body: JSON.stringify({ properties }) })

    if (!writeResponse.ok) throw new Error(`HubSpot contact sync failed (${writeResponse.status})`)
    const contact = await writeResponse.json()

    return { status: "synced", contactId: String(contact.id) }
}