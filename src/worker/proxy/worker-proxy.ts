import { Subject } from 'rxjs';
import { Execution } from '../../core/exectuion/execution';
import { ExecutionResult } from '../../core/exectuion/execution-result';
import { ExecutionStatus } from '../../core/exectuion/execution-status';
import { LinkClient } from '../link/link-client';
import { StatusReceiver } from '../status/status-receiver';

export class WorkerProxy {

    readonly subject: Subject<ExecutionStatus | undefined>;

    private worker: Worker | undefined;
    private linkClient: LinkClient | undefined;
    private statusReceiver: StatusReceiver | undefined;

    constructor() {
        this.subject = new Subject<ExecutionStatus | undefined>();
    }

    start(): void {
        this.worker = new Worker('../main.worker.ts', { type: 'module' });

        this.linkClient = new LinkClient(this.worker);
        this.linkClient.start();

        this.statusReceiver = new StatusReceiver(this.worker, this.subject);
        this.statusReceiver.start();
    }

    async execute(execution: Execution): Promise<ExecutionResult> {
        if (!this.linkClient) {
            throw new Error(`link client not initialized`);
        }

        const result: ExecutionResult = await this.linkClient.call('execute', execution);
        return result;
    }

    async abort(): Promise<void> {
        if (!this.linkClient) {
            throw new Error(`link client not initialized`);
        }

        await this.linkClient.call('abort');
    }

}
