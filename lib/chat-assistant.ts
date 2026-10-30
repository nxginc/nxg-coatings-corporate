import { NXG_SERVICE_KNOWLEDGE } from "@/lib/site-metadata"
import { SERVICE_AREAS } from "@/lib/seo"

export type ChatMessage = {
  role: "visitor" | "assistant" | "team"
  content: string
  createdAt: string
}

export type ChatSuggestion = {
  label: string
  href: string
}

export function getChatReply(message: string): { reply: string; suggestions: ChatSuggestion[] } {
  const text = message.toLocaleLowerCase()

  if (/\b(quote|estimate|price|cost|budget)\b/.test(text)) {
    return {
      reply: "Every project is different, so the team will confirm scope and pricing after learning about the space. Share the project details in the estimate form and NXG will follow up.",
      suggestions: [{ label: "Request an estimate", href: "/quote" }],
    }
  }

  if (/\b(schedule|appointment|visit|walkthrough|consultation)\b/.test(text)) {
    return {
      reply: "You can request a consultation time online. A submitted time is a request, not a confirmed appointment; the team will follow up to confirm.",
      suggestions: [{ label: "Request a consultation", href: "/schedule" }],
    }
  }

  if (/\b(area|location|near|serve|serving|town|city)\b/.test(text)) {
    return {
      reply: `NXG serves the Twin Cities metro, including ${SERVICE_AREAS.filter((area) => area !== "Twin Cities metro").join(", ")}. Share your project address in an estimate request so the team can confirm service availability.`,
      suggestions: [{ label: "See service areas", href: "/servicearea" }, { label: "Check project availability", href: "/quote" }],
    }
  }

  if (/\b(service|paint|coating|cabinet|deck|interior|exterior|industrial)\b/.test(text)) {
    return {
      reply: `NXG works across ${NXG_SERVICE_KNOWLEDGE.slice(0, -1).join(", ")}, and ${NXG_SERVICE_KNOWLEDGE.at(-1)}. Tell me which surface or space you have in mind, or explore the service pages.`,
      suggestions: [{ label: "Explore services", href: "/services" }, { label: "Request an estimate", href: "/quote" }],
    }
  }

  if (/\b(person|human|team|someone|call|talk)\b/.test(text)) {
    return {
      reply: "I can route a note to the NXG team. This chat is monitored asynchronously, not staffed live; leave your contact details with your message so the team can reply.",
      suggestions: [{ label: "Contact NXG", href: "/contact" }],
    }
  }

  return {
    reply: "I can help with services, Twin Cities service areas, estimate requests, or consultation scheduling. What would you like to know?",
    suggestions: [
      { label: "Explore services", href: "/services" },
      { label: "Request an estimate", href: "/quote" },
      { label: "Contact NXG", href: "/contact" },
    ],
  }
}
