/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      boxShadow: {
        white: '0 2px 4px 0 rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
