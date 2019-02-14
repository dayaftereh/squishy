import { Task } from '../task';
import { ScriptTaskInput } from './script-task-input';

export interface ScriptTask extends Task {
    script: string
    input: ScriptTaskInput
}