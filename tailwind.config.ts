import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./custom-components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-systems/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        nss: "368px",
        xs: "420px",
        hxl: "1366px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
      keyframes: {
        spring: {
          "0%": { transform: "scale(0.9)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        slideIn: {
          "0%": { right: "-100%" },
          "100%": { right: "0%" },
        },
        slideOut: {
          "0%": { left: "0%" },
          "100%": { left: "-100%" },
        },
      },
      animation: {
        spring: "spring 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        slideIn: "slideIn 0.6s linear ",
        slideOut: "slideOut 0.6s linear ",
      },
      backgroundImage: {
        "custom-gradient-to-top":
          "linear-gradient(to top, #2C5364, #203A43, #0F2027);",
        "custom-gradient-to-bottom":
          "linear-gradient(to bottom, #2C5364, #203A43, #0F2027);",
        "custom-gradient-blue": "linear-gradient(90deg, #002A4E, #002A4E00);",
        "home-btn-bg":
          "linear-gradient(180deg, #4A7182 0%, #48626B 49.5%, #37484F 100%)",
      },
      fontFamily: {
        "plex-sans": ["IBM Plex Sans", "sans-serif"],
        "plex-grotesk": ["Space Grotesk", "sans-serif"],
      },
      colors: {
        grayLight: "#7A7A7A",
        textBlack: "#111111",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        outlined: "2px 2px 0px 0px  #000000",
        "outlined-none": "0px 0px 0px 0px  #000000",
      },
      fontSize: {
        h1: "64px",
        h2: "48px",
        h3: "38px",
        h4: "28px",
        subtitle: "24px",
        paragraph: "20px",
        body: "16px",
        xs: "10px",
        caption: "12px",
        small: "10px",
        sm: "12px",
        md: "14px",
        base: "16px",
        lg: "18px",
      },
      lineHeight: {
        h1: "90%",
        h2: "90%",
        h3: "90%",
        h4: "90%",
        h5: "80%",
        subtitle: "120%",
        paragraph: "140%",
        body: "140%",
        caption: "120%",
        small: "120%",
        sm: "150%",
        md: "150%",
        lg: "150%",
      },
      letterSpacing: {
        h1: "-0.8px",
        h2: "-0.5px",
        h3: "-0.5px",
        h4: "-0.5px",
        subtitle: "-0.2px",
        paragraph: "-0.2px",
        body: "-0.2px",
        caption: "0px",
        small: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
