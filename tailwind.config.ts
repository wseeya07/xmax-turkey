import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#040507",
          900: "#080a0e",
          800: "#0d1015",
          700: "#13171e",
          600: "#1a1f28",
          500: "#252b36",
          400: "#363d4c"
        },
        carbon: {
          50: "#f3f4f6",
          100: "#dadce2",
          200: "#a4a9b6",
          300: "#737a8a",
          400: "#4d5563",
          500: "#363d4b",
          600: "#252a35",
          700: "#181c24",
          800: "#0d1015",
          900: "#06080b"
        },
        yamaha: {
          50: "#eef7ff",
          100: "#daedff",
          200: "#b9dbff",
          300: "#8cc1ff",
          400: "#56a0ff",
          500: "#2e7dff",
          600: "#155ff0",
          700: "#0c4dcc",
          800: "#1140a3",
          900: "#143982",
          950: "#0d214d"
        },
        electric: {
          cyan: "#26e8ff",
          ice: "#9ef0ff",
          violet: "#8a6bff",
          ember: "#ff8c4a"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      letterSpacing: {
        tightest: "-0.045em",
        tightish: "-0.025em"
      },
      lineHeight: {
        "tighter-display": "0.92"
      },
      boxShadow: {
        "glass-edge":
          "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px -32px rgba(0,0,0,0.65)",
        "glass-lift":
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 1px 0 rgba(0,0,0,0.4), 0 40px 100px -40px rgba(8,16,34,0.9), 0 0 0 1px rgba(255,255,255,0.04)",
        "ambient-blue":
          "0 30px 120px -20px rgba(46,125,255,0.45), inset 0 1px 0 rgba(255,255,255,0.08)"
      },
      backgroundImage: {
        mesh:
          "radial-gradient(ellipse 70% 60% at 15% 10%, rgba(46,125,255,0.22) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 90% 0%, rgba(38,232,255,0.14) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 50% 110%, rgba(138,107,255,0.16) 0%, transparent 60%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>\")",
        "grid-fine":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      },
      animation: {
        "pulse-slow": "pulse 6s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "spin-slow": "spin 22s linear infinite"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
