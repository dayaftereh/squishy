import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Execution } from '../../../core/exectuion/execution';
import { ExecutionResult } from '../../../core/exectuion/execution-result';
import { ExecutionStatus } from '../../../core/exectuion/execution-status';
import { WorkerProxy } from '../../../worker/proxy/worker-proxy';

@Injectable()
export class ExecutorService {

    status: BehaviorSubject<ExecutionStatus | undefined>;

    private proxy: WorkerProxy;

    constructor() {
        this.status = new BehaviorSubject<ExecutionStatus | undefined>(undefined);
        this.initWorker();
    }

    private initWorker(): void {
        this.proxy = new WorkerProxy();
        // start the worker
        this.proxy.start();

        // forward the status
        this.proxy.subject.subscribe(this.status);
    }

    async execute(execution: Execution): Promise<ExecutionResult> {
        const result: ExecutionResult = await this.proxy.execute(execution);
        return result;
    }

    async cancel(): Promise<void> {
        await this.proxy.abort();
    }

}