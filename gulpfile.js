var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('process-scripts', function () {
  return gulp.src(['./app/assets/javascript/backbone_marionette/initialize/*.js', './app/assets/javascript/backbone_marionette/models/*.js', './app/assets/javascript/backbone_marionette/collections/*.js', './app/assets/javascript/backbone_marionette/views/*.js'])
  .pipe(concat('main.js'))

  .pipe(gulp.dest('./public/js'))
  // .pipe(rename({suffix: '.min'}))
  // .pipe(uglify())
  // .pipe(gulp.dest('./public/js'))
})

gulp.task('watch', function () {
  gulp.watch(['./app/assets/javascript/backbone_marionette/initialize/*.js', './app/assets/javascript/backbone_marionette/models/*.js', './app/assets/javascript/backbone_marionette/collections/*.js', './app/assets/javascript/backbone_marionette/views/*.js'], ['process-scripts'])
})

gulp.task('default', function () {
  console.log('i have configured gulp file');
});