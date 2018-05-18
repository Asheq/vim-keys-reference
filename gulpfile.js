'use strict';

const gulp = require('gulp');
const compileElementScss =
  require('./gulp-task-helpers/compile-element-scss.js');

let elementScssFilesGlob = ['./elements/**/*.scss'];

// -----------------------------------------------------------------------------
// Compile element scss into style modules
// -----------------------------------------------------------------------------
gulp.task('compile-element-scss', function() {
  return compileElementScss(gulp.src(elementScssFilesGlob), gulp);
});
gulp.task('compile-element-scss:watch', ['compile-element-scss'], function() {
  gulp.watch(elementScssFilesGlob).on('change', function({path}) {
    compileElementScss(gulp.src(path), gulp);
  });
});

// -----------------------------------------------------------------------------
// Compile everything
// -----------------------------------------------------------------------------
gulp.task('compile-all', ['compile-element-scss']);
gulp.task('compile-all:watch', ['compile-element-scss:watch']);

// -----------------------------------------------------------------------------
// Use when in active development
// -----------------------------------------------------------------------------
gulp.task('dev', ['compile-all:watch'], function() {});
