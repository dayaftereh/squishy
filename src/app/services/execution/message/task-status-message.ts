import { TaskMessage } from './task-message';

export interface TaskStatusMessage extends TaskMessage {
    progress: number
    running: boolean
    error: Error

}