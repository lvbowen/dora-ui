/**
 * @name gulpfile.js
 * @description 打包项目css依赖
 * 参考
 * https://github.com/JeromeLin/dragon-ui/blob/dev/scripts/gulp/gulpfile.js
 */

const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const size = require('gulp-filesize');
const sourcemaps = require('gulp-sourcemaps');
const browserList = ['last 2 versions', 'Android >= 4.0', 'Firefox ESR', 'not ie < 9'];

const DIR = {
  less: path.resolve(__dirname, './components/**/*.less'),
  buildSrc: [
    path.resolve(__dirname, './components/**/style.less'),
    path.resolve(__dirname, './components/**/index.less')
  ],
  lib: path.resolve(__dirname, './dist/lib'),
  es: path.resolve(__dirname, './dist/esm')
};

gulp.task('copyLess', () => {
  return gulp
    .src(DIR.less)
    .pipe(gulp.dest(DIR.lib))
    .pipe(gulp.dest(DIR.es));
});

gulp.task('copyCss', () => {
  return gulp
    .src(DIR.buildSrc)
    .pipe(sourcemaps.init())
    .pipe(
      less({
        outputStyle: 'compressed'
      })
    )
    .pipe(autoprefixer({ browsers: browserList }))
    .pipe(size())
    .pipe(cssnano())
    .pipe(gulp.dest(DIR.lib))
    .pipe(gulp.dest(DIR.es));
});

gulp.task('default', ['copyLess', 'copyCss']);
