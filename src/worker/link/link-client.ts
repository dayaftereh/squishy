import { fromEvent } from 'rxjs';
import { Callable } from './callable';
import { LinkType } from './link-type';
import { Call } from './message/call';
import { LinkError, Return } from './message/return';

export class LinkClient {

    private worker: Worker;
    private counter: number;
    private callbacks: Map<number, (ret: Return) => void>;

    constructor(worker: Worker) {
        this.counter = 0;
        this.worker = worker;
        this.callbacks = new Map<number, Callable<any>>();
    }

    start(): void {
        fromEvent<MessageEvent>(this.worker, 'message').subscribe((event: MessageEvent) => {
            this.dispatch(event);
        });
    }

    private nextId(): number {
        return this.counter++;
    }

    call<T>(operation: string, ...args: any[]): Promise<T> {
        const id: number = this.nextId();

        const promise: Promise<T> = new Promise((resolve, reject) => {
            const callback = (ret: Return) => {
                this.callbacks.delete(id);

                if (ret.error) {
                    const error: Error = this.linkErrorToError(ret.error);
                    return reject(error);
                }

                resolve(ret.result);
            };
            this.callbacks.set(id, callback);

            this.emit(id, operation, args);
        });

        return promise;
    }

    private linkErrorToError(linkError: LinkError): Error {
        const error: Error = new Error(linkError.message);
        error.name = linkError.name;
        error.stack = linkError.stack;

        const objError: Error = Object.assign(error, linkError);
        return objError;
    }

    private emit(id: number, operation: string, args: any[]): void {
        const call: Call = {
            id,
            args,
            operation,
            type: LinkType.LINK
        } as Call;

        this.worker.postMessage(call);
    }

    private dispatch(event: MessageEvent): void {
        if (!event || !event.data) {
            return;
        }

        if (!event.data.hasOwnProperty('type')) {
            return;
        }

        const ret: Return = event.data as Return;
        if (ret.type !== LinkType.LINK) {
            return;
        }

        const callable: ((ret: Return) => void) | undefined = this.callbacks.get(ret.id);
        if (callable) {
            callable(ret);
            return;
        }

        throw new Error(`unable to find callback for id [ ${ret.id} ]`);
    }

}