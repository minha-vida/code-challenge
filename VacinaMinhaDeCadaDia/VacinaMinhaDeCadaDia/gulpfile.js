var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var uglify = require('gulp-uglify');



gulp.task('scripts', function () {
    return gulp.src('wwwroot/js/**/*.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist/js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/min'))
});

gulp.task('default', function () {
    gulp.watch("wwwroot/js/**/*.js", ['scripts']);
});
