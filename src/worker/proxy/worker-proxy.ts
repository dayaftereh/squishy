import { Execution } from '../../core/exectuion/execution';
import { ExecutionResult } from '../../core/exectuion/execution-result';
import { LinkClient } from '../link/link-client';

export class WorkerProxy {

    private worker: Worker | undefined;
    private linkClient: LinkClient | undefined;

    constructor() {
    }

    start(): void {
        this.worker = new Worker('../main.worker.ts', { type: 'module' });
        this.linkClient = new LinkClient(this.worker);
        this.linkClient.start();
    }

    async execute(execution: Execution): Promise<ExecutionResult> {
        if (!this.linkClient) {
            throw new Error(`link client not initialized`);
        }

        const result: ExecutionResult = await this.linkClient.call('execute', execution);
        return result;
    }

}
