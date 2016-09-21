'use strict';

var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglifyjs');
var minify      = require('gulp-minify-css');

var path = {
    scripts: [
        './src/bubble-tree.js',
        './src/bubble-factory.js'
    ],
    styles: [
        './src/**/*.css'
    ]
};

gulp.task('scripts', function () {
    return gulp.src(path.scripts)
               .pipe(concat('application.min.js'))
               .pipe(uglify())
               .pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts-clean', function () {
    return gulp.src(path.scripts)
               .pipe(concat('application.js'))
               .pipe(gulp.dest('./dist/js'));
});

gulp.task('styles', function () {
    return gulp.src(path.styles)
               .pipe(concat('application.css'))
               .pipe(minify())
               .pipe(gulp.dest('dist/css'));
});

gulp.task('dist', ['scripts', 'scripts-clean', 'styles']);