/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors : {
      'black' : '#303030',
      'gray' : '#1c1a1a',
      'cyan' : '#06b6d4',
      'cyan-2' : '#06c7e0',
      'white' : '#f9fafb',
      'blue' : '#003366'
    }
  },
  plugins: [],
}