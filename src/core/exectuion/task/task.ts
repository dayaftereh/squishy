import { TaskId } from './task-id';
import { TaskType } from './task-type';

export interface Task {
    id: TaskId;
    name: string
    type: TaskType;
    disabled: boolean
}