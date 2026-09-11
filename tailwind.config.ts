import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1180px",
      },
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        ink: "var(--ink)",
        "ink-strong": "var(--ink-strong)",
        muted: "var(--muted)",
        accent: "var(--accent)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      keyframes: {},
      animation: {},
    },
  },
  plugins: [],
};

export default config;