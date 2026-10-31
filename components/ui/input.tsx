"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex min-h-[var(--nxg-control-min-height)] w-full rounded-[var(--nxg-radius-control)] border border-[var(--nxg-line)] bg-white px-3 py-2 text-sm text-[var(--nxg-charcoal)] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--nxg-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nxg-red)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }