import { Task } from '../../../core/exectuion/task/task';
import { TasksData } from '../task/tasks-data';

export interface TaskExecution {
    tasks: Task[]
    data: TasksData
}