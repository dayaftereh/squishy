import { TaskType } from './task-type';

export interface Task {
    id: string;
    name: string
    type: TaskType;
}