import { Observable } from 'rxjs';
import { TaskExecution } from '../../app/services/execution/task-execution';
import { WorkerTaskExecutionStatus } from '../tasks/worker-task-execution-status';
import { WorkerProxyDispatcher } from './worker-proxy.dispatcher';
import { WorkerProxyPublisher } from './worker-proxy.publisher';

export class WorkerProxy {

    private worker: Worker;
    private publisher: WorkerProxyPublisher;
    private dispatcher: WorkerProxyDispatcher;

    constructor() {
    }

    start(): void {
        this.worker = new Worker('../main.worker', { type: 'module' });
        this.dispatcher = new WorkerProxyDispatcher(this.worker);
        this.publisher = new WorkerProxyPublisher(this.worker, this.dispatcher);

        this.dispatcher.start();
    }

    async readlines(files: File[], first?: number): Promise<string[][]> {
        return this.publisher.readlines(files, first);
    }

    execute(taskExecution: TaskExecution): Observable<WorkerTaskExecutionStatus> {
        return this.publisher.taskExecution(taskExecution);
    }

    async abortAll(): Promise<void> {

    }

    status(): Observable<string> | null {
        return null;
    }

}