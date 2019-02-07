import { WorkerMessage } from '../worker-message';

export interface WorkerRequestLinesMessage extends WorkerMessage{
    files: File[]
    first?: number
}