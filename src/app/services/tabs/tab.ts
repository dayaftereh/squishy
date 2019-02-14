import { OutputTask } from '../../../core/exectuion/task/output/output-task';
import { Tasks } from '../task/tasks';

export interface Tab {
    id: string
    name: string
    tasks: Tasks
    output: OutputTask
}