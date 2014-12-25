var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('copy', function () {
  gulp.src(['**', '!bower_components/**'], {cwd: 'app', nodir: true})
    .pipe(gulp.dest('build/app'));

  gulp.src(['.bowerrc', 'background.js', 'bower.json', 'icon-16.png', 'icon-128.png', 'manifest.json'])
    .pipe(gulp.dest('build'));
});

gulp.task('bower', function() {
  return bower({ cwd: 'build' });
});
