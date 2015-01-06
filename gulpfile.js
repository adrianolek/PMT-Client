var gulp = require('gulp');
var g = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('copy', function () {
  return gulp.src(['app/**', '!app/bower_components/**',
    '.bowerrc', 'background.js', 'bower.json',
    'icon-16.png', 'icon-128.png', 'manifest.json'], {nodir: true, base: '.'})
    .pipe(gulp.dest('build'));
});

gulp.task('bower', function() {
  return g.bower({ cwd: 'build' });
});

gulp.task('clean', function (cb) {
  return del(['build', 'dist'], cb);
});

gulp.task('assets-useref', function(){
  var assets = g.useref.assets();

  return gulp.src('build/app/index.html')
    .pipe(assets)
    .pipe(g.if('*.js', g.uglify()))
    .pipe(g.if('*.css', g.minifyCss({keepSpecialComments: 0})))
    .pipe(assets.restore())
    .pipe(g.useref())
    .pipe(gulp.dest('build/app'));
});

gulp.task('assets-uglify', function(){
  return gulp.src('build/background.js')
    .pipe(g.uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('assets-fonts', function(){
  return gulp.src('build/app/bower_components/bootstrap/fonts/*')
    .pipe(gulp.dest('build/app/fonts'));
});

gulp.task('assets', ['assets-useref', 'assets-uglify', 'assets-fonts']);

gulp.task('minify-html', function() {
  return gulp.src(['build/app/**/*.html', '!build/app/bower_components/**'])
    .pipe(g.minifyHtml({empty: true}))
    .pipe(gulp.dest('build/app'))
});

gulp.task('cleanup', function (cb) {
  return del(['build/app/bower_components',
    'build/app/css/app.css',
    'build/.bowerrc',
    'build/bower.json',
    'build/app/**/*.js',
    'build/app/services',
    '!build/app/js/all.js'], cb);
});

gulp.task('build', function(cb) {
  runSequence('clean', 'copy', 'bower', 'assets', ['minify-html', 'cleanup'], cb);
});

gulp.task('dist', ['build'], function () {
  return gulp.src('build/**')
    .pipe(g.zip('pmt-client.zip'))
    .pipe(gulp.dest('dist'));
});
