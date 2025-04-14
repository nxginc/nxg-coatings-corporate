"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "text-white font-semibold relative bg-gradient-to-r from-brand-blue to-brand-red hover:from-brand-red hover:to-brand-blue",
        shine:
          "bg-brand-blue text-white hover:bg-brand-blue/90 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        accent: "bg-brand-red text-white hover:bg-brand-red/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
      hasArrow: {
        true: "pr-10",
        false: "",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hasArrow: false,
      rounded: "default",
    },
  },
)

export interface FancyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>(
  ({ className, variant, size, hasArrow, rounded, children, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, hasArrow, rounded, className }))} ref={ref} {...props}>
        {children}
        {hasArrow && <ArrowRight className="absolute right-4 h-5 w-5 transition-transform group-hover:translate-x-1" />}
      </button>
    )
  },
)
FancyButton.displayName = "FancyButton"

export { FancyButton, buttonVariants }
