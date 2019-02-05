import { ExecutionWorker } from './execution-worker/execution-worker';
import { TasksExecutor } from './tasks/tasks-executor';

const worker: ExecutionWorker = new ExecutionWorker(self);
const executor: TasksExecutor = new TasksExecutor(worker);

addEventListener('message', (event: MessageEvent) => {
    worker.dispatch(event);
});

// start the task executor
executor.start();

// https://github.com/patidar-suresh/angular6-webworker