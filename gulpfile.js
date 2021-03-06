'use strict';

var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglifyjs');
var minify      = require('gulp-minify-css');

var path = {
    scripts: [
        './src/bubble-tree.js',
        './src/bubble-factory.js',
        './src/lib/jquery.browser.min.js',
        './src/lib/jquery.tooltip.min.js',
        './src/lib/jquery.history.js',
        './src/lib/raphael.js',
        './src/lib/Tween.js',
        './src/lib/vis4.js',
        './src/lib/bubbletree.js'
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