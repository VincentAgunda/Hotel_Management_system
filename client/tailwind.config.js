/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a56db',    // Blue
        secondary: '#0e9f6e',  // Emerald
      }
    },
  },
  plugins: [],
}
