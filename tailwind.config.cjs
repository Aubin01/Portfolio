/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'aubin-purple': '#7a66ff',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 14s linear infinite',
        'spin-slowest': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
};
