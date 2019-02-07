import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { TaskAbortMessage } from './message/task-abort-message';
import { TaskExecuteMessage } from './message/task-execute-message';
import { TaskMessageType } from './message/task-message-type';
import { TaskStatusMessage } from './message/task-status-message';
import { TaskExecution } from './task-execution';
import { TaskStatus } from './task-status';

@Injectable()
export class TaskExecutorService {

    private static readonly WORKER_PATH = 'worker.js';

    private worker: any;
    private readonly subject: Subject<TaskStatusMessage>;

    constructor() {
        this.subject = new Subject<TaskStatusMessage>();
        this.initWorker();
    }

    private initWorker(): void {
        if (this.worker) {
            return;
        }

        this.worker = new Worker('../../../worker/main.worker', { type: 'module' });
        this.worker.onmessage = (event: MessageEvent) => {
            const taskMessage: TaskStatusMessage = event.data as TaskStatusMessage;
            if (this.subject) {
                this.subject.next(taskMessage);
            }
        };
    }

    execute(taskExecution: TaskExecution): Observable<TaskStatus> {
        if (!this.worker) {
            throw new Error(`worker not initialized`);
        }

        console.log('Send-Message', this.worker);

        this.worker.postMessage({
            execution: taskExecution,
            type: TaskMessageType.EXECUTE
        } as TaskExecuteMessage);

        return this.status();
    }

    async abort(): Promise<void> {
        if (!this.worker) {
            return;
        }

        this.worker.postMessage({
            type: TaskMessageType.ABORT
        } as TaskAbortMessage);
    }

    status(): Observable<TaskStatus> {
        return new Observable((observer: Subscriber<TaskStatus>) => {

            const subscription: Subscription = this.subject.subscribe({
                next: (event: TaskStatusMessage) => {
                    this.dispatch(observer, event);
                }
            });

            return subscription;
        });
    }

    private dispatch(observer: Subscriber<TaskStatus>, event: TaskStatusMessage): void {
        if (event.running && !event.error) {
            observer.complete();
            return;
        }

        if (event.error) {
            observer.error(event.error);
            return;
        }

        observer.next({
            progress: event.progress
        });
    }

}