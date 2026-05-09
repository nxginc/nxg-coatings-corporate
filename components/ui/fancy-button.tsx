"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"

interface FancyButtonProps {
  children: React.ReactNode
  variant?: "default" | "shine" | "outline" | "ghost" | "gradient" | "secondary" | "link"
  size?: "sm" | "md" | "lg" | "xl"
  rounded?: "none" | "sm" | "md" | "lg" | "full"
  hasArrow?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
  type?: "button" | "submit" | "reset"
  onClick?: () => void
}

export function FancyButton({
  children,
  variant = "default",
  size = "md",
  rounded = "md",
  hasArrow = false,
  loading = false,
  disabled = false,
  className,
  onClick,
}: FancyButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variantClasses = {
    default: "bg-brand-blue text-white hover:bg-brand-blue/90 focus:ring-brand-blue",
    shine: "bg-gradient-to-r from-brand-blue to-blue-600 text-white hover:from-blue-600 hover:to-brand-blue shadow-lg hover:shadow-xl transform hover:scale-105",
    outline: "border-2 border-current text-current bg-transparent hover:bg-current hover:text-white",
    ghost: "text-current hover:bg-current/10",
    gradient: "bg-gradient-to-r from-brand-blue to-blue-600 text-white hover:from-blue-600 hover:to-brand-blue shadow-lg hover:shadow-xl",
    secondary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900",
    link: "text-brand-blue bg-transparent hover:text-brand-blue/80 shadow-none px-0 py-0",
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  }

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  }

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        roundedClasses[rounded],
        className
      )}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
      {hasArrow && !loading && <ArrowRight className="w-4 h-4 ml-2" />}
    </button>
  )
}