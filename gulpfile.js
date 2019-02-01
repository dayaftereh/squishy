const gulp = require('gulp');
const path = require('path');
const zip = require('gulp-zip');

const packageJson = require('./package')

function getVersion() {
    if (!packageJson || !packageJson.hasOwnProperty('version')) {
        return undefined
    }

    return packageJson.version
}

function getName() {
    if (!packageJson || !packageJson.hasOwnProperty('name')) {
        throw new Error('unable to get name from package.json')
    }

    return packageJson.name
}

gulp.task('distZip', function () {
    const name = getName()
    const version = getVersion()

    let archiveName = `${name}.zip`
    if (version) {
        archiveName = `${name}-${version}.zip`
    }

    const srcPath = path.join('dist', name, '**', '*')

    return gulp.src(srcPath, { base: 'dist' })
        .pipe(zip(archiveName))
        .pipe(gulp.dest('dist'))
});