import * as Papa from 'papaparse';
import { ExecutionResult } from '../../exectuion/execution-result';
import { ExecutionPlanEntry } from '../../exectuion/plan/execution-plan-entry';
import { OutputTask } from '../../exectuion/task/output/output-task';
import { TaskState } from '../../exectuion/task/task-state';
import { ExecutionDataLine } from '../execution-data-line';
import { ExecutionObject } from '../execution-object';
import { ExecutorContext } from '../executor-context';
import { TaskExecutor } from './task-executor';
import { TaskExecutorFinder } from './task-executor-finder';

export class OutputTaskExecutor implements TaskExecutor<ExecutionResult> {

    constructor(
        private readonly context: ExecutorContext,
        private readonly entry: ExecutionPlanEntry
    ) {
    }

    execute(): ExecutionResult {
        this.context.emitStateChange(this.entry.task.id, TaskState.PENDING);

        const result: ExecutionResult = {
            blob: undefined
        } as ExecutionResult;

        const data: ExecutionObject | undefined = this.runChildren();
        if (!data) {
            return result;
        }

        this.context.emitStateChange(this.entry.task.id, TaskState.RUNNING);
        result.blob = this.createBlob(data);
        this.context.emitStateChange(this.entry.task.id, TaskState.COMPLETED);

        return result;
    }

    private runChildren(): ExecutionObject | undefined {
        if (!this.entry.children || this.entry.children.length < 1) {
            return undefined;
        }
        const first: ExecutionPlanEntry = this.entry.children[0];
        const result: ExecutionObject = TaskExecutorFinder.findAndExecute(this.context, first);
        return result;
    }

    private createBlob(result: ExecutionObject): Blob {
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
        const task: OutputTask = this.task();
        const length: number = this.lineLength();

        const lines: string[][] = [];
        const keys: string[] = Object.keys(results);
        keys.map((key: string) => {
            const result: ExecutionDataLine = results[key];
            const line: string [] = this.createLineArray(length);

            const keys: string[] = Object.keys(task.fields);
            keys.filter((key: string) => {
                return result.hasOwnProperty(key);
            }).forEach((key: string) => {
                const value: string = result[key] as string;
                const index: number = task.fields[key];
                line[index] = value;
            });

            lines.push(line);
        });

        return lines;
    }

    private lineLength(): number {
        const task: OutputTask = this.task();
        const keys: string[] = Object.keys(task.fields);
        const length: number = Math.max(...keys.map((key: string) => {
            return task.fields[key];
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
            columns[i] = `UNKNOWN`;
        }

        const task: OutputTask = this.task();
        const keys: string[] = Object.keys(task.fields);
        keys.forEach((key: string) => {
            const index: number = task.fields[key];
            columns[index] = key;
        });

        return columns;
    }

    private task(): OutputTask {
        return this.entry.task as OutputTask;
    }

}