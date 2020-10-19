import * as path from 'path'

export const currentWorkingDir: string = process.cwd()

// directories and files
export const srcDir: string = path.join(currentWorkingDir, './src')
export const distDir: string = path.join(currentWorkingDir, './dist')
export const toolsDir: string = path.join(currentWorkingDir, './tools')

export const assetsDir: string = path.join(srcDir, 'assets')
export const scriptDir: string = path.join(distDir, 'script')
export const typedocDir: string = path.join(distDir, 'typedoc')
export const squishyDir: string = path.join(distDir, 'squishy')

export const documentationDir: string = path.join(assetsDir, 'documentation')
export const documentationScriptDir: string = path.join(documentationDir, 'script')

export const packageJsonFile: string = path.join(currentWorkingDir, './package.json')

// Typescript Configs
export const toolsTSConfig: string = path.join(toolsDir, './tsconfig.tools.json')
export const scriptTSConfig: string = path.join(toolsDir, './tsconfig.script.json')

