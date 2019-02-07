import { TaskExecution } from '../../../app/services/execution/task-execution';
import { WorkerMessage } from '../worker-message';

export interface WorkerRequestTaskExecutionMessage extends WorkerMessage {
    taskExecution: TaskExecution
}