const input: string = "./dist/script"
const output: string = './src/assets/script.d.json'

const fs = require("fs")
const path = require("path")

function walk(root: string, callback: (path: string, stats: any) => void): void {

    const files: string[] = fs.readdirSync(root)

    files.forEach(function (file: string) {
        const filepath: string = path.join(root, file);
        const stats: any = fs.statSync(filepath);

        if (stats.isDirectory()) {
            walk(filepath, callback);
        } else if (stats.isFile()) {
            callback(filepath, stats);
        }
    });
}

const types: any = {}

walk(input, (file: string, stats: any) => {
    const suffix: string = path.relative(input, file)

    const content: string = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });

    types[suffix] = content
})

// https://github.com/microsoft/monaco-editor/issues/667

const content: string = JSON.stringify(types, null, 2)

fs.writeFileSync(output, content)


