const gulp = require('gulp');

const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('css', function (done) {
    console.log("minifyin css...");
    gulp.src('./assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest("./assets/css"));

    gulp.src('./assets/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merger: true
        }))
        .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('js', function (done) {
    console.log('minify js....');
    gulp.src('./assets/**/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest("./public/assets"))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest("./public/assets"));
    done();
});

gulp.task('images', function (done) {
    console.log('compresss images');
    gulp.src('./assets/**/*.+(png|gif|jpg|svg|jpeg)')
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest("./public/assets"))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest("./public/assets"));
    done();

})

gulp.task("clean:assets", function (done) {
    del.sync('./public/assets');
    done();
});

gulp.task("build", gulp.series('clean:assets','css','js','images'), function (done) {
    console.log("build...");
    done();
});