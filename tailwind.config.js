/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        'vt323': ['VT323', 'monospace'],
        'source-code': ['"Source Code Pro"', 'monospace'],
        'ui': ['Tahoma', 'Segoe UI', 'Verdana', 'Geneva', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cs2: {
          orange: "#FF8200",
          dark: "#000000",
          light: "#f0f0e8",
          yellow: "#FFD700",
          red: "#FF3B3B",
          blue: "#00A8FF"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        'pixel': '4px 4px 0 0 rgba(0,0,0,1)',
        'pixel-sm': '2px 2px 0 0 rgba(0,0,0,1)',
        'pixel-lg': '6px 6px 0 0 rgba(0,0,0,1)',
        'pixel-inset': 'inset 4px 4px 0 0 rgba(0,0,0,1)',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'button-press': {
          '0%': { transform: 'translateY(0)', boxShadow: '3px 3px 0 0 #000' },
          '100%': { transform: 'translateY(2px)', boxShadow: '1px 1px 0 0 #000' },
        },
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 0.3s cubic-bezier(.25,.46,.45,.94) both',
        'button-press': 'button-press 0.1s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.foreground'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.foreground'),
              },
              textDecoration: 'underline wavy',
              textUnderlineOffset: '0.25em',
            },
            'h1, h2, h3, h4': {
              fontWeight: 'bold',
              fontFamily: theme('fontFamily.ui').join(', '),
              letterSpacing: '-0.025em',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            code: {
              backgroundColor: theme('colors.muted.DEFAULT'),
              borderRadius: theme('borderRadius.DEFAULT'),
              padding: '0.2em 0.4em',
              fontSize: '0.9em',
              fontFamily: theme('fontFamily.ui').join(', '),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    function({ addUtilities }) {
      const newUtilities = {
        '.pixel-border': {
          border: '2px solid #000',
          boxShadow: '4px 4px 0 0 #000',
          '&:active': {
            transform: 'translate(2px, 2px)',
            boxShadow: '2px 2px 0 0 #000',
          },
        },
        '.pixel-border-sm': {
          border: '1px solid #000',
          boxShadow: '2px 2px 0 0 #000',
        },
        '.pixel-border-lg': {
          border: '3px solid #000',
          boxShadow: '6px 6px 0 0 #000',
        },
        '.text-outline': {
          textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
