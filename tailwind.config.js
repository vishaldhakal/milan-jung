/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightgreen: "#009c46",
        midgreen: "#008e64",
        green: "#007e75",
        darkgreen: "#006c78",
        normaldark: "#005a6d",
        dark: "#2f4858",
      },
      borderRadius: {
        extralarge: "50px",
      },
      transitionProperty: {
        width: "width",
      },
      backgroundImage: {
        hero: "assets/images/slide-03.jpg",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
