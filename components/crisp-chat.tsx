"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    $crisp?: unknown[]
    CRISP_WEBSITE_ID?: string
  }
}

export default function CrispChat() {
  const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID?.trim()

  useEffect(() => {
    if (!websiteId) return

    window.$crisp = window.$crisp || []
    window.CRISP_WEBSITE_ID = websiteId

    if (document.getElementById("nxg-crisp-chat-script")) return

    const script = document.createElement("script")
    script.id = "nxg-crisp-chat-script"
    script.src = "https://client.crisp.chat/l.js"
    script.async = true
    document.head.appendChild(script)
  }, [websiteId])

  return null
}
