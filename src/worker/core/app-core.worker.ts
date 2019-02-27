import { Execution } from '../../core/exectuion/execution';
import { ExecutionResult } from '../../core/exectuion/execution-result';
import { Executor } from '../../core/executor/executor';
import { LinkServer } from '../link/link-server';

export class AppCoreWorker {

    private linkServer: LinkServer;

    private readonly worker: Worker;

    private executor: Executor;

    constructor(worker: Worker) {
        this.worker = worker;
        this.executor = new Executor();
    }

    start(): void {
        this.linkServer = new LinkServer(this.worker);
        this.linkServer.start();

        this.registerCalls();
    }

    private registerCalls(): void {
        this.linkServer.register('execute', (taskExecution: any) => {
            return this.execute(taskExecution);
        });
    }

    private async execute(execution: Execution): Promise<ExecutionResult> {
        const result: ExecutionResult = await this.executor.execute(execution);
        return result;
    }

}