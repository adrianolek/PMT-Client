var gulp = require('gulp');
var bower = require('gulp-bower');
var del = require('del');
var zip = require('gulp-zip');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

gulp.task('copy', function () {
  gulp.src(['**', '!bower_components/**'], {cwd: 'app', nodir: true})
    .pipe(gulp.dest('build/app'));

  gulp.src(['.bowerrc', 'background.js', 'bower.json', 'icon-16.png', 'icon-128.png', 'manifest.json'])
    .pipe(gulp.dest('build'));
});

gulp.task('bower', function() {
  return bower({ cwd: 'build' });
});

gulp.task('clean', function () {
  del(['build', 'dist']);
});

gulp.task('zip', function () {
  return gulp.src('build/**')
    .pipe(zip('pmt-client.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {
  var assets = useref.assets();

  gulp.src('build/app/index.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('build/app'));
});