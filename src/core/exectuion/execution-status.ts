import { TaskState } from './task/task-state';

export interface ExecutionStatus {
    [key: string]: TaskState
}