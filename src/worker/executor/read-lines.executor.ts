import * as Papa from 'papaparse';
import { ParseConfig, ParseError, ParseResult } from 'papaparse';

export class ReadLinesExecutor {

    private readonly files: File[];
    private readonly first: number | undefined;

    constructor(files: File[], first: number | undefined) {
        this.files = files;
        this.first = first;
    }

    async read(): Promise<string[][]> {
        const config: ParseConfig = {
            preview: this.preview()
        };

        const lines: string[][] = [];

        for (let i in this.files) {
            const file: File = this.files[i];
            const result: ParseResult = Papa.parse(file, config);
            this.append(file, result, lines);

            if (this.first && this.first > 0 && lines.length >= this.first) {
                return lines;
            }
        }

        return lines;
    }

    private append(file: File, result: ParseResult, lines: string[][]): void {
        if (result.errors) {
            this.throwError(result.errors, file);
        }

        const newLines: string[][] = result.data;
        lines.push(...newLines);
    }

    private throwError(errors: ParseError[], file: File): void {
        const errorsLines: string [] = errors.map((error: ParseError) => {
            return `[${error.code}] - ${error.type} :: ${error.message} (${file.name}:${error.row})`;
        });
        const message: string = errorsLines.join('\n');
        const error: Error = new Error(message);
        (error as any)['errors'] = errors;
        throw error;
    }

    private preview(): number {
        if (this.first && this.first > 0) {
            return this.first;
        }
        return 0;
    }
}