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
        small: "min-h-[min(58svh,560px)]",
        medium: "min-h-[min(70svh,660px)]",
        large: "min-h-[min(82svh,760px)]",
    }[height]

    return (
        <section
            ref={sectionRef}
            className={cn("nxg-site-hero relative isolate flex items-end overflow-hidden bg-[var(--nxg-navy)] text-white", heightClass, className)}
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
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--nxg-navy)]/75 to-transparent" />
            <div className="relative mx-auto w-full max-w-[var(--nxg-content-width)] px-6 pb-14 pt-28 sm:pb-20 lg:px-10 lg:pb-24">
                <p className="nxg-site-hero__eyebrow mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/75">{eyebrow}</p>
                <h1 className="nxg-site-hero__title max-w-5xl font-light text-white">{title}</h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">{description}</p>
                {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
            </div>
        </section>
    )
}