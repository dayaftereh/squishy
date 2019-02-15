import * as Papa from 'papaparse';
import { ParseConfig, ParseError, ParseResult } from 'papaparse';

export class ReadLinesTask {

    constructor() {
    }

    read(files: File[], maxLines?: number): string[][] {

        const lines: string[][] = [];
        const config: ParseConfig = this.parseConfig(maxLines);

        for (let i in files) {
            const file: File = files[i];

            const fileLines: string[][] = this.readFile(file, config);
            lines.push(...fileLines);

            if (maxLines && maxLines > 0 && lines.length >= maxLines) {
                return lines;
            }
        }

        return lines;
    }

    private readFile(file: File, config: ParseConfig): string[][] {
        const result: ParseResult = Papa.parse(file, config);
        if (result.errors) {
            this.throwParseErrors(file, result.errors);
        }
        return result.data;
    }

    private parseConfig(maxLines?: number): ParseConfig {
        const config: ParseConfig = {
            comments: '#'
        } as ParseConfig;
        if (maxLines && maxLines > 0) {
            config.preview = maxLines;
        }
        return config;
    }

    private throwParseErrors(file: File, errors: ParseError[]): void {
        const message: string = `error while parsing file [ ${file.name} ]`;
        const error: any = { message };
        error.file = file.name;
        error.errors = errors;
        throw error;
    }


}