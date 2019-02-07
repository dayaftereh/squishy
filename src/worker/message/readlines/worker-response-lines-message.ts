import { WorkerMessage } from '../worker-message';

export interface WorkerResponseLinesMessage extends WorkerMessage {
    lines: string[][]
}