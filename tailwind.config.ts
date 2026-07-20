import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0E14",       // base background
        surface: "#131720",   // panel background
        border: "#232838",    // hairline dividers
        parchment: "#E8E6E1", // primary text
        muted: "#8B8F9C",     // secondary text
        gold: "#C9A227",      // signature accent — transmutation gold
        goldDim: "#8A6F1E",
        ember: "#B4552F",     // rare secondary accent for warnings/errors
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
