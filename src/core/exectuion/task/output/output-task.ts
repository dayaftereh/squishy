import { Task } from '../task';
import { TaskId } from '../task-id';
import { OutputTaskFields } from './output-task-fields';

export interface OutputTask extends Task {
    input: TaskId
    filename: string
    fields: OutputTaskFields
}