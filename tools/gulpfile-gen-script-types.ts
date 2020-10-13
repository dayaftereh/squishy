
import * as gulp from 'gulp';
import * as shell from 'gulp-shell';
import * as rimraf from 'rimraf';
import { scriptDir, scriptTSConfig, toolsTSConfig } from './gulpfile-directories';

gulp.task('clean-script', (cb) => {
    rimraf(scriptDir, cb)
})

gulp.task('ts-script-types', shell.task(`tsc --project ${scriptTSConfig}`))
gulp.task('gen-script-types', shell.task(`ts-node --project ${toolsTSConfig} ./tools/generate-script-types.ts`))

gulp.task('build-script-types', gulp.series('clean-script', 'ts-script-types', 'gen-script-types'))