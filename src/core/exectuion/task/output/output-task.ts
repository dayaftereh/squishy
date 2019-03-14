import { Task } from '../task';
import { TaskId } from '../task-id';
import { OutputTaskFields } from './output-task-fields';
import { OutputTaskFormat } from './output-task-format';

export interface OutputTask extends Task {
    input: TaskId;
    filename: string;
    outputKey?: string;
    fields: OutputTaskFields;
    format: OutputTaskFormat;
}