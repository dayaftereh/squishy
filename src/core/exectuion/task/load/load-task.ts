import { Task } from '../task';
import { LoadTaskFields } from './load-task-fields';

export interface LoadTask extends Task {
    fields: LoadTaskFields
}