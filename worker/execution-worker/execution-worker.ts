import { EventEmitter } from '@angular/core';
import { TaskMessage } from '../../src/app/services/execution/message/task-message';
import { TaskEvent } from '../tasks/task-event';

export class ExecutionWorker {

    subject: EventEmitter<TaskMessage>;

    constructor(private readonly context: any) {
        this.subject = new EventEmitter<TaskMessage>();
    }

    dispatch(event: MessageEvent): void {
        if (!event || !event.data) {
            this.error(new Error('invalid message received'));
            return;
        }
        const taskMessage: TaskMessage = event.data as TaskMessage;
        this.subject.next(taskMessage);
    }

    error(error: Error): void {
        this.emit({
            error,
            running: false,
            progress: 1.0
        });
    }

    emit(event: TaskEvent): void {
        this.context.postMessage(event);
    }
}