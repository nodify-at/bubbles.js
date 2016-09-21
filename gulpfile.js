'use strict';

var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglifyjs');
var watch       = require('gulp-watch');
var serve       = require('gulp-serve');
var less        = require('gulp-less');
var open        = require('gulp-open');
var os          = require('os');
var merge       = require('merge-stream');
var minify      = require('gulp-minify-css');
var rename      = require("gulp-rename");

function library(component) {
    return './src/lib/' + component;
}

var path = {
    scripts: [
        library('jquery/dist/jquery.js'),
        library('lodash/dist/lodash.js'),
        library('bootstrap/dist/js/bootstrap.js'),
        library('angular/angular.js'),
        './src/js/app.js',
        './src/js/**/*.js'
    ],
    styles: [
        library('bootstrap/dist/css/bootstrap.css')
    ],
    less: [
        './src/styles/main.less'
    ],
    views: './src/views/**/*.html',
    images: './src/images/**/*.*',
    index: './src/index.html'
};

gulp.task('scripts', function () {
    return gulp.src(path.scripts)
        .pipe(concat('application.min.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('scripts-production', function () {
    return gulp.src(path.scripts)
        .pipe(concat('application.min.js'))
        .pipe(uglify()) //todo: enable later..
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('styles', function () {
    var lessStream = gulp.src(path.less)
        .pipe(less())
        .pipe(concat('application.less'));

    var cssStream = gulp.src(path.styles)
        .pipe(concat('application.css'));

    return merge(lessStream, cssStream)
        .pipe(concat('application.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('public/css'));
});

gulp.task('views', function () {
    return gulp.src(path.views)
        .pipe(gulp.dest('./public/views/'));
});

gulp.task('images', function () {
    return gulp.src(path.images)
        .pipe(gulp.dest('./public/images/'));
});

gulp.task('fonts', function () {
    return gulp.src(path.fonts)
        .pipe(gulp.dest('./public/fonts/'));
});

gulp.task('index', function () {
    return gulp.src(path.index)
        .pipe(gulp.dest('./public/'));
});
gulp.task('particles', function () {
    return gulp.src(path.particles)
        .pipe(gulp.dest('./public/'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(path.scripts, ['scripts']);
    gulp.watch(path.styles,  ['styles']);
    gulp.watch('./src/styles/**/*.less',    ['styles']);
    gulp.watch(path.images,  ['images']);
    gulp.watch(path.views,   ['views']);
    gulp.watch(path.index,   ['index']);
});

gulp.task('open', function () {
    var browser = os.platform() === 'linux' ? 'google-chrome' : (
        os.platform() === 'darwin' ? 'google chrome' : (
            os.platform() === 'win32' ? 'chrome' : 'firefox'));

    gulp.src(__filename)
        .pipe(open({uri: 'http://localhost:3000/'}));
});


gulp.task('config-prod', function () {
    return gulp.src('./src/config/production.js')
        .pipe(rename("config.js"))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('config-dev', function () {
    return gulp.src('./src/config/development.js')
        .pipe(rename("config.js"))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('serve', serve('public'));

gulp.task('develop', ['scripts',
    'styles',
    'fonts',
    'views',
    'images',
    'index',
    'config-dev',
    'watch',
    'serve',
    'open']);