const gulp = require('gulp');
const coffee = require('gulp-coffee');
const exec = require('child_process').exec;
const replace = require('gulp-replace');
const watch = require('gulp-watch');
const cached = require('gulp-cached');


const srcs = {
    coffeeToJs: [
      './coffee/*.coffee',
      './coffee/**/*',      
      './coffee/**/*.coffee',
    ],
};

gulp.task('clean', function() {
    exec('rm -rf js');
  });


gulp.task('coffee to js', function() {
  const coffeeToJs = function () {
    gulp.src(srcs.coffeeToJs)
      .pipe(cached('coffee to js'))
      .pipe(replace('.coffee', '.js'))
      .pipe(coffee({ bare: true }))
      .pipe(gulp.dest('app'));
  }

  coffeeToJs();

  return watch(srcs.coffeeToJs, function () {
    coffeeToJs();
  });
});

// TODO: check series() or parallel()
// https://gulpjs.com/docs/en/getting-started/creating-tasks
gulp.task('default', gulp.series('coffee to js'));