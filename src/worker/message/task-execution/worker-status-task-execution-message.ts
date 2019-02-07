import { WorkerMessage } from '../worker-message';

export interface WorkerStatusTaskExecutionMessage extends WorkerMessage {
    process: number
    completed: boolean
}