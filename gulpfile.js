// Dependencies
var gulp 		  	  = require('gulp'),
  	stylus 		  	= require('gulp-stylus'),
  	concat 		  	= require('gulp-concat'),
  	sourcemaps		= require('gulp-sourcemaps'),
  	uglify 		  	= require('gulp-uglify'),
  	ngAnnotate 		= require('gulp-ng-annotate'),
  	jshint  	  	= require('gulp-jshint');

// Check Javascript Errors
gulp.task('jsHint', function() {
	gulp.src('app/application.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
});

// Javascript Compiling
gulp.task('js', function () {
   return gulp.src(['app/modules/module.js', 'app/modules/**/*.js'])
   .pipe(sourcemaps.init())
   .pipe(concat('application.js'))
   .pipe(ngAnnotate())
   .pipe(uglify())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('app'))
})

// Watcher for Angular
gulp.task('watch:js', ['js'], function () {
  gulp.watch('app/modules/**/*.js', ['js'])
});

// Stylus Compiling
gulp.task('stylus', function () {
	return gulp.src(['app/assets/css/general.styl','app/modules/**/stylus/*.styl'])
   .pipe(sourcemaps.init())
   .pipe(concat('style.styl'))
   .pipe(sourcemaps.write())
  	.pipe(stylus({
     	compress: false
   }))
   .pipe(gulp.dest('app/assets/css'));
})

// Watcher for Stylus
gulp.task('watch:stylus', ['stylus'], function () {
  gulp.watch('app/modules/**/stylus/*.styl', ['stylus'])
})