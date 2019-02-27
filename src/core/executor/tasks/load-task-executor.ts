import * as Papa from 'papaparse';
import { ParseConfig, ParseError, ParseResult } from 'papaparse';
import { ExecutionData } from '../../exectuion/data/execution-data';
import { ExecutionPlanEntry } from '../../exectuion/plan/execution-plan-entry';
import { LoadTask } from '../../exectuion/task/load/load-task';
import { TaskId } from '../../exectuion/task/task-id';
import { TaskState } from '../../exectuion/task/task-state';
import { ExecutorContext } from '../executor-context';
import { TaskExecutor } from './task-executor';

export class LoadTaskExecutor<T> implements TaskExecutor<T> {

    constructor(
        private readonly context: ExecutorContext,
        private readonly entry: ExecutionPlanEntry
    ) {
    }

    execute(): T {
        this.context.emitStateChange(this.entry.task.id, TaskState.RUNNING);
        const lines: string[][] = this.readFiles();
        const result: T = this.mapLines(lines);
        this.context.emitStateChange(this.entry.task.id, TaskState.COMPLETED);
        return result;
    }

    private mapLines(lines: string[][]): T {
        const loadTask: LoadTask = this.task();

        const obj: any = {};
        lines.forEach((line: string[], index: number) => {
            const lineObject: any = {} as T;

            line.forEach((value: any, index: number) => {
                const name: string | undefined = loadTask.fields[index];
                if (name) {
                    lineObject[name] = value;
                }
            });

            let key: string = `${index}`;
            if (loadTask.key) {
                key = lineObject[loadTask.key];
            }
            obj[key] = lineObject;
        });

        return obj as T;
    }

    private readFiles(): string[][] {
        const lines: string[][] = [];
        const files: File[] = this.files();
        const parseConfig: ParseConfig = this.parseConfig();

        files.forEach((file: File) => {
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

    task(): LoadTask {
        return this.entry.task as LoadTask;
    }

    files(): File[] {
        const executionData: ExecutionData = this.context.execution.data;
        if (!executionData) {
            return [];
        }
        const taskId: TaskId = this.entry.task.id;
        const files: File[] = executionData[taskId];
        if (!files) {
            return [];
        }
        return files;
    }

}