/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: "#1e4a30",
        'primary-light': "#2d6b46",
        accent: "#c75438",
        'accent-hover': "#b0462e",
        gold: "#dca43b",
        'bg-main': "#faf8f5",
        'bg-alt': "#f1ebd9",
      },
      fontFamily: {
        heading: ["'Playfair Display'", 'serif'],
        body: ["'Outfit'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
