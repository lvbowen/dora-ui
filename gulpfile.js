const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserList = ['last 2 versions', 'Android >= 4.0', 'Firefox ESR', 'not ie < 9'];
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const through2 = require('through2');
const { getBabelConfig, style2css } = require('./utils');
const name = 'dora-ui';

const getFilesPath = str => path.resolve(__dirname, str);

const paths = {
  dest: {
    lib: getFilesPath('./lib'),
    es: getFilesPath('./es')
  },
  styles: getFilesPath('./components/**/*.less'),
  scripts: [getFilesPath('./components/**/*.ts'), getFilesPath('./components/**/*.tsx')]
};

function copyLess() {
  return gulp
    .src(paths.styles)
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.es));
}

function less2Css() {
  return gulp
    .src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(
      less({
        outputStyle: 'compressed'
      })
    )
    .pipe(autoprefixer({ browsers: browserList }))
    .pipe(cssnano({ zindex: false, reduceIdents: false }))
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.es));
}

function fullStyles() {
  /* 避免重复打包css 公共styles只打包index.less（其他已被引入无需重复打包） */
  const styleSrc = [
    'components/**/*.less',
    '!components/style/animate.less',
    '!components/style/normalize.less'
  ];
  const dest = 'dist';
  return gulp
    .src(styleSrc)
    .pipe(sourcemaps.init())
    .pipe(
      less({
        outputStyle: 'compressed'
      })
    )
    .pipe(autoprefixer({ browsers: browserList }))
    .pipe(concat(`${name}.css`))
    .pipe(gulp.dest(dest))
    .pipe(sourcemaps.write())
    .pipe(rename(`${name}.css.map`))
    .pipe(gulp.dest(dest))
    .pipe(cssnano({ zindex: false, reduceIdents: false }))
    .pipe(concat(`${name}.min.css`))
    .pipe(gulp.dest(dest))
    .pipe(sourcemaps.write())
    .pipe(rename(`${name}.min.css.map`))
    .pipe(gulp.dest(dest));
}

/**
 * 转译typescript 生成不同类型module(commonjs esmodule)
 * 同时根据component/style/index.js 生成component/style/css.js 以便css按需加载
 */
function compile(modules) {
  const babelConfig = getBabelConfig(modules);
  const { dest, scripts } = paths;
  return gulp
    .src(scripts)
    .pipe(babel(babelConfig))
    .pipe(
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone());
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(style2css(content));
          file.path = file.path.replace(/index\.js/, 'css.js');
          this.push(file);
          next();
        } else {
          next();
        }
      })
    )
    .pipe(gulp.dest(modules === false ? dest.es : dest.lib));
}

function compileLib() {
  return compile();
}

function compileEs() {
  return compile(false);
}

const build = gulp.parallel(copyLess, less2Css, fullStyles, compileLib, compileEs);

exports.build = build;

exports.default = build;
