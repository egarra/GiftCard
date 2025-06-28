"use strict";

const { series, parallel, watch } = require("gulp");
const requireDir = require("require-dir");
const browserSync = require("browser-sync").create();
const tasks = requireDir("./gulp/tasks", { recurse: true });
const paths = require("./gulp/paths");

const serve = () => {
  return browserSync.init({
    server: "build/",
    startPath: "/index.html",
    notify: false,
    open: true,
    cors: true,
    ui: false,
    logPrefix: "DevServer",
    host: "localhost",
    port: process.env.PORT || 1234,
  });
};

const watcher = (done) => {
  watch(paths.watch.data).on(
    "change",
    series(tasks.html.html, tasks.css, browserSync.reload),
  );
  watch(paths.watch.html).on(
    "change",
    series(tasks.html.html, tasks.css, browserSync.reload),
  );
  watch([paths.watch.tailwindcss, paths.watch.css]).on(
    "change",
    series(tasks.css, browserSync.reload),
  );
  watch(paths.watch.js).on("change", series(tasks.scripts, browserSync.reload));
  watch(paths.watch.images, tasks.images.images);
  watch(paths.watch.fonts, tasks.fonts);

  done();
};

exports.start = series(
  tasks.clean,
  parallel(
    tasks.html.html,
    tasks.css,
    tasks.scripts,
    tasks.images.images,
    // tasks.fonts,
  ),
  watcher,
  serve,
);

exports.build = series(
  tasks.clean,
  parallel(
    tasks.html.html,
    tasks.css,
    tasks.scripts,
    tasks.images.images,
    // tasks.fonts,
  ),
);
