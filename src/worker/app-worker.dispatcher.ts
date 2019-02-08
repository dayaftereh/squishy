import { fromEvent, Subject } from 'rxjs';
import { WorkerRequestLinesMessage } from './message/readlines/worker-request-lines-message';
import { WorkerRequestTaskExecutionMessage } from './message/task-execution/worker-request-task-execution-message';
import { WorkerErrorMessage } from './message/worker-error-message';
import { WorkerMessage } from './message/worker-message';
import { WorkerMessageOperation } from './message/worker-message.operation';
import { WorkerMessageType } from './message/worker-message.type';

export class AppWorkerDispatcher {

    readLines: Subject<WorkerRequestLinesMessage>;
    taskExecution: Subject<WorkerRequestTaskExecutionMessage>;

    private readonly worker: Worker;

    constructor(worker: Worker) {
        this.worker = worker;
        this.readLines = new Subject<WorkerRequestLinesMessage>();
        this.taskExecution = new Subject<WorkerRequestTaskExecutionMessage>();
    }

    start(): void {
        fromEvent<MessageEvent>(this.worker, 'message').subscribe((event: MessageEvent) => {
            this.dispatch(event);
        });
    }

    private dispatch(event: MessageEvent): void {
        if (!event) {
            this.emitError(new Error(`received an null or undefined message event`));

            return;
        }

        if (!event.data) {
            this.emitError(new Error(`received an message event without data`));
            return;
        }

        try {
            this.process(event);
        } catch (e) {
            this.emitError(e);
        }
    }

    private process(event: MessageEvent): void {
        const message: WorkerMessage = event.data as WorkerMessage;
        const success: boolean = this.switchOperation(message);
        if (success) {
            return;
        }

        this.emitError(new Error(`fail to process message with type [ ${message.type} ], because type not known`));
    }

    private switchOperation(message: WorkerMessage): boolean {
        const operation: WorkerMessageOperation = message.operation;

        switch (operation) {
            case WorkerMessageOperation.READ_LINES:
                return this.handleReadLines(message);
            case WorkerMessageOperation.TASK_EXECUTION:
                return this.handleTaskExecution(message);
        }

        return false;
    }

    private handleReadLines(message: WorkerMessage): boolean {
        const readLinesMessage: WorkerRequestLinesMessage = message as WorkerRequestLinesMessage;
        this.readLines.next(readLinesMessage);
        return true;
    }

    private handleTaskExecution(message: WorkerMessage): boolean {
        const taskExecutionMessage: WorkerRequestTaskExecutionMessage = message as WorkerRequestTaskExecutionMessage;
        this.taskExecution.next(taskExecutionMessage);
        return true;
    }

    emitError(error: Error): void {
        this.worker.postMessage({
            error,
            type: WorkerMessageType.ERROR
        } as WorkerErrorMessage);
    }
}