const gulp = require("gulp");
const newer = require("gulp-newer");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sharp = require("sharp");
const size = require("gulp-size");
const svgmin = require("gulp-svgmin");
const through2 = require("through2");
const paths = require("../paths");

const createWebp = () => {
  return gulp
    .src([`${paths.src.images}.{jpg,png}`])
    .pipe(
      plumber({
        errorHandler: function (error) {
          // if error in dev mode
          notify.onError({
            title: "IMAGES WEBP",
            message: "Error: <%= error.message %>",
          })(error);

          // if error in production mode
          if (mode.production()) {
            console.error(`❌ Error: [IMAGES WEBP] ${error.message}`);
            process.exit(1);
          }
        },
      }),
    )
    .pipe(newer(paths.build.images))
    .pipe(
      through2.obj(function (file, _, cb) {
        if (file.isBuffer() && /\.(jpe?g|png)$/i.test(file.path)) {
          sharp(file.contents)
            .webp({ quality: 100 })
            .toBuffer()
            .then((data) => {
              file.contents = data;
              cb(null, file);
            })
            .catch((err) => cb(err));
        } else {
          cb(null, file);
        }
      }),
    )
    .pipe(rename({ extname: ".webp" }))
    .pipe(size({ pretty: true, title: "WEBP", showFiles: true }))
    .pipe(gulp.dest(paths.build.images));
};

const createSvg = () => {
  return gulp
    .src([`${paths.src.images}.svg`])
    .pipe(
      plumber({
        errorHandler: function (error) {
          // if error in dev mode
          notify.onError({
            title: "IMAGES SVG",
            message: "Error: <%= error.message %>",
          })(error);

          // if error in production mode
          if (mode.production()) {
            console.error(`❌ Error: [IMAGES SVG] ${error.message}`);
            process.exit(1);
          }
        },
      }),
    )
    .pipe(newer(paths.build.images))
    .pipe(svgmin()) // Минимизируем SVG файлы
    .pipe(size({ pretty: true, title: "SVG", showFiles: true }))
    .pipe(gulp.dest(paths.build.images));
};

const createGif = () => {
  return gulp
    .src([`${paths.src.images}.gif`])
    .pipe(
      plumber({
        errorHandler: function (error) {
          // if error in dev mode
          notify.onError({
            title: "IMAGES GIF",
            message: "Error: <%= error.message %>",
          })(error);

          // if error in production mode
          if (mode.production()) {
            console.error(`❌ Error: [IMAGES GIF] ${error.message}`);
            process.exit(1);
          }
        },
      }),
    )
    .pipe(newer(paths.build.images))
    .pipe(size({ pretty: true, title: "GIF", showFiles: true }))
    .pipe(gulp.dest(paths.build.images));
};

const images = gulp.parallel(createWebp, createSvg, createGif);

module.exports = {
  images,
};
