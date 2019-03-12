import { Subject } from 'rxjs';
import { ExecutionStatus } from '../../core/exectuion/execution-status';
import { StatusMessage } from './message/status-message';
import { StatusMessageType } from './message/status-message-type';

export class StatusBroadcaster {

    constructor(private readonly worker: Worker,
                private readonly subject: Subject<ExecutionStatus | undefined>) {
    }

    start(): void {
        this.subject.subscribe((status: ExecutionStatus | undefined) => {
            this.broadcast(status);
        });
    }

    private broadcast(status: ExecutionStatus | undefined): void {
        const message: StatusMessage = {
            status,
            type: StatusMessageType.STATUS
        };
        this.worker.postMessage(message);
    }

}