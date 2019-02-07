import { WorkerMessage } from './worker-message';

export interface WorkerStatusMessage extends WorkerMessage {
    queue: WorkerType[]
}