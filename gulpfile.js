var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("search/js/*.js").pipe(babel()).pipe(gulp.dest("search/js-es5/"));
});

gulp.task("css", () => {
  const postcss = require("gulp-postcss");
  const sourcemaps = require("gulp-sourcemaps");

  return gulp
    .src("search/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(
      postcss([
        require("precss"),
        require("autoprefixer")({
          overrideBrowserslist: ["last 2 versions", "ie 6-11", "Firefox > 20"],
        }),
      ])
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("search/css-es5/"));
});