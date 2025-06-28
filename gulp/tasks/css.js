const gulp = require("gulp");
const concat = require("gulp-concat");
const mode = require("gulp-mode")();
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const size = require("gulp-size");
const paths = require("../paths");

const postcssPlugins = [
  require("postcss-import"),
  require("tailwindcss/nesting"),
  require("tailwindcss"),
  require("postcss-sort-media-queries")({
    sort: "mobile-first", // default value
  }),
  require("autoprefixer"),
  require("cssnano"),
];

const css = () => {
  return gulp
    .src(paths.src.css)
    .pipe(
      plumber({
        errorHandler: function (error) {
          // if error in dev mode
          notify.onError({
            title: "CSS",
            message: "Error: <%= error.message %>",
          })(error);

          // if error in production mode
          if (mode.production()) {
            console.error(`❌ Error: [CSS] ${error.message}`);
            process.exit(1);
          }
        },
      }),
    )
    .pipe(postcss(postcssPlugins))
    .pipe(concat({ path: "style.css" }))
    .pipe(size({ pretty: true, title: "CSS" }))
    .pipe(gulp.dest(paths.build.css));
};

module.exports = css;
