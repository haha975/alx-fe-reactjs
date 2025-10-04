/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Vite projects usually have index.html at the project root:
    './index.html',
    // all React source files:
    './src/**/*.{js,jsx,ts,tsx}',
    // If you use a `public/` folder with an index.html there, add:
    // './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [],
};
