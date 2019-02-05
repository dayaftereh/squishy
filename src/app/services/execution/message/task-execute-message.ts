import { TaskExecution } from '../task-execution';
import { TaskMessage } from './task-message';

export interface TaskExecuteMessage extends TaskMessage {
    execution: TaskExecution
}