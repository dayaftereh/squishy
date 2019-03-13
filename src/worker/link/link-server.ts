import { fromEvent } from 'rxjs';
import { Callable } from './callable';
import { LinkType } from './link-type';
import { Call } from './message/call';
import { LinkError, Return } from './message/return';

export class LinkServer {

    private worker: Worker;

    private operations: Map<string, Callable<any>>;

    constructor(worker: Worker) {
        this.worker = worker;
        this.operations = new Map<string, Callable<any>>();
    }

    start(): void {
        fromEvent<MessageEvent>(this.worker, 'message').subscribe((event: MessageEvent) => {
            this.dispatch(event);
        });
    }

    private call<T>(call: Call): T {
        const operation: string = call.operation;
        const callable: Callable<T> | undefined = this.operations.get(operation);
        if (callable) {
            const result: T = callable(...call.args);
            return result;
        }

        throw new Error(`no operation with name [ ${operation} ] registered`);
    }

    private success<T>(call: Call, result: T): void {
        const ret: Return = {
            result,
            id: call.id,
            type: LinkType.LINK
        };
        this.worker.postMessage(ret);
    }

    private error(call: Call, error: Error): void {
        try {
            this.error0(call, error);
        } catch (e) {
            console.error(e);
        }
    }

    private error0(call: Call, error: Error): void {
        const linkError: LinkError = this.errorToLinkError(error);

        const ret: Return = {
            error: linkError,
            id: call.id,
            type: LinkType.LINK
        };

        this.worker.postMessage(ret);
    }

    private errorToLinkError(error: Error): LinkError {
        const linkError: LinkError = Object.assign({}, error) as LinkError;

        if (error.name) {
            linkError.name = error.name;
        }

        if (error.stack) {
            linkError.stack = error.stack;
        }

        if (error.message) {
            linkError.message = error.message;
        }

        return linkError;
    }

    private dispatch(event: MessageEvent): void {
        if (!event || !event.data) {
            return;
        }

        if (!event.data.hasOwnProperty('type')) {
            return;
        }

        const call: Call = event.data as Call;
        if (call.type !== LinkType.LINK) {
            return;
        }

        try {
            const result: any = this.call(call);
            this.success(call, result);
        } catch (e) {
            this.error(call, e);
        }
    }

    register<T>(operation: string, fn: Callable<T>): void {
        this.operations.set(operation, fn);
    }

}
