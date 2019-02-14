import { ExecutionData } from './data/execution-data';
import { OutputTask } from './task/output/output-task';
import { Tasks } from './task/tasks';

export interface Execution {
    id: string
    tasks: Tasks
    output: OutputTask
    data: ExecutionData
}