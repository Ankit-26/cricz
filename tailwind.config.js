/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('https://elementor.dostguru.com/cms/team11/wp-content/uploads/2021/05/Rectangle-1008.jpg')",
      },
    },
  },
  plugins: [],
};
