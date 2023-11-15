/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '800px',
      'md': '1000px',
      'lg': '1250px',
    },
    texts : {
      'small' : '12px'
    },
    colors : {
      'transparent' : 'transparent',
      'indigo' : '#6366f1',
      'gray-2' : '#d4d4d4',
      'gray-3' : '#CCCCCC',
      'black' : '#303030',
      'gray' : '#374151',
      'cyan' : '#06b6d4',
      'cyan-2' : '#06c7e0',
      'white' : '#f9fafb',
      'blue' : '#003366',
      'blue-2' : '#0685e0',
      'blue-3' : '#1453F5',
      'green' : '#22c55e',
      'red': '#f43f5e',
      'teal' : '#0d9488',
      'green-2' : '#22c55e',
      'oragne' : 'rgb(224, 159, 80)'
    }
  },
  plugins: [],
}