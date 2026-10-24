import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        brand: {
          blue: "rgb(var(--nxg-navy-rgb) / <alpha-value>)",
          lightBlue: "rgb(var(--nxg-muted-rgb) / <alpha-value>)",
          red: "rgb(var(--nxg-red-rgb) / <alpha-value>)",
          platinum: "rgb(var(--nxg-platinum-rgb) / <alpha-value>)",
          charcoal: "rgb(var(--nxg-charcoal-rgb) / <alpha-value>)",
        },
        nxg: {
          navy: "rgb(var(--nxg-navy-rgb) / <alpha-value>)",
          red: "rgb(var(--nxg-red-rgb) / <alpha-value>)",
          platinum: "rgb(var(--nxg-platinum-rgb) / <alpha-value>)",
          charcoal: "rgb(var(--nxg-charcoal-rgb) / <alpha-value>)",
          muted: "rgb(var(--nxg-muted-rgb) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--nxg-font-sans)"],
        mono: ["var(--nxg-font-mono)"],
      },
      borderRadius: {
        nxg: "var(--nxg-radius-card)",
      },
    },
  },
  plugins: [],
}

export default config
