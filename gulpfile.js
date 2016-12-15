const gulp = require('gulp'),
  runSequence = require('run-sequence'),
  notifier = require('node-notifier'),
  plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug');

const errorHandler = (error) => {
  notifier.notify({
    title: 'Gulp error',
    message: error.message
  });
  console.error(error.message); // eslint-disable-line
  this.emit('end');
};

const publicPath = 'app/public';

// ------------------
// main tasks
// ------------------
gulp.task('serve', () => {
  return runSequence('pug', 'scripts', 'sass', 'watch');
});

// ------------------
// pugs tasks
// ------------------
const pugsConfig = {
  src: './app/views/*.pug',
  dest: './app/dist/'
};
gulp.task('pug', () => {
  return gulp.src(pugsConfig.src)
    .pipe(plumber({ errorHandler }))
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(pugsConfig.dest));
});

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
  pugWatchedFiles: './app/views/*.pug',
  scssWatchedFiles: `${publicPath}/**/*.scss`
};
gulp.task('watch:js', () => {
  gulp.watch(watchConfig.jsWatchedFiles, () => {
    runSequence('scripts');
  });
});
gulp.task('watch:pug', () => {
  gulp.watch(watchConfig.pugWatchedFiles, () => {
    runSequence('pug');
  });
});
gulp.task('watch:scss', () => {
  gulp.watch(watchConfig.scssWatchedFiles, ['sass']);
});
gulp.task('watch', ['watch:js', 'watch:scss', 'watch:pug']);
