// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    // Asegurarnos de que todos los plugins principales están habilitados
    preflight: true,
  },
  // Explícitamente habilitar todas las variantes por defecto
  variants: {
    extend: {},
  },
  plugins: [],
};
