import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { WorkerProxy } from '../../../worker/proxy/worker.proxy';
import { WorkerTaskExecutionStatus } from '../../../worker/tasks/worker-task-execution-status';
import { TaskExecution } from './task-execution';
import { TaskStatus } from './task-status';

@Injectable()
export class TaskExecutorService {

    private static readonly WORKER_PATH = 'worker.js';

    private worker: WorkerProxy;

    constructor() {
        this.worker = new WorkerProxy();
        this.worker.start();
    }

    execute(taskExecution: TaskExecution): Observable<TaskStatus> {
        return this.worker.execute(taskExecution).pipe(map((status: WorkerTaskExecutionStatus) => {
            console.log(status.url, saveAs);
            saveAs(status.url, 'output.csv');
            return {
                progress: status.process
            } as TaskStatus;
        }));
    }

    async abort(): Promise<void> {

    }

    status(): Observable<TaskStatus> {
        return of({} as TaskStatus);
    }

}