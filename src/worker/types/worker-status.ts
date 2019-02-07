import { WorkerTask } from '../tasks/worker-task';

export interface WorkerStatus {
    queue: WorkerTask[]
}