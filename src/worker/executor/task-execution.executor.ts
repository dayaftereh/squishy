import * as Papa from 'papaparse';
import { TaskExecution } from '../../app/services/execution/task-execution';
import { LoadTask } from '../../app/services/task/load/load-task';
import { LoadTaskData } from '../../app/services/task/load/load-task-data';
import { ScriptTask } from '../../app/services/task/script/script-task';
import { Task } from '../../app/services/task/task';
import { TaskType } from '../../app/services/task/task-type';
import { ReadLinesExecutor } from './read-lines.executor';

export class TaskExecutionExecutor {

    private readonly taskExecution: TaskExecution;

    constructor(taskExecution: TaskExecution) {
        this.taskExecution = taskExecution;
    }

    async execute(): Promise<string> {
        const tasks: Task[] = this.taskExecution.tasks;

        let object: any = {};
        for (let i in tasks) {
            const task: Task = tasks[i];
            if (task.type === TaskType.LOAD) {
                const data: LoadTaskData = this.taskExecution.data[task.id];
                object = await this.handleLoadTask(task as LoadTask, data);
            } else if (task.type === TaskType.SCRIPT) {
                object = await this.handleScript(task as ScriptTask, object);
            }
        }

        const url: string = await this.output(object);
        console.log('tt', url);
        return url;
    }

    private async handleLoadTask(task: LoadTask, data: LoadTaskData): Promise<any> {
        const readLinesExecutor: ReadLinesExecutor = new ReadLinesExecutor(data.files, undefined);
        const lines: string[][] = await readLinesExecutor.read();
        const object: any = {};
        const indices: string[] = Object.keys(task.fields);

        lines.forEach((line: string[]) => {
            indices.forEach((index: string) => {
                const i: number = Number(index);
                const name: string = task.fields[i];
                object[name] = line[i];
            });
        });

        return object;
    }

    private async handleScript(task: ScriptTask, object: any): Promise<any> {
        const func: Function = new Function('input', task.script);
        console.log(task.script);

        try {
            const time: number = Date.now();
            const result: any = func(object);
            console.log('func', (Date.now() - time));
            return result;
        } catch (e) {
            throw e;
        }
    }

    private async output(object: any): Promise<string> {
        const time: number = Date.now();
        console.log('output');
        const data: string = Papa.unparse(object);
        const blob: Blob = new Blob([data], {
            type: `text/csv`
        });

        const url: any = URL.createObjectURL(blob);

        console.log('output', (Date.now() - time));
        return url as string;
    }

}