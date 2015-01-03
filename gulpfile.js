var gulp = require('gulp');
var bower = require('gulp-bower');
var del = require('del');
var zip = require('gulp-zip');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var runSequence = require('run-sequence');

gulp.task('copy', function () {
  return gulp.src(['app/**', '!app/bower_components/**',
    '.bowerrc', 'background.js', 'bower.json',
    'icon-16.png', 'icon-128.png', 'manifest.json'], {nodir: true, base: '.'})
    .pipe(gulp.dest('build'));
});

gulp.task('bower', function() {
  return bower({ cwd: 'build' });
});

gulp.task('clean', function () {
  return del(['build', 'dist']);
});

gulp.task('zip', function () {
  return gulp.src('build/**')
    .pipe(zip('pmt-client.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('assets-useref', function(){
  var assets = useref.assets();

  return gulp.src('build/app/index.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss({keepSpecialComments: 0})))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('build/app'));
});

gulp.task('assets-uglify', function(){
  return gulp.src('build/background.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('assets-fonts', function(){
  return gulp.src('build/app/bower_components/bootstrap/fonts/*')
    .pipe(gulp.dest('build/app/fonts'));
});

gulp.task('assets', ['assets-useref', 'assets-uglify', 'assets-fonts']);

gulp.task('minify-html', function() {
  return gulp.src(['build/app/**/*.html', '!build/app/bower_components/**'])
    .pipe(minifyHTML({empty: true}))
    .pipe(gulp.dest('build/app'))
});

gulp.task('cleanup', function () {
  return del(['build/app/bower_components',
    'build/app/css/app.css',
    'build/.bowerrc',
    'build/bower.json',
    'build/app/**/*.js',
    'build/app/services',
    '!build/app/js/all.js']);
});

gulp.task('build', function() {
  runSequence('clean', 'copy', 'bower', 'assets', ['minify-html', 'cleanup']);
});
