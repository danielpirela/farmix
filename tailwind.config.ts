import { type Config } from 'tailwindcss'
import tailwindcssAnimated from 'tailwindcss-animated'

export default {
  darkMode: [
    'variant',
    [
      '@media (prefers-color-scheme: light) { &:not(.light *) }',
      '&:is(.dark *)',
    ],
  ],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: '#007A4D',
        'accent-ligth': '#A3D8A8',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s forwards',
        slideIn: 'slideIn 0.5s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    tailwindcssAnimated
  ],
} satisfies Config
