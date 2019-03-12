import { ExecutionStatus } from '../../../core/exectuion/execution-status';
import { StatusMessageType } from './status-message-type';

export interface StatusMessage {
    type: StatusMessageType
    status: ExecutionStatus | undefined
}