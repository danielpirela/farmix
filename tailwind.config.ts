import type { Config } from "tailwindcss"

export default {
  darkMode: ["selector", '[data-mode="ligth"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "accent-ligth": "#83b808",
        accent: "#008546",
      },
    },
  },
  plugins: [],
} satisfies Config
