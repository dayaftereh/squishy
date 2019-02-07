import { Observable, Subscriber, Subscription } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import * as uuid from 'uuid';
import { TaskExecution } from '../../app/services/execution/task-execution';
import { WorkerRequestLinesMessage } from '../message/readlines/worker-request-lines-message';
import { WorkerResponseLinesMessage } from '../message/readlines/worker-response-lines-message';
import { WorkerRequestTaskExecutionMessage } from '../message/task-execution/worker-request-task-execution-message';
import { WorkerStatusTaskExecutionMessage } from '../message/task-execution/worker-status-task-execution-message';
import { WorkerMessageOperation } from '../message/worker-message.operation';
import { WorkerTaskExecutionStatus } from '../tasks/worker-task-execution-status';
import { WorkerProxyDispatcher } from './worker-proxy.dispatcher';

export class WorkerProxyPublisher {

    private worker: Worker;
    private dispatcher: WorkerProxyDispatcher;

    constructor(worker: Worker, dispatcher: WorkerProxyDispatcher) {
        this.worker = worker;
        this.dispatcher = dispatcher;
    }

    async readlines(files: File[], firstLines?: number): Promise<string[][]> {
        const asyncId: string = this.nextAsyncId();

        const promise: Promise<WorkerResponseLinesMessage> = this.dispatcher.readLines.pipe(
            filter((response: WorkerResponseLinesMessage) => {
                return response.asyncId === asyncId;
            }),
            first()
        ).toPromise();

        this.worker.postMessage({
            files,
            asyncId,
            first: firstLines,
            operation: WorkerMessageOperation.READ_LINES
        } as WorkerRequestLinesMessage);

        const response: WorkerResponseLinesMessage = await promise;
        return response.lines;
    }

    taskExecution(taskExecution: TaskExecution): Observable<WorkerTaskExecutionStatus> {
        const asyncId: string = this.nextAsyncId();

        const observable: Observable<WorkerTaskExecutionStatus> = this.dispatcher.taskExecution.pipe(
            filter((response: WorkerStatusTaskExecutionMessage) => {
                return response.asyncId === asyncId;
            }),
            map((response: WorkerStatusTaskExecutionMessage) => {
                return response as WorkerTaskExecutionStatus;
            }));

        this.worker.postMessage({
            asyncId,
            taskExecution,
            operation: WorkerMessageOperation.TASK_EXECUTION
        } as WorkerRequestTaskExecutionMessage);


        return new Observable((observer: Subscriber<WorkerTaskExecutionStatus>) => {
            const subscription: Subscription = observable.subscribe({
                next: (status: WorkerTaskExecutionStatus) => {
                    observer.next(status);
                    if (status.completed) {
                        observer.complete();
                    }
                },
                error: (e: Error) => {
                    observer.error(e);
                }
            });

            return subscription;
        });
    }

    private nextAsyncId(): string {
        return uuid.v4();
    }

}