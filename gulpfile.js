'use strict'
let gulp = require('gulp')
let uglify = require("gulp-uglify")
let rename = require('gulp-rename')
let concat = require('gulp-concat')
let babel = require('gulp-babel')

gulp.task('build', () => {
  gulp.src('./src/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    // .pipe(concat('RxWX.js'))
    .pipe(gulp.dest('./'))
})

gulp.task('default', ['build'])