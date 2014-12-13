var gulp = require('gulp');
var compass = require('gulp-compass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename')
ngAnnotate = require('gulp-ng-annotate'),
templateCache = require('gulp-angular-templatecache');

gulp.task('default', ['concat', 'compass', 'templates']);

gulp.task('compass', function () {
    return gulp.src('src/scss/*.scss')
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
        .pipe(ngAnnotate({
            add: true,
            single_quotes: true
        }))
        .pipe(concat('wish.js'))
        .pipe(gulp.dest('client/js/'))
        .pipe(rename('wish.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('client/js/'));
});

gulp.task('templates', function () {
    return gulp.src('src/**/*.html')
        .pipe(templateCache('wish.templates.js', {
            module: 'wish.templates',
            standalone: true
        }))
        .pipe(gulp.dest('client/js/'))
});
