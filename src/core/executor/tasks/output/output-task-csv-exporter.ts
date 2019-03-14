import * as Papa from 'papaparse';
import { OutputTask } from '../../../exectuion/task/output/output-task';
import { ExecutionDataLine } from '../../execution-data-line';
import { ExecutionObject } from '../../execution-object';
import { OutputTaskExporter } from './output-task-exporter';

export class OutputTaskCSVExporter implements OutputTaskExporter {

    constructor(private readonly task: OutputTask) {
    }

    export(result: ExecutionObject): Blob {
        const lines: string[][] = this.mapData(result);
        const fields: string[] = this.createColumns();

        const content: string = Papa.unparse({
            fields,
            data: lines
        });

        const blob: Blob = new Blob([content], { type: `text/csv` });
        return blob;
    }

    private mapData(results: ExecutionObject): string[][] {
        const lines: string[][] = [];
        const length: number = this.lineLength();

        const keys: string[] = Object.keys(results);
        keys.map((key: string) => {
            const result: ExecutionDataLine | string = results[key];

            if (this.isString(result)) {
                const line: string = result as string;
                lines.push([line]);
                return;
            }

            const line: string[] = this.mapDataLine(length, result as ExecutionDataLine);
            lines.push(line);
        });

        return lines;
    }

    private mapDataLine(length: number, result: ExecutionDataLine): string[] {
        const line: string [] = this.createLineArray(length);

        const keys: string[] = Object.keys(this.task.fields);
        keys.filter((key: string) => {
            return result.hasOwnProperty(key);
        }).forEach((key: string) => {
            const value: string = result[key] as string;
            const index: number = this.task.fields[key];
            line[index] = value;
        });

        return line;
    }

    private isString<T>(x: T): boolean {
        return typeof (x) === 'string';
    }

    private lineLength(): number {
        const keys: string[] = Object.keys(this.task.fields);
        const length: number = Math.max(...keys.map((key: string) => {
            return this.task.fields[key];
        }));
        return length;
    }

    private createLineArray(length: number): string[] {
        const line: string[] = new Array(length);
        for (let i: number = 0; i < length; i++) {
            line[i] = ``;
        }
        return line;
    }

    private createColumns(): string [] {
        const length: number = this.lineLength();
        const columns: string[] = [];
        for (let i: number = 0; i < length; i++) {
            // TODO good name
            columns[i] = `UNKNOWN`;
        }

        const keys: string[] = Object.keys(this.task.fields);
        keys.forEach((key: string) => {
            const index: number = this.task.fields[key];
            columns[index] = key;
        });

        return columns;
    }

}