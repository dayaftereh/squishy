import { fromEvent } from 'rxjs';
import { Callable } from './callable';
import { Call } from './message/call';
import { Return } from './message/return';

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
            id: call.id
        };
        this.worker.postMessage(ret);
    }

    private error(call: Call, error: Error): void {
        const ret: Return = {
            error,
            id: call.id
        };
        this.worker.postMessage(ret);
    }

    private dispatch(event: MessageEvent): void {
        if (!event || !event.data) {
            return;
        }

        const call: Call = event.data as Call;
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
