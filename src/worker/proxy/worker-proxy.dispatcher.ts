import { fromEvent, Subject } from 'rxjs';
import { WorkerResponseLinesMessage } from '../message/readlines/worker-response-lines-message';
import { WorkerStatusTaskExecutionMessage } from '../message/task-execution/worker-status-task-execution-message';
import { WorkerErrorMessage } from '../message/worker-error-message';
import { WorkerMessage } from '../message/worker-message';
import { WorkerMessageOperation } from '../message/worker-message.operation';
import { WorkerMessageType } from '../message/worker-message.type';
import { WorkerStatusMessage } from '../message/worker-status-message';

export class WorkerProxyDispatcher {

    error: Subject<Error>;
    status: Subject<WorkerStatusMessage>;
    readLines: Subject<WorkerResponseLinesMessage>;
    taskExecution: Subject<WorkerStatusTaskExecutionMessage>;

    private worker: Worker;

    constructor(worker: Worker) {
        this.worker = worker;
        this.error = new Subject<Error>();
        this.status = new Subject<WorkerStatusMessage>();
    }

    start(): void {
        fromEvent<MessageEvent>(this.worker, 'message').subscribe((event: MessageEvent) => {
            this.dispatch(event);
        });

        this.worker.onmessage = (event: MessageEvent) => {
            this.dispatch(event);
        };
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
            this.error.error(e);
        }
    }

    private process(event: MessageEvent): void {
        const message: WorkerMessage = event.data as WorkerMessage;
        const success: boolean = this.switchOperation(message);
        if (success) {
            return;
        }

        const typeSuccess: boolean = this.switchType(message);
        if (typeSuccess) {
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
        const type: WorkerMessageType = message.type;

        switch (type) {
            case WorkerMessageType.ACK:
                return this.handleReadLinesAck(message);
            case WorkerMessageType.ERROR:
                return this.handleReadLinesError(message);
        }

        return false;
    }

    private handleReadLinesAck(message: WorkerMessage): boolean {
        const response: WorkerResponseLinesMessage = message as WorkerResponseLinesMessage;
        this.readLines.next(response);
        return true;
    }

    private handleReadLinesError(message: WorkerMessage): boolean {
        const errorMessage: WorkerErrorMessage = message as WorkerErrorMessage;
        this.readLines.error(errorMessage.error);
        return true;
    }

    private handleTaskExecution(message: WorkerMessage): boolean {
        const type: WorkerMessageType = message.type;

        switch (type) {
            case WorkerMessageType.STATUS:
                return this.handleTaskExecutionStatus(message);
            case WorkerMessageType.ERROR:
                return this.handleTaskExecutionError(message);
        }

        return false;

    }

    private handleTaskExecutionStatus(message: WorkerMessage): boolean {
        const statusMessage: WorkerStatusTaskExecutionMessage = message as WorkerStatusTaskExecutionMessage;
        this.taskExecution.next(statusMessage);
        return true;
    }

    private handleTaskExecutionError(message: WorkerMessage): boolean {
        const errorMessage: WorkerErrorMessage = message as WorkerErrorMessage;
        this.taskExecution.error(errorMessage.error);
        return true;
    }

    private switchType(message: WorkerMessage): boolean {
        const type: WorkerMessageType = message.type;

        switch (type) {
            case WorkerMessageType.STATUS:
                return this.handleStatus(message);
            case WorkerMessageType.ERROR:
                return this.handleError(message);
        }

        return false;
    }

    private handleError(message: WorkerMessage): boolean {
        const errorMessage: WorkerErrorMessage = message as WorkerErrorMessage;
        this.error.next(errorMessage.error);
        return true;
    }

    private handleStatus(message: WorkerMessage): boolean {
        const statusMessage: WorkerStatusMessage = message as WorkerStatusMessage;
        this.status.next(statusMessage);
        return true;
    }

    private emitError(error: Error): void {
        this.error.next(error);
    }

}