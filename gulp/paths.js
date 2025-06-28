module.exports = {
  src: {
    data: "src/json/**/*",
    html: "src/html/pages/**/*.+(html|nunjucks|njk)",
    css: "src/css/main.css",
    js: "src/js/**/*.js",
    images: "src/images/**/*",
    fonts: "src/fonts/**/*",
  },
  watch: {
    data: "src/json/data.json",
    html: "src/html/**/*.+(html|nunjucks|njk)",
    css: "src/css/**/*.css",
    tailwindcss: "./tailwind.config.js",
    js: "src/js/**/*.js",
    images: "src/images/**/*",
    fonts: "src/fonts/**/*",
  },
  build: {
    html: "build/",
    css: "build/assets/css/",
    js: "build/assets/js/",
    images: "build/assets/images/",
    fonts: "build/assets/fonts/",
  },
  clean: ["build/"],
};
