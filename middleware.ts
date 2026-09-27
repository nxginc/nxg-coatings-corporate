import { NextRequest, NextResponse } from "next/server"

const campaignHost = (process.env.NEXT_PUBLIC_CAMPAIGN_HOST || "go.nxgcoatingsinc.com").toLowerCase()

export function middleware(request: NextRequest) {
    const host = request.headers.get("host")?.split(":")[0].toLowerCase()
    const pathname = request.nextUrl.pathname

    if (host !== campaignHost || pathname.startsWith("/api/") || pathname.startsWith("/_next/") || pathname.includes(".")) {
        return NextResponse.next()
    }

    const destination = request.nextUrl.clone()
    destination.pathname = `/campaigns${pathname === "/" ? "/quote" : pathname}`
    return NextResponse.rewrite(destination)
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}