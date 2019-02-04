import { Task } from '../task/task';
import { TaskExecutionData } from './task-execution-data';

export interface TaskExecution {
    tasks: Task[]
    data: TaskExecutionData
}