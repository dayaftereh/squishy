import { Task } from '../task/task';

export interface ExecutionPlanEntry {
    task: Task
    children: ExecutionPlanEntry[]
}