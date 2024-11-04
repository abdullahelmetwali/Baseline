/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        tab: { max: "1025px" },
        mob: { max: "767px" },
        lap: { max: "1537px" }
      },
    },
  },
  plugins: []
}