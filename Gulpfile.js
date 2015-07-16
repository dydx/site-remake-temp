var gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    uncss       = require('gulp-uncss'),
    minify      = require('gulp-minify-css'),
    rename      = require('gulp-rename');

gulp.task('sass-minification', function() {
    return sass('assets/sass', { style: 'expanded' })
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(rename('main.un.css'))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('assets/sass/*.scss', ['sass-minification']);
});

gulp.task('default', [
    'sass-minification',
]);
