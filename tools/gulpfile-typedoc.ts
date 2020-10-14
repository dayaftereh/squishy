
import * as gulp from 'gulp';
import * as clean from 'gulp-clean';
import * as shell from 'gulp-shell';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { documentationScriptDir, scriptTSConfig, typedocDir } from './gulpfile-directories';

const tsConfig: any = require(scriptTSConfig)

const typedocNames: { [key: string]: string } = {
    'mathf.ts': 'Mathf',
    'plugins-types.ts': 'Plugins',
    'squishy-types.ts': 'Squishy'
}

gulp.task(`clean-typedoc`, (cb) => {
    rimraf(typedocDir, cb)
})

const registerTypeDocTasks = (file: string) => {
    const filename: string = path.basename(file)
    const lowerFilename = filename.toLowerCase()
    const name: string = typedocNames[lowerFilename]
    if (!name) {
        throw new Error(`unable to find typedoc name for file [ ${file} ]`)
    }

    const outputFile = path.join(documentationScriptDir, `${name.toLowerCase()}.md`)

    gulp.task(`gen-typedoc-${name}`,
        shell.task([
            `typedoc`,
            `--inputFiles ${file}`,
            `--out ${typedocDir}`,
            `--mode file`,
            `--tsconfig ${scriptTSConfig}`,
            `--name ${name}`,
            `--ignoreCompilerErrors`,
            `--hideGenerator`,
            `--plugin typedoc-plugin-markdown`,
            `--hideProjectName`,
            `--hideBreadcrumbs`
        ].join(' ')))

    gulp.task(`drop-typedoc-files-${name}`, () => {
        const readme: string = path.join(typedocDir, 'README.md')
        const globals: string = path.join(typedocDir, 'globals.md')
        return gulp.src([readme, globals]).pipe(clean())
    })

    gulp.task(`concat-typedoc-files-${name}`, shell.task(`concat-md --decrease-title-levels ${typedocDir} > ${outputFile}`))

    gulp.task(`build-typedoc-${name}`, gulp.series(`clean-typedoc`, `gen-typedoc-${name}`, `drop-typedoc-files-${name}`, `concat-typedoc-files-${name}`))

    return `build-typedoc-${name}`
}

const typeDocTasks: string[] = tsConfig.include.map((file: string) => {
    return registerTypeDocTasks(file)
});

gulp.task('build-typedoc', gulp.series(...typeDocTasks))


