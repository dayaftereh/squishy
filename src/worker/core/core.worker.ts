import { Execution } from '../../core/exectuion/execution';
import { ExecutionResult } from '../../core/exectuion/execution-result';
import { Executor } from '../../core/executor/executor';
import { LinkServer } from '../link/link-server';
import { StatusBroadcaster } from '../status/status-broadcaster';

export class CoreWorker {

    private linkServer: LinkServer;
    private broadcaster: StatusBroadcaster;

    private readonly worker: Worker;

    private executor: Executor;

    constructor(worker: Worker) {
        this.worker = worker;
        this.executor = new Executor();
    }

    start(): void {
        this.linkServer = new LinkServer(this.worker);
        this.linkServer.start();

        this.broadcaster = new StatusBroadcaster(this.worker, this.executor.subject);
        this.broadcaster.start();

        this.registerCalls();
    }

    private registerCalls(): void {
        this.linkServer.register('execute', (taskExecution: any) => {
            return this.execute(taskExecution);
        });

        this.linkServer.register('abort', () => {
            return this.abort();
        });
    }

    private execute(execution: Execution): ExecutionResult {
        const result: ExecutionResult = this.executor.execute(execution);
        return result;
    }

    private abort(): void {
        this.executor.abort();
    }

}