import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        text: "rgb(var(--c-text) / <alpha-value>)",
        strong: "rgb(var(--c-strong) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        brandred: "rgb(var(--c-brandred) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["\"DM Sans\"", "system-ui", "-apple-system", "\"Segoe UI\"", "sans-serif"],
        display: ["\"Instrument Serif\"", "Georgia", "\"Times New Roman\"", "serif"],
        serif: ["Georgia", "\"Times New Roman\"", "Times", "serif"],
        signature: ["\"Ms Madi\"", "\"Segoe Script\"", "cursive"],
        hand: ["\"Caveat\"", "cursive"],
        namelogo: ["\"Stalemate\"", "\"Segoe Script\"", "cursive"],
        mono: ["ui-monospace", "\"SF Mono\"", "SFMono-Regular", "Menlo", "Consolas", "\"Liberation Mono\"", "monospace"],
      },
      maxWidth: {
        content: "34rem",
      },
      animation: {
        "fade-in": "fade-in 900ms ease-out both",
        "fade-swap": "fade-swap 320ms ease-out both",
        blink: "blink 1s step-end infinite",
        "contact-pop": "contact-pop 180ms ease-out both",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-swap": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "contact-pop": {
          "0%": { opacity: "0", transform: "scale(0.78) translateY(-2px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(17, 17, 17, 0.14), 0 0 30px rgba(17, 17, 17, 0.06)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(17,17,17,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
