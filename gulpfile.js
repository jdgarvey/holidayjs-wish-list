var gulp = require('gulp');
var compass = require('gulp-compass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename')
    path = require('path');

gulp.task('compass', function () {
    return gulp.src('src/scss/app.scss')
        .pipe(compass({
            project: __dirname,
            css: './client/css',
            sass: './src/scss'
        }))
        .on('error', function (err) {
            console.log(err.message);
        })
        .pipe(gulp.dest('client/css/'));
});

gulp.task('concat', function () {
    return gulp.src('src/**/*.js')
        .pipe(concat('wish.js'))
        .pipe(gulp.dest('client/js/'))
        .pipe(rename('wish.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('client/js/'));
});
