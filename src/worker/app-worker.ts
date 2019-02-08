import { AppWorkerDispatcher } from './app-worker.dispatcher';
import { AppWorkerExecutor } from './executor/app-worker.executor';

export class AppWorker {

    private executor: AppWorkerExecutor;

    private dispatcher: AppWorkerDispatcher;

    private readonly worker: Worker;

    constructor(worker: Worker) {
        this.worker = worker;
    }

    start(): void {
        this.dispatcher = new AppWorkerDispatcher(this.worker);
        this.dispatcher.start();

        this.executor = new AppWorkerExecutor(this.worker, this.dispatcher);
        this.executor.start();
    }

}
