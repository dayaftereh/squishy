import { WorkerMessageOperation } from './worker-message.operation';
import { WorkerMessageType } from './worker-message.type';

export interface WorkerMessage {
    asyncId?: string
    type: WorkerMessageType
    operation: WorkerMessageOperation
}