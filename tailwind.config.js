/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors : {
      'transparent' : 'transparent',
      'gray-2' : '#475569',
      'black' : '#303030',
      'gray' : '#374151',
      'cyan' : '#06b6d4',
      'cyan-2' : '#06c7e0',
      'white' : '#f9fafb',
      'blue' : '#003366',
      'blue-2' : '#0685e0',
      'green' : '#22c55e',
      'red' : '#f43f5e'
    }
  },
  plugins: [],
}