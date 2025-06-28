/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{json,html,njk,js}"],
  theme: {
    extend: {
      // CONTAINER
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          md: "32px",
          xl: "32px",
        },
      },
      // COLORS
      colors: {
        body: "#F2F1EE", // bg-body
        loadingtext: "#000000", // text-loadingtext
        error: "#b81111", // border-error
        gray: "#B7B7B7", // *-gray
        white: {
          DEFAULT: "#ffffff", // *-white
        },
        black: {
          DEFAULT: "#000000", // *-black
        },
        accent: {
          DEFAULT: "#FF8856", // *-accent
        },
      },
    },
    // MEDIA QUERIES
    screens: {
      md: "768px",
      xl: "1280px",
      xxl: "1600px",
      smOnly: { max: "767.98px" },
      mdOnly: { min: "768px", max: "1279.98px" },
      notXl: { max: "1279.98px" },
      retina: { raw: "(min-resolution: 2x)" },
    },
    // FONTS
    fontFamily: {
      montserrat: ["Montserrat", "serif"], // font-montserrat
      // robochyi: ["Robochyi Sans OF", "serif"], // font-robochyi
    },
    // ANIMATION
    animation: {
      loading: "loading 3s linear infinite",
    },
    // KEYFRAMES
    keyframes: {
      loading: {
        from: { width: "0px" },
        to: { width: "100%" },
      },
    },
  },
  plugins: [],
};
