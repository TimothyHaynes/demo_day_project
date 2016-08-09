'use strict';
var gulp = require('gulp');
var Sass = require('gulp-sass');
gulp.task('Sass', function() {
    return gulp.src('./styles/**/*.scss')
        .pipe(Sass().on('error', Sass.logError))
        .pipe(gulp.dest('./css'));
});
gulp.task('Sass:watch', function() {
    gulp.watch('./styles/**/*.scss', ['Sass']);
});
