/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.{html,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'DEFAULT': '#0000001a 2px 8px 10px',
      }
    }
  }
}