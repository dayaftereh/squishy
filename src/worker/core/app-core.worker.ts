import { LinkServer } from '../link/link-server';
import { ReadLinesTask } from './read-lines.task';

export class AppCoreWorker {

    private linkServer: LinkServer;

    private readonly worker: Worker;

    constructor(worker: Worker) {
        this.worker = worker;
    }

    start(): void {
        this.linkServer = new LinkServer(this.worker);
        this.linkServer.start();

        this.registerCalls();
    }

    private registerCalls(): void {
        this.linkServer.register('execute', (taskExecution: any) => {
            return this.execute(taskExecution);
        });

        this.linkServer.register('readlines', (files: File[], maxLines?: number) => {
            return this.readLines(files, maxLines);
        });
    }

    private execute(taskExecution: any): Blob {
        return new Blob();
    }

    private readLines(files: File[], maxLines?: number): string[][] {
        const readLinesTask: ReadLinesTask = new ReadLinesTask();
        const lines: string[][] = readLinesTask.read(files, maxLines);
        return lines;
    }
}