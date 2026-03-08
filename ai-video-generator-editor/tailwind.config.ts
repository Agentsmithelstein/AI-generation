import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./frontend/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: []
} satisfies Config;
