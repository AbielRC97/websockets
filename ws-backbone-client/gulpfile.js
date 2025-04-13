const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');

const paths = {
  html: 'src/index.html',
  css: 'src/css/**/*.css',
  js: [
    'src/libs/jquery-min.js',
    'src/libs/underscore-min.js',
    'src/libs/backbone-min.js',
    'src/libs/modernizr-2.6.2.min.js',
    'src/app/models/**/*.js',
    'src/app/collections/**/*.js',
    'src/app/views/**/*.js',
    'src/app/routers/*.js',
    'src/app/main.js'
  ]
};

// Nueva tarea: compilar templates Handlebars
gulp.task('templates', () =>
  gulp
    .src('src/app/templates/**/*.hbs')
    .pipe(handlebars()) // Compila HBS
    .pipe(wrap('Handlebars.template(<%= contents %>)')) // Envuelve en función
    .pipe(
      declare({
        namespace: 'Curso.Templates',
        noRedeclare: true, // Evita volver a declarar el namespace
      })
    )
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js')) // Exporta a dist/js/templates.js
    .pipe(browserSync.stream())
);

// Limpia dist
gulp.task('clean', () => del(['dist']));

// Copia HTML
gulp.task('html', () =>
  gulp.src(paths.html).pipe(gulp.dest('dist')).pipe(browserSync.stream())
);

// Copia CSS
gulp.task('css', () =>
  gulp.src(paths.css).pipe(gulp.dest('dist/css')).pipe(browserSync.stream())
);

// Copia JS
gulp.task('scripts', () =>
  gulp
    .src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
);

// Copia libs
gulp.task('libs', () =>
  gulp.src('src/libs/**/*').pipe(gulp.dest('dist/libs'))
);

// Servidor con browser-sync
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    port: 3000,
    open: true,
  });

  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/css/**/*.css', gulp.series('css'));
  gulp.watch('src/app/**/*.js', gulp.series('scripts'));
  gulp.watch('src/app/templates/**/*.hbs', gulp.series('templates'));
});

// Tarea por defecto
gulp.task(
  'default',
  gulp.series(
    'clean',
    gulp.parallel('html', 'css', 'libs', 'scripts', 'templates'), // <- agregado
    'serve'
  )
);