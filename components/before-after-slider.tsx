"use client"

import Image from "next/image"
import { useState } from "react"
import type { BeforeAfterProject } from "@/data/before-after-projects"

export default function BeforeAfterSlider({ project }: { project: BeforeAfterProject }) {
  const [position, setPosition] = useState(50)

  return (
    <figure className="min-w-0">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--nxg-navy)]">
        <Image src={project.beforeImage} alt={project.beforeAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <Image src={project.afterImage} alt={project.afterAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white shadow" style={{ left: `${position}%` }} />
        <span className="pointer-events-none absolute left-3 top-3 z-20 bg-[var(--nxg-navy)]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-white">Before</span>
        <span className="pointer-events-none absolute right-3 top-3 z-20 bg-[var(--nxg-red)] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-white">After</span>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Compare before and after: ${project.title}`}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
        />
        <span className="pointer-events-none absolute top-1/2 z-20 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[var(--nxg-navy)] bg-white text-xs font-semibold text-[var(--nxg-navy)]" style={{ left: `${position}%` }} aria-hidden="true">↔</span>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-base font-semibold text-[var(--nxg-navy)]">{project.title}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--nxg-muted)]">{project.service}</span>
      </figcaption>
    </figure>
  )
}