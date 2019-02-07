import { fromEvent, Subject } from 'rxjs';
import { WorkerErrorMessage } from './message/worker-error-message';
import { WorkerMessageType } from './message/worker-message.type';

export class AppWorkerDispatcher {

    readLines: Subject<void>;
    taskExecution: Subject<void>;

    private readonly worker: Worker;

    constructor(worker: Worker) {
        this.worker = worker;
        this.readLines = new Subject<void>();
        this.taskExecution = new Subject<void>();
    }

    start(): void {
        fromEvent<MessageEvent>(this.worker, 'message').subscribe((event: MessageEvent) => {

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

    }

    emitError(error: Error): void {
        this.worker.postMessage({
            error,
            type: WorkerMessageType.ERROR
        } as WorkerErrorMessage);
    }
}