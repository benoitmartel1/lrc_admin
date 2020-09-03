var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("search/js/*.js").pipe(babel()).pipe(gulp.dest("search/js-es5/"));
});
