var gulp        = require('gulp'),
    browserify  = require('browserify'),
    sass        = require('gulp-ruby-sass'),
    webp        = require('gulp-webp'),
    uglify      = require('gulp-uglify'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer');

gulp.task('sass-minification', function() {
    // API for gulp-ruby-sass is different than gulp-sass :(
    return sass('assets/sass', {style: 'compressed' })
        .pipe(gulp.dest('assets/css'));
});

gulp.task('scripts-minification', function() {
    var b = browserify({
        entries: 'assets/js/main.js',
        debug: true
    });

    b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function() {
    gulp.watch('assets/sass/*.scss', ['sass-minification']);
    gulp.watch('assets/js/*.js', ['scripts-minification']);
    gulp.watch('assets/images', ['images-optimization']);
});

gulp.task('default', [
    'sass-minification',
    'scripts-minification'
]);
