import { Task } from '../task/task';
import { TasksData } from '../task/tasks-data';

export interface TaskExecution {
    tasks: Task[]
    data: TasksData
}