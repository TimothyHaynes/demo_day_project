'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
          baseDir: "./"
        }
    });

    gulp.watch("assets/build/*.css").on('change', browserSync.reload);
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
});
});

// gulp.task('connect', function() {
//   connect.server();
// });

gulp.task('sass', function () {
  return gulp.src('./assets/css/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css/'));
});

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./assets/js/**/*.js','./js/**/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./assets/build/'));
});

// JSHint checks code for errors
gulp.task('lint', function() {
  return gulp.src('./assets/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./assets/css/**/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./assets/build/'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['start','lint','sass', 'scripts', 'styles'], function() {

});
gulp.watch('./assets/css/**/*.css', ['styles']);
gulp.watch('./assets/css/scss/**/*.scss', ['sass']);

gulp.watch('./assets/js/**/*.js', ['lint', 'scripts']);
