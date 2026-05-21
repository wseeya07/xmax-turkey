import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050607",
          900: "#0a0c10",
          800: "#10141a",
          700: "#161c25",
          600: "#1f2733",
          500: "#2a3441",
          400: "#3a4757"
        },
        carbon: {
          50: "#f4f5f7",
          100: "#dfe3e8",
          200: "#aab1bd",
          300: "#7c8593",
          400: "#535d6c",
          500: "#3a4350",
          600: "#262d38",
          700: "#181d25",
          800: "#0e1218",
          900: "#06080b"
        },
        yamaha: {
          50: "#eff7ff",
          100: "#dbecff",
          200: "#bedcff",
          300: "#90c7ff",
          400: "#5ba6ff",
          500: "#2e85ff",
          600: "#1466ef",
          700: "#0c52cc",
          800: "#0f47a3",
          900: "#123e80",
          950: "#0a224d"
        },
        neon: {
          cyan: "#22e6ff",
          blue: "#3b82ff",
          violet: "#7c5cff"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      letterSpacing: {
        tightest: "-0.04em"
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(46,133,255,0.18) 0%, rgba(46,133,255,0) 70%)"
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(46,133,255,0.45)",
        edge: "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 0 rgba(0,0,0,0.4)"
      },
      animation: {
        "pulse-slow": "pulse 6s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
