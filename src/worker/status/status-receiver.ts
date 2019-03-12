import { fromEvent, Subject } from 'rxjs';
import { ExecutionStatus } from '../../core/exectuion/execution-status';
import { StatusMessage } from './message/status-message';
import { StatusMessageType } from './message/status-message-type';

export class StatusReceiver {

    constructor(private readonly worker: Worker,
                private readonly subject: Subject<ExecutionStatus | undefined>) {

    }

    start(): void {
        fromEvent<MessageEvent>(this.worker, 'message').subscribe((event: MessageEvent) => {
            this.dispatch(event);
        });
    }

    private dispatch(event: MessageEvent): void {
        if (!event || !event.data) {
            return;
        }

        if (!event.data.hasOwnProperty('type')) {
            return;
        }

        const statusMessage: StatusMessage = event.data as StatusMessage;
        if (statusMessage.type !== StatusMessageType.STATUS) {
            return;
        }

        this.subject.next(statusMessage.status);
    }

}