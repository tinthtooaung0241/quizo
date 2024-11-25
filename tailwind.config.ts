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
        background: "var(--background)",
        foreground: "var(--foreground)",
        turquoise: "var(--turquoise)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        custom: "3px 3px 0 -1px  var(--turquoise), 3px 3px 0 var(--turquoise)",
        custom_hover:
          "1.5px 1.5px 0 -1px  var(--turquoise), 1.5px 1.5px 0 var(--turquoise)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
