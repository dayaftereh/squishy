import * as gulp from 'gulp';
import * as shell from 'gulp-shell';
import * as zip from 'gulp-zip';
import * as path from 'path';
import { distDir, packageJsonFile, squishyDir } from './gulpfile-directories';

gulp.task('ng-build', shell.task(
    [
        'ng', 'build ', '--aot=true', '--baseHref=./', '--prod=true'
    ].join(' ')
))

gulp.task('package-app', () => {
    const source: string = path.join(squishyDir, '**/*')
    const packageJson: any = require(packageJsonFile)
    const archiveFilename: string = `${packageJson.name}-${packageJson.version}.zip`
    return gulp.src(source)
        .pipe(zip(archiveFilename))
        .pipe(gulp.dest(distDir))
})

gulp.task('build-app', gulp.series('ng-build', 'package-app'))