/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: ["class"], // Disabled to prevent hydration mismatches
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-montserrat)", "var(--font-poppins)", "var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-source-sans)", "var(--font-open-sans)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", "monospace"],
        arabic: ["var(--font-cairo)", "var(--font-noto-arabic)", "Arial", "Tahoma", "sans-serif"],
        english: ["var(--font-poppins)", "var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        japanese: ["var(--font-noto-jp)", "Hiragino Sans", "Yu Gothic", "Meiryo", "sans-serif"],
        korean: ["var(--font-noto-kr)", "Malgun Gothic", "Apple SD Gothic Neo", "sans-serif"],
        "chinese-simplified": ["var(--font-noto-sc)", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "sans-serif"],
        "chinese-traditional": ["var(--font-noto-tc)", "PingFang TC", "Hiragino Sans", "Microsoft JhengHei", "sans-serif"],
        thai: ["var(--font-noto-thai)", "Sukhumvit Set", "Tahoma", "sans-serif"],
        hindi: ["var(--font-noto-devanagari)", "Mangal", "Arial Unicode MS", "sans-serif"],
        hebrew: ["var(--font-noto-hebrew)", "Arial", "Tahoma", "sans-serif"],
        georgian: ["var(--font-noto-georgian)", "Arial", "Tahoma", "sans-serif"],
        armenian: ["var(--font-noto-armenian)", "Arial", "Tahoma", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // eslint-disable-line @typescript-eslint/no-require-imports
}
