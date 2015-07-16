var gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    uncss       = require('gulp-uncss'),
    minify      = require('gulp-minify-css'),
    rename      = require('gulp-rename'),
    webp        = require('gulp-webp');

// pipe sass through precompiler and then
// reference against index.html to remove
// unused styles. HUGE SAVINGS!
gulp.task('sass-minification', function() {
    return sass('assets/sass', { style: 'expanded' })
        .pipe(rename('main.css'))
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(minify({ processImport: false }))
        .pipe(gulp.dest('assets/css'));
});

// reference font-awesome against index.html
// to remove unused styles. HUGE SAVINGS!
gulp.task('font-awesome-optimization', function() {
    return gulp.src('assets/css/font-awesome.min.css')
        .pipe(rename('fa-un.css'))
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(minify({ processImport: false }))
        .pipe(gulp.dest('assets/css'));
});

// re-encode images to WebP format, 25% savings
// on file size. HUGE SAVINGS!
gulp.task('image-optimization', function() {
    return gulp.src('images/full/*')
    .pipe(webp())
    .pipe(gulp.dest('images/min'));
});


gulp.task('watch', function() {
    gulp.watch('assets/sass/*.scss', ['sass-minification']);
});

gulp.task('default', [
    'sass-minification',
    'font-awesome-optimization',
    'image-optimization'
]);
