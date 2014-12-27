var gulp = require('gulp');
var bower = require('gulp-bower');
var del = require('del');
var zip = require('gulp-zip');

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
