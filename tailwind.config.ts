import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F7B801", // Bright Yellow
          dark: "#C49401", // Slightly darker shade for hover
        },
        secondary: {
          DEFAULT: "#008080", // Electric Blue
        },
        success: {
          DEFAULT: "#2ECC40", // Emerald Green
        },
        error: {
          DEFAULT: "#FF4136", // Coral Red
        },
        timer: {
          DEFAULT: "#B10DC9", // Purple Grape
        },
        background: {
          DEFAULT: "#FFFBEA", // Soft Cream
          secondary: "#E6E8EB", // Light Gray
        },
        text: {
          primary: "#001F3F", // Dark Navy
          secondary: "#4A4A4A", // Charcoal Gray
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
