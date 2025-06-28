const gulp = require("gulp");
const data = require("gulp-data");
const fs = require("fs");
const htmlmin = require("gulp-htmlmin");
const mode = require("gulp-mode")();
const notify = require("gulp-notify");
const nunjucksRender = require("gulp-nunjucks-render");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const paths = require("../paths");

// other htmlminConfig settings: https://github.com/kangax/html-minifier#options-quick-reference
const htmlminConfig = {
  collapseInlineTagWhitespace: true, // Don't leave any spaces between display:inline; elements when collapsing. Must be used in conjunction with collapseWhitespace=true
  collapseWhitespace: true, // Collapse white space that contributes to text nodes in a document tree
  conservativeCollapse: true, // Always collapse to 1 space (never remove it entirely). Must be used in conjunction with collapseWhitespace=true
  decodeEntities: true, // Use direct Unicode characters whenever possible
  minifyCSS: true, // Minify CSS in style elements and style attributes (uses clean-css)
  minifyJS: true, // Minify JavaScript in script elements and event attributes (uses Terser)
  removeComments: true, // Strip HTML comments
  removeRedundantAttributes: false, // Remove attributes when value matches default.
  removeScriptTypeAttributes: true, // Remove type="text/javascript" from script tags. Other type attribute values are left intact
  removeStyleLinkTypeAttributes: true, // Remove type="text/css" from style and link tags. Other type attribute values are left intact
  sortAttributes: true, // Sort attributes by frequency
  useShortDoctype: true, // Replaces the doctype with the short (HTML5) doctype
};

function getDataForFile() {
  return JSON.parse(fs.readFileSync("./src/json/data.json"));
}

const html = () => {
  return gulp
    .src(paths.src.html)
    .pipe(
      plumber({
        errorHandler: function (error) {
          // if error in dev mode
          notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>",
          })(error);

          // if error in production mode
          if (mode.production()) {
            console.error(`❌ Error: [HTML] ${error.message}`);
            process.exit(1);
          }
        },
      }),
    )
    .pipe(data(getDataForFile))
    .pipe(
      nunjucksRender({
        path: ["src/html/"],
        envOptions: {
          autoescape: false,
        },
        watch: true,
      }),
    )
    .pipe(mode.production(htmlmin(htmlminConfig)))
    .pipe(mode.production(rename({ extname: ".php" })))
    .pipe(gulp.dest(paths.build.html));
};

module.exports = { html };
