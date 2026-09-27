"use client"

import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type HeroHeight = "small" | "medium" | "large"

type ParallaxHeroProps = {
    eyebrow: string
    title: string
    description: string
    image: string
    imageAlt: string
    children?: ReactNode
    imagePosition?: string
    height?: HeroHeight
    className?: string
}

export default function ParallaxHero({
    eyebrow,
    title,
    description,
    image,
    imageAlt,
    children,
    imagePosition = "center",
    height = "large",
    className,
}: ParallaxHeroProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const reduceMotion = useReducedMotion()
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    })
    const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 84])
    const heightClass = {
        small: "min-h-[min(560px,calc(100svh-5rem))]",
        medium: "min-h-[min(660px,calc(100svh-5rem))]",
        large: "min-h-[min(760px,calc(100svh-5rem))]",
    }[height]

    return (
        <section
            ref={sectionRef}
            className={cn("relative isolate flex items-end overflow-hidden bg-[var(--nxg-navy)] text-white", heightClass, className)}
            aria-label={title}
        >
            <motion.div className="absolute inset-0 -inset-y-12" style={{ y: imageY }} aria-hidden="true">
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: imagePosition }}
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--nxg-navy)]/95 via-[var(--nxg-navy)]/65 to-[var(--nxg-navy)]/15" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--nxg-navy)]/70 to-transparent" />
            <div className="relative mx-auto w-full max-w-[var(--nxg-content-width)] px-6 pb-14 pt-36 sm:pb-20 lg:px-10 lg:pb-24">
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">{eyebrow}</p>
                <h1 className="max-w-5xl text-4xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl">{title}</h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">{description}</p>
                {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
            </div>
        </section>
    )
}