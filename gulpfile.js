var gulp = require('gulp'),
    $ = require('gulp-load-plugins', {
        lazy: true
    }),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    header = require('gulp-header'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    pkg = require('./package.json'),
    imagemin = require('gulp-imagemin'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer');


// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
    return gulp.src('dist/css/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('source/script/*.js')
        .pipe(plumber())
        //.pipe(uglify())
        //.pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/script'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
    return gulp.src('source/scss/main.scss')
        .pipe(plumber())
        .pipe(sass.sync())
        .pipe(autoprefixer({
            browsers: ["last 5 versions", "IE 9"]
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


//Images
gulp.task('images', function() {
    gulp.src('source/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

//Jade
gulp.task('jade', function() {
    return gulp.src('source/jade/**/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'));

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'));

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
});

// Run everything
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy', 'jade', 'images']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
});

 //Dev task with browserSync
gulp.task('dev', ['jade', 'sass','browserSync', 'minify-css', 'minify-js'], function() {
    gulp.watch('source/jade/*.jade', ['jade']);
    gulp.watch('source/scss/*.scss', ['sass']);
    //gulp.watch('source/img/*', ['images']);
    gulp.watch('dist/css/*.css', ['minify-css']);
    //gulp.watch('script/*.js', ['minify-js']);
    gulp.watch('source/script/*.js', ['minify-js']);
    gulp.watch('dist/script/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('dist/*.html', browserSync.reload);
    //gulp.watch('dist/script/**/*.js', browserSync.reload);
    gulp.watch('source/script/**/*.js', browserSync.reload);
});

