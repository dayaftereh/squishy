import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

interface ImportFile {
    name: string | undefined
    file: string
}

interface TypesFile {
    imports: ImportFile[]
    exports: ImportFile[]
    content: string | undefined
}

const newline: string = `\n`
const distDir: string = './dist'
const scriptDir: string = path.join(distDir, 'script');

const inputFiles: string[] = [
    path.join(scriptDir, 'math/mathf.d.ts'),
    path.join(scriptDir, 'squishy/squishy-types.d.ts'),
    path.join(scriptDir, 'plugins/plugins-types.d.ts'),
]

const srcDir: string = './src'
const assetsDir: string = path.join(srcDir, 'assets')
const outputFile: string = path.join(assetsDir, 'scripts.d.ts')

const loadSourceFile = (filePath: string) => {
    const code: string = fs.readFileSync(filePath, 'utf8')
    const fileName: string = path.basename(filePath)
    const sourceFile: ts.SourceFile = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest)
    return sourceFile
}

const inspectDeep = (root: ts.Node, index: number) => {
    console.log("-".repeat(index), ts.SyntaxKind[root.kind])
    root.forEachChild((node: ts.Node) => {
        inspectDeep(node, index + 1)
    })
}

const lookupKind = (root: ts.Node, kind: ts.SyntaxKind) => {
    if (root.kind === kind) {
        return [root]
    }
    let found: ts.Node[] = []
    root.forEachChild((node: ts.Node) => {
        found.push(...lookupKind(node, kind))
    })
    return found
}

const lookupImportFile = (root: ts.Node) => {

    const files: ts.Node[] = lookupKind(root, ts.SyntaxKind.StringLiteral)
    const identifiers: ts.Node[] = lookupKind(root, ts.SyntaxKind.Identifier)

    if (!files || files.length < 1) {
        return undefined
    }


    let identifier: ts.Node | undefined = undefined
    if (identifiers && identifiers.length > 0) {
        identifier = identifiers[0]
    }

    const file: ts.Node = files[0]
    const name: string = !!(identifier) ? (identifier as any).escapedText : undefined

    return {
        name,
        file: (file as any).text,
    } as ImportFile
}

const allImportFiles = (root: ts.Node, kind: ts.SyntaxKind) => {
    const nodes: ts.Node[] = lookupKind(root, kind)

    return nodes.map((node: ts.Node) => {
        return lookupImportFile(node)
    }).filter((importFile: ImportFile | undefined) => {
        return !!(importFile)
    })
}

const removeKeywords = (content: string) => {
    content = content.replace(/export declare/g, "")
    content = content.replace(/export interface/g, "class")
    return content
}

const grepAllTypes = (file: ts.SourceFile, kinds: ts.SyntaxKind[]) => {
    const content: string[] = kinds.map((kind: ts.SyntaxKind) => {
        const founds: ts.Node[] = lookupKind(file, kind)

        const kindContent: string[] = founds.map((node: ts.Node) => {
            const text: string = node.getFullText(file)
            return text
        })

        if (!kindContent || kindContent.length < 1) {
            return undefined
        }

        return kindContent.join(newline)
    }).filter((line: string | undefined) => {
        return !!(line)
    })

    if (!content || content.length < 1) {
        return undefined
    }

    const result: string = content.join(newline)

    return removeKeywords(result)
}

const inspect = (file: ts.SourceFile) => {
    const content: string = grepAllTypes(file, [
        ts.SyntaxKind.ClassDeclaration,
        ts.SyntaxKind.FunctionDeclaration,
        ts.SyntaxKind.VariableDeclarationList,
        ts.SyntaxKind.InterfaceDeclaration,
        ts.SyntaxKind.NamespaceKeyword
    ])


    const exports: ImportFile[] = allImportFiles(file, ts.SyntaxKind.ExportDeclaration)
    const imports: ImportFile[] = allImportFiles(file, ts.SyntaxKind.ImportDeclaration)

    return {
        content,
        exports,
        imports
    } as TypesFile
}

const typesFilename = (root: string, importFile: ImportFile) => {
    const filePath: string = `${importFile.file}.d.ts`
    const parent: string = path.dirname(root)
    const inputFile: string = path.join(parent, filePath)
    const abs: string = path.resolve(inputFile)

    return abs
}

const visited: Set<string> = new Set<string>();

const joinImportFiles = (root: string, importFiles: ImportFile[]) => {
    return importFiles.map((importFile: ImportFile) => {
        const inputFile: string = typesFilename(root, importFile)
        return inputFile
    }).map((filePath: string) => {
        return build(filePath)
    }).filter((content: string | undefined) => {
        return !!(content)
    })
}

const build = (file: string, first?: boolean) => {
    const exists: boolean = fs.existsSync(file)
    if (visited.has(file) || !exists) {
        return undefined
    }
    visited.add(file)
    console.log(file)

    const sourceFile: ts.SourceFile = loadSourceFile(file)

    const typesFile: TypesFile = inspect(sourceFile)

    const imports: string[] = joinImportFiles(file, typesFile.imports)
    const exports: string[] = joinImportFiles(file, typesFile.exports)

    const content: string[] = []

    if (typesFile.content) {
        content.push(typesFile.content)
    }

    if (exports) {
        content.push(exports.join(newline))
    }

    if (imports) {
        content.push(imports.join(newline))
    }

    const module: string = content.join(newline)

    if (!first || !typesFile.imports || typesFile.imports.length < 1) {
        return module
    }


    const firstExport: ImportFile = typesFile.imports[0]

    return [
        `declare namespace ${firstExport.name} {`,
        module,
        '}'
    ].join(newline)
}

const typesContent: string[] = inputFiles.map((file: string) => {
    console.log("generation types for ", file)
    const content: string = build(file, true)
    return content
})

typesContent.push(
    `declare const Squishy: SquishyTypes.Squishy`,
    `declare const Plugins: PluginsTypes.Plugins`,
)

console.log("writing generated types to ", outputFile)
fs.writeFileSync(outputFile, typesContent.join(newline))