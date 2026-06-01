import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
          pale: '#F5EDD6',
          dark: '#A88B3D',
        },
        dark: {
          DEFAULT: '#0D0B08',
          2: '#1A1710',
          3: '#2A2620',
          4: '#3A3530',
        },
        cream: {
          DEFAULT: '#FAF6EE',
          2: '#F0E8D8',
        },
        muted: {
          DEFAULT: '#8A7E6A',
          dim: '#5A5248',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'DM Sans', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config