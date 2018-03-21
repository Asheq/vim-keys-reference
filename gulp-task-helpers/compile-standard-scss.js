'use strict';

const sass = require('gulp-sass');
const importOnce = require('node-sass-import-once');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');

const getName = function(file) {
  return path.basename(file.path, path.extname(file.path));
};

module.exports = function(src, gulp) {
  src.pipe(sass({
      includePaths: './public/bower_components/',
      importer: importOnce,
      importOnce: {
        index: true,
        bower: true
      }
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(function(file) {
      console.log('Finished compiling scss file: ' + getName(file));
      return file.base;
    }));

}
