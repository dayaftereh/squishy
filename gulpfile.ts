import * as gulp from 'gulp';
import * as rimraf from 'rimraf';
import './tools/gulpfile-app-build';
import { distDir } from "./tools/gulpfile-directories";
import './tools/gulpfile-gen-script-types';
import './tools/gulpfile-typedoc';

gulp.task('clean-dist', (cb) => {
    rimraf(distDir, cb)
})

gulp.task('build-parallel', gulp.parallel(
    'build-app',
    'build-typedoc',
    'build-script-types'
))

gulp.task('build', gulp.series(
    'clean-dist',
    'build-parallel'
))