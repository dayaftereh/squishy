import * as Papa from 'papaparse';
import { ParseConfig, ParseError, ParseResult } from 'papaparse';
import { LoadTask } from '../../../exectuion/task/load/load-task';
import { ExecutionDataLine } from '../../execution-data-line';
import { ExecutionObject } from '../../execution-object';
import { AbstractLoadTaskLoader } from './abstract-load-task-loader';

export class LoadTaskCSVLoader extends AbstractLoadTaskLoader {

    constructor(task: LoadTask, files: File[]) {
        super(task, files);
    }

    load(): ExecutionObject {
        const lines: string[][] = this.readFiles();
        const result: ExecutionObject = this.mapLines(lines);
        return result;
    }

    private mapLines(lines: string[][]): ExecutionObject {
        const obj: ExecutionObject = {};
        lines.forEach((line: string[], index: number) => {
            const lineObject: ExecutionDataLine = {};

            line.forEach((value: any, index: number) => {
                const name: string | undefined = this.task.fields[index];
                if (name) {
                    lineObject[name] = value;
                }
            });

            let key: string = `${index}`;
            if (this.task.key) {
                key = lineObject[this.task.key] as string;
            }
            obj[key] = lineObject;
        });

        return obj;
    }

    private readFiles(): string[][] {
        const lines: string[][] = [];
        const parseConfig: ParseConfig = this.parseConfig();

        this.files.forEach((file: File) => {
            const fileLines: string[][] = this.readFile(file, parseConfig);
            lines.push(...fileLines);
        });

        return lines;
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

    private readFile(file: File, parseConfig: ParseConfig): string[][] {
        const result: ParseResult = Papa.parse(file, parseConfig);
        if (result.errors) {
            this.throwParseErrors(file, result.errors);
        }
        return result.data;
    }

    private throwParseErrors(file: File, errors: ParseError[]): void {
        const message: string = `error while parsing file [ ${file.name} ]`;
        const error: any = new Error(message);
        error.file = file.name;
        error.errors = errors;
        throw error;
    }

}
