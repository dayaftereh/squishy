import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Observable, of } from 'rxjs';
import { ProxyWorker } from '../../../worker/proxy/proxy-worker';
import { TaskExecution } from './task-execution';
import { TaskStatus } from './task-status';

@Injectable()
export class TaskExecutorService {

    private worker: ProxyWorker;

    constructor() {
        this.init();
    }

    init(): void {
        this.worker = new ProxyWorker();
        this.worker.start();
    }

    async execute(taskExecution: TaskExecution): Promise<Blob> {
        const blob: Blob = await this.worker.execute(taskExecution);
        FileSaver.saveAs(blob, 'output.csv');
        return blob;
    }

    async abort(): Promise<void> {

    }

    status(): Observable<TaskStatus> {
        return of({} as TaskStatus);
    }

}