const gulp = require('gulp'),
  runSequence = require('run-sequence'),
  notifier = require('node-notifier'),
  plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass');

const errorHandler = (error) => {
  notifier.notify({
    title: 'Gulp error',
    message: error.message
  });
  console.error(error.message);
  this.emit('end');
};

const publicPath = 'app/public';

// ------------------
// scripts tasks
// ------------------

const scriptsConfig = {
  src () {
    return [
      `${publicPath}/javascripts/app.module.js`,
      `${publicPath}/javascripts/**/*.js`
    ];
  },
  dest () {
    return './app/dist/';
  },
  buildFileName: 'all.js'
};
const vendorsConfig = {
  src () {
    return [
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-local-storage/dist/angular-local-storage.js',
      'node_modules/angular-translate/dist/angular-translate.js'
    ];
  },
  dest () {
    return './app/dist/';
  },
  buildFileName: 'vendors.js'
};

gulp.task('scripts', () => {
  gulp.src(vendorsConfig.src())
    .pipe(plumber({ errorHandler }))
    .pipe(concat(vendorsConfig.buildFileName))
    .pipe(gulp.dest(vendorsConfig.dest()));

  return gulp.src(scriptsConfig.src())
    .pipe(plumber({ errorHandler }))
    .pipe(concat(scriptsConfig.buildFileName))
    .pipe(gulp.dest(scriptsConfig.dest()));
});

// ------------------
// sass tasks
// ------------------

const sassConfig = {
  src () {
    return [
      `${publicPath}/scss/**/*.scss`
    ];
  },
  dest () {
    return './app/dist/';
  },
  buildFileName: 'all.css'
};

gulp.task('sass', () => {
  return gulp.src(sassConfig.src())
    .pipe(plumber({ errorHandler }))
    .pipe(concat(sassConfig.buildFileName))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(sassConfig.dest()));
});

// ------------------
// watching tasks
// ------------------

const watchConfig = {
  jsWatchedFiles: `${publicPath}/**/*.js`,
  scssWatchedFiles: `${publicPath}/**/*.scss`
};

gulp.task('watch:js', () => {
  gulp.watch(watchConfig.jsWatchedFiles, () => {
    runSequence('scripts');
  });
});

gulp.task('watch:scss', () => {
  gulp.watch(watchConfig.scssWatchedFiles, ['sass']);
});

gulp.task('watch', ['watch:js', 'watch:scss']);
