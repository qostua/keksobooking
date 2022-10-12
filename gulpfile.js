const {src, dest, series} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;

const htmlBuild = () => {
  return src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('build'));
};
const stylesBuild = () => {
  return src('css/*.css')
    .pipe(cleanCss({ level: 2 }))
    .pipe(dest('build/css/'));
};

const fontsBuild = () => {
  return src('fonts/**/*')
    .pipe(dest('build/fonts'));
};

const imgBuild = () => {
  return src('img/**/*.png')
    .pipe(dest('build/img'));
};

const svgBuild = () => {
  return src('./img/*.svg')
    .pipe(imagemin([
      imagemin.svgo(),
    ]))
    .pipe(dest('build/img'));
};
const scriptsBuild = () => {
  return src('js/*.js')
    .pipe(uglify())
    .pipe(dest('build/js/'));
};
const leafletBuild = () => {
  src('leaflet/*.js')
    .pipe(dest('build/leaflet'));
  src('leaflet/images/**/*')
    .pipe(dest('build/leaflet/images'));
  return src('leaflet/*.css')
    .pipe(cleanCss({ level: 2 }))
    .pipe(dest('build/leaflet'));
};

exports.build = series(htmlBuild, stylesBuild, fontsBuild, imgBuild, svgBuild, scriptsBuild, leafletBuild);
