'use strict';

const gulp = require('gulp');
const compileStandardScss = require('./gulp-task-helpers/compile-standard-scss.js');
const compileElementScss = require('./gulp-task-helpers/compile-element-scss.js');

let elementScssFilesGlob = ['./elements/**/*.scss'];
let standardScssFilesGlob = ['./index.scss'];

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
// Compile standard (non-element) scss into css
// -----------------------------------------------------------------------------
gulp.task('compile-standard-scss', function() {
  return compileStandardScss(gulp.src(standardScssFilesGlob), gulp);
});
gulp.task('compile-standard-scss:watch', ['compile-standard-scss'], function() {
  gulp.watch(standardScssFilesGlob).on('change', function({ path }) {
    compileStandardScss(gulp.src(path), gulp);
  });
});

// -----------------------------------------------------------------------------
// Compile everything
// -----------------------------------------------------------------------------
gulp.task('compile-all', ['compile-element-scss', 'compile-standard-scss']);
gulp.task('compile-all:watch', ['compile-element-scss:watch', 'compile-standard-scss:watch']);

// -----------------------------------------------------------------------------
// Use when in active development
// -----------------------------------------------------------------------------
gulp.task('dev', ['compile-all:watch'], function() {});
