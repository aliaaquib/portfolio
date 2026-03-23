import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0d0d0d",
        text: "#888888",
        strong: "#e5e5e5",
        accent: "#f97316",
        muted: "#888888",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "monospace"],
      },
      animation: {
        "fade-in": "fade-in 900ms ease-out both",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(249, 115, 22, 0.2), 0 0 30px rgba(249, 115, 22, 0.08)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(136,136,136,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(136,136,136,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
