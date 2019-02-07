import { WorkerMessage } from './worker-message';

export interface WorkerErrorMessage extends WorkerMessage{
    error: Error
}