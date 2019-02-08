import { AppWorkerDispatcher } from '../app-worker.dispatcher';
import { WorkerRequestLinesMessage } from '../message/readlines/worker-request-lines-message';
import { WorkerResponseLinesMessage } from '../message/readlines/worker-response-lines-message';
import { WorkerRequestTaskExecutionMessage } from '../message/task-execution/worker-request-task-execution-message';
import { WorkerStatusTaskExecutionMessage } from '../message/task-execution/worker-status-task-execution-message';
import { WorkerErrorMessage } from '../message/worker-error-message';
import { WorkerMessageType } from '../message/worker-message.type';
import { ReadLinesExecutor } from './read-lines.executor';
import { TaskExecutionExecutor } from './task-execution.executor';

export class AppWorkerExecutor {

    private readonly worker: Worker;
    private readonly dispatcher: AppWorkerDispatcher;

    constructor(worker: Worker, dispatcher: AppWorkerDispatcher) {
        this.worker = worker;
        this.dispatcher = dispatcher;
    }

    start(): void {
        this.dispatcher.readLines.subscribe((message: WorkerRequestLinesMessage) => {
            this.executeReadLines(message);
        });

        this.dispatcher.taskExecution.subscribe((message: WorkerRequestTaskExecutionMessage) => {
            this.execute(message);
        });
    }

    private executeReadLines(message: WorkerRequestLinesMessage): void {
        const readLines: ReadLinesExecutor = new ReadLinesExecutor(message.files, message.first);
        readLines.read().then((lines: string[][]) => {
            this.worker.postMessage({
                lines,
                type: WorkerMessageType.ACK,
                asyncId: message.asyncId,
                operation: message.operation
            } as WorkerResponseLinesMessage);
        }, (error: Error) => {
            this.worker.postMessage({
                error,
                type: WorkerMessageType.ERROR,
                asyncId: message.asyncId,
                operation: message.operation
            } as WorkerErrorMessage);
        });
    }

    private execute(message: WorkerRequestTaskExecutionMessage): void {
        const taskExecution: TaskExecutionExecutor = new TaskExecutionExecutor(message.taskExecution);
        taskExecution.execute().then((url: string) => {
            this.worker.postMessage({
                completed: true,
                url,
                type: WorkerMessageType.STATUS,
                asyncId: message.asyncId,
                operation: message.operation
            } as WorkerStatusTaskExecutionMessage);
        }, (error: Error) => {
            this.worker.postMessage({
                error,
                type: WorkerMessageType.ERROR,
                asyncId: message.asyncId,
                operation: message.operation
            } as WorkerErrorMessage);
        });
    }

}