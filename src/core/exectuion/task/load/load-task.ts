import { Task } from '../task';
import { LoadTaskFields } from './load-task-fields';
import { LoadTaskFormat } from './load-task-format';

export interface LoadTask extends Task {
    key?: string
    plainKey?: string
    fields: LoadTaskFields
    format: LoadTaskFormat
}