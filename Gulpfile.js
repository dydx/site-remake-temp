var gulp        = require('gulp'),
    browserify  = require('browserify'),
    sass        = require('gulp-ruby-sass'),
    webp        = require('gulp-webp'),
    uglify      = require('gulp-uglify'),
    transform   = require('vinyl-transform');

gulp.task('sass-minification', function() {
    // API for gulp-ruby-sass is different than gulp-sass :(
    return sass('assets/sass', {style: 'compressed' })
        .pipe(gulp.dest('assets/css'));
});

gulp.task('scripts-minification', function() {

    // handle streaming and buffering in one pass
    var browserified = transform(function(filename) {
        return browserify(filename)
            .bundle();
    });

    return gulp.src('/assets/js')
        .pipe(browserified)
        .pipe(uglify)
        .pipe(gulp.dest('/assets/js/bundle.js'));
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
