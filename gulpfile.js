var gulp = require('gulp');
var bower = require('gulp-bower');
var del = require('del');
var zip = require('gulp-zip');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

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
    .pipe(gulpif('*.css', minifyCss({keepSpecialComments: 0})))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('build/app'));

  gulp.src('build/background.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'));

  gulp.src('build/app/bower_components/bootstrap/fonts/*')
    .pipe(gulp.dest('build/app/fonts'));
});

gulp.task('minify-html', function() {
  gulp.src('build/app/**/*.html')
    .pipe(minifyHTML({empty: true}))
    .pipe(gulp.dest('build/app'))
});

gulp.task('cleanup', function () {
  del(['build/app/bower_components',
    'build/app/css/app.css',
    'build/.bowerrc',
    'build/bower.json',
    'build/app/**/*.js',
    'build/app/services',
    '!build/app/js/all.js']);
});
