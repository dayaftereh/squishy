import { LoadTask } from '../../../../core/exectuion/task/load/load-task';
import { ReadLinesTask } from '../../read-lines.task';

export class ScriptLoadContainer {

    private readonly task: LoadTask;
    private readonly data: any;

    constructor(task: LoadTask, data: any) {
        this.task = task;
        this.data = data;
    }

    execute<T>(): T {
        const files: File[] = this.getFiles();
        const lines: string[][] = this.readFiles(files);
        const object: any = this.map(lines);
        return object as T;
    }

    private readFiles(files: File[]): string[][] {
        const readLinesTask: ReadLinesTask = new ReadLinesTask();
        const lines: string[][] = readLinesTask.read(files);
        return lines;
    }

    private map(lines: string[][]): any[] {
        const lineObjects: any[] = [];
        lines.forEach((line: string[]) => {
            const lineObject: any = {};

            line.forEach((value: any, index: number) => {
                const name: string | undefined = this.task.fields[index];
                if (name) {
                    lineObject[name] = value;
                }
            });

            lineObjects.push(lineObject);
        });

        return lineObjects;
    }

    private getFiles(): File[] {
        if (!this.data || !this.data.files) {
            return [];
        }
        return this.data.files;
    }
}