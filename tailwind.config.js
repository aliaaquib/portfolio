/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cherry: {
          bg: "#FFFEFD",
          text: "#3A3A3A",
          textSecondary: "#6B6B6B",
          pink: "#F7E8EC",
        },
        dark: {
          bg: "#0F0F10",
          surface: "#171717",
          surface2: "#1C1C1E",
          surface3: "#232325",
          border: "rgba(255,255,255,0.08)",
          borderLight: "rgba(255,255,255,0.14)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        instrument: ["Instrument Serif", "serif"],
        "instrument-sans": ["Instrument Sans", "sans-serif"],
        signature: ["Yellowtail", "cursive"],
        brand: ["Inter Tight", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(0,0,0,0.06)",
        "soft-hover": "0 25px 70px rgba(0,0,0,0.08)",
        glass: "0 8px 32px 0 rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
