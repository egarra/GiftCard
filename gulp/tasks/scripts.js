const gulp = require("gulp");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const size = require("gulp-size");
const webpackStream = require("webpack-stream");
const paths = require("../paths");

const scripts = () => {
  return gulp
    .src(paths.src.js)
    .pipe(
      plumber({
        errorHandler: function (error) {
          // if error in dev mode
          notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>",
          })(error);

          // if error in production mode
          if (mode.production()) {
            console.error(`❌ Error: [JS] ${error.message}`);
            process.exit(1);
          }
        },
      }),
    )
    .pipe(
      webpackStream({
        mode: "production",
        output: {
          filename: "app.min.js",
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          ],
        },
      }),
    )
    .pipe(size({ pretty: true, title: "JS" }))
    .pipe(gulp.dest(paths.build.js));
};

module.exports = scripts;
